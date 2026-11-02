import { useEffect, useState } from "react"

import { useTheme } from "@/components/theme-provider"

export interface ChartColors {
  series: [string, string, string]
  surface: string
  text: string
  muted: string
  grid: string
  /** Muted colour with alpha, for faint overlays. */
  faint: string
}

let ctx: CanvasRenderingContext2D | null = null

/** Resolve any CSS colour (oklch, hex, ...) to [r, g, b, a] via a 1px canvas. */
function toRgba(color: string): [number, number, number, number] {
  ctx ??= document.createElement("canvas").getContext("2d", { willReadFrequently: true })!
  ctx.clearRect(0, 0, 1, 1)
  ctx.fillStyle = color
  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data
  return [r, g, b, a / 255]
}

export const rgba = (color: string, alpha: number) => {
  const [r, g, b, a] = toRgba(color)
  return `rgba(${r}, ${g}, ${b}, ${+(a * alpha).toFixed(3)})`
}

function readColors(): ChartColors {
  const style = getComputedStyle(document.documentElement)
  const v = (name: string) => rgba(style.getPropertyValue(name).trim(), 1)
  const muted = v("--muted-foreground")
  return {
    series: [v("--chart-1"), v("--chart-2"), v("--chart-3")],
    surface: v("--card"),
    text: v("--foreground"),
    muted,
    grid: v("--border"),
    faint: rgba(muted, 0.35),
  }
}

/** Chart.js draws to canvas, so colours must be resolved again on every theme change. */
export function useChartColors(): ChartColors | null {
  const { resolvedTheme } = useTheme()
  const [colors, setColors] = useState<ChartColors | null>(null)
  useEffect(() => {
    // Runs after ThemeProvider's layout effect has toggled the `dark` class.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setColors(readColors())
  }, [resolvedTheme])
  return colors
}
