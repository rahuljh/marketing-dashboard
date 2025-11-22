import React from "react";
import { useSelector } from "react-redux";
import { selectChartDataByChannel } from "../features/marketingSlice";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export const PerformanceChart: React.FC = () => {
  const data = useSelector(selectChartDataByChannel);

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <XAxis dataKey="channel" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="spend" name="Spend" fill="#2563eb" />
          <Bar dataKey="conversions" name="Conversions" fill="#f97316" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};