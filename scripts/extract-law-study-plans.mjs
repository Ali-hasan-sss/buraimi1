/**
 * يستخرج خطة دراسة بكالوريوس القانون من LawProgram.tsx
 * node scripts/extract-law-study-plans.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const SRC = join(root, '..', 'موقع جامعة البريمي', 'src', 'app', 'pages', 'LawProgram.tsx');
const OUT = join(root, 'staticData', 'department-study-plans', 'law.json');

function parseCourses(text, fieldName) {
  const start = text.indexOf(`const ${fieldName} = [`);
  if (start === -1) return [];
  const slice = text.slice(start);
  const end = slice.indexOf('\n  ];');
  const block = slice.slice(0, end);
  const courses = [];
  const re =
    /\{\s*seq:\s*(\d+),\s*code:\s*'([^']*)',\s*title:\s*'([^']*)',\s*credits:\s*(\d+),\s*prereq:\s*'([^']*)'\s*\}/g;
  let m;
  while ((m = re.exec(block)) !== null) {
    courses.push({
      seq: parseInt(m[1], 10),
      code: m[2],
      title: m[3],
      credits: parseInt(m[4], 10),
      oqf: 3,
      prerequisite: m[5],
    });
  }
  return courses;
}

function main() {
  const source = readFileSync(SRC, 'utf8');
  const general = parseCourses(source, 'generalRequirements');
  const major = parseCourses(source, 'majorRequirements');
  const elective = parseCourses(source, 'electiveCourses');

  const plan = {
    'law-bachelor': {
      bachelor: {
        id: 'bachelor',
        PlanHeader: {
          title: 'خطة الدراسة لدرجة البكالوريوس في القانون',
          totalHour: 129,
          generalRequirementsHours: 12,
          departmentRequirementsHours: 108,
          majorRequirementsHours: 0,
          electiveRequirements: 9,
        },
        generalRequirements: general,
        departmentRequirements: major,
        majorRequirements: [],
        electiveRequirements: elective,
      },
    },
  };

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify(plan, null, 2));
  console.log('Wrote', OUT);
}

main();
