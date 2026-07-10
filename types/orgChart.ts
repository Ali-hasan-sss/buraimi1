export type OrgChartNodeShape = "rectangle" | "rounded" | "circle";
export type OrgChartConnectionStyle = "solid" | "dashed" | "dotted";

export interface OrgChartNode {
  id: string;
  labelAr: string;
  labelEn: string;
  x: number;
  y: number;
  width: number;
  height: number;
  backgroundColor: string;
  textColor: string;
  shape: OrgChartNodeShape;
  level: number;
}

export interface OrgChartConnection {
  id: string;
  from: string;
  to: string;
  color: string;
  style: OrgChartConnectionStyle;
}

export interface OrganizationalStructureData {
  sectionTitleAr: string;
  sectionTitleEn: string;
  sectionSubtitleAr: string;
  sectionSubtitleEn: string;
  chartTitleAr: string;
  chartTitleEn: string;
  // Legacy fields
  chartImageAr?: string;
  chartImageEn?: string;
  // New node-based fields
  chartNodes: OrgChartNode[];
  chartConnections: OrgChartConnection[];
  aboutTitleAr: string;
  aboutTitleEn: string;
  aboutTextAr: string;
  aboutTextEn: string;
}

export const DEFAULT_ORG_CHART_NODES: OrgChartNode[] = [
  {
    id: "board-of-trustees",
    labelAr: "مجلس الأمناء",
    labelEn: "Board of Trustees",
    x: 200,
    y: 20,
    width: 140,
    height: 50,
    backgroundColor: "#6096b4",
    textColor: "#ffffff",
    shape: "rounded",
    level: 0,
  },
  {
    id: "board-of-directors",
    labelAr: "مجلس الإدارة",
    labelEn: "Board of Directors",
    x: 400,
    y: 20,
    width: 140,
    height: 50,
    backgroundColor: "#6096b4",
    textColor: "#ffffff",
    shape: "rounded",
    level: 0,
  },
  {
    id: "dean",
    labelAr: "العميد",
    labelEn: "Dean",
    x: 300,
    y: 100,
    width: 140,
    height: 50,
    backgroundColor: "#254151",
    textColor: "#ffffff",
    shape: "rounded",
    level: 1,
  },
  {
    id: "college-council",
    labelAr: "مجلس الكلية",
    labelEn: "College Council",
    x: 500,
    y: 100,
    width: 140,
    height: 50,
    backgroundColor: "#c2a772",
    textColor: "#ffffff",
    shape: "rounded",
    level: 1,
  },
];

export const DEFAULT_ORG_CHART_CONNECTIONS: OrgChartConnection[] = [
  { id: "c1", from: "board-of-trustees", to: "dean", color: "#254151", style: "solid" },
  { id: "c2", from: "board-of-directors", to: "dean", color: "#254151", style: "solid" },
  { id: "c3", from: "dean", to: "college-council", color: "#254151", style: "solid" },
];
