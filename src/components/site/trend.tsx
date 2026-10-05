import { useEffect, useState } from "react";
import { monthLabel } from "@/lib/format";
import type { SeriesPoint } from "@/lib/types";

export function Trend({ series }: { series: SeriesPoint[] }) {
  const [Chart, setChart] = useState<typeof import("recharts") | null>(null);
  useEffect(() => {
    let live = true;
    void import("recharts").then((mod) => {
      if (live) setChart(mod);
    });
    return () => {
      live = false;
    };
  }, []);

  return (
    <div className="h-52 w-full" aria-hidden={Chart ? undefined : true}>
      {Chart ? (
        <Chart.ResponsiveContainer width="100%" height="100%">
          <Chart.LineChart data={series} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <Chart.XAxis
              dataKey="m"
              tickFormatter={monthLabel}
              tick={{ fill: "var(--color-muted)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Chart.YAxis hide domain={["dataMin - 1000", "dataMax + 1000"]} />
            <Chart.Tooltip
              formatter={(value) =>
                [`${new Intl.NumberFormat("tr-TR").format(Number(value))} TL`, "Örnek m²"]
              }
              labelFormatter={(label) => monthLabel(String(label))}
            />
            <Chart.Line
              type="monotone"
              dataKey="price"
              stroke="var(--color-accent)"
              strokeWidth={2}
              dot={false}
            />
          </Chart.LineChart>
        </Chart.ResponsiveContainer>
      ) : (
        <div className="h-full w-full bg-accent-soft" />
      )}
    </div>
  );
}
