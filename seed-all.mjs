import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

/** Load `.env` into `process.env` (Node does not read it by default). */
function loadEnvFile() {
  const root = dirname(fileURLToPath(import.meta.url));
  const envPath = join(root, '.env');
  if (!existsSync(envPath)) return;
  const text = readFileSync(envPath, 'utf8');
  for (const line of text.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
}

loadEnvFile();

const port = process.env.PORT || 3000;
const baseUrl = process.env.SEED_BASE_URL || `http://localhost:${port}`;
const seedKey = process.env.ADMIN_SEED_KEY;

if (!seedKey) {
  console.error('Missing ADMIN_SEED_KEY. Set it in `.env` or in the shell before running.');
  process.exit(1);
}

/** الأقسام الأكاديمية (خطط الدراسة لكل برنامج) + برامج الماجستير */
const ACADEMIC_DEPARTMENT_SEEDS = [
  '/api/departments/seed',
  '/api/graduate-programs/seed',
];

const endpoints = [
  '/api/auth/seed-admin',
  '/api/messages/seed',
  '/api/news/seed',
  '/api/partnerships/seed',
  ...ACADEMIC_DEPARTMENT_SEEDS,
  '/api/contact/seed',
  '/api/site-contact-settings/seed',
  '/api/college-council/seed',
  '/api/board-directors/seed',
  '/api/board-trustees/seed',
  '/api/advisory-council/seed',
  '/api/fact-stats/seed',
  '/api/events/seed',
  '/api/research-highlights/seed',
  '/api/careers/seed',
  '/api/social-posts/seed',
  '/api/about-institution/seed',
  '/api/vision-mission/seed',
  '/api/graduate-attributes/seed',
  '/api/academic-affiliation/seed',
  '/api/quality-assurance/seed',
  '/api/policies-by-department/seed',
  '/api/organizational-structure/seed',
  '/api/health-safety/seed',
  '/api/plans-reports/seed',
  '/api/campus-map/seed',
  '/api/foundation-program/seed',
  '/api/math-completion-exam/seed',
  '/api/practice-placement-tests/seed',
  '/api/general-requirements/seed',
  '/api/seminars/seed',
  '/api/publications/seed',
  '/api/research-projects/seed',
  '/api/magazine-issues/seed',
  '/api/editorial-members/seed',
  '/api/gallery/seed',
  '/api/ielts-exams/seed',
  '/api/training-courses/seed',
  '/api/privacy-policy/seed',
];

async function run() {
  for (const endpoint of endpoints) {
    const url = `${baseUrl}${endpoint}`;
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'x-seed-key': seedKey,
          'Content-Type': 'application/json',
        },
      });

      const text = await res.text();
      let body;
      try {
        body = JSON.parse(text);
      } catch {
        body = text;
      }

      console.log(`${res.status} ${endpoint}`, body);
    } catch (error) {
      console.error(`FAILED ${endpoint}`, error);
    }
  }
}

run();
