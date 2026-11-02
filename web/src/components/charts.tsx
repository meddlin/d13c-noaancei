import { useMemo } from "react"
import {
  BarController, BarElement, Chart as ChartJS, Filler, LineController, LineElement,
  LinearScale, PointElement, ScatterController, Tooltip,
  type ChartData, type ChartOptions, type TooltipItem,
} from "chart.js"
import { Chart } from "react-chartjs-2"

import { rgba, type ChartColors } from "@/lib/chart-colors"
import {
  ERA_LABELS, MIN_N, YEAR_MAX, YEAR_MIN, era, fmt, fmtN,
  type Dataset, type YearStats,
} from "@/lib/data"

ChartJS.register(
  LineController, BarController, ScatterController, LinearScale,
  PointElement, LineElement, BarElement, Filler, Tooltip,
)

type Scale = NonNullable<NonNullable<ChartOptions["scales"]>[string]>

function baseOptions(c: ChartColors, xTitle?: string, yTitle?: string): ChartOptions {
  const axis = (title?: string): Scale => ({
    title: { display: !!title, text: title, color: c.muted },
    ticks: { color: c.muted },
    grid: { color: c.grid },
    border: { color: c.grid },
  }) as Scale
  const y = axis(yTitle)
  // Fixed width keeps stacked charts aligned.
  y.afterFit = (scale) => { scale.width = 60 }
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    scales: { x: axis(xTitle), y },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: c.surface, titleColor: c.text, bodyColor: c.muted,
        borderColor: c.grid, borderWidth: 1, padding: 10,
      },
    },
  }
}

function yearAxis(options: ChartOptions) {
  Object.assign(options.scales!.x!, { type: "linear", min: YEAR_MIN - 1, max: YEAR_MAX + 1 })
  Object.assign(options.scales!.x!.ticks!, { stepSize: 1, callback: (v: number | string) => String(v) })
}

interface MeanPoint { x: number; y: number | null; stats?: YearStats }

export function TrendChart({
  d, idx, stats, colors, showPoints,
}: { d: Dataset; idx: number[]; stats: YearStats[]; colors: ChartColors; showPoints: boolean }) {
  const [c1] = colors.series
  const options = useMemo(() => {
    const o = baseOptions(colors, "Year", "δ13C (‰)")
    yearAxis(o)
    o.interaction = { mode: "nearest", axis: "x", intersect: false }
    o.plugins!.tooltip = {
      ...o.plugins!.tooltip,
      filter: (item) => (item.dataset as { id?: string }).id === "mean",
      callbacks: {
        title: (items) => String((items[0].raw as MeanPoint).x),
        label: (item: TooltipItem<"line">) => {
          const s = (item.raw as MeanPoint).stats!
          const lines = [
            `Mean ${fmt(s.mean)}‰` + (s.sd != null ? ` ± ${fmt(s.sd)}` : ""),
            `${fmtN(s.n)} samples`,
            `Avg distance from equator ${fmt(s.absLat, 0)}°`,
          ]
          if (s.n < MIN_N) lines.push("Few samples: treat with caution")
          return lines
        },
      },
    }
    return o
  }, [colors])

  const data = useMemo(() => {
    const mean: MeanPoint[] = stats.map((s) =>
      s.n ? { x: s.year, y: s.mean, stats: s } : { x: s.year, y: null })
    const points = showPoints
      ? idx.map((i) => ({ x: d.year[i] + (((i * 37) % 100) / 100 - 0.5) * 0.5, y: d.d13c[i] }))
      : []
    return {
      datasets: [
        { id: "points", type: "scatter", data: points, pointRadius: 2, backgroundColor: colors.faint, borderWidth: 0, order: 3 },
        { id: "hi", data: stats.map((s) => ({ x: s.year, y: s.n > 1 && s.sd != null ? s.mean + s.sd : null })), borderWidth: 0, pointRadius: 0, fill: false, order: 2 },
        { id: "lo", data: stats.map((s) => ({ x: s.year, y: s.n > 1 && s.sd != null ? s.mean - s.sd : null })), borderWidth: 0, pointRadius: 0, fill: "-1", backgroundColor: rgba(c1, 0.15), order: 2 },
        {
          id: "mean", data: mean, borderColor: c1, borderWidth: 2, pointRadius: 4, pointHoverRadius: 6,
          pointBorderWidth: 2, order: 1, spanGaps: false,
          pointBackgroundColor: stats.map((s) => (s.n >= MIN_N ? c1 : colors.surface)),
          pointBorderColor: stats.map((s) => (s.n >= MIN_N ? colors.surface : c1)),
        },
      ],
    } as unknown as ChartData<"line">
  }, [d, idx, stats, colors, showPoints, c1])

  return <Chart type="line" data={data} options={options as ChartOptions<"line">} />
}

