import React, { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPagedData,
  selectTotalCount,
  selectPagination,
  selectSort,
  setSort,
  setPage,
  setPageSize,
} from "../features/marketingSlice";
import type { SortField } from "../types";
import type { AppDispatch } from "../store";

const computeCTR = (clicks: number, impressions: number) =>
  impressions > 0 ? (clicks / impressions) * 100 : 0;

interface HeaderCellProps {
  label: string;
  field: SortField;
  currentField: SortField;
  direction: "asc" | "desc";
  onSort: (field: SortField) => void;
}

const HeaderCell: React.FC<HeaderCellProps> = React.memo(
  ({ label, field, currentField, direction, onSort }) => {
    const isActive = currentField === field;
    const arrow = isActive ? (direction === "asc" ? "▲" : "▼") : "";
    return (
      <th
        className={isActive ? "sortable active" : "sortable"}
        onClick={() => onSort(field)}
      >
        {label} <span className="sort-arrow">{arrow}</span>
      </th>
    );
  }
);

interface RowProps {
  id: number;
  channel: string;
  region: string;
  spend: number;
  impressions: number;
  conversions: number;
  clicks: number;
}

const TableRow: React.FC<RowProps> = React.memo(
  ({ id, channel, region, spend, impressions, conversions, clicks }) => {
    const ctr = computeCTR(clicks, impressions);

    return (
      <tr key={id}>
        <td>{channel}</td>
        <td>{region}</td>
        <td>{spend.toFixed(2)}</td>
        <td>{impressions.toLocaleString()}</td>
        <td>{clicks.toLocaleString()}</td>
        <td>{conversions.toLocaleString()}</td>
        <td>{ctr.toFixed(2)}%</td>
      </tr>
    );
  }
);

export const DataTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const rows = useSelector(selectPagedData);
  const totalCount = useSelector(selectTotalCount);
  const pagination = useSelector(selectPagination);
  const sort = useSelector(selectSort);

  const totalPages = Math.max(
    1,
    Math.ceil(totalCount / pagination.pageSize)
  );

  const handleSort = useCallback(
    (field: SortField) => {
      dispatch(setSort({ field }));
    },
    [dispatch]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages) return;
      dispatch(setPage(page));
    },
    [dispatch, totalPages]
  );

  const handlePageSizeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setPageSize(Number(e.target.value)));
    },
    [dispatch]
  );

  const pageInfoText = useMemo(() => {
    const start = (pagination.page - 1) * pagination.pageSize + 1;
    const end = Math.min(
      pagination.page * pagination.pageSize,
      totalCount
    );
    return `${start}–${end} of ${totalCount}`;
  }, [pagination.page, pagination.pageSize, totalCount]);

  return (
    <div>
      <div className="table-controls">
        <div className="pagination">
          <button
            className="btn-secondary"
            onClick={() => handlePageChange(1)}
            disabled={pagination.page === 1}
          >
            ⏮
          </button>
          <button
            className="btn-secondary"
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
          >
            ‹
          </button>
          <span className="page-info">
            Page {pagination.page} of {totalPages}
          </span>
          <button
            className="btn-secondary"
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === totalPages}
          >
            ›
          </button>
          <button
            className="btn-secondary"
            onClick={() => handlePageChange(totalPages)}
            disabled={pagination.page === totalPages}
          >
            ⏭
          </button>
        </div>

        <div className="page-size">
          <span>Rows per page:&nbsp;</span>
          <select
            value={pagination.pageSize}
            onChange={handlePageSizeChange}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className="page-range">{pageInfoText}</div>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <HeaderCell
                label="Channel"
                field="channel"
                currentField={sort.field}
                direction={sort.direction}
                onSort={handleSort}
              />
              <HeaderCell
                label="Region"
                field="region"
                currentField={sort.field}
                direction={sort.direction}
                onSort={handleSort}
              />
              <HeaderCell
                label="Spend"
                field="spend"
                currentField={sort.field}
                direction={sort.direction}
                onSort={handleSort}
              />
              <HeaderCell
                label="Impressions"
                field="impressions"
                currentField={sort.field}
                direction={sort.direction}
                onSort={handleSort}
              />
              <HeaderCell
                label="Clicks"
                field="clicks"
                currentField={sort.field}
                direction={sort.direction}
                onSort={handleSort}
              />
              <HeaderCell
                label="Conversions"
                field="conversions"
                currentField={sort.field}
                direction={sort.direction}
                onSort={handleSort}
              />
              <HeaderCell
                label="CTR"
                field="ctr"
                currentField={sort.field}
                direction={sort.direction}
                onSort={handleSort}
              />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <TableRow key={r.id} {...r} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};