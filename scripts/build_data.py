#!/usr/bin/env python3
"""Convert NOAA's d13c.dat into the compact JSON the web app loads.

Usage: python3 scripts/build_data.py [path/to/d13c.dat]

Without an argument the file is downloaded to data/raw/ (git-ignored).
Column layout is documented in the dataset README (see README.md).
"""
import json
import sys
import urllib.request
from pathlib import Path

URL = "https://www.ncei.noaa.gov/data/oceans/ncei/ocads/data/0157698/d13c.dat"
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "web" / "public" / "data" / "d13c.json"

# Column indexes in d13c.dat (whitespace separated).
LON, LAT, YEAR, DEPTH, D13C = 0, 1, 4, 5, 14
MISSING = -999
# δ13C of DIC in seawater sits roughly between -1.5 and +3.5 permil; three
# rows near -6 are almost certainly bad values, so they are dropped.
D13C_MIN, D13C_MAX = -3.0, 4.0


def main():
    if len(sys.argv) > 1:
        src = Path(sys.argv[1])
    else:
        src = ROOT / "data" / "raw" / "d13c.dat"
        if not src.exists():
            src.parent.mkdir(parents=True, exist_ok=True)
            print(f"Downloading {URL}")
            urllib.request.urlretrieve(URL, src)

    cols = {k: [] for k in ("year", "lat", "lon", "depth", "d13c")}
    total = dropped_missing = dropped_range = 0
    for line in src.read_text().splitlines():
        f = line.split()
        if not f:
            continue
        total += 1
        d13c = float(f[D13C])
        if d13c <= MISSING:
            dropped_missing += 1
            continue
        if not D13C_MIN <= d13c <= D13C_MAX:
            dropped_range += 1
            continue
        cols["year"].append(int(float(f[YEAR])))
        cols["lat"].append(round(float(f[LAT]), 2))
        cols["lon"].append(round(float(f[LON]), 2))
        cols["depth"].append(round(float(f[DEPTH])))
        cols["d13c"].append(round(d13c, 2))

    cols["meta"] = {
        "source": "Schmittner et al. 2013, NOAA NCEI 0157698",
        "total_rows": total,
        "kept": len(cols["year"]),
        "dropped_missing": dropped_missing,
        "dropped_out_of_range": dropped_range,
        "valid_range": [D13C_MIN, D13C_MAX],
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(cols, separators=(",", ":")))
    print(f"Wrote {OUT} ({OUT.stat().st_size // 1024} KiB): {cols['meta']}")


if __name__ == "__main__":
    main()
