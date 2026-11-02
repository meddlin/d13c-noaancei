import { useEffect, useMemo, useState } from "react"
import { ChevronDown } from "lucide-react"

import { CountsChart, MapChart, ProfileChart, TrendChart } from "@/components/charts"
import { ModeToggle } from "@/components/mode-toggle"
import { ThemeProvider } from "@/components/theme-provider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { useChartColors } from "@/lib/chart-colors"
import {
  ERA_LABELS, MIN_N, fmt, fmtN, loadData, selectRows, yearStats, type Dataset,
} from "@/lib/data"

const DEPTHS = [
  { value: "0,50", label: "Surface (0–50 m)" },
  { value: "0,200", label: "Upper ocean (0–200 m)" },
  { value: "200,1000", label: "Intermediate (200–1000 m)" },
  { value: "1000,7000", label: "Deep (>1000 m)" },
  { value: "0,7000", label: "All depths" },
]
const LATITUDES = [
  { value: "-90,90", label: "Global" },
  { value: "-20,20", label: "Tropics (20°S–20°N)" },
  { value: "20,60", label: "Northern mid-latitudes (20–60°N)" },
  { value: "-60,-20", label: "Southern mid-latitudes (60–20°S)" },
  { value: "-90,-60", label: "Southern Ocean (south of 60°S)" },
  { value: "60,90", label: "Arctic (north of 60°N)" },
]
const ERA_CLASSES = ["bg-chart-1", "bg-chart-2", "bg-chart-3"]

const parse = (v: string) => v.split(",").map(Number) as [number, number]

function FilterSelect({
  id, label, value, onChange, options,
}: {
  id: string; label: string; value: string; onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-muted-foreground">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id} className="w-full sm:w-64"><SelectValue /></SelectTrigger>
        <SelectContent>
          {options.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  )
}

function Explorer() {
  const colors = useChartColors()
  const [d, setD] = useState<Dataset | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [depth, setDepth] = useState("0,50")
  const [lat, setLat] = useState("-90,90")
  const [showPoints, setShowPoints] = useState(false)

  useEffect(() => {
    loadData().then(setD).catch((e: Error) => setError(e.message))
  }, [])

  const idx = useMemo(() => (d ? selectRows(d, parse(depth), parse(lat)) : []), [d, depth, lat])
  const latIdx = useMemo(() => (d ? selectRows(d, [0, 7000], parse(lat)) : []), [d, lat])
  const stats = useMemo(() => (d ? yearStats(d, idx) : []), [d, idx])

  const withData = stats.filter((s) => s.n)
  const thin = withData.filter((s) => s.n < MIN_N).length
  const label = (opts: typeof DEPTHS, v: string) => opts.find((o) => o.value === v)!.label

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
      <header className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Ocean Carbon-13 Explorer</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            δ13C of dissolved inorganic carbon in seawater, 1990–2005. Schmittner et al. (2013)
            compilation, from NOAA NCEI.
          </p>
        </div>
        <ModeToggle />
      </header>

      <section aria-label="Filters" className="flex flex-wrap items-end gap-x-5 gap-y-3">
        <FilterSelect id="depth" label="Depth" value={depth} onChange={setDepth} options={DEPTHS} />
        <FilterSelect id="lat" label="Latitude band" value={lat} onChange={setLat} options={LATITUDES} />
        <div className="flex h-9 items-center gap-2">
          <Checkbox id="points" checked={showPoints} onCheckedChange={(v) => setShowPoints(v === true)} />
          <Label htmlFor="points">Show individual measurements</Label>
        </div>
      </section>

      <p role="status" className="my-4 text-sm text-muted-foreground">
        {error ? `Could not load data: ${error}`
          : !d ? "Loading…"
          : idx.length === 0 ? "No measurements match these filters."
          : `${fmtN(idx.length)} measurements · ${label(DEPTHS, depth)} · ${label(LATITUDES, lat)} · ${withData.length} years with data` +
            (thin ? ` (${thin} with fewer than ${MIN_N} samples)` : "")}
      </p>

      {d && colors && (
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Average δ13C by year</CardTitle>
              <CardDescription>
                Line is the yearly mean, band is ±1 standard deviation. Hollow markers have fewer than {MIN_N} samples.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="h-[340px]">
                <TrendChart d={d} idx={idx} stats={stats} colors={colors} showPoints={showPoints} />
              </div>
              <div className="h-[120px]"><CountsChart stats={stats} colors={colors} /></div>
              <Alert>
                <AlertTitle>Read with care</AlertTitle>
                <AlertDescription>
                  Different years sampled different oceans, so a change between years usually reflects where
                  ships went, not a change in the ocean. Years with no cruises (1997, 1999–2002) are gaps.
                  Compare against the map below, or narrow the latitude band.
                </AlertDescription>
              </Alert>
              <Collapsible>
                <CollapsibleTrigger className="group flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                  <ChevronDown className="size-4 transition-transform group-data-[state=open]:rotate-180" />
                  View as table
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Table className="mt-2 tabular-nums">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Year</TableHead>
                        <TableHead className="text-right">Samples</TableHead>
                        <TableHead className="text-right">Mean δ13C (‰)</TableHead>
                        <TableHead className="text-right">Std dev</TableHead>
                        <TableHead className="text-right">Avg |lat| (°)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stats.map((s) => (
                        <TableRow key={s.year}>
                          <TableCell>{s.year}</TableCell>
                          <TableCell className="text-right">{fmtN(s.n)}</TableCell>
                          <TableCell className="text-right">{s.n ? fmt(s.mean) : "–"}</TableCell>
                          <TableCell className="text-right">{s.sd != null ? fmt(s.sd) : "–"}</TableCell>
                          <TableCell className="text-right">{s.n ? fmt(s.absLat, 1) : "–"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>δ13C with depth</CardTitle>
                <CardDescription>Uses the latitude band, all depths.</CardDescription>
              </CardHeader>
              <CardContent className="h-[380px]">
                <ProfileChart d={d} idx={latIdx} colors={colors} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Where samples were taken</CardTitle>
                <CardDescription>Uses both filters. Cruise tracks are visible; no coastlines are drawn.</CardDescription>
              </CardHeader>
              <CardContent className="h-[380px]">
                <MapChart d={d} idx={idx} colors={colors} />
              </CardContent>
            </Card>
          </div>

          <ul aria-label="Survey period colours" className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {ERA_LABELS.map((l, k) => (
              <li key={l} className="flex items-center gap-1.5">
                <span className={`size-2.5 rounded-full ${ERA_CLASSES[k]}`} />{l}
              </li>
            ))}
          </ul>
        </div>
      )}

      <footer className="mt-8 space-y-1 text-xs text-muted-foreground">
        {d && (
          <p>
            {fmtN(d.meta.kept)} of {fmtN(d.meta.total_rows)} measurements shown; {d.meta.dropped_out_of_range} dropped
            as implausible (outside {d.meta.valid_range[0]} to {d.meta.valid_range[1]}‰).
          </p>
        )}
        <p>
          Data not quality controlled; accuracy about 0.1–0.2‰ per NOAA. Source:{" "}
          <a className="underline underline-offset-2" href="https://www.ncei.noaa.gov/access/ocean-carbon-acidification-data-system/oceans/Schmittner13bg.html">NOAA NCEI</a>,
          doi:<a className="underline underline-offset-2" href="https://doi.org/10.5194/bg-10-5793-2013">10.5194/bg-10-5793-2013</a>.
        </p>
      </footer>
    </main>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Explorer />
    </ThemeProvider>
  )
}
