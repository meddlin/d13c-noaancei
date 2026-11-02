export interface Dataset {
  year: number[]
  lat: number[]
  lon: number[]
  depth: number[]
  d13c: number[]
  meta: {
    total_rows: number
    kept: number
    dropped_out_of_range: number
    valid_range: [number, number]
  }
}

export const YEAR_MIN = 1990
export const YEAR_MAX = 2005
/** Years with fewer samples than this are drawn hollow. */
export const MIN_N = 20

export const ERA_LABELS = ["1990–1994", "1995–1998", "2003–2005"] as const
export const era = (year: number) => (year <= 1994 ? 0 : year <= 1998 ? 1 : 2)

export interface YearStats {
  year: number
  n: number
  mean: number
  sd: number | null
  absLat: number
}

export async function loadData(): Promise<Dataset> {
  const res = await fetch(`${import.meta.env.BASE_URL}data/d13c.json`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export function selectRows(
  d: Dataset,
  depth: [number, number],
  lat: [number, number],
): number[] {
  const out: number[] = []
  for (let i = 0; i < d.year.length; i++) {
    if (
      d.depth[i] >= depth[0] && d.depth[i] <= depth[1] &&
      d.lat[i] >= lat[0] && d.lat[i] <= lat[1]
    ) out.push(i)
  }
  return out
}

/** One entry per year in [YEAR_MIN, YEAR_MAX]; n === 0 for years without data. */
export function yearStats(d: Dataset, idx: number[]): YearStats[] {
  const by = new Map<number, number[]>()
  for (const i of idx) {
    const list = by.get(d.year[i])
    if (list) list.push(i)
    else by.set(d.year[i], [i])
  }
  const stats: YearStats[] = []
  for (let year = YEAR_MIN; year <= YEAR_MAX; year++) {
    const ids = by.get(year) ?? []
    const n = ids.length
    if (!n) {
      stats.push({ year, n: 0, mean: NaN, sd: null, absLat: NaN })
      continue
    }
    const mean = ids.reduce((s, i) => s + d.d13c[i], 0) / n
    const sd = n > 1
      ? Math.sqrt(ids.reduce((s, i) => s + (d.d13c[i] - mean) ** 2, 0) / (n - 1))
      : null
    const absLat = ids.reduce((s, i) => s + Math.abs(d.lat[i]), 0) / n
    stats.push({ year, n, mean, sd, absLat })
  }
  return stats
}

export const fmt = (v: number, digits = 2) => v.toFixed(digits).replace("-", "−")
export const fmtN = (n: number) => n.toLocaleString("en-US")
