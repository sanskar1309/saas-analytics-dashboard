"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import type { TrafficSource } from "@/types/analytics";

interface TrafficSourceChartProps {
  data: TrafficSource[];
}

const CustomTooltip = ({
  active, payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: TrafficSource }>;
}) => {
  if (!active || !payload?.length) return null;
  const { name, value, color } = payload[0].payload;
  return (
    <div className="rounded-xl border border-gray-100 bg-white px-3 py-2.5 shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-center gap-2 text-xs">
        <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
        <span className="font-medium text-gray-900 dark:text-white">{name}</span>
        <span className="ml-1 font-semibold tabular-nums text-gray-500 dark:text-gray-400">{value}%</span>
      </div>
    </div>
  );
};

export function TrafficSourceChart({ data }: TrafficSourceChartProps) {
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="flex flex-col gap-5">
      {/* Donut */}
      <div className="relative">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={62}
              outerRadius={88}
              paddingAngle={2.5}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xl font-bold text-gray-900 dark:text-white">{total}%</p>
          <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Total
          </p>
        </div>
      </div>

      {/* Legend rows */}
      <div className="space-y-2">
        {data.map((source) => (
          <div key={source.name} className="flex items-center gap-2.5">
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: source.color }}
            />
            <span className="min-w-0 flex-1 truncate text-xs text-gray-600 dark:text-gray-400">
              {source.name}
            </span>
            {/* Bar */}
            <div className="w-16 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
              <div
                className="h-1 rounded-full"
                style={{ width: `${source.value}%`, backgroundColor: source.color }}
              />
            </div>
            <span className="w-7 text-right text-xs font-semibold tabular-nums text-gray-700 dark:text-gray-300">
              {source.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
