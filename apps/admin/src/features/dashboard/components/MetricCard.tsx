import { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    label: string;
  };
}

export function MetricCard({ title, value, icon, trend }: MetricCardProps) {
  return (
    <div className="group rounded-global border-global border-brand-border-global bg-brand-surface hover:bg-brand-secondary-hover hover:shadow-brand-card-hover relative overflow-hidden p-6 transition-all hover:-translate-y-1">
      <div className="absolute top-0 right-0 p-4 opacity-5 transition-opacity group-hover:opacity-10">
        {icon}
      </div>
      <div className="relative z-10 flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="text-brand-body text-brand-text/70 font-medium tracking-tight">{title}</h3>
      </div>
      <div className="text-brand-text group-hover:text-brand-primary relative z-10 mt-2 text-4xl font-bold transition-colors">
        {value}
      </div>
      {trend && (
        <div className="relative z-10 mt-4 flex items-center text-sm">
          <span className={`font-medium ${trend.value >= 0 ? "text-green-500" : "text-red-500"}`}>
            {trend.value >= 0 ? "+" : ""}
            {trend.value}%
          </span>
          <span className="text-brand-text/60 ml-2">{trend.label}</span>
        </div>
      )}
    </div>
  );
}
