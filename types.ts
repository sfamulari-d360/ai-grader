export interface SentimentDistribution {
  positive_percentage: number;
  neutral_percentage: number;
  negative_percentage: number;
}

export interface NarrativeItem {
  theme: string;
  supporting_evidence: string;
}

export interface StrategicImplication {
  title: string;
  insight_and_implication: string;
  strategic_imperative: string;
}

export interface KPI {
  value: number;
  context: string;
}

export interface BrandMention {
  brand_name: string;
  mention_percentage: number;
}

export interface NewReportRoot {
  metadata: {
    report_id: string;
    brand_analyzed: string;
    generation_timestamp: string;
    country_iso2: string;
    sector: string;
    offerings: string;
    tipo_LLM: string;
  };
  report_strategico: {
    executive_summary: {
      diagnosi_strategica: string;
      vettore_principale: string;
    };
    key_positioning_indicators: {
      global_index: KPI;
      perception_index: KPI;
      share_of_voice: KPI;
    };
    competitive_analysis: {
      quantitative_overview: BrandMention[];
      positioning_map: {
        quadrant: string;
        explanation: string;
      };
    };
    perception_analysis: {
      sentiment_distribution: SentimentDistribution;
      narrative_assets: NarrativeItem[];
      narrative_frictions: NarrativeItem[];
    };
    strategic_implications: StrategicImplication[];
  };
}

// Re-export as ReportData for compatibility
export type ReportData = NewReportRoot;