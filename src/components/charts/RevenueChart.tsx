"use client";

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine,
} from "recharts";
import type { RevenueDataPoint } from "@/types/analytics";
import { formatCurrency } from "@/lib/utils";

interface RevenueChartProps {
  data: RevenueDataPoint[];
}

const CustomTooltip = ({
  active, payload, label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; name: string; color: string }>;
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="min-w-[160px] rounded-xl border border-gray-100 bg-white p-3.5 shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
        {label}
      </p>
      <div className="space-y-1.5">
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-gray-500 dark:text-gray-400">{entry.name}</span>
            </div>
            <span className="font-semibold tabular-nums text-gray-900 dark:text-white">
              {formatCurrency(entry.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const CustomDot = (props: {
  cx?: number; cy?: number; stroke?: string;
  payload?: RevenueDataPoint; index?: number; dataLength?: number;
}) => {
  const { cx, cy, stroke, index, dataLength } = props;
  if (index !== (dataLength ?? 0) - 1) return null;
  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill={stroke} stroke="white" strokeWidth={2} />
      <circle cx={cx} cy={cy} r={9} fill={stroke} fillOpacity={0.15} />
    </g>
  );
};

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 8 }}>
        <CartesianGrid
          strokeDasharray="0"
          stroke="currentColor"
          className="text-gray-100 dark:text-gray-800"
          horizontal
          vertical={false}
        />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: "currentColor" }}
          className="text-gray-400 dark:text-gray-600"
          tickLine={false}
          axisLine={false}
          dy={6}
        />
        <YAxis
          tickFormatter={(v) => formatCurrency(v, true)}
          tick={{ fontSize: 11, fill: "currentColor" }}
          className="text-gray-400 dark:text-gray-600"
          tickLine={false}
          axisLine={false}
          width={56}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ stroke: "currentColor", strokeWidth: 1, className: "text-gray-200 dark:text-gray-700", strokeDasharray: "4 2" }}
        />

        {/* MRR — primary */}
        <Line
          type="monotone"
          dataKey="mrr"
          name="MRR"
          stroke="#6366f1"
          strokeWidth={2.5}
          dot={<CustomDot dataLength={data.length} />}
          activeDot={{ r: 5, fill: "#6366f1", stroke: "white", strokeWidth: 2 }}
        />
        {/* New MRR */}
        <Line
          type="monotone"
          dataKey="newMrr"
          name="New MRR"
          stroke="#10b981"
          strokeWidth={1.5}
          strokeDasharray="5 3"
          dot={false}
          activeDot={{ r: 4, fill: "#10b981", stroke: "white", strokeWidth: 2 }}
        />
        {/* Churned MRR */}
        <Line
          type="monotone"
          dataKey="churnedMrr"
          name="Churned MRR"
          stroke="#f43f5e"
          strokeWidth={1.5}
          strokeDasharray="5 3"
          dot={false}
          activeDot={{ r: 4, fill: "#f43f5e", stroke: "white", strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
