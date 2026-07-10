import type { DepartmentStudyPlan } from "@/types/department";

import businessStudyPlans from "@/staticData/department-study-plans/business.json";
import englishStudyPlans from "@/staticData/department-study-plans/english.json";
import lawStudyPlans from "@/staticData/department-study-plans/law.json";

type PlansByProgram = Record<string, Record<string, DepartmentStudyPlan>>;

const PLANS_BY_DOMAIN: Record<string, PlansByProgram> = {
  english: englishStudyPlans as PlansByProgram,
  "business-department": businessStudyPlans as PlansByProgram,
  "law-program": lawStudyPlans as PlansByProgram,
};

function plansRecordToArray(record: Record<string, DepartmentStudyPlan>): DepartmentStudyPlan[] {
  return Object.values(record).sort((a, b) => {
    const order = ["diploma", "advancedDiploma", "bachelor", "masters"];
    return order.indexOf(a.id) - order.indexOf(b.id);
  });
}

function mergeProgramStudyPlans<P extends ProgramWithStudyPlan>(
  program: P,
  plansByLevel?: Record<string, DepartmentStudyPlan>,
): P {
  if (!plansByLevel || Object.keys(plansByLevel).length === 0) {
    return program;
  }
  const studyPlan = plansRecordToArray(plansByLevel);
  if (studyPlan.length === 0) return program;
  return { ...program, studyPlan };
}

type ProgramWithStudyPlan = {
  id: string;
  studyPlan?: readonly unknown[];
};

/** الحد الأدنى لدمج الخطط — متوافق مع `staticData/department` دون اشتراط بقية حقول القسم */
type DepartmentSeedInput = {
  domain: string;
  programs: ProgramWithStudyPlan[];
};

/** يدمج خطط الدراسة المستخرجة من الموقع القديم مع بيانات الأقسام قبل الزرع */
export function mergeDepartmentStudyPlans<T extends DepartmentSeedInput>(
  departments: readonly T[],
): T[] {
  return departments.map((dept) => {
    const plansByProgram = PLANS_BY_DOMAIN[dept.domain];
    if (!plansByProgram) return dept;

    return {
      ...dept,
      programs: dept.programs.map((p) =>
        mergeProgramStudyPlans(p, plansByProgram[p.id]),
      ),
    };
  });
}
