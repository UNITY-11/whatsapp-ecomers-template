"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface OrderStatusChartProps {
  data: { name: string; value: number; fill?: string }[];
}

export function OrderStatusChart({ data }: OrderStatusChartProps) {
  return (
    <div className="rounded-global border-global border-brand-border-global bg-brand-surface p-6">
      <h3 className="text-brand-text mb-6 text-lg font-semibold tracking-tight">Order Status</h3>
      <div className="flex h-[300px] flex-col items-center">
        {data.length === 0 ? (
          <div className="text-brand-text/50 flex h-full items-center justify-center">
            No order status data available.
          </div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  cornerRadius={4}
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill || "#8884d8"} stroke="none" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-brand-surface, #1f2937)",
                    borderColor: "var(--color-brand-border-global, #374151)",
                    color: "#f3f4f6",
                    borderRadius: "8px",
                  }}
                  itemStyle={{ color: "#f3f4f6" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              {data.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.fill }} />
                  <span className="text-brand-text/70 text-sm">{entry.name}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
