# d13c-noaancei
Global compilation of Carbon-13 measurements dataset from NOAA National Center for Environmental Information

## Original Dataset

Schmittner, A., Gruber, N., Mix, A. C., Key, R. M., Tagliabue, A., and Westberry, T. K.: Biology and air–sea gas exchange controls on the distribution of carbon isotope ratios (δ13C) in the ocean, Biogeosciences, 10, 5793-5816, doi:10.5194/bg-10-5793-2013, 2013.

Link to NOAA NCEI page:
[https://www.ncei.noaa.gov/access/ocean-carbon-acidification-data-system/oceans/Schmittner13bg.html](https://www.ncei.noaa.gov/access/ocean-carbon-acidification-data-system/oceans/Schmittner13bg.html)

Data found here: [https://www.ncei.noaa.gov/data/oceans/ncei/ocads/data/0157698/](https://www.ncei.noaa.gov/data/oceans/ncei/ocads/data/0157698/)

## What is NetCDF?

- [https://www.unidata.ucar.edu/blogs/news/entry/netcdf-java-version-5-6](https://www.unidata.ucar.edu/blogs/news/entry/netcdf-java-version-5-6)
- [https://github.com/Unidata/netcdf-java/releases/tag/v5.6.0](https://github.com/Unidata/netcdf-java/releases/tag/v5.6.0)
- [https://archive.unidata.ucar.edu/software/netcdf/examples/files.html](https://archive.unidata.ucar.edu/software/netcdf/examples/files.html)

## Web app

An interactive explorer for the data lives in [`web/`](web/): Vite, React, TypeScript, Tailwind CSS v4 and [shadcn/ui](https://ui.shadcn.com), with charts drawn by Chart.js. It has a light/dark/system theme toggle (saved in `localStorage`).

- Average δ13C by year (±1 SD band, per-year sample counts, optional individual measurements)
- δ13C vs. depth profile and a map of where samples were taken
- Filters for depth range and latitude band, plus a table view

```bash
cd web
npm install
npm run dev     # http://localhost:5173
npm run build   # type-check and build to web/dist
```

Add more shadcn components from `web/` with `npx shadcn@latest add <component>`.

`web/public/data/d13c.json` is generated from NOAA's `d13c.dat` by `scripts/build_data.py` (downloads the file to `data/raw/` if you don't pass a path). The script drops 3 implausible values (about -6‰). To regenerate: `python3 scripts/build_data.py`.

### Reading the charts

The data is a set of ship measurements from 1990–2005, not a monitoring time series. Different years sampled different oceans and depths, so year-to-year changes in the average mostly reflect where ships went. The surface-only view with a narrow latitude band is the most meaningful for looking at trends.