export function CountsChart({ stats, colors }: { stats: YearStats[]; colors: ChartColors }) {
  const options = useMemo(() => {
    const o = baseOptions(colors, undefined, "Samples")
    yearAxis(o)
    o.plugins!.tooltip = {
      ...o.plugins!.tooltip,
      callbacks: {
        title: (items) => String((items[0].raw as { x: number }).x),
        label: (item) => `${fmtN((item.raw as { y: number }).y)} samples`,
      },
    }
    return o
  }, [colors])
  const data = useMemo(() => ({
    datasets: [{
      data: stats.map((s) => ({ x: s.year, y: s.n })),
      backgroundColor: colors.series[0], borderRadius: 3, barPercentage: 0.7,
    }],
  }) as unknown as ChartData<"bar">, [stats, colors])
  return <Chart type="bar" data={data} options={options as ChartOptions<"bar">} />
}

interface RowPoint { x: number; y: number; i: number }

function pointLabel(d: Dataset) {
  return (item: TooltipItem<"scatter">) => {
    const i = (item.raw as RowPoint).i
    const la = d.lat[i], lo = d.lon[i]
    return [
      `δ13C ${fmt(d.d13c[i])}‰ at ${fmtN(d.depth[i])} m`,
      `${d.year[i]}, ${Math.abs(la).toFixed(1)}°${la < 0 ? "S" : "N"} ${Math.abs(lo).toFixed(1)}°${lo < 0 ? "W" : "E"}`,
    ]
  }
}

function eraDatasets(
  d: Dataset, idx: number[], colors: ChartColors,
  xy: (i: number) => { x: number; y: number }, radius: number, alpha: number,
) {
  return ERA_LABELS.map((label, k) => ({
    label,
    data: idx.filter((i) => era(d.year[i]) === k).map((i) => ({ ...xy(i), i })),
    pointRadius: radius, backgroundColor: rgba(colors.series[k], alpha), borderWidth: 0,
  }))
}

export function ProfileChart({ d, idx, colors }: { d: Dataset; idx: number[]; colors: ChartColors }) {
  const options = useMemo(() => {
    const o = baseOptions(colors, "δ13C (‰)", "Depth (m)")
    o.scales!.y!.reverse = true
    o.plugins!.tooltip = { ...o.plugins!.tooltip, callbacks: { title: () => "", label: pointLabel(d) as never } }
    return o
  }, [d, colors])
  const data = useMemo(() => ({
    datasets: eraDatasets(d, idx, colors, (i) => ({ x: d.d13c[i], y: d.depth[i] }), 2, 0.5),
  }) as ChartData<"scatter">, [d, idx, colors])
  return <Chart type="scatter" data={data} options={options as ChartOptions<"scatter">} />
}

export function MapChart({ d, idx, colors }: { d: Dataset; idx: number[]; colors: ChartColors }) {
  const options = useMemo(() => {
    const o = baseOptions(colors, "Longitude", "Latitude")
    Object.assign(o.scales!.x!, { min: -180, max: 180 })
    Object.assign(o.scales!.y!, { min: -90, max: 90 })
    Object.assign(o.scales!.x!.ticks!, { stepSize: 60 })
    Object.assign(o.scales!.y!.ticks!, { stepSize: 30 })
    o.plugins!.tooltip = { ...o.plugins!.tooltip, callbacks: { title: () => "", label: pointLabel(d) as never } }
    return o
  }, [d, colors])
  const data = useMemo(() => ({
    datasets: eraDatasets(d, idx, colors, (i) => ({ x: d.lon[i], y: d.lat[i] }), 2.5, 0.6),
  }) as ChartData<"scatter">, [d, idx, colors])
  return <Chart type="scatter" data={data} options={options as ChartOptions<"scatter">} />
}
