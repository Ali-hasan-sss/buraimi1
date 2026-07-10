"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import {
  Award,
  BookOpen,
  CheckCircle,
  Clock,
  FileText,
  Globe,
  GraduationCap,
  Pencil,
  Plus,
  Target,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

import { deepMergeGraduateDetails } from "@/lib/graduate-program-detail-deep-merge";
import { isLocallyStoredUploadSrc, resolveUploadImageSrc } from "@/lib/upload-public-url";
import { carouselImageOverlayStyle } from "@/lib/graduate-program-gradient";
import lawHeroImage from "@/public/assets/landing/department/law.webp";
import { graduateStudiesDeatil } from "@/staticData/GraduateStudies";
import { Tab } from "@/types/GraduateTyps";
import CourseTable from "./CourseTable";
import CourseTableEditor from "./CourseTableEditor";

export default function DetailPageComp({
  programSlug,
  details,
  isAdmin,
  heroImageSrc,
  heroOverlayStyle,
}: {
  programSlug?: string;
  details?: any;
  isAdmin?: boolean;
  /** Program carousel / section image (URL or `/uploads/...`) */
  heroImageSrc?: string;
  /** Bottom→top gradient over the hero image (from program `color`) */
  heroOverlayStyle?: CSSProperties;
}) {
    const locale = useLocale();
  const isRtl = locale === "ar";
  const [activeTab, setActiveTab] = useState<Tab>("public");

  const router = useRouter();

  const [detailsState, setDetailsState] = useState<any>(
    details ?? graduateStudiesDeatil,
  );
  type EditorSection = "hero" | "about" | "objectives" | "outcomes" | "studyPlan";
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorSection, setEditorSection] = useState<EditorSection | null>(
    null,
  );
  const [editorSaving, setEditorSaving] = useState(false);
  const [editorError, setEditorError] = useState<string>("");

  const [editorObjectivesAr, setEditorObjectivesAr] = useState<string[]>([]);
  const [editorObjectivesEn, setEditorObjectivesEn] = useState<string[]>([]);
  const [editorOutcomesAr, setEditorOutcomesAr] = useState<string[]>([]);
  const [editorOutcomesEn, setEditorOutcomesEn] = useState<string[]>([]);

  const [editorAboutLeadAr, setEditorAboutLeadAr] = useState<string>("");
  const [editorAboutLeadEn, setEditorAboutLeadEn] = useState<string>("");
  const [editorAboutTextAr, setEditorAboutTextAr] = useState<string>("");
  const [editorAboutTextEn, setEditorAboutTextEn] = useState<string>("");

  // About block editable fields (values shown under the about section)
  const [editorStudyModeAr, setEditorStudyModeAr] = useState<string>("");
  const [editorStudyModeEn, setEditorStudyModeEn] = useState<string>("");
  const [editorProgramDimensionsTextAr, setEditorProgramDimensionsTextAr] =
    useState<string>("");
  const [editorProgramDimensionsTextEn, setEditorProgramDimensionsTextEn] =
    useState<string>("");

  // Hero titles editable (main title + sub title)
  const [editorProgramTitleAr, setEditorProgramTitleAr] = useState<string>("");
  const [editorProgramTitleEn, setEditorProgramTitleEn] = useState<string>("");
  const [editorAffiliationAr, setEditorAffiliationAr] = useState<string>("");
  const [editorAffiliationEn, setEditorAffiliationEn] = useState<string>("");

  const [editorDurationAr, setEditorDurationAr] = useState<string>("");
  const [editorDurationEn, setEditorDurationEn] = useState<string>("");

  const [editorTotalCreditsAr, setEditorTotalCreditsAr] = useState<string>("");
  const [editorTotalCreditsEn, setEditorTotalCreditsEn] = useState<string>("");
  const [editorCourseCreditsAr, setEditorCourseCreditsAr] =
    useState<string>("");
  const [editorCourseCreditsEn, setEditorCourseCreditsEn] =
    useState<string>("");
  const [editorThesisCreditsAr, setEditorThesisCreditsAr] =
    useState<string>("");
  const [editorThesisCreditsEn, setEditorThesisCreditsEn] =
    useState<string>("");

  const [editorGraduationTitleAr, setEditorGraduationTitleAr] =
    useState<string>("");
  const [editorGraduationTitleEn, setEditorGraduationTitleEn] =
    useState<string>("");
  const [editorGraduationTextAr, setEditorGraduationTextAr] =
    useState<string>("");
  const [editorGraduationTextEn, setEditorGraduationTextEn] =
    useState<string>("");

  const [editorCreditsTitleAr, setEditorCreditsTitleAr] = useState<string>("");
  const [editorCreditsTitleEn, setEditorCreditsTitleEn] = useState<string>("");
  const [editorCreditsTextAr, setEditorCreditsTextAr] = useState<string>("");
  const [editorCreditsTextEn, setEditorCreditsTextEn] = useState<string>("");
  const [editorCreditsBullet1Ar, setEditorCreditsBullet1Ar] =
    useState<string>("");
  const [editorCreditsBullet1En, setEditorCreditsBullet1En] =
    useState<string>("");
  const [editorCreditsBullet2Ar, setEditorCreditsBullet2Ar] =
    useState<string>("");
  const [editorCreditsBullet2En, setEditorCreditsBullet2En] =
    useState<string>("");

  const [editorTracksTitleAr, setEditorTracksTitleAr] = useState<string>("");
  const [editorTracksTitleEn, setEditorTracksTitleEn] = useState<string>("");
  const [editorTrackPublicAr, setEditorTrackPublicAr] = useState<string>("");
  const [editorTrackPublicEn, setEditorTrackPublicEn] = useState<string>("");
  const [editorTrackPrivateAr, setEditorTrackPrivateAr] = useState<string>("");
  const [editorTrackPrivateEn, setEditorTrackPrivateEn] = useState<string>("");

  const [editorStudyTab, setEditorStudyTab] = useState<Tab>("public");
  const [editorStudyCourses, setEditorStudyCourses] = useState<{
    core: any[];
    major: any[];
    elective: any[];
    thesis: any[];
  } | null>(null);

  useEffect(() => {
    setDetailsState(details ?? graduateStudiesDeatil);
  }, [details]);

  const dataSource = deepMergeGraduateDetails(
    structuredClone(graduateStudiesDeatil) as unknown as Record<string, unknown>,
    detailsState && typeof detailsState === "object" ? detailsState : {},
  ) as unknown as typeof graduateStudiesDeatil;

  const data = dataSource;
  const {
    privateLawCourses,
    publicLawCourses,
    learningOutcomes,
    objectives,
    programInfo,
  } = data;
  const extended = dataSource as Record<string, unknown>;
  const layout = (extended.layout as string | undefined) ?? "law";
  const pi = programInfo as Record<string, string | undefined>;
  const admissionRequirements = extended.admissionRequirements as
    | { ar?: string[]; en?: string[] }
    | undefined;
  const programFeatures = extended.programFeatures as
    | {
        ar?: { title: string; description: string }[];
        en?: { title: string; description: string }[];
      }
    | undefined;
  const creditSummary = extended.creditSummary as
    | {
        ar?: { label: string; hours: number }[];
        en?: { label: string; hours: number }[];
        totalAr?: string;
        totalEn?: string;
      }
    | undefined;
  const careerPaths = extended.careerPaths as
    | { ar?: string[]; en?: string[] }
    | undefined;
  const isEnglishLayout = layout === "english-masters";
  const isMbaLayout = layout === "mba";
  const isLawLayout = !isEnglishLayout && !isMbaLayout;
  const currentCourses =
    activeTab === "public" ? publicLawCourses : privateLawCourses;
  const objectivesPairLen = Math.max(
    editorObjectivesAr.length,
    editorObjectivesEn.length,
  );
  const outcomesPairLen = Math.max(
    editorOutcomesAr.length,
    editorOutcomesEn.length,
  );

  const t = useTranslations("graduate");

    const heroTitle = isRtl ? programInfo.titleAr : programInfo.titleEn;
    const heroSubtitle = isRtl ? programInfo.titleEn : programInfo.titleAr;
  const heroAffiliation = isRtl
    ? programInfo.affiliationAr
    : programInfo.affiliationEn;

  const resolvedHeroSrc = heroImageSrc
    ? resolveUploadImageSrc(heroImageSrc) || heroImageSrc
    : lawHeroImage;
  const resolvedHeroOverlay = useMemo(
    () =>
      heroOverlayStyle ??
      carouselImageOverlayStyle("from-[#254151] to-[#6096b4]"),
    [heroOverlayStyle],
  );

  const aboutHeadlineAr =
    (programInfo as any).aboutLeadAr ??
    "برنامج مصمم ومُعد وفقًا لاتفاقية المشاركة الأكاديمية";
  const aboutHeadlineEn =
    (programInfo as any).aboutLeadEn ??
    "A program designed and developed under an academic partnership agreement";

  const aboutTextAr =
    (programInfo as any).aboutTextAr ??
    "يعد برنامج الدكتوراه في القانون العام أو الخاص امتداداً لسلسلة برامج الدراسات العليا التي تقدمها كلية البريمي الجامعية ممثلة في برنامج القانون بالتعاون الأكاديمي مع جامعة عين شمس في جمهورية مصر العربية.";
  const aboutTextEn =
    (programInfo as any).aboutTextEn ??
    "The PhD program in Public or Private Law is an extension of the graduate studies programs offered by Buraimi University College through the Law Program, in academic collaboration with Ain Shams University in Egypt.";

  // About-block editable values (with fallback to translations)
  const programDimensionsText = isRtl
    ? ((programInfo as any).programDimensionsTextAr ??
      t("programDimensionsText"))
    : ((programInfo as any).programDimensionsTextEn ??
      t("programDimensionsText"));

  const graduationTitleText = isRtl
    ? ((programInfo as any).graduationTitleAr ?? t("graduationTitle"))
    : ((programInfo as any).graduationTitleEn ?? t("graduationTitle"));

  const graduationTextText = isRtl
    ? ((programInfo as any).graduationTextAr ?? t("graduationText"))
    : ((programInfo as any).graduationTextEn ?? t("graduationText"));

  const creditsTitleText = isRtl
    ? ((programInfo as any).creditsTitleAr ?? t("creditsTitle"))
    : ((programInfo as any).creditsTitleEn ?? t("creditsTitle"));

  const creditsTextText = isRtl
    ? ((programInfo as any).creditsTextAr ?? t("creditsText"))
    : ((programInfo as any).creditsTextEn ?? t("creditsText"));

  const creditsBullet1Text = isRtl
    ? ((programInfo as any).creditsBullet1Ar ?? t("creditsBullet1"))
    : ((programInfo as any).creditsBullet1En ?? t("creditsBullet1"));

  const creditsBullet2Text = isRtl
    ? ((programInfo as any).creditsBullet2Ar ?? t("creditsBullet2"))
    : ((programInfo as any).creditsBullet2En ?? t("creditsBullet2"));

  const tracksTitleText = isRtl
    ? ((programInfo as any).tracksTitleAr ?? t("tracksTitle"))
    : ((programInfo as any).tracksTitleEn ?? t("tracksTitle"));

  const trackPublicText = isRtl
    ? ((programInfo as any).trackPublicAr ?? t("trackPublic"))
    : ((programInfo as any).trackPublicEn ?? t("trackPublic"));

  const trackPrivateText = isRtl
    ? ((programInfo as any).trackPrivateAr ?? t("trackPrivate"))
    : ((programInfo as any).trackPrivateEn ?? t("trackPrivate"));

  const quickStat2Label = isRtl
    ? (pi.quickStat2LabelAr ?? t("quickTotalCredits"))
    : (pi.quickStat2LabelEn ?? t("quickTotalCredits"));
  const quickStat3Label = isRtl
    ? (pi.quickStat3LabelAr ?? t("quickCourseCredits"))
    : (pi.quickStat3LabelEn ?? t("quickCourseCredits"));
  const quickStat4Label = isRtl
    ? (pi.quickStat4LabelAr ?? t("quickThesisCredits"))
    : (pi.quickStat4LabelEn ?? t("quickThesisCredits"));
  const objectivesSubtitleText = isRtl
    ? (pi.objectivesSubtitleAr ?? t("objectivesSubtitle"))
    : (pi.objectivesSubtitleEn ?? t("objectivesSubtitle"));
  const outcomesSubtitleText = isRtl
    ? (pi.outcomesSubtitleAr ?? t("outcomesSubtitle"))
    : (pi.outcomesSubtitleEn ?? t("outcomesSubtitle"));
  const studyPlanTitleText = isRtl
    ? (pi.studyPlanTitleAr ?? t("requirementsTitle"))
    : (pi.studyPlanTitleEn ?? t("requirementsTitle"));
  const studyModeLabelText = isRtl
    ? (pi.studyModeLabelAr ?? t("studyModeLabel"))
    : (pi.studyModeLabelEn ?? t("studyModeLabel"));
  const programDimensionsLabelText = isRtl
    ? (pi.programDimensionsLabelAr ?? t("programDimensionsLabel"))
    : (pi.programDimensionsLabelEn ?? t("programDimensionsLabel"));
  const tabPublicLabel = isRtl
    ? (pi.tabPublicAr ?? t("tabPublic"))
    : (pi.tabPublicEn ?? t("tabPublic"));
  const tabPrivateLabel = isRtl
    ? (pi.tabPrivateAr ?? t("tabPrivate"))
    : (pi.tabPrivateEn ?? t("tabPrivate"));
  const section1TitleText = isRtl
    ? (pi.section1TitleAr ?? t("section1Title"))
    : (pi.section1TitleEn ?? t("section1Title"));
  const section2TitleText = isRtl
    ? (pi.section2TitleAr ?? t("section2Title"))
    : (pi.section2TitleEn ?? t("section2Title"));
  const section3TitleText = isRtl
    ? (pi.section3TitleAr ?? t("section3Title"))
    : (pi.section3TitleEn ?? t("section3Title"));
  const section4TitleText = isRtl
    ? (pi.section4TitleAr ?? t("section4Title"))
    : (pi.section4TitleEn ?? t("section4Title"));
  const section1NoteText = isRtl ? pi.section1NoteAr : pi.section1NoteEn;
  const section2NoteText = isRtl ? pi.section2NoteAr : pi.section2NoteEn;
  const section3NoteText = isRtl ? pi.section3NoteAr : pi.section3NoteEn;
  const showQuickStat4 =
    Boolean(
      (isRtl ? programInfo.thesisCreditsAr : programInfo.thesisCreditsEn)?.trim(),
    ) && Boolean(quickStat4Label?.trim());
  const showHeroAffiliation = Boolean(heroAffiliation?.trim());
  const admissionList = isRtl
    ? admissionRequirements?.ar
    : admissionRequirements?.en;
  const featuresList = isRtl ? programFeatures?.ar : programFeatures?.en;
  const creditSummaryItems = isRtl ? creditSummary?.ar : creditSummary?.en;
  const careerPathsList = isRtl ? careerPaths?.ar : careerPaths?.en;

  const openSectionEditor = (section: EditorSection) => {
    setEditorError("");
    setEditorSection(section);

    if (section === "hero") {
      setEditorProgramTitleAr(
        (programInfo as any).titleAr ??
          (graduateStudiesDeatil.programInfo as any).titleAr ??
          "",
      );
      setEditorProgramTitleEn(
        (programInfo as any).titleEn ??
          (graduateStudiesDeatil.programInfo as any).titleEn ??
          "",
      );
      setEditorAffiliationAr(
        (programInfo as any).affiliationAr ??
          (graduateStudiesDeatil.programInfo as any).affiliationAr ??
          "",
      );
      setEditorAffiliationEn(
        (programInfo as any).affiliationEn ??
          (graduateStudiesDeatil.programInfo as any).affiliationEn ??
          "",
      );

      setEditorDurationAr(
        (programInfo as any).durationAr ??
          (graduateStudiesDeatil.programInfo as any).durationAr ??
          "",
      );
      setEditorDurationEn(
        (programInfo as any).durationEn ??
          (graduateStudiesDeatil.programInfo as any).durationEn ??
          "",
      );
      setEditorTotalCreditsAr(
        (programInfo as any).totalCreditsAr ??
          (graduateStudiesDeatil.programInfo as any).totalCreditsAr ??
          "",
      );
      setEditorTotalCreditsEn(
        (programInfo as any).totalCreditsEn ??
          (graduateStudiesDeatil.programInfo as any).totalCreditsEn ??
          "",
      );
      setEditorCourseCreditsAr(
        (programInfo as any).courseCreditsAr ??
          (graduateStudiesDeatil.programInfo as any).courseCreditsAr ??
          "",
      );
      setEditorCourseCreditsEn(
        (programInfo as any).courseCreditsEn ??
          (graduateStudiesDeatil.programInfo as any).courseCreditsEn ??
          "",
      );
      setEditorThesisCreditsAr(
        (programInfo as any).thesisCreditsAr ??
          (graduateStudiesDeatil.programInfo as any).thesisCreditsAr ??
          "",
      );
      setEditorThesisCreditsEn(
        (programInfo as any).thesisCreditsEn ??
          (graduateStudiesDeatil.programInfo as any).thesisCreditsEn ??
          "",
      );
    }

    if (section === "about") {
      setEditorAboutLeadAr(aboutHeadlineAr);
      setEditorAboutLeadEn(aboutHeadlineEn);
      setEditorAboutTextAr(aboutTextAr);
      setEditorAboutTextEn(aboutTextEn);

      setEditorStudyModeAr((programInfo as any).studyModeAr ?? "");
      setEditorStudyModeEn((programInfo as any).studyModeEn ?? "");

      setEditorProgramDimensionsTextAr(
        (programInfo as any).programDimensionsTextAr ??
          (graduateStudiesDeatil.programInfo as any).programDimensionsTextAr ??
          "",
      );
      setEditorProgramDimensionsTextEn(
        (programInfo as any).programDimensionsTextEn ??
          (graduateStudiesDeatil.programInfo as any).programDimensionsTextEn ??
          "",
      );

      setEditorGraduationTitleAr(
        (programInfo as any).graduationTitleAr ??
          (graduateStudiesDeatil.programInfo as any).graduationTitleAr ??
          "",
      );
      setEditorGraduationTitleEn(
        (programInfo as any).graduationTitleEn ??
          (graduateStudiesDeatil.programInfo as any).graduationTitleEn ??
          "",
      );
      setEditorGraduationTextAr(
        (programInfo as any).graduationTextAr ??
          (graduateStudiesDeatil.programInfo as any).graduationTextAr ??
          "",
      );
      setEditorGraduationTextEn(
        (programInfo as any).graduationTextEn ??
          (graduateStudiesDeatil.programInfo as any).graduationTextEn ??
          "",
      );

      setEditorCreditsTitleAr(
        (programInfo as any).creditsTitleAr ??
          (graduateStudiesDeatil.programInfo as any).creditsTitleAr ??
          "",
      );
      setEditorCreditsTitleEn(
        (programInfo as any).creditsTitleEn ??
          (graduateStudiesDeatil.programInfo as any).creditsTitleEn ??
          "",
      );
      setEditorCreditsTextAr(
        (programInfo as any).creditsTextAr ??
          (graduateStudiesDeatil.programInfo as any).creditsTextAr ??
          "",
      );
      setEditorCreditsTextEn(
        (programInfo as any).creditsTextEn ??
          (graduateStudiesDeatil.programInfo as any).creditsTextEn ??
          "",
      );
      setEditorCreditsBullet1Ar(
        (programInfo as any).creditsBullet1Ar ??
          (graduateStudiesDeatil.programInfo as any).creditsBullet1Ar ??
          "",
      );
      setEditorCreditsBullet1En(
        (programInfo as any).creditsBullet1En ??
          (graduateStudiesDeatil.programInfo as any).creditsBullet1En ??
          "",
      );
      setEditorCreditsBullet2Ar(
        (programInfo as any).creditsBullet2Ar ??
          (graduateStudiesDeatil.programInfo as any).creditsBullet2Ar ??
          "",
      );
      setEditorCreditsBullet2En(
        (programInfo as any).creditsBullet2En ??
          (graduateStudiesDeatil.programInfo as any).creditsBullet2En ??
          "",
      );

      setEditorTracksTitleAr(
        (programInfo as any).tracksTitleAr ??
          (graduateStudiesDeatil.programInfo as any).tracksTitleAr ??
          "",
      );
      setEditorTracksTitleEn(
        (programInfo as any).tracksTitleEn ??
          (graduateStudiesDeatil.programInfo as any).tracksTitleEn ??
          "",
      );
      setEditorTrackPublicAr(
        (programInfo as any).trackPublicAr ??
          (graduateStudiesDeatil.programInfo as any).trackPublicAr ??
          "",
      );
      setEditorTrackPublicEn(
        (programInfo as any).trackPublicEn ??
          (graduateStudiesDeatil.programInfo as any).trackPublicEn ??
          "",
      );
      setEditorTrackPrivateAr(
        (programInfo as any).trackPrivateAr ??
          (graduateStudiesDeatil.programInfo as any).trackPrivateAr ??
          "",
      );
      setEditorTrackPrivateEn(
        (programInfo as any).trackPrivateEn ??
          (graduateStudiesDeatil.programInfo as any).trackPrivateEn ??
          "",
      );
    }

    if (section === "objectives") {
      setEditorObjectivesAr(objectives?.ar ?? []);
      setEditorObjectivesEn(objectives?.en ?? []);
    }

    if (section === "outcomes") {
      setEditorOutcomesAr(learningOutcomes?.ar ?? []);
      setEditorOutcomesEn(learningOutcomes?.en ?? []);
    }

    if (section === "studyPlan") {
      setEditorStudyTab(activeTab);
      setEditorStudyCourses(
        activeTab === "public" ? publicLawCourses : privateLawCourses,
      );
    }

    setEditorOpen(true);
  };

  const saveEditor = async () => {
    if (!programSlug || !editorSection) return;

    setEditorSaving(true);
    setEditorError("");

    try {
      const updated = JSON.parse(JSON.stringify(detailsState));

      if (editorSection === "hero") {
        updated.programInfo = updated.programInfo ?? {};
        updated.programInfo.titleAr = editorProgramTitleAr;
        updated.programInfo.titleEn = editorProgramTitleEn;
        updated.programInfo.affiliationAr = editorAffiliationAr;
        updated.programInfo.affiliationEn = editorAffiliationEn;
        updated.programInfo.durationAr = editorDurationAr;
        updated.programInfo.durationEn = editorDurationEn;
        updated.programInfo.totalCreditsAr = editorTotalCreditsAr;
        updated.programInfo.totalCreditsEn = editorTotalCreditsEn;
        updated.programInfo.courseCreditsAr = editorCourseCreditsAr;
        updated.programInfo.courseCreditsEn = editorCourseCreditsEn;
        updated.programInfo.thesisCreditsAr = editorThesisCreditsAr;
        updated.programInfo.thesisCreditsEn = editorThesisCreditsEn;
      }

      if (editorSection === "about") {
        updated.programInfo = updated.programInfo ?? {};

        // Hero titles
        updated.programInfo.titleAr = editorProgramTitleAr;
        updated.programInfo.titleEn = editorProgramTitleEn;

        updated.programInfo.aboutLeadAr = editorAboutLeadAr;
        updated.programInfo.aboutLeadEn = editorAboutLeadEn;
        updated.programInfo.aboutTextAr = editorAboutTextAr;
        updated.programInfo.aboutTextEn = editorAboutTextEn;

        // Quick info blocks
        updated.programInfo.durationAr = editorDurationAr;
        updated.programInfo.durationEn = editorDurationEn;
        updated.programInfo.totalCreditsAr = editorTotalCreditsAr;
        updated.programInfo.totalCreditsEn = editorTotalCreditsEn;
        updated.programInfo.courseCreditsAr = editorCourseCreditsAr;
        updated.programInfo.courseCreditsEn = editorCourseCreditsEn;
        updated.programInfo.thesisCreditsAr = editorThesisCreditsAr;
        updated.programInfo.thesisCreditsEn = editorThesisCreditsEn;

        updated.programInfo.studyModeAr = editorStudyModeAr;
        updated.programInfo.studyModeEn = editorStudyModeEn;

        updated.programInfo.programDimensionsTextAr =
          editorProgramDimensionsTextAr;
        updated.programInfo.programDimensionsTextEn =
          editorProgramDimensionsTextEn;

        updated.programInfo.graduationTitleAr = editorGraduationTitleAr;
        updated.programInfo.graduationTitleEn = editorGraduationTitleEn;
        updated.programInfo.graduationTextAr = editorGraduationTextAr;
        updated.programInfo.graduationTextEn = editorGraduationTextEn;

        updated.programInfo.creditsTitleAr = editorCreditsTitleAr;
        updated.programInfo.creditsTitleEn = editorCreditsTitleEn;
        updated.programInfo.creditsTextAr = editorCreditsTextAr;
        updated.programInfo.creditsTextEn = editorCreditsTextEn;
        updated.programInfo.creditsBullet1Ar = editorCreditsBullet1Ar;
        updated.programInfo.creditsBullet1En = editorCreditsBullet1En;
        updated.programInfo.creditsBullet2Ar = editorCreditsBullet2Ar;
        updated.programInfo.creditsBullet2En = editorCreditsBullet2En;

        updated.programInfo.tracksTitleAr = editorTracksTitleAr;
        updated.programInfo.tracksTitleEn = editorTracksTitleEn;
        updated.programInfo.trackPublicAr = editorTrackPublicAr;
        updated.programInfo.trackPublicEn = editorTrackPublicEn;
        updated.programInfo.trackPrivateAr = editorTrackPrivateAr;
        updated.programInfo.trackPrivateEn = editorTrackPrivateEn;
      }

      if (editorSection === "objectives") {
        updated.objectives = updated.objectives ?? {};
        updated.objectives.ar = editorObjectivesAr;
        updated.objectives.en = editorObjectivesEn;
      }

      if (editorSection === "outcomes") {
        updated.learningOutcomes = updated.learningOutcomes ?? {};
        updated.learningOutcomes.ar = editorOutcomesAr;
        updated.learningOutcomes.en = editorOutcomesEn;
      }

      if (editorSection === "studyPlan" && editorStudyCourses) {
        if (editorStudyTab === "public") {
          updated.publicLawCourses = editorStudyCourses;
        } else {
          updated.privateLawCourses = editorStudyCourses;
        }
      }

      const res = await fetch(`/api/graduate-programs/${programSlug}/details`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ details: updated }),
      });

      if (!res.ok) {
        const msg = await res.text().catch(() => "");
        throw new Error(msg || `HTTP ${res.status}`);
      }

      setDetailsState(updated);
      setEditorOpen(false);
      setEditorSection(null);
      router.refresh();
    } catch (e) {
      setEditorError(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setEditorSaving(false);
    }
  };

  const editorSectionTitle =
    editorSection === "hero"
      ? t("editorProgramDetails")
      : editorSection === "about"
      ? t("aboutTitle")
      : editorSection === "objectives"
        ? t("objectivesTitle")
        : editorSection === "outcomes"
          ? t("outcomesTitle")
          : t("requirementsTitle");

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[320px] sm:h-[360px] lg:h-[420px] overflow-hidden">
        {isAdmin ? (
          <button
            type="button"
            onClick={() => openSectionEditor("hero")}
            className="absolute left-4 bottom-4 z-[60] inline-flex items-center gap-2 rounded-lg bg-[#254151] px-3 py-2 text-white shadow hover:bg-[#1b2f3b]"
            aria-label={t("editorEditDetails")}
            title={t("editorEditDetails")}
          >
            <Pencil className="size-4" />
            <span className="text-sm font-semibold">{t("editorEditDetails")}</span>
          </button>
        ) : null}
                <Image
          src={resolvedHeroSrc}
                    alt={heroTitle}
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
          unoptimized={
            typeof resolvedHeroSrc === "string" &&
            (isLocallyStoredUploadSrc(resolvedHeroSrc) ||
              resolvedHeroSrc.startsWith("data:"))
          }
                />
        <div className="absolute inset-0" style={resolvedHeroOverlay} />

                <div className="relative h-full flex items-center justify-center text-white text-center px-4">
                    <div className="max-w-5xl">
                        <div className="flex justify-center mb-4 sm:mb-6">
                            <div className="bg-white/20 backdrop-blur-sm p-4 sm:p-5 rounded-full">
                                <Award className="size-12 sm:size-14 lg:size-16 text-white" />
                            </div>
                        </div>
                        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
                            {heroTitle}
                        </h1>
            <p className="text-sm sm:text-lg lg:text-xl opacity-95 mb-3 sm:mb-4">
              {heroSubtitle}
            </p>
            {showHeroAffiliation ? (
                        <div className="flex items-center justify-center gap-2 text-sm sm:text-base lg:text-lg">
                            <Globe className="size-4 sm:size-5" />
                            <span>{heroAffiliation}</span>
                        </div>
            ) : null}
                    </div>
                </div>
            </section>

            {/* Quick Info */}
            <section className="py-10 sm:py-12 bg-white border-b-2 border-gray-100">
                <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-16">
                    <div
                      className={`grid gap-4 sm:gap-6 ${
                        showQuickStat4
                          ? "grid-cols-2 md:grid-cols-4"
                          : "grid-cols-1 sm:grid-cols-3 max-w-3xl mx-auto"
                      }`}
                    >
                        <div className="text-center">
                            <div className="bg-gradient-to-br from-red-100 to-red-50 p-4 rounded-lg mb-3">
                                <Clock className="size-7 sm:size-8 text-red-600 mx-auto" />
                            </div>
              <div className="text-xs sm:text-sm text-gray-600 mb-1">
                {t("quickDuration")}
              </div>
                            <div className="font-bold text-[#254151] text-sm sm:text-base">
                                {isRtl ? programInfo.durationAr : programInfo.durationEn}
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-4 rounded-lg mb-3">
                                <FileText className="size-7 sm:size-8 text-blue-600 mx-auto" />
                            </div>
              <div className="text-xs sm:text-sm text-gray-600 mb-1">
                {quickStat2Label}
              </div>
                            <div className="font-bold text-[#254151] text-sm sm:text-base">
                {isRtl
                  ? programInfo.totalCreditsAr
                  : programInfo.totalCreditsEn}
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="bg-gradient-to-br from-green-100 to-green-50 p-4 rounded-lg mb-3">
                                <BookOpen className="size-7 sm:size-8 text-green-600 mx-auto" />
                            </div>
              <div className="text-xs sm:text-sm text-gray-600 mb-1">
                {quickStat3Label}
              </div>
                            <div className="font-bold text-[#254151] text-sm sm:text-base">
                {isRtl
                  ? programInfo.courseCreditsAr
                  : programInfo.courseCreditsEn}
                            </div>
                        </div>

                        {showQuickStat4 ? (
                        <div className="text-center">
                            <div className="bg-gradient-to-br from-purple-100 to-purple-50 p-4 rounded-lg mb-3">
                                <GraduationCap className="size-7 sm:size-8 text-purple-600 mx-auto" />
                            </div>
              <div className="text-xs sm:text-sm text-gray-600 mb-1">
                {quickStat4Label}
              </div>
                            <div className="font-bold text-[#254151] text-sm sm:text-base">
                {isRtl
                  ? programInfo.thesisCreditsAr
                  : programInfo.thesisCreditsEn}
                            </div>
                        </div>
                        ) : null}
                    </div>
                </div>
            </section>

            {/* About Program */}
            <section className="py-12 sm:py-16 bg-gray-50">
                <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-16">
          {isAdmin ? (
            <div className="flex justify-end mb-6">
              <button
                type="button"
                onClick={() => openSectionEditor("about")}
                className="inline-flex items-center gap-2 rounded-lg bg-[#254151] px-3 py-2 text-white shadow hover:bg-[#1b2f3b]"
              >
                <Pencil className="size-4" />
                {t("editorEditDetails")}
              </button>
            </div>
          ) : null}
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#254151] mb-3 sm:mb-4">
                {t("aboutTitle")}
              </h2>
                            <div className="w-16 sm:w-24 h-1 bg-[#c2a772] mx-auto" />
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-5 sm:p-8 border-2 border-gray-100">
                            <div className="bg-gradient-to-r from-red-50 to-orange-50 border-r-4 border-red-500 p-5 sm:p-6 rounded-lg mb-6">
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#254151]">
                  {isRtl ? aboutHeadlineAr : aboutHeadlineEn}
                                </h3>
                            </div>

                            <div className="text-gray-700 space-y-5">
                                <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                  {isRtl ? aboutTextAr : aboutTextEn}
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                    <div className="bg-blue-50 p-5 sm:p-6 rounded-lg border-2 border-blue-200">
                                        <h4 className="font-bold text-[#254151] mb-3 flex items-center gap-2 text-sm sm:text-base">
                                            <Users className="size-4 sm:size-5 text-blue-600" />
                                            {studyModeLabelText}
                                        </h4>
                                        <p className="text-sm sm:text-base whitespace-pre-line">
                      {isRtl ? programInfo.studyModeAr : programInfo.studyModeEn}
                                        </p>
                                    </div>

                                    <div className="bg-green-50 p-5 sm:p-6 rounded-lg border-2 border-green-200">
                                        <h4 className="font-bold text-[#254151] mb-3 flex items-center gap-2 text-sm sm:text-base">
                                            <Target className="size-4 sm:size-5 text-green-600" />
                                            {programDimensionsLabelText}
                                        </h4>
                    <p className="text-sm sm:text-base">
                      {programDimensionsText}
                    </p>
                                    </div>
                                </div>

                                {graduationTitleText?.trim() ? (
                                <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-5 sm:p-6 rounded-lg border-2 border-amber-300">
                  <h4 className="font-bold text-[#254151] mb-3 text-base sm:text-lg lg:text-xl">
                    {graduationTitleText}
                  </h4>
                  <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                    {graduationTextText}
                  </p>
                                </div>
                                ) : null}

                                {creditsTitleText?.trim() ? (
                                <div className="bg-purple-50 p-5 sm:p-6 rounded-lg border-2 border-purple-200">
                  <h4 className="font-bold text-[#254151] mb-3 text-base sm:text-lg lg:text-xl">
                    {creditsTitleText}
                  </h4>
                  <p className="text-sm sm:text-base lg:text-lg mb-4 whitespace-pre-line">
                    {creditsTextText}
                  </p>
                                    {(creditsBullet1Text?.trim() || creditsBullet2Text?.trim()) ? (
                                    <ul className="space-y-2">
                                      {creditsBullet1Text?.trim() ? (
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="size-4 sm:size-5 text-purple-600 flex-shrink-0 mt-1" />
                      <span className="text-sm sm:text-base leading-relaxed">
                        {creditsBullet1Text}
                      </span>
                                        </li>
                                      ) : null}
                                      {creditsBullet2Text?.trim() ? (
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="size-4 sm:size-5 text-purple-600 flex-shrink-0 mt-1" />
                      <span className="text-sm sm:text-base leading-relaxed">
                        {creditsBullet2Text}
                      </span>
                                        </li>
                                      ) : null}
                                    </ul>
                                    ) : null}
                                </div>
                                ) : null}

                                {tracksTitleText?.trim() ? (
                                <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-5 sm:p-6 rounded-lg border-2 border-indigo-300">
                  <h4 className="font-bold text-[#254151] mb-3 text-base sm:text-lg lg:text-xl">
                    {tracksTitleText}
                  </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-white p-4 rounded-lg border-2 border-indigo-200">
                                            <div className="flex items-center gap-3">
                                                <Award className="size-7 sm:size-8 text-indigo-600" />
                                                <div>
                                                    <h5 className="font-bold text-[#254151] text-sm sm:text-base">
                            {trackPublicText}
                                                    </h5>
                                                    <p className="text-xs sm:text-sm text-gray-600">
                            {trackPublicText}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border-2 border-indigo-200">
                                            <div className="flex items-center gap-3">
                                                <Award className="size-7 sm:size-8 text-indigo-600" />
                                                <div>
                                                    <h5 className="font-bold text-[#254151] text-sm sm:text-base">
                            {trackPrivateText}
                                                    </h5>
                                                    <p className="text-xs sm:text-sm text-gray-600">
                            {trackPrivateText}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Objectives */}
            <section className="py-12 sm:py-16 bg-white">
                <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-16">
          {isAdmin ? (
            <div className="flex justify-end mb-6">
              <button
                type="button"
                onClick={() => openSectionEditor("objectives")}
                className="inline-flex items-center gap-2 rounded-lg border border-[#6096b4] bg-white px-3 py-2 text-[#6096b4] shadow-sm hover:bg-[#6096b4] hover:text-white"
              >
                <Pencil className="size-4" />
                Edit
              </button>
            </div>
          ) : null}
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#254151] mb-3 sm:mb-4">
                {t("objectivesTitle")}
              </h2>
                            <div className="w-16 sm:w-24 h-1 bg-[#c2a772] mx-auto mb-3 sm:mb-4" />
              <p className="text-sm sm:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                {objectivesSubtitleText}
              </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {(isRtl ? objectives.ar : objectives.en).map(
                (objective, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 sm:p-6 rounded-lg border-2 border-blue-200 hover:shadow-lg transition-all"
                                >
                                    <div className="flex gap-4">
                                        <div className="bg-blue-600 text-white size-9 sm:size-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm sm:text-base">
                                            {index + 1}
                                        </div>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        {objective}
                      </p>
                                    </div>
                                </div>
                ),
              )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Learning Outcomes */}
            <section className="py-12 sm:py-16 bg-gray-50">
                <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-16">
          {isAdmin ? (
            <div className="flex justify-end mb-6">
              <button
                type="button"
                onClick={() => openSectionEditor("outcomes")}
                className="inline-flex items-center gap-2 rounded-lg border border-[#6096b4] bg-white px-3 py-2 text-[#6096b4] shadow-sm hover:bg-[#6096b4] hover:text-white"
              >
                <Pencil className="size-4" />
                Edit
              </button>
            </div>
          ) : null}
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#254151] mb-3 sm:mb-4">
                {t("outcomesTitle")}
              </h2>
                            <div className="w-16 sm:w-24 h-1 bg-[#c2a772] mx-auto mb-3 sm:mb-4" />
              <p className="text-sm sm:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                {outcomesSubtitleText}
              </p>
                        </div>

                        <div className="space-y-3 sm:space-y-4">
              {(isRtl ? learningOutcomes.ar : learningOutcomes.en).map(
                (outcome, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-5 sm:p-6 rounded-lg shadow-md border-r-4 border-green-500 hover:shadow-xl transition-all"
                                >
                                    <div className="flex gap-4">
                                        <CheckCircle className="size-5 sm:size-6 text-green-600 flex-shrink-0 mt-1" />
                      <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed">
                        {outcome}
                      </p>
                                    </div>
                                </div>
                ),
              )}
                        </div>
                    </div>
                </div>
            </section>

            {admissionList && admissionList.length > 0 ? (
            <section className="py-12 sm:py-16 bg-white">
                <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-16">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#254151] mb-3 sm:mb-4">
                {t("admissionTitle")}
              </h2>
                            <div className="w-16 sm:w-24 h-1 bg-[#c2a772] mx-auto" />
                        </div>
                        <div className="space-y-3">
                          {admissionList.map((item, index) => (
                            <div
                              key={index}
                              className="flex gap-4 bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-5"
                            >
                              <CheckCircle className="size-5 text-green-600 shrink-0 mt-0.5" />
                              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{item}</p>
                            </div>
                          ))}
                        </div>
                    </div>
                </div>
            </section>
            ) : null}

            {featuresList && featuresList.length > 0 ? (
            <section className="py-12 sm:py-16 bg-gray-50">
                <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-16">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#254151] mb-3 sm:mb-4">
                {t("programFeaturesTitle")}
              </h2>
                            <div className="w-16 sm:w-24 h-1 bg-[#c2a772] mx-auto" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {featuresList.map((feature, index) => (
                            <div
                              key={index}
                              className="bg-white rounded-xl border-2 border-[#6096b4]/20 p-5 shadow-sm hover:shadow-md transition-shadow"
                            >
                              <h3 className="font-bold text-[#254151] mb-2">{feature.title}</h3>
                              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                            </div>
                          ))}
                        </div>
                    </div>
                </div>
            </section>
            ) : null}

            {/* Study Plan */}
            <section className="py-12 sm:py-16 bg-white">
                <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-16">
          {isAdmin ? (
            <div className="flex justify-end mb-6">
              <button
                type="button"
                onClick={() => openSectionEditor("studyPlan")}
                className="inline-flex items-center gap-2 rounded-lg border border-[#6096b4] bg-white px-3 py-2 text-[#6096b4] shadow-sm hover:bg-[#6096b4] hover:text-white"
              >
                <Pencil className="size-4" />
                Edit
              </button>
            </div>
          ) : null}
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#254151] mb-3 sm:mb-4">
                {studyPlanTitleText}
              </h2>
                            <div className="w-16 sm:w-24 h-1 bg-[#c2a772] mx-auto" />
                        </div>

                        {isLawLayout ? (
                        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                            <button
                                type="button"
                onClick={() => setActiveTab("public")}
                className={`px-5 sm:px-8 py-3 sm:py-4 rounded-lg font-bold transition-all text-sm sm:text-base lg:text-lg ${
                  activeTab === "public"
                    ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                            >
                                {tabPublicLabel}
                            </button>
                            <button
                                type="button"
                onClick={() => setActiveTab("private")}
                className={`px-5 sm:px-8 py-3 sm:py-4 rounded-lg font-bold transition-all text-sm sm:text-base lg:text-lg ${
                  activeTab === "private"
                    ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                            >
                                {tabPrivateLabel}
                            </button>
                        </div>
                        ) : isEnglishLayout ? (
                        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                            <button
                                type="button"
                onClick={() => setActiveTab("public")}
                className={`px-5 sm:px-8 py-3 sm:py-4 rounded-lg font-bold transition-all text-sm sm:text-base lg:text-lg ${
                  activeTab === "public"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                            >
                                {tabPublicLabel}
                            </button>
                            <button
                                type="button"
                onClick={() => setActiveTab("private")}
                className={`px-5 sm:px-8 py-3 sm:py-4 rounded-lg font-bold transition-all text-sm sm:text-base lg:text-lg ${
                  activeTab === "private"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                            >
                                {tabPrivateLabel}
                            </button>
                        </div>
                        ) : null}

                        {section1NoteText?.trim() ? (
                          <p className="text-sm text-gray-600 mb-4 bg-blue-50 border border-blue-100 rounded-lg p-4">
                            {section1NoteText}
                          </p>
                        ) : null}

                        <CourseTable
                            index={1}
                            accent="blue"
                            title={section1TitleText}
                            isRtl={isRtl}
                            courses={currentCourses.core}
              headers={{
                seq: t("thSeq"),
                code: t("thCode"),
                title: t("thTitle"),
                credits: t("thCredits"),
              }}
                        />

                        {!isMbaLayout && currentCourses.major.length > 0 ? (
                        <CourseTable
                            index={2}
                            accent="green"
                            title={section2TitleText}
                            isRtl={isRtl}
                            courses={currentCourses.major}
              headers={{
                seq: t("thSeq"),
                code: t("thCode"),
                title: t("thTitle"),
                credits: t("thCredits"),
              }}
                        />
                        ) : null}

                        {isMbaLayout && section2NoteText?.trim() ? (
                          <p className="text-sm text-gray-600 mb-4 bg-green-50 border border-green-100 rounded-lg p-4">
                            {section2NoteText}
                          </p>
                        ) : null}

                        {currentCourses.elective.length > 0 ? (
                        <>
                        {!isMbaLayout && section3NoteText?.trim() ? (
                          <p className="text-sm text-gray-600 mb-4 bg-purple-50 border border-purple-100 rounded-lg p-4">
                            {section3NoteText}
                          </p>
                        ) : null}
                        <CourseTable
                            index={isMbaLayout ? 2 : 3}
                            accent="purple"
                            title={isMbaLayout ? section2TitleText : section3TitleText}
                            isRtl={isRtl}
                            courses={currentCourses.elective}
              headers={{
                seq: t("thSeq"),
                code: t("thCode"),
                title: t("thTitle"),
                credits: t("thCredits"),
              }}
                        />
                        </>
                        ) : null}

                        {currentCourses.thesis.length > 0 ? (
                        <CourseTable
                            index={isMbaLayout ? 3 : 4}
                            accent="red"
                            title={
                              isMbaLayout
                                ? section3TitleText
                                : section4TitleText || t("section4Title")
                            }
                            isRtl={isRtl}
                            courses={currentCourses.thesis}
              headers={{
                seq: t("thSeq"),
                code: t("thCode"),
                title: t("thTitle"),
                credits: t("thCredits"),
              }}
                        />
                        ) : null}

                        {creditSummaryItems && creditSummaryItems.length > 0 ? (
                          <div className="mt-10 bg-gradient-to-r from-[#254151] to-[#6096b4] rounded-xl p-6 sm:p-8 text-white">
                            <h3 className="text-lg sm:text-xl font-bold mb-6 text-center">
                              {t("creditSummaryTitle")}
                            </h3>
                            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 text-center">
                              {creditSummaryItems.map((item, i) => (
                                <div key={i} className="flex items-center gap-2 sm:gap-3">
                                  <div className="bg-white/15 rounded-lg px-4 py-3 min-w-[100px]">
                                    <div className="text-2xl font-bold">{item.hours}</div>
                                    <div className="text-xs sm:text-sm opacity-90">{item.label}</div>
                                  </div>
                                  {i < creditSummaryItems.length - 1 ? (
                                    <span className="text-xl font-bold opacity-80">+</span>
                                  ) : null}
                                </div>
                              ))}
                              <span className="text-xl font-bold opacity-80">=</span>
                              <div className="bg-white/25 rounded-lg px-5 py-3 min-w-[120px]">
                                <div className="text-sm opacity-90">{t("creditSummaryTotal")}</div>
                                <div className="text-lg font-bold">
                                  {isRtl ? creditSummary?.totalAr : creditSummary?.totalEn}
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}
                    </div>
                </div>
            </section>

            {careerPathsList && careerPathsList.length > 0 ? (
            <section className="py-12 sm:py-16 bg-gray-50">
                <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-16">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#254151] mb-3 sm:mb-4">
                {t("careerPathsTitle")}
              </h2>
                            <div className="w-16 sm:w-24 h-1 bg-[#c2a772] mx-auto mb-4" />
              <p className="text-gray-600">{t("careerPathsSubtitle")}</p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                          {careerPathsList.map((path, index) => (
                            <div
                              key={index}
                              className="bg-white border border-[#c2a772]/30 rounded-lg px-4 py-3 text-center text-sm font-medium text-[#254151] shadow-sm"
                            >
                              {path}
                            </div>
                          ))}
                        </div>
                    </div>
                </div>
            </section>
            ) : null}

      {isAdmin && editorOpen && editorSection ? (
        <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 overflow-y-auto">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setEditorOpen(false)}
            aria-hidden
          />
          <div className="relative w-full max-w-4xl rounded-xl bg-white shadow-xl border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between gap-3 border-b bg-gray-50 px-4 py-3">
              <div className="flex items-center gap-2">
                <Pencil className="size-5 text-[#254151]" />
                <div>
                  <div className="font-semibold text-[#254151]">
                    {t("editorEdit")} {editorSectionTitle}
        </div>
                  <div className="text-xs text-muted-foreground">
                    {t("editorUpdateSubtitle")}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditorOpen(false);
                  setEditorSection(null);
                }}
                className="rounded-lg border px-3 py-2 hover:bg-muted"
              >
                {t("editorClose")}
              </button>
            </div>

            <div className="p-4 space-y-3 max-h-[calc(85vh-64px)] overflow-y-auto pr-2">
              {editorSection === "hero" ? (
                <div className="space-y-4">
                  <div className="rounded-lg border-2 border-red-200 bg-gradient-to-r from-red-700 to-red-600 p-4 sm:p-5 text-white">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white/90" htmlFor="programTitleAr">
                          {t("editorProgramTitleAr")}
                        </label>
                        <Input id="programTitleAr" value={editorProgramTitleAr} onChange={(e) => setEditorProgramTitleAr(e.target.value)} className="bg-white text-[#254151]" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white/90" htmlFor="programTitleEn">
                          {t("editorProgramTitleEn")}
                        </label>
                        <Input id="programTitleEn" value={editorProgramTitleEn} onChange={(e) => setEditorProgramTitleEn(e.target.value)} className="bg-white text-[#254151]" />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 mt-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white/90" htmlFor="affiliationAr">
                          {t("academicAffiliation")} (AR)
                        </label>
                        <Input id="affiliationAr" value={editorAffiliationAr} onChange={(e) => setEditorAffiliationAr(e.target.value)} className="bg-white text-[#254151]" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white/90" htmlFor="affiliationEn">
                          {t("academicAffiliation")} (EN)
                        </label>
                        <Input id="affiliationEn" value={editorAffiliationEn} onChange={(e) => setEditorAffiliationEn(e.target.value)} className="bg-white text-[#254151]" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200 space-y-2">
                      <label className="text-sm font-medium" htmlFor="durationAr">{t("editorDurationAr")}</label>
                      <Input id="durationAr" value={editorDurationAr} onChange={(e) => setEditorDurationAr(e.target.value)} />
                      <label className="text-sm font-medium" htmlFor="durationEn">{t("editorDurationEn")}</label>
                      <Input id="durationEn" value={editorDurationEn} onChange={(e) => setEditorDurationEn(e.target.value)} />
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200 space-y-2">
                      <label className="text-sm font-medium" htmlFor="totalCreditsAr">{t("editorTotalCreditsAr")}</label>
                      <Input id="totalCreditsAr" value={editorTotalCreditsAr} onChange={(e) => setEditorTotalCreditsAr(e.target.value)} />
                      <label className="text-sm font-medium" htmlFor="totalCreditsEn">{t("editorTotalCreditsEn")}</label>
                      <Input id="totalCreditsEn" value={editorTotalCreditsEn} onChange={(e) => setEditorTotalCreditsEn(e.target.value)} />
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200 space-y-2">
                      <label className="text-sm font-medium" htmlFor="courseCreditsAr">{t("editorCourseCreditsAr")}</label>
                      <Input id="courseCreditsAr" value={editorCourseCreditsAr} onChange={(e) => setEditorCourseCreditsAr(e.target.value)} />
                      <label className="text-sm font-medium" htmlFor="courseCreditsEn">{t("editorCourseCreditsEn")}</label>
                      <Input id="courseCreditsEn" value={editorCourseCreditsEn} onChange={(e) => setEditorCourseCreditsEn(e.target.value)} />
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200 space-y-2">
                      <label className="text-sm font-medium" htmlFor="thesisCreditsAr">{t("editorThesisCreditsAr")}</label>
                      <Input id="thesisCreditsAr" value={editorThesisCreditsAr} onChange={(e) => setEditorThesisCreditsAr(e.target.value)} />
                      <label className="text-sm font-medium" htmlFor="thesisCreditsEn">{t("editorThesisCreditsEn")}</label>
                      <Input id="thesisCreditsEn" value={editorThesisCreditsEn} onChange={(e) => setEditorThesisCreditsEn(e.target.value)} />
                    </div>
                  </div>
                </div>
              ) : null}

              {editorSection === "about" ? (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 border-r-4 border-red-500 p-4 sm:p-5 rounded-lg">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium"
                          htmlFor="aboutLeadAr"
                        >
                          {t("editorAboutLeadAr")}
                        </label>
                        <Textarea
                          id="aboutLeadAr"
                          rows={3}
                          value={editorAboutLeadAr}
                          onChange={(e) => setEditorAboutLeadAr(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium"
                          htmlFor="aboutLeadEn"
                        >
                          {t("editorAboutLeadEn")}
                        </label>
                        <Textarea
                          id="aboutLeadEn"
                          rows={3}
                          value={editorAboutLeadEn}
                          onChange={(e) => setEditorAboutLeadEn(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 mt-4">
                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium"
                          htmlFor="aboutTextAr"
                        >
                          {t("editorAboutTextAr")}
                        </label>
                        <Textarea
                          id="aboutTextAr"
                          rows={6}
                          value={editorAboutTextAr}
                          onChange={(e) => setEditorAboutTextAr(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium"
                          htmlFor="aboutTextEn"
                        >
                          {t("editorAboutTextEn")}
                        </label>
                        <Textarea
                          id="aboutTextEn"
                          rows={6}
                          value={editorAboutTextEn}
                          onChange={(e) => setEditorAboutTextEn(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 sm:p-5 rounded-lg border-2 border-blue-200">
                      <h4 className="font-bold text-[#254151] mb-3 flex items-center gap-2 text-sm sm:text-base">
                        <Users className="size-4 sm:size-5 text-blue-600" />
                        {t("studyModeLabel")} (AR / EN)
                      </h4>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label
                            className="text-sm font-medium"
                            htmlFor="studyModeAr"
                          >
                            {t("studyModeLabel")} (AR)
                          </label>
                          <Input
                            id="studyModeAr"
                            value={editorStudyModeAr}
                            onChange={(e) =>
                              setEditorStudyModeAr(e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            className="text-sm font-medium"
                            htmlFor="studyModeEn"
                          >
                            {t("studyModeLabel")} (EN)
                          </label>
                          <Input
                            id="studyModeEn"
                            value={editorStudyModeEn}
                            onChange={(e) =>
                              setEditorStudyModeEn(e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 p-4 sm:p-5 rounded-lg border-2 border-green-200">
                      <h4 className="font-bold text-[#254151] mb-3 flex items-center gap-2 text-sm sm:text-base">
                        <Target className="size-4 sm:size-5 text-green-600" />
                        {t("programDimensionsLabel")}
                      </h4>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label
                            className="text-sm font-medium"
                            htmlFor="programDimensionsTextAr"
                          >
                            {t("programDimensionsLabel")} (AR)
                          </label>
                          <Textarea
                            id="programDimensionsTextAr"
                            rows={3}
                            value={editorProgramDimensionsTextAr}
                            onChange={(e) =>
                              setEditorProgramDimensionsTextAr(e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            className="text-sm font-medium"
                            htmlFor="programDimensionsTextEn"
                          >
                            {t("programDimensionsLabel")} (EN)
                          </label>
                          <Textarea
                            id="programDimensionsTextEn"
                            rows={3}
                            value={editorProgramDimensionsTextEn}
                            onChange={(e) =>
                              setEditorProgramDimensionsTextEn(e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-4 sm:p-5 rounded-lg border-2 border-amber-300">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium"
                          htmlFor="graduationTitleAr"
                        >
                          {t("graduationTitle")} (AR)
                        </label>
                        <Input
                          id="graduationTitleAr"
                          value={editorGraduationTitleAr}
                          onChange={(e) =>
                            setEditorGraduationTitleAr(e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium"
                          htmlFor="graduationTitleEn"
                        >
                          {t("graduationTitle")} (EN)
                        </label>
                        <Input
                          id="graduationTitleEn"
                          value={editorGraduationTitleEn}
                          onChange={(e) =>
                            setEditorGraduationTitleEn(e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 mt-4">
                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium"
                          htmlFor="graduationTextAr"
                        >
                          {t("graduationTitle")} (AR)
                        </label>
                        <Textarea
                          id="graduationTextAr"
                          rows={5}
                          value={editorGraduationTextAr}
                          onChange={(e) =>
                            setEditorGraduationTextAr(e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium"
                          htmlFor="graduationTextEn"
                        >
                          {t("graduationTitle")} (EN)
                        </label>
                        <Textarea
                          id="graduationTextEn"
                          rows={5}
                          value={editorGraduationTextEn}
                          onChange={(e) =>
                            setEditorGraduationTextEn(e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 sm:p-5 rounded-lg border-2 border-purple-200">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium"
                          htmlFor="creditsTitleAr"
                        >
                          {t("creditsTitle")} (AR)
                        </label>
                        <Input
                          id="creditsTitleAr"
                          value={editorCreditsTitleAr}
                          onChange={(e) =>
                            setEditorCreditsTitleAr(e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium"
                          htmlFor="creditsTitleEn"
                        >
                          {t("creditsTitle")} (EN)
                        </label>
                        <Input
                          id="creditsTitleEn"
                          value={editorCreditsTitleEn}
                          onChange={(e) =>
                            setEditorCreditsTitleEn(e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 mt-4">
                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium"
                          htmlFor="creditsTextAr"
                        >
                          {t("creditsTitle")} (AR)
                        </label>
                        <Textarea
                          id="creditsTextAr"
                          rows={4}
                          value={editorCreditsTextAr}
                          onChange={(e) =>
                            setEditorCreditsTextAr(e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium"
                          htmlFor="creditsTextEn"
                        >
                          {t("creditsTitle")} (EN)
                        </label>
                        <Textarea
                          id="creditsTextEn"
                          rows={4}
                          value={editorCreditsTextEn}
                          onChange={(e) =>
                            setEditorCreditsTextEn(e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 mt-4">
                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium"
                          htmlFor="creditsBullet1Ar"
                        >
                          {t("editorCreditsBullet1Label")} (AR)
                        </label>
                        <Textarea
                          id="creditsBullet1Ar"
                          rows={3}
                          value={editorCreditsBullet1Ar}
                          onChange={(e) =>
                            setEditorCreditsBullet1Ar(e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium"
                          htmlFor="creditsBullet1En"
                        >
                          {t("editorCreditsBullet1Label")} (EN)
                        </label>
                        <Textarea
                          id="creditsBullet1En"
                          rows={3}
                          value={editorCreditsBullet1En}
                          onChange={(e) =>
                            setEditorCreditsBullet1En(e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 mt-4">
                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium"
                          htmlFor="creditsBullet2Ar"
                        >
                          {t("editorCreditsBullet2Label")} (AR)
                        </label>
                        <Textarea
                          id="creditsBullet2Ar"
                          rows={3}
                          value={editorCreditsBullet2Ar}
                          onChange={(e) =>
                            setEditorCreditsBullet2Ar(e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium"
                          htmlFor="creditsBullet2En"
                        >
                          {t("editorCreditsBullet2Label")} (EN)
                        </label>
                        <Textarea
                          id="creditsBullet2En"
                          rows={3}
                          value={editorCreditsBullet2En}
                          onChange={(e) =>
                            setEditorCreditsBullet2En(e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-4 sm:p-5 rounded-lg border-2 border-indigo-300">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium"
                          htmlFor="tracksTitleAr"
                        >
                          {t("tracksTitle")} (AR)
                        </label>
                        <Input
                          id="tracksTitleAr"
                          value={editorTracksTitleAr}
                          onChange={(e) =>
                            setEditorTracksTitleAr(e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium"
                          htmlFor="tracksTitleEn"
                        >
                          {t("tracksTitle")} (EN)
                        </label>
                        <Input
                          id="tracksTitleEn"
                          value={editorTracksTitleEn}
                          onChange={(e) =>
                            setEditorTracksTitleEn(e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 mt-4">
                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium"
                          htmlFor="trackPublicAr"
                        >
                          {t("trackPublic")} (AR)
                        </label>
                        <Input
                          id="trackPublicAr"
                          value={editorTrackPublicAr}
                          onChange={(e) =>
                            setEditorTrackPublicAr(e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium"
                          htmlFor="trackPublicEn"
                        >
                          {t("trackPublic")} (EN)
                        </label>
                        <Input
                          id="trackPublicEn"
                          value={editorTrackPublicEn}
                          onChange={(e) =>
                            setEditorTrackPublicEn(e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium"
                          htmlFor="trackPrivateAr"
                        >
                          {t("trackPrivate")} (AR)
                        </label>
                        <Input
                          id="trackPrivateAr"
                          value={editorTrackPrivateAr}
                          onChange={(e) =>
                            setEditorTrackPrivateAr(e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium"
                          htmlFor="trackPrivateEn"
                        >
                          {t("trackPrivate")} (EN)
                        </label>
                        <Input
                          id="trackPrivateEn"
                          value={editorTrackPrivateEn}
                          onChange={(e) =>
                            setEditorTrackPrivateEn(e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              {editorSection === "objectives" ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-[#254151]">
                        {t("editorObjectivesAr")}
                      </div>
                    </div>
                    <div className="space-y-2">
                      {Array.from({ length: Math.max(1, objectivesPairLen) })
                        .slice(0, objectivesPairLen)
                        .map((_, idx) => (
                          <div
                            key={idx}
                            className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg border-2 border-blue-200"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="bg-blue-600 text-white size-7 rounded-full flex items-center justify-center font-bold text-xs">
                                {idx + 1}
                              </div>
                              <button
                                type="button"
                                className="rounded-md border bg-white/70 px-2 py-1 text-xs hover:bg-white"
                                onClick={() => {
                                  setEditorObjectivesAr(
                                    editorObjectivesAr.filter(
                                      (_, i) => i !== idx,
                                    ),
                                  );
                                  setEditorObjectivesEn(
                                    editorObjectivesEn.filter(
                                      (_, i) => i !== idx,
                                    ),
                                  );
                                }}
                              >
                                {t("editorRemove")}
                              </button>
                            </div>
                            <Textarea
                              className="mt-3"
                              rows={3}
                              value={editorObjectivesAr[idx] ?? ""}
                              onChange={(e) => {
                                const next = editorObjectivesAr.slice();
                                next[idx] = e.target.value;
                                setEditorObjectivesAr(next);
                              }}
                            />
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="font-semibold text-[#254151]">
                      {t("editorObjectivesEn")}
                    </div>
                    <div className="space-y-2">
                      {Array.from({ length: Math.max(1, objectivesPairLen) })
                        .slice(0, objectivesPairLen)
                        .map((_, idx) => (
                          <div
                            key={idx}
                            className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg border-2 border-blue-200"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="bg-blue-600 text-white size-7 rounded-full flex items-center justify-center font-bold text-xs">
                                {idx + 1}
                              </div>
                              <div className="h-7 w-12" />
                            </div>
                            <Textarea
                              className="mt-3"
                              rows={3}
                              value={editorObjectivesEn[idx] ?? ""}
                              onChange={(e) => {
                                const next = editorObjectivesEn.slice();
                                next[idx] = e.target.value;
                                setEditorObjectivesEn(next);
                              }}
                            />
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="md:col-span-2 flex justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditorObjectivesAr([...editorObjectivesAr, ""]);
                        setEditorObjectivesEn([...editorObjectivesEn, ""]);
                      }}
                    >
                      <Plus className="size-4" /> {t("editorAdd")}
                    </Button>
                  </div>
                </div>
              ) : null}

              {editorSection === "outcomes" ? (
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-[#254151]">
                          {t("editorOutcomesAr")}
                        </div>
                      </div>
                      <div className="space-y-2">
                        {Array.from({ length: Math.max(1, outcomesPairLen) })
                          .slice(0, outcomesPairLen)
                          .map((_, idx) => (
                            <div
                              key={idx}
                              className="bg-white p-3 rounded-lg shadow-md border-r-4 border-green-500"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="bg-green-600 text-white size-7 rounded-full flex items-center justify-center font-bold text-xs">
                                  {idx + 1}
                                </div>
                                <button
                                  type="button"
                                  className="rounded-md border bg-white/70 px-2 py-1 text-xs hover:bg-white"
                                  onClick={() => {
                                    setEditorOutcomesAr(
                                      editorOutcomesAr.filter(
                                        (_, i) => i !== idx,
                                      ),
                                    );
                                    setEditorOutcomesEn(
                                      editorOutcomesEn.filter(
                                        (_, i) => i !== idx,
                                      ),
                                    );
                                  }}
                                >
                                  {t("editorRemove")}
                                </button>
                              </div>
                              <Textarea
                                className="mt-3"
                                rows={3}
                                value={editorOutcomesAr[idx] ?? ""}
                                onChange={(e) => {
                                  const next = editorOutcomesAr.slice();
                                  next[idx] = e.target.value;
                                  setEditorOutcomesAr(next);
                                }}
                              />
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="font-semibold text-[#254151]">
                        {t("editorOutcomesEn")}
                      </div>
                      <div className="space-y-2">
                        {Array.from({ length: Math.max(1, outcomesPairLen) })
                          .slice(0, outcomesPairLen)
                          .map((_, idx) => (
                            <div
                              key={idx}
                              className="bg-white p-3 rounded-lg shadow-md border-r-4 border-green-500"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="bg-green-600 text-white size-7 rounded-full flex items-center justify-center font-bold text-xs">
                                  {idx + 1}
                                </div>
                                <div className="h-7 w-12" />
                              </div>
                              <Textarea
                                className="mt-3"
                                rows={3}
                                value={editorOutcomesEn[idx] ?? ""}
                                onChange={(e) => {
                                  const next = editorOutcomesEn.slice();
                                  next[idx] = e.target.value;
                                  setEditorOutcomesEn(next);
                                }}
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 flex justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditorOutcomesAr([...editorOutcomesAr, ""]);
                        setEditorOutcomesEn([...editorOutcomesEn, ""]);
                      }}
                    >
                      <Plus className="size-4" /> {t("editorAdd")}
                    </Button>
                  </div>
                </>
              ) : null}

              {editorSection === "studyPlan" ? (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-2 sm:mb-4">
                    <button
                      type="button"
                      onClick={() => {
                        setEditorStudyTab("public");
                        setEditorStudyCourses(detailsState.publicLawCourses);
                      }}
                      className={`px-5 sm:px-8 py-3 sm:py-4 rounded-lg font-bold transition-all text-sm sm:text-base lg:text-lg ${
                        editorStudyTab === "public"
                          ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {t("tabPublic")}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditorStudyTab("private");
                        setEditorStudyCourses(detailsState.privateLawCourses);
                      }}
                      className={`px-5 sm:px-8 py-3 sm:py-4 rounded-lg font-bold transition-all text-sm sm:text-base lg:text-lg ${
                        editorStudyTab === "private"
                          ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {t("tabPrivate")}
                    </button>
                  </div>

                  {editorStudyCourses ? (
                    <>
                      <CourseTableEditor
                        accent="blue"
                        title={t("section1Title")}
                        isRtl={isRtl}
                        courses={editorStudyCourses.core}
                        labels={{
                          thIndex: t("thSeq"),
                          thCode: t("thCode"),
                          thTitle: t("thTitle"),
                          thCredits: t("thCredits"),
                          addCourse: t("editorAddCourse"),
                          removeCourse: t("editorRemoveCourse"),
                        }}
                        onChange={(next) =>
                          setEditorStudyCourses({
                            ...editorStudyCourses,
                            core: next,
                          })
                        }
                      />
                      <CourseTableEditor
                        accent="green"
                        title={t("section2Title")}
                        isRtl={isRtl}
                        courses={editorStudyCourses.major}
                        labels={{
                          thIndex: t("thSeq"),
                          thCode: t("thCode"),
                          thTitle: t("thTitle"),
                          thCredits: t("thCredits"),
                          addCourse: t("editorAddCourse"),
                          removeCourse: t("editorRemoveCourse"),
                        }}
                        onChange={(next) =>
                          setEditorStudyCourses({
                            ...editorStudyCourses,
                            major: next,
                          })
                        }
                      />
                      <CourseTableEditor
                        accent="purple"
                        title={t("section3Title")}
                        isRtl={isRtl}
                        courses={editorStudyCourses.elective}
                        labels={{
                          thIndex: t("thSeq"),
                          thCode: t("thCode"),
                          thTitle: t("thTitle"),
                          thCredits: t("thCredits"),
                          addCourse: t("editorAddCourse"),
                          removeCourse: t("editorRemoveCourse"),
                        }}
                        onChange={(next) =>
                          setEditorStudyCourses({
                            ...editorStudyCourses,
                            elective: next,
                          })
                        }
                      />
                      <CourseTableEditor
                        accent="red"
                        title={t("section4Title")}
                        isRtl={isRtl}
                        courses={editorStudyCourses.thesis}
                        labels={{
                          thIndex: t("thSeq"),
                          thCode: t("thCode"),
                          thTitle: t("thTitle"),
                          thCredits: t("thCredits"),
                          addCourse: t("editorAddCourse"),
                          removeCourse: t("editorRemoveCourse"),
                        }}
                        onChange={(next) =>
                          setEditorStudyCourses({
                            ...editorStudyCourses,
                            thesis: next,
                          })
                        }
                      />
                    </>
                  ) : null}
                </div>
              ) : null}

              {editorError ? (
                <div className="text-sm text-red-600">{editorError}</div>
              ) : null}

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditorOpen(false);
                    setEditorSection(null);
                  }}
                  disabled={editorSaving}
                >
                  {t("editorCancel")}
                </Button>
                <Button
                  type="button"
                  onClick={saveEditor}
                  disabled={editorSaving}
                >
                  {editorSaving ? t("editorSaving") : t("editorSave")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
