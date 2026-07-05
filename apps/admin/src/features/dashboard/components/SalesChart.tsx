"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface SalesChartProps {
  data: { name: string; total: number }[];
}

export function SalesChart({ data }: SalesChartProps) {
  return (
    <div className="rounded-global border-global border-brand-border-global bg-brand-surface p-6">
      <h3 className="text-brand-text mb-6 text-lg font-semibold tracking-tight">Sales Overview</h3>
      <div className="h-[300px] w-full">
        {data.length === 0 ? (
          <div className="text-brand-text/50 flex h-full items-center justify-center">
            No sales data available.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0f4a3a" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0f4a3a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `₹${value}`}
              />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-brand-surface, #1f2937)",
                  borderColor: "var(--color-brand-border-global, #374151)",
                  color: "#f3f4f6",
                  borderRadius: "8px",
                }}
                itemStyle={{ color: "#f3f4f6" }}
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#0f4a3a"
                fillOpacity={1}
                fill="url(#colorTotal)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
