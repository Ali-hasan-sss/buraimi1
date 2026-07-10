/**
 * يستخرج خطط الدراسة من EnglishDepartment.tsx
 * node scripts/extract-english-study-plans.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const SRC = join(root, '..', 'موقع جامعة البريمي', 'src', 'app', 'pages', 'EnglishDepartment.tsx');
const OUT = join(root, 'staticData', 'department-study-plans', 'english.json');

function parseCourseObjectBlock(text) {
  const courses = [];
  const re =
    /\{\s*seq:\s*(\d+),\s*code:\s*'([^']*)',\s*title:\s*'([^']*)',\s*credits:\s*(\d+),\s*oqf:\s*(\d+),\s*prerequisite:\s*'([^']*)'\s*\}/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    courses.push({
      seq: parseInt(m[1], 10),
      code: m[2],
      title: m[3],
      credits: parseInt(m[4], 10),
      oqf: parseInt(m[5], 10),
      prerequisite: m[6],
    });
  }
  return courses;
}

function extractPlanBlock(source, varName) {
  const start = source.indexOf(`const ${varName} = {`);
  if (start === -1) return null;
  const slice = source.slice(start);
  const end = slice.indexOf('\n  };');
  const block = slice.slice(0, end + 5);

  const general = parseCourseObjectBlock(
    block.slice(block.indexOf('generalRequirements'), block.indexOf('departmentRequirements')),
  );
  const department = parseCourseObjectBlock(
    block.slice(block.indexOf('departmentRequirements'), block.indexOf('majorRequirements')),
  );
  const major = parseCourseObjectBlock(
    block.slice(
      block.indexOf('majorRequirements'),
      block.indexOf('electiveRequirements') > -1 ? block.indexOf('electiveRequirements') : block.length,
    ),
  );
  const electiveStart = block.indexOf('electiveRequirements');
  const elective =
    electiveStart > -1 ? parseCourseObjectBlock(block.slice(electiveStart)) : [];

  const totalHour =
    general.reduce((s, c) => s + c.credits, 0) +
    department.reduce((s, c) => s + c.credits, 0) +
    major.reduce((s, c) => s + c.credits, 0) +
    elective.reduce((s, c) => s + c.credits, 0);

  return {
    generalRequirements: general,
    departmentRequirements: department,
    majorRequirements: major,
    electiveRequirements: elective,
    totalHour,
  };
}

function main() {
  const source = readFileSync(SRC, 'utf8');
  const plans = {
    'english-lit': {
      bachelor: planEntry('english-lit', 'bachelor', 'خطة الدراسة في بكالوريوس اللغة الإنجليزية وآدابها', extractPlanBlock(source, 'englishLitBachelorPlan')),
      advancedDiploma: planEntry('english-lit', 'advancedDiploma', 'خطة الدراسة في الدبلوم المتقدم - اللغة الإنجليزية وآدابها', extractPlanBlock(source, 'englishLitAdvancedDiplomaPlan')),
      diploma: planEntry('english-lit', 'diploma', 'خطة الدراسة في الدبلوم - اللغة الإنجليزية وآدابها', extractPlanBlock(source, 'englishLitDiplomaPlan')),
    },
    translation: {
      bachelor: planEntry('translation', 'bachelor', 'خطة الدراسة في بكالوريوس الترجمة', extractPlanBlock(source, 'translationBachelorPlan')),
    },
  };

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify(plans, null, 2));
  console.log('Wrote', OUT);
}

function planEntry(programId, levelId, title, data) {
  if (!data) return null;
  return {
    id: levelId,
    PlanHeader: {
      title,
      totalHour: data.totalHour,
      generalRequirementsHours: data.generalRequirements.reduce((s, c) => s + c.credits, 0),
      departmentRequirementsHours: data.departmentRequirements.reduce((s, c) => s + c.credits, 0),
      majorRequirementsHours: data.majorRequirements.reduce((s, c) => s + c.credits, 0),
      electiveRequirements: data.electiveRequirements.reduce((s, c) => s + c.credits, 0) || null,
    },
    generalRequirements: data.generalRequirements,
    departmentRequirements: data.departmentRequirements,
    majorRequirements: data.majorRequirements,
    electiveRequirements: data.electiveRequirements,
  };
}

main();
