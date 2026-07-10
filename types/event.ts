export type EventTypeKey = "events" | "conferences" | "student";

export interface EventItemFromAPI {
  _id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  summaryAr: string;
  summaryEn: string;
  contentAr: string;
  contentEn: string;
  date: string;
  locationAr: string;
  locationEn: string;
  image: string;
  type: EventTypeKey;
}
