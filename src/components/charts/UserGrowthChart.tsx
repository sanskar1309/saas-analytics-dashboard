"use client";

import {
  AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import type { UserGrowthDataPoint } from "@/types/analytics";
import { formatNumber } from "@/lib/utils";

interface UserGrowthChartProps {
  data: UserGrowthDataPoint[];
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
    <div className="min-w-38 rounded-xl border border-gray-100 bg-white p-3.5 shadow-lg dark:border-gray-700 dark:bg-gray-900">
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
              {formatNumber(entry.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export function UserGrowthChart({ data }: UserGrowthChartProps) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 8 }}>
        <defs>
          <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#6366f1" stopOpacity={0.12} />
            <stop offset="100%" stopColor="#6366f1" stopOpacity={0}    />
          </linearGradient>
          <linearGradient id="activeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#10b981" stopOpacity={0.12} />
            <stop offset="100%" stopColor="#10b981" stopOpacity={0}    />
          </linearGradient>
        </defs>
        <CartesianGrid
          stroke="currentColor"
          className="text-gray-100 dark:text-gray-800"
          horizontal
          vertical={false}
        />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 11, fill: "currentColor" }}
          className="text-gray-400 dark:text-gray-600"
          tickLine={false}
          axisLine={false}
          dy={6}
        />
        <YAxis
          tickFormatter={(v) => formatNumber(v)}
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
        <Area
          type="monotone"
          dataKey="totalUsers"
          name="Total Users"
          stroke="#6366f1"
          strokeWidth={2.5}
          fill="url(#totalGrad)"
          dot={false}
          activeDot={{ r: 5, fill: "#6366f1", stroke: "white", strokeWidth: 2 }}
        />
        <Area
          type="monotone"
          dataKey="activeUsers"
          name="Active Users"
          stroke="#10b981"
          strokeWidth={2}
          fill="url(#activeGrad)"
          dot={false}
          activeDot={{ r: 4, fill: "#10b981", stroke: "white", strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
