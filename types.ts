export enum ThreatLevel {
  High = "High",
  Medium = "Medium",
  Low = "Low",
}

export interface ScamInsight {
  title: string;
  summary: string;
  howToAvoid: string;
  threatLevel: ThreatLevel;
}

export interface Source {
  uri: string;
  title: string;
}

export interface NewsletterReport {
  insights: ScamInsight[];
  sources: Source[];
}