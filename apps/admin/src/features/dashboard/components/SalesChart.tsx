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
                  <stop offset="5%" stopColor="#0f4a3a" stopOpacity={0.4} />
                  <stop offset="50%" stopColor="#b89a5a" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#0f4a3a" stopOpacity={0} />
                </linearGradient>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow
                    dx="0"
                    dy="4"
                    stdDeviation="4"
                    floodColor="#0f4a3a"
                    floodOpacity="0.15"
                  />
                </filter>
              </defs>
              <XAxis
                dataKey="name"
                stroke="#1a2e28"
                strokeOpacity={0.5}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickMargin={10}
              />
              <YAxis
                stroke="#1a2e28"
                strokeOpacity={0.5}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `₹${value}`}
                tickMargin={10}
              />
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#ddd5c8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderColor: "#ddd5c8",
                  color: "#1a2e28",
                  borderRadius: "12px",
                  boxShadow: "0 4px 20px rgb(0 0 0 / 0.05)",
                  padding: "12px",
                }}
                itemStyle={{ color: "#0f4a3a", fontWeight: 600 }}
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#0f4a3a"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorTotal)"
                style={{ filter: "url(#shadow)" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
