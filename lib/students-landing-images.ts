import students1 from "@/public/assets/landing/students/1.png";
import students2 from "@/public/assets/landing/students/2.png";
import students3 from "@/public/assets/landing/students/3.png";
import students4 from "@/public/assets/landing/students/4.png";
import students5 from "@/public/assets/landing/students/5.jpeg";
import students6 from "@/public/assets/landing/students/6.jpeg";
import students7 from "@/public/assets/landing/students/7.jpeg";
import students8 from "@/public/assets/landing/students/8.jpeg";
import students9 from "@/public/assets/landing/students/9.jpeg";

/** صور قسم الطلاب في `public/assets/landing/students` */
export const studentsLanding = {
  overviewHero: students1,
  overviewGallery: [students2, students3] as const,
  advisingHero: students4,
  advisingInline: [students5, students6] as const,
  activitiesHero: students7,
  /** ثلاث صور للشبكة؛ الصورة الأخيرة تُعاد استخدام أصل من المجلد نفسه */
  activitiesGallery: [students8, students9, students2] as const,
};
