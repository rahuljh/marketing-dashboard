import React, { useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectRawData,
  selectFilters,
  setFilters,
} from "../features/marketingSlice";
import type { AppDispatch } from "../store";

export const FiltersBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector(selectRawData);
  const filters = useSelector(selectFilters);

  const channelOptions = useMemo(() => {
    const set = new Set<string>();
    data.forEach((d) => set.add(d.channel));
    return Array.from(set).sort();
  }, [data]);

  const regionOptions = useMemo(() => {
    const set = new Set<string>();
    data.forEach((d) => set.add(d.region));
    return Array.from(set).sort();
  }, [data]);

  const handleChannelChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setFilters({ channel: e.target.value }));
    },
    [dispatch]
  );

  const handleRegionChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setFilters({ region: e.target.value }));
    },
    [dispatch]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setFilters({ search: e.target.value }));
    },
    [dispatch]
  );

  const handleMinSpendChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setFilters({ minSpend: e.target.value }));
    },
    [dispatch]
  );

  const handleMaxSpendChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setFilters({ maxSpend: e.target.value }));
    },
    [dispatch]
  );

  const handleMinCtrChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setFilters({ minCtr: e.target.value }));
    },
    [dispatch]
  );

  const handleMaxCtrChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setFilters({ maxCtr: e.target.value }));
    },
    [dispatch]
  );

  const handleClear = useCallback(() => {
    dispatch(
      setFilters({
        channel: "",
        region: "",
        search: "",
        minSpend: "",
        maxSpend: "",
        minCtr: "",
        maxCtr: "",
      })
    );
  }, [dispatch]);

  return (
    <div className="panel filters-bar">
      <div className="filters-row">
        <div className="filter-item">
          <label>Channel</label>
          <select value={filters.channel} onChange={handleChannelChange}>
            <option value="">All</option>
            {channelOptions.map((ch) => (
              <option key={ch} value={ch}>
                {ch}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label>Region</label>
          <select value={filters.region} onChange={handleRegionChange}>
            <option value="">All</option>
            {regionOptions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-item filter-search">
          <label>Search</label>
          <input
            type="text"
            placeholder="Search channel or region..."
            value={filters.search}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="filters-row" style={{ marginTop: 8 }}>
        <div className="filter-item">
          <label>Min Spend</label>
          <input
            type="number"
            inputMode="decimal"
            placeholder="e.g. 1000"
            value={filters.minSpend}
            onChange={handleMinSpendChange}
          />
        </div>

        <div className="filter-item">
          <label>Max Spend</label>
          <input
            type="number"
            inputMode="decimal"
            placeholder="e.g. 50000"
            value={filters.maxSpend}
            onChange={handleMaxSpendChange}
          />
        </div>

        <div className="filter-item">
          <label>Min CTR (%)</label>
          <input
            type="number"
            inputMode="decimal"
            placeholder="e.g. 1.5"
            value={filters.minCtr}
            onChange={handleMinCtrChange}
          />
        </div>

        <div className="filter-item">
          <label>Max CTR (%)</label>
          <input
            type="number"
            inputMode="decimal"
            placeholder="e.g. 5"
            value={filters.maxCtr}
            onChange={handleMaxCtrChange}
          />
        </div>

        <button className="btn-secondary" onClick={handleClear}>
          Clear filters
        </button>
      </div>
    </div>
  );
};