import { createSlice, createSelector } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  MarketingRecord,
  FiltersState,
  PaginationState,
  SortState,
  SortField,
  SortDirection,
} from "../types";
import type { RootState } from "../store";
import rawData from "../data/rawData.json";

const initialData = rawData as MarketingRecord[];

const initialFilters: FiltersState = {
  channel: "",
  region: "",
  search: "",
  minSpend: "",
  maxSpend: "",
  minCtr: "",
  maxCtr: "",
};

const initialPagination: PaginationState = {
  page: 1,
  pageSize: 25,
};

const initialSort: SortState = {
  field: "spend",
  direction: "desc",
};

interface MarketingState {
  data: MarketingRecord[];
  filters: FiltersState;
  pagination: PaginationState;
  sort: SortState;
}

const initialState: MarketingState = {
  data: initialData,
  filters: initialFilters,
  pagination: initialPagination,
  sort: initialSort,
};

const marketingSlice = createSlice({
  name: "marketing",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<FiltersState>>) {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1; // reset to first page
    },
    setSort(
      state,
      action: PayloadAction<{ field: SortField; direction?: SortDirection }>
    ) {
      const { field, direction } = action.payload;
      if (state.sort.field === field && !direction) {
        state.sort.direction = state.sort.direction === "asc" ? "desc" : "asc";
      } else {
        state.sort.field = field;
        state.sort.direction = direction ?? "asc";
      }
      state.pagination.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.pagination.page = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pagination.pageSize = action.payload;
      state.pagination.page = 1;
    },
  },
});

export const { setFilters, setSort, setPage, setPageSize } =
  marketingSlice.actions;

// ---- Selectors ----

const selectSelf = (state: RootState) => state.marketing;

export const selectRawData = createSelector([selectSelf], (s) => s.data);
export const selectFilters = createSelector([selectSelf], (s) => s.filters);
export const selectSort = createSelector([selectSelf], (s) => s.sort);
export const selectPagination = createSelector([selectSelf], (s) => s.pagination);

const computeCTR = (record: MarketingRecord) =>
  record.impressions > 0 ? (record.clicks / record.impressions) * 100 : 0;

const parseNumberOrNull = (val: string): number | null => {
  if (!val.trim()) return null;
  const n = Number(val);
  return Number.isFinite(n) ? n : null;
};

export const selectFilteredSortedData = createSelector(
  [selectRawData, selectFilters, selectSort],
  (data, filters, sort) => {
    const searchLower = filters.search.trim().toLowerCase();

    const minSpend = parseNumberOrNull(filters.minSpend);
    const maxSpend = parseNumberOrNull(filters.maxSpend);
    const minCtr = parseNumberOrNull(filters.minCtr);
    const maxCtr = parseNumberOrNull(filters.maxCtr);

    let result = data.filter((item) => {
      if (filters.channel && item.channel !== filters.channel) return false;
      if (filters.region && item.region !== filters.region) return false;

      if (searchLower) {
        const haystack = `${item.channel} ${item.region}`.toLowerCase();
        if (!haystack.includes(searchLower)) return false;
      }

      // Column filters: spend
      if (minSpend !== null && item.spend < minSpend) return false;
      if (maxSpend !== null && item.spend > maxSpend) return false;

      // Column filters: CTR (%)
      const ctr = computeCTR(item);
      if (minCtr !== null && ctr < minCtr) return false;
      if (maxCtr !== null && ctr > maxCtr) return false;

      return true;
    });

    result = result.slice().sort((a, b) => {
      let aVal: number | string = (a as any)[sort.field];
      let bVal: number | string = (b as any)[sort.field];

      if (sort.field === "ctr") {
        aVal = computeCTR(a);
        bVal = computeCTR(b);
      }

      if (typeof aVal === "string" && typeof bVal === "string") {
        const cmp = aVal.localeCompare(bVal);
        return sort.direction === "asc" ? cmp : -cmp;
      } else {
        const numA = Number(aVal);
        const numB = Number(bVal);
        const cmp = numA - numB;
        return sort.direction === "asc" ? cmp : -cmp;
      }
    });

    return result;
  }
);

export const selectPagedData = createSelector(
  [selectFilteredSortedData, selectPagination],
  (rows, pagination) => {
    const start = (pagination.page - 1) * pagination.pageSize;
    return rows.slice(start, start + pagination.pageSize);
  }
);

export const selectTotalCount = createSelector(
  [selectFilteredSortedData],
  (rows) => rows.length
);

export const selectTotals = createSelector([selectFilteredSortedData], (rows) => {
  const totals = rows.reduce(
    (acc, r) => {
      acc.spend += r.spend;
      acc.conversions += r.conversions;
      acc.impressions += r.impressions;
      acc.clicks += r.clicks;
      return acc;
    },
    {
      spend: 0,
      conversions: 0,
      impressions: 0,
      clicks: 0,
    }
  );

  const ctr =
    totals.impressions > 0
      ? (totals.clicks / totals.impressions) * 100
      : 0;

  return { ...totals, ctr };
});

// Chart data: total spend + conversions by channel
export const selectChartDataByChannel = createSelector(
  [selectFilteredSortedData],
  (rows) => {
    const map = new Map<
      string,
      { channel: string; spend: number; conversions: number }
    >();

    rows.forEach((r) => {
      if (!map.has(r.channel)) {
        map.set(r.channel, {
          channel: r.channel,
          spend: 0,
          conversions: 0,
        });
      }
      const agg = map.get(r.channel)!;
      agg.spend += r.spend;
      agg.conversions += r.conversions;
    });

    return Array.from(map.values()).sort((a, b) => b.spend - a.spend);
  }
);

export default marketingSlice.reducer;