import { Award } from "lucide-react";

const stats: any[] = [];

export const QuickStats = () => {
  return (
    <div className="grid grid-cols-4 gap-2">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center p-3 rounded-xl bg-card border border-border"
        >
          <div className={`p-2 rounded-lg ${stat.bg} mb-2`}>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </div>
          <span className="font-display font-bold text-foreground text-sm">
            {stat.value}
          </span>
          <span className="text-[10px] text-muted-foreground text-center leading-tight">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
};
