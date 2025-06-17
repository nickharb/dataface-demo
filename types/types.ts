export type Label = {
  id: string;
  label: string;
  label_detailed: string;
  slug: string;
};

export type Cost = {
  geo_level: string;
  id: string;
  insurance_type: string;
  source: string;
  year: number;
  percent25: number;
  percent50: number;
  percent75: number;
};
