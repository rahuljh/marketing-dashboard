import React from "react";
import { useSelector } from "react-redux";
import { selectTotals } from "../features/marketingSlice";

const formatCurrency = (value: number) =>
  value.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

const formatNumber = (value: number) =>
  value.toLocaleString(undefined, { maximumFractionDigits: 0 });

const formatPercent = (value: number) =>
  `${value.toFixed(2)}%`;

export const TotalsPanel: React.FC = () => {
  const totals = useSelector(selectTotals);

  return (
    <div className="panel totals-panel">
      <div className="totals-item">
        <span className="totals-label">Total Spend</span>
        <span className="totals-value">
          {formatCurrency(totals.spend)}
        </span>
      </div>
      <div className="totals-item">
        <span className="totals-label">Total Conversions</span>
        <span className="totals-value">
          {formatNumber(totals.conversions)}
        </span>
      </div>
      <div className="totals-item">
        <span className="totals-label">Total Impressions</span>
        <span className="totals-value">
          {formatNumber(totals.impressions)}
        </span>
      </div>
      <div className="totals-item">
        <span className="totals-label">Overall CTR</span>
        <span className="totals-value">
          {formatPercent(totals.ctr)}
        </span>
      </div>
    </div>
  );
};