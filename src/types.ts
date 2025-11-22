export interface MarketingRecord {
  id: number;
  channel: string;
  region: string;
  spend: number;
  impressions: number;
  conversions: number;
  clicks: number;
}

export type SortField = keyof MarketingRecord | "ctr";

export type SortDirection = "asc" | "desc";

export interface FiltersState {
  channel: string;
  region: string;
  search: string;

  // Column-level filters
  minSpend: string; // keep as string for inputs, parse when filtering
  maxSpend: string;
  minCtr: string;
  maxCtr: string;
}

export interface PaginationState {
  page: number; // 1-based
  pageSize: number;
}

export interface SortState {
  field: SortField;
  direction: SortDirection;
}