/**
 * يستخرج خطط الدراسة من BusinessDepartment.tsx (الموقع القديم)
 * ويكتب staticData/department-study-plans/business.json
 *
 * تشغيل: node scripts/extract-business-study-plans.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const LEGACY_PATH = join(root, '..', 'موقع جامعة البريمي', 'src', 'app', 'pages', 'BusinessDepartment.tsx');
const OUT_DIR = join(root, 'staticData', 'department-study-plans');
const OUT_FILE = join(OUT_DIR, 'business.json');

const PROGRAM_ID_MAP = {
  'hr-development': 'hrm',
  'business-admin': 'business-admin',
  accounting: 'accounting',
  'finance-banking': 'finance-banking',
  marketing: 'marketing',
  'business-economics': 'business-economics',
};

const LEVEL_MAP = {
  diploma: 'diploma',
  'advanced-diploma': 'advancedDiploma',
  bachelor: 'bachelor',
};

function classifySection(title) {
  const t = title.toLowerCase();
  if (t.includes('foundation') || t.includes('تأسيسي') || t.includes('foundation program')) {
    return 'foundation';
  }
  if (
    t.includes('college general') ||
    t.includes('كلية العامة') ||
    t.includes('متطلبات الكلية') ||
    (t.startsWith('i.') && t.includes('كلية'))
  ) {
    return 'general';
  }
  if (t.includes('department') || t.includes('متطلبات القسم') || t.includes('قسم (')) {
    return 'department';
  }
  if (t.includes('elective') || t.includes('اختيارية') || t.includes('اختيار')) {
    return 'elective';
  }
  if (t.includes('major') || t.includes('تخصص') || t.includes('إجبارية')) {
    return 'major';
  }
  return 'department';
}

function parseRowsFromBlock(block) {
  const rows = [];
  const arrayRegex = /\[\s*\n([\s\S]*?)\]\s*\.map\(\(row/g;
  let m;
  while ((m = arrayRegex.exec(block)) !== null) {
    const inner = m[1];
    const rowRegex = /\[\s*'([^']*)'\s*,\s*'([^']*)'\s*,\s*'([^']*)'\s*,\s*'([^']*)'\s*,\s*'([^']*)'\s*\]/g;
    let r;
    while ((r = rowRegex.exec(inner)) !== null) {
      rows.push({
        seq: parseInt(r[1], 10) || rows.length + 1,
        code: r[2],
        title: r[3],
        credits: parseInt(r[4], 10) || 3,
        oqf: 3,
        prerequisite: r[5],
      });
    }
  }

  // Single-row tables (no array)
  const singleRowRegex =
    /<td[^>]*>\s*(\d+)\s*<\/td>[\s\S]*?<td[^>]*>\s*([A-Z0-9]+)\s*<\/td>[\s\S]*?<td[^>]*>\s*([^<]+?)\s*<\/td>[\s\S]*?<td[^>]*>\s*(\d+)\s*<\/td>[\s\S]*?<td[^>]*>\s*([^<]+?)\s*<\/td>/g;
  let s;
  while ((s = singleRowRegex.exec(block)) !== null) {
    rows.push({
      seq: parseInt(s[1], 10),
      code: s[2].trim(),
      title: s[3].trim(),
      credits: parseInt(s[4], 10) || 3,
      oqf: 3,
      prerequisite: s[5].trim(),
    });
  }

  return rows;
}

function extractPlans(source) {
  const plans = {};
  const conditionRegex =
    /showStudyPlan\.programId\s*===\s*'([^']+)'\s*&&\s*showStudyPlan\.level\s*===\s*'([^']+)'\s*\?\s*\(/g;

  let match;
  while ((match = conditionRegex.exec(source)) !== null) {
    const legacyProgramId = match[1];
    const legacyLevel = match[2];
    const start = match.index + match[0].length;

    const nextCondition = source.indexOf(') : showStudyPlan.programId', start);
    const block =
      nextCondition === -1
        ? source.slice(start, start + 50000)
        : source.slice(start, nextCondition);

    const programId = PROGRAM_ID_MAP[legacyProgramId] || legacyProgramId;
    const levelId = LEVEL_MAP[legacyLevel] || legacyLevel;

    const sections = { foundation: [], general: [], department: [], major: [], elective: [] };

    const h5Regex = /<h5[^>]*>([\s\S]*?)<\/h5>/g;
    let h5;
    const h5Positions = [];
    while ((h5 = h5Regex.exec(block)) !== null) {
      h5Positions.push({ title: h5[1].replace(/<[^>]+>/g, '').trim(), index: h5.index });
    }

    for (let i = 0; i < h5Positions.length; i++) {
      const title = h5Positions[i].title;
      if (!/^[IVX]+\./i.test(title) && !title.includes('متطلبات') && !title.includes('Requirements')) {
        continue;
      }
      const sectionStart = h5Positions[i].index;
      const sectionEnd = h5Positions[i + 1]?.index ?? block.length;
      const sectionBlock = block.slice(sectionStart, sectionEnd);
      const kind = classifySection(title);
      const rows = parseRowsFromBlock(sectionBlock);
      if (rows.length) sections[kind].push(...rows);
    }

    // Fallback: all arrays in block if no h5 sections found
    if (
      !sections.foundation.length &&
      !sections.general.length &&
      !sections.department.length &&
      !sections.major.length &&
      !sections.elective.length
    ) {
      const allRows = parseRowsFromBlock(block);
      if (allRows.length) sections.department.push(...allRows);
    }

    const generalRequirements = [...sections.foundation, ...sections.general].map((c, i) => ({
      ...c,
      seq: i + 1,
    }));

    const reseq = (arr) => arr.map((c, i) => ({ ...c, seq: i + 1 }));

    const planTitleMatch = block.match(
      /<h4[^>]*>([^<]*(?:Plan|خطة)[^<]*)<\/h4>/i,
    );
    const totalMatch = block.match(/المجموع الكلي:\s*<\/span>\s*<span[^>]*>(\d+)/);
    const structureHours = [...block.matchAll(/text-3xl[^>]*>(\d+)</g)].map((x) =>
      parseInt(x[1], 10),
    );
    const totalHour =
      totalMatch?.[1] != null
        ? parseInt(totalMatch[1], 10)
        : structureHours.reduce((a, b) => a + b, 0) || null;

    const plan = {
      id: levelId,
      PlanHeader: {
        title: planTitleMatch?.[1]?.trim() || `${programId} — ${levelId}`,
        totalHour,
        generalRequirementsHours: generalRequirements.reduce((s, c) => s + c.credits, 0) || null,
        departmentRequirementsHours:
          sections.department.reduce((s, c) => s + c.credits, 0) || null,
        majorRequirementsHours: sections.major.reduce((s, c) => s + c.credits, 0) || null,
        electiveRequirements: sections.elective.reduce((s, c) => s + c.credits, 0) || null,
      },
      generalRequirements: reseq(generalRequirements),
      departmentRequirements: reseq(sections.department),
      majorRequirements: reseq(sections.major),
      electiveRequirements: reseq(sections.elective),
    };

    if (!plans[programId]) plans[programId] = {};
    plans[programId][levelId] = plan;
  }

  return plans;
}

function main() {
  const source = readFileSync(LEGACY_PATH, 'utf8');
  const plans = extractPlans(source);
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, JSON.stringify(plans, null, 2), 'utf8');
  const count = Object.values(plans).reduce((n, levels) => n + Object.keys(levels).length, 0);
  console.log(`Wrote ${count} study plans to ${OUT_FILE}`);
}

main();
