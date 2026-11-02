# Carbon-13 (δ13C) and global warming: a beginner primer

Reading time: about 25 minutes. Written 2026-11-02. Every link below was opened or checked on that date (see [Sources](#sources)). Anything I could not confirm in a primary source is labelled **unverified**.

This primer supports the NOAA NCEI ocean δ13C_DIC dataset (Schmittner et al. 2013) used in this repo. That dataset is treated here as a teaching dataset, not a reference-grade one.

## What you will learn

1. What carbon-13 is and what "δ13C" means.
2. Why living things, especially marine plankton, make carbon that is low in 13C.
3. Why fossil fuel burning pushes the atmosphere's δ13C down (the Suess effect), and how that connects to global warming.
4. How δ13C of dissolved inorganic carbon (DIC) varies across the ocean.
5. How to read this repo's dataset, and what its caveats are.

---

## 1. Carbon-12, carbon-13 and the δ13C notation

### 1.1 Two stable isotopes

Carbon atoms come in different weights, called isotopes. Two of them are stable (they do not decay): carbon-12 (12C) and carbon-13 (13C). NOAA's explainer says that almost 99% of carbon atoms are 12C ([NOAA GML, Stable Carbon and the Carbon Cycle](https://gml.noaa.gov/ccgg/isotopes/stable.html)). Schmittner et al. put 13C at about 1.1% of total carbon ([Schmittner et al. 2013, Sect. 2](https://bg.copernicus.org/articles/10/5793/2013/bg-10-5793-2013.pdf)). A third isotope, 14C (radiocarbon), appears only in trace amounts (same paper, Sect. 2) and, unlike the other two, is not stable ([NOAA GML](https://gml.noaa.gov/ccgg/isotopes/stable.html) says 12C and 13C do not decay). It shows up later as the "d14C" column in the dataset.

Chemically, 12C and 13C behave almost the same, but 13C is slightly heavier. That small difference lets physical, chemical and biological processes slightly favour one over the other. That favouring is called **fractionation**, and it is the whole reason δ13C is useful.

### 1.2 The δ13C formula

Scientists compare the ratio R = 13C/12C of a sample with the ratio of a reference standard. Schmittner et al. write it as

> δ13C = (R_sample / R_standard − 1), reported in parts per thousand (per mil, ‰)

and say the standard is, by convention, Pee Dee Belemnite (PDB) ([Schmittner et al. 2013, Sect. 1](https://bg.copernicus.org/articles/10/5793/2013/bg-10-5793-2013.pdf)). In practice you multiply the result by 1000 to get ‰. NOAA's "Determining Delta Values" page gives the same recipe ([NOAA GML, Determining Delta Values](https://gml.noaa.gov/ccgg/isotopes/deltavalues.html)).

- **Per mil (‰)** means "per thousand". Ratios sit very close to 1, so the interesting differences only appear a few decimal places in. Multiplying by 1000 turns them into readable numbers ([NOAA GML, Determining Delta Values](https://gml.noaa.gov/ccgg/isotopes/deltavalues.html)).
- **Why a deviation from a standard?** Mass spectrometers measure ratios relative to a standard much more precisely than absolute ratios. Dividing by a standard cancels errors that affect both measurements, so labs and decades can be compared ([NOAA GML, Determining Delta Values](https://gml.noaa.gov/ccgg/isotopes/deltavalues.html)).
- **VPDB.** PDB was a limestone from South Carolina and is no longer available. Labs use carbonate reference materials tied to the PDB scale ([NOAA GML, Determining Delta Values](https://gml.noaa.gov/ccgg/isotopes/deltavalues.html)). The modern name is "VPDB". It is defined as a scale, anchored by the reference material NBS 19 at +1.95‰ ([Moossen et al., Rapid Commun. Mass Spectrom., 2025/2026](https://pmc.ncbi.nlm.nih.gov/articles/PMC12676516/)). For this primer, "PDB" and "VPDB" can be read as the same zero point.
- **Reading the sign.** A *negative* δ13C means "less 13C than the standard", i.e. isotopically *light*. A *more negative* number means *more depleted* in 13C. A *higher* (less negative or positive) number is isotopically *heavy*.

### 1.3 A small worked example

NOAA lists the PDB standard ratio as 0.011237 ([NOAA GML, Determining Delta Values](https://gml.noaa.gov/ccgg/isotopes/deltavalues.html)). Use that as R_standard.

| Sample | δ13C | Calculation | R_sample (13C/12C) |
|---|---|---|---|
| The standard itself | 0 ‰ | 0.011237 / 0.011237 − 1 = 0 | 0.011237 |
| Land plants (NOAA's "terrestrial biosphere" value) | about −26 ‰ | 0.011237 × (1 − 0.026) | 0.010945 |
| Typical surface-ocean DIC | about +1.5 ‰ | 0.011237 × (1 + 0.0015) | 0.011254 |

The −26 ‰ ratio (0.010945) is the value NOAA tabulates for the terrestrial biosphere. The +1.5 ‰ row is my own arithmetic, using the observed 1990-2005 global mean surface DIC value from [Schmittner et al. 2013, Sect. 5.2.2](https://bg.copernicus.org/articles/10/5793/2013/bg-10-5793-2013.pdf).

Going the other way: if a sample has R = 0.011142, then δ13C = (0.011142 / 0.011237 − 1) × 1000 = about −8.5 ‰. (NOAA tabulates 0.011142 for the "ocean and atmosphere" at −8 ‰, so the rounding is visible.)

Scale check: the atmosphere's change since preindustrial times, about 1.5 ‰ (Section 3), is a change of about 0.15% in the 13C/12C ratio. Tiny, but measurable.

---

## 2. Fractionation: why living things make "light" carbon

During photosynthesis, organisms take up 12C a little more readily than 13C. NOAA says plants take in 12C in preference to 13C, and that diffusion of CO2 into leaves also favours the lighter 12C ([NOAA GML, Stable Carbon and the Carbon Cycle](https://gml.noaa.gov/ccgg/isotopes/stable.html)). Result: plant material has less 13C than the air it came from.

Typical values, from [Schmittner et al. 2013, Sect. 1](https://bg.copernicus.org/articles/10/5793/2013/bg-10-5793-2013.pdf) (who cite O'Leary 1988 for the land plant numbers):

| Carbon pool | Typical δ13C |
|---|---|
| Atmospheric CO2 (preindustrial to recent) | about −6 to −7 ‰ |
| Land plants, C3 pathway | about −28 ‰ |
| Land plants, C4 pathway | about −14 ‰ |
| Bulk marine organic matter (plankton) | about −21 ‰ |
| Mean surface-ocean DIC (dissolved inorganic carbon) | near +2 ‰ |
| Calcium carbonate shells | close to the ambient seawater value |

Notes for beginners:

- **C3 vs C4.** These are two photosynthesis pathways. Most trees, and many crops like wheat and rice, are C3. Some grasses, maize and sugarcane are C4. C4 plants discriminate less against 13C. This is why their values (−14 ‰) are less negative. (The −28/−14 ‰ values are from the paper above. The examples of which plants are C3 or C4 are general knowledge that I did not verify in a cited source: **unverified**.)
- **Marine plankton fractionate too.** Ocean phytoplankton also pick 12C preferentially, giving organic matter near −21 ‰ against DIC near +2 ‰ ([Schmittner et al. 2013, Sect. 1](https://bg.copernicus.org/articles/10/5793/2013/bg-10-5793-2013.pdf)). The size of the preference varies with species and conditions, and the paper notes that how plankton take up CO2 is still debated (Sect. 2.2 of the same paper).
- **Fossil fuels are old plant and animal material.** Oil and coal therefore carry the same kind of light fingerprint as plants. NOAA quotes plants at about −25 ‰ ([NOAA GML, What 13C tells us](https://gml.noaa.gov/ccgg/isotopes/c13tellsus.html)).
- **Carbonate is different.** Making calcium carbonate shells barely fractionates carbon (same Schmittner Sect. 1 and Sect. 2.2). Organic carbon is light; carbonate carbon stays close to seawater.

The key idea: *when plankton grow, they strip 12C out of surface water, leaving surface DIC heavier. When the plankton sink and decay at depth, the light carbon is released there, leaving deep DIC lighter.* Section 4 builds on this.

---

## 3. The Suess effect: fossil carbon lowers atmospheric δ13C

### 3.1 The idea

Fossil fuels are very depleted in 13C (and contain no 14C). When we burn them, we add light CO2 to the atmosphere. The atmosphere's δ13C therefore falls as CO2 rises. This decline is called the **Suess effect** ([NOAA GML, What 13C tells us](https://gml.noaa.gov/ccgg/isotopes/c13tellsus.html)). The IPCC's assessment lists falling atmospheric δ13C-CO2 as one of several independent lines of evidence that the CO2 rise comes from burning fossil fuels, alongside the north-south CO2 gradient, falling oxygen, and falling 14C ([IPCC AR6 WG1, Chapter 5, Sect. 5.2.1.1](https://www.ipcc.ch/report/ar6/wg1/downloads/report/IPCC_AR6_WGI_Chapter05.pdf)).

An intuitive picture: the atmosphere is like a bucket of slightly heavy water. Pouring in lots of lighter water makes the mix lighter, even if the bucket is large.

### 3.2 The numbers

| Quantity | Value | Source |
|---|---|---|
| Atmospheric δ13C-CO2, before the Industrial Revolution | approx. −6.5 ‰ | [NOAA GML](https://gml.noaa.gov/ccgg/isotopes/c13tellsus.html); Schmittner et al. also use −6.5 ‰, citing Francey et al. 1999 ([Sect. 3](https://bg.copernicus.org/articles/10/5793/2013/bg-10-5793-2013.pdf)) |
| Atmospheric δ13C-CO2, "now" (undated) | around −8 ‰ | [NOAA GML](https://gml.noaa.gov/ccgg/isotopes/c13tellsus.html) |
| Decline from preindustrial to year 2000 | about 1.5 ‰ | [Schmittner et al. 2013, Sect. 3](https://bg.copernicus.org/articles/10/5793/2013/bg-10-5793-2013.pdf) |
| Scripps Mauna Loa record, seasonally adjusted, Feb 1980 | −7.55 ‰ | [Scripps monthly 13C file](https://keelinglabsites.ucsd.edu/websitedataco2/monthly_flask_c13_mlo.csv) |
| Scripps Mauna Loa record, seasonally adjusted, Dec 2024 | −8.75 ‰ | [Scripps monthly 13C file](https://keelinglabsites.ucsd.edu/websitedataco2/monthly_flask_c13_mlo.csv) |

Points to keep in mind:

- The Scripps file says the isotope data are on the "Scripps Isotope scale" and may be revised after recalibration ([Scripps file header](https://keelinglabsites.ucsd.edu/websitedataco2/monthly_flask_c13_mlo.csv)). Different labs (Scripps, NOAA/INSTAAR) maintain their own scales and sites, so compare numbers only **within one record**, not between labs. The Scripps trend from Feb 1980 to Dec 2024 is about −1.2 ‰ over 44 years.
- **A value like "−8.4 ‰ today" is not something I could confirm.** Scripps shows about −8.7 ‰ for 2024 on its own scale, and NOAA's explainer says "around −8 ‰" without a date. I did not find a NOAA/INSTAAR numerical δ13C-CO2 data file to give a date-stamped NOAA number. Use the Scripps file, or NOAA's data finder, for a precise current figure.
- Mauna Loa is a single site, and the series has a seasonal cycle, which is why Scripps provides seasonally adjusted columns.

### 3.3 Connection to global warming

δ13C is not a greenhouse gas and not a thermometer. It is a **fingerprint** that tells us where extra CO2 came from. The warming link works in two steps.

1. **CO2 is rising because of people.** The IPCC reports annual-mean CO2 of 410 ppm in 2019, with the increase since about 1750 unequivocally caused by human activities ([IPCC AR6 WG1 SPM, A.1.1](https://www.ipcc.ch/report/ar6/wg1/downloads/report/IPCC_AR6_WGI_SPM.pdf)). Chapter 5 puts 2019 CO2 at 409.9 ppm, about 47% above 1750 levels ([IPCC AR6 WG1, Chapter 5, executive summary](https://www.ipcc.ch/report/ar6/wg1/downloads/report/IPCC_AR6_WGI_Chapter05.pdf)). NOAA's Mauna Loa monthly average was 426.07 ppm for September 2026 (page last updated 9 Oct 2026) ([NOAA GML, Trends in CO2](https://gml.noaa.gov/ccgg/trends/)).
2. **That CO2 is warming the planet.** The IPCC states that global surface temperature in 2011-2020 was 1.09 [0.95 to 1.20] °C higher than 1850-1900 ([IPCC AR6 WG1 SPM, A.1.2](https://www.ipcc.ch/report/ar6/wg1/downloads/report/IPCC_AR6_WGI_SPM.pdf)).

The δ13C record is the evidence that ties step 1 to *fossil fuel* specifically, because it falls in step with CO2 and with the expected light fossil signal.

### 3.4 The ocean Suess effect

The ocean takes up a large share of our CO2. For 2010-2019, the IPCC budget says about 46% of human CO2 emissions stayed in the atmosphere, 23% went into the ocean (about 2.5 PgC per year), and 31% into land ecosystems ([IPCC AR6 WG1, Chapter 5, executive summary](https://www.ipcc.ch/report/ar6/wg1/downloads/report/IPCC_AR6_WGI_Chapter05.pdf)). The IPCC also states that land and ocean together have absorbed a near-constant share, about 56% per year, over six decades ([IPCC AR6 WG1 SPM, A.1.1](https://www.ipcc.ch/report/ar6/wg1/downloads/report/IPCC_AR6_WGI_SPM.pdf)).

Because the extra CO2 is isotopically light, ocean DIC gets lighter too. That is the **oceanic Suess effect**. It is smaller and slower than in the atmosphere:

- Air-sea equilibration for the δ13C of DIC takes about 10 years, versus about 1 year for the CO2 concentration itself ([Schmittner et al. 2013, Sect. 1](https://bg.copernicus.org/articles/10/5793/2013/bg-10-5793-2013.pdf)). So the ocean surface lags the atmosphere.
- The Schmittner model suggests preindustrial global-mean surface δ13C_DIC was 2.3 ‰, about 0.67 ‰ higher than in the 1990s, consistent with earlier observation-based estimates (Broecker and Maier-Reimer 1992: 0.7 ‰ for the 1970s; Sonnerup et al. 2007: 0.76 ± 0.12 ‰) ([Schmittner et al. 2013, Sect. 5.2.2](https://bg.copernicus.org/articles/10/5793/2013/bg-10-5793-2013.pdf)).
- Between the 1980s and the 1990s, observed surface decreases ranged from about 0.04 ‰ at high latitudes to 0.2 ‰ in the subtropics, with about 0.14 ‰ in the tropics (same section; the paper says this agrees with Quay et al. 2003 and Gruber et al. 1999).
- The model's surface-to-deep difference shrank from about 1.7 ‰ (preindustrial, model) to about 1.0 ‰ in the 1990s observations, because light anthropogenic carbon has invaded the upper ocean ([Schmittner et al. 2013, Sect. 5.2.3](https://bg.copernicus.org/articles/10/5793/2013/bg-10-5793-2013.pdf)).

Because of this, any ocean δ13C data from 1990-2005, including this repo's dataset, already contains an anthropogenic signal.

### 3.5 Where to go deeper

The classic reference for the 13C Suess effect is Keeling 1979, "The Suess effect: 13Carbon-14Carbon interrelations", *Environment International* 2, 229-300 ([DOI link](https://doi.org/10.1016/0160-4120%2879%2990005-9); **I could not read its abstract, so I cite it as further reading only**). For the ocean, see Gruber et al. 1999 (*Global Biogeochemical Cycles* 13, 307-335; [repository record](https://boris.unibe.ch/158809); **I could not read it either**) and Quay et al. 2003 (*Global Biogeochemical Cycles* 17, 1004; doi:10.1029/2001GB001817, not linked because the publisher site blocks automated link checks). Bibliographic details for the last two come from Schmittner et al.'s reference list.

---

## 4. How ocean δ13C_DIC varies in space (Schmittner et al. 2013)

Schmittner et al. combine the new 1990-2005 compilation with a 3-D model of the ocean's carbon-13 cycle ([abstract](https://bg.copernicus.org/articles/10/5793/2013/)). Their main message: **biology sets the main spatial patterns, air-sea gas exchange partly smooths and partly opposes them, and fossil carbon has been flattening them.**

### 4.1 Four ingredients

1. **Biological pump (the dominant factor).** Plankton take up light carbon at the surface; sinking organic matter carries it down and releases it on decay. This lowers δ13C_DIC at depth and in high-latitude surface waters, and raises it in the low-latitude upper ocean ([abstract](https://bg.copernicus.org/articles/10/5793/2013/)).
2. **Air-sea gas exchange, effect 1: smoothing.** Exchange with the atmosphere reduces the gradients that biology creates (abstract).
3. **Air-sea gas exchange, effect 2: temperature-dependent fractionation.** Colder water ends up with higher δ13C_DIC and warmer water with lower. This opposes the biological pattern (abstract). The paper quantifies it as roughly 1 ‰ lower for every 10 °C of warming, if the ocean fully equilibrated with the atmosphere ([Sect. 5.1.1](https://bg.copernicus.org/articles/10/5793/2013/bg-10-5793-2013.pdf)). It does not fully equilibrate, because gas exchange is slow.
4. **Water-mass age.** Deep-water δ13C_DIC is roughly anti-correlated with nutrients and with apparent oxygen utilization (AOU). Young North Atlantic Deep Water, which sank recently, has low nutrients and high δ13C. Old Pacific Deep Water has accumulated much remineralized organic matter, so it has high nutrients and low δ13C ([Sect. 1](https://bg.copernicus.org/articles/10/5793/2013/bg-10-5793-2013.pdf)).

The paper reports that biology wins at the surface and at depth because gas exchange is slow in the modern ocean. This differs from conclusions of some earlier studies (abstract). Minor effects: calcium carbonate cycling, the pH dependence of fractionation, and kinetic fractionation (abstract).

### 4.2 Typical ranges

All numbers are from [Schmittner et al. 2013](https://bg.copernicus.org/articles/10/5793/2013/bg-10-5793-2013.pdf). Section numbers are given in the table. "Observed" means the 1990-2005 compilation; "model" means the paper's simulations.

| Feature | Value | Where |
|---|---|---|
| Global mean surface δ13C_DIC (observed) | 1.5 ‰ | Sect. 5.2.2 |
| Zonally averaged surface values (observed) | between 1 and 2 ‰ | Sect. 5.2.2 |
| Full range of measured surface values | 0.5 to 2.4 ‰ | Sect. 5.2.2 |
| Surface-to-deep gradient, global mean (observed) | 1.0 ‰ | Sect. 5.2.3 |
| Deep water, highest (observed) | about 1 ‰, North Atlantic | Sect. 5.2.3 |
| Deep water, lowest (observed) | below −0.6 ‰, North Pacific near 1 km | Sect. 5.2.3 |
| Difference between ocean basins in deep water | about 1.6 ‰ | Sect. 5.2.3 |
| Preindustrial surface ocean (model, standard run) | below 1 ‰ near Antarctica to above 2.6 ‰ in the tropics | Sect. 5.1.1 |
| Preindustrial deep ocean, zonal mean (model) | 1.6 ‰ (North Atlantic) to −0.2 ‰ (North Pacific) | Sect. 5.1.2 |

Reading the table:

- **Depth.** Surface water is heavy (about +1 to +2 ‰) and deep water is lighter. Deep-ocean averages are lower than surface values because remineralized plankton carbon (about −21 ‰) is added at depth ([Sect. 4](https://bg.copernicus.org/articles/10/5793/2013/bg-10-5793-2013.pdf)).
- **Basins.** The deep Atlantic is high (young water), the deep North Pacific is lowest (old water, much remineralized carbon).
- **Latitude.** In the preindustrial model, surface values run from below 1 ‰ around Antarctica to above 2.6 ‰ in the tropics, with the biggest north-south contrast across the Southern Ocean (Sect. 5.1.1). Observed surface values are fairly uniform over most of the ocean, with zonal means of 1 to 2 ‰. The paper links this to fossil carbon reducing the preindustrial gradients, most strongly in the subtropics ([Sect. 5.2.2 and Sect. 6](https://bg.copernicus.org/articles/10/5793/2013/bg-10-5793-2013.pdf)). The observed surface map is patchy (e.g. higher values in the western equatorial Pacific and tropical Atlantic, lower in the Indian Ocean and in the subtropical North Atlantic), as described in Sect. 5.2.2.
- **Uncertainty.** The paper notes the model has biases, including values too high by about 0.09 ‰ globally in the interior, and says model details such as iron limitation matter (Sect. 5.2.3 and abstract).

---

## 5. How to read this repo's dataset

### 5.1 What it is

The NCEI page "Global compilation of Carbon-13 measurements during 1990-2005 in dissolved inorganic carbon (δ13C_DIC)" ([NCEI OCADS page](https://www.ncei.noaa.gov/access/ocean-carbon-acidification-data-system/oceans/Schmittner13bg.html)) describes the compilation behind Schmittner et al. 2013. The facts below are from that page and the paper's Appendix A ([Schmittner et al. 2013, App. A](https://bg.copernicus.org/articles/10/5793/2013/bg-10-5793-2013.pdf)):

- **18,670 measurements** from **1990-2005**, all oceans and all depths.
- **Sources:** 17,989 data points from the GLODAP and CARINA collections, extracted from CDIAC's WAVES system on 27 August 2010; plus 632 measurements from the Keeling laboratory at Scripps (1990-1998); plus 50 measurements from one northeast Pacific transect from Oregon State University.
- **Pre-1990 data are excluded** (for example GEOSECS and TTO).
- **Not quality controlled** at CDIAC. The authors removed two cruises with obviously bad data from GLODAP and one from CARINA, and dropped bottle numbers above 70 on seven GLODAP cruises to exclude large-volume samples.
- **Accuracy about 0.1-0.2 ‰**, because inter-laboratory calibration issues were unresolved.

Small oddity: the three component counts shown on the NCEI page add up to 18,671, not 18,670 ([NCEI OCADS page](https://www.ncei.noaa.gov/access/ocean-carbon-acidification-data-system/oceans/Schmittner13bg.html)). It is a one-record discrepancy that I could not resolve from the page alone.

### 5.2 The files

All files are in the NCEI data directory ([directory listing](https://www.ncei.noaa.gov/data/oceans/ncei/ocads/data/0157698/)).

| File | Size (listing) | What it is |
|---|---|---|
| [README](https://www.ncei.noaa.gov/data/oceans/ncei/ocads/data/0157698/README) | 1 KB | Column list and a Fortran read example. |
| [d13c.dat](https://www.ncei.noaa.gov/data/oceans/ncei/ocads/data/0157698/d13c.dat) | 3.7 MB | The main ASCII table, one row per measurement. |
| [d13c.dat.txt](https://www.ncei.noaa.gov/data/oceans/ncei/ocads/data/0157698/d13c.dat.txt) | 3.7 MB | Listed beside d13c.dat; the same size suggests a copy with a .txt name (I did not diff them, so this is **unverified**). |
| [d13c.nc](https://www.ncei.noaa.gov/data/oceans/ncei/ocads/data/0157698/d13c.nc) | 90 MB | NetCDF file; per the README, the data gridded on the World Ocean Atlas grid. |
| [c13_CDIAC.xlsx](https://www.ncei.noaa.gov/data/oceans/ncei/ocads/data/0157698/c13_CDIAC.xlsx) | 7.1 MB | Excel file with the CDIAC data only (README). |
| [Model/](https://www.ncei.noaa.gov/data/oceans/ncei/ocads/data/0157698/Model/) | folder | Contains `code/`, `data/`, `updates/`, `control.in` and `mk.in` (directory listing). Presumably the model code and inputs (**unverified**; I did not open it). |
| [oceanbt/](https://www.ncei.noaa.gov/data/oceans/ncei/ocads/data/0157698/oceanbt/) | folder | One XML metadata record. |

### 5.3 The 20 columns of d13c.dat

The README lists these variables, in this order, and gives a Fortran snippet to read them (free-format, space-separated) ([README](https://www.ncei.noaa.gov/data/oceans/ncei/ocads/data/0157698/README)). **The README gives no units.**

| # | Column | Units status |
|---|---|---|
| 1 | longitude | Not stated. |
| 2 | latitude | Not stated. |
| 3 | month | Calendar month (integer in the Fortran snippet). |
| 4 | day | Day of month (integer). |
| 5 | year | Year (integer). |
| 6 | depth | Not stated. |
| 7 | temperature | Not stated. |
| 8 | salinity | Not stated. |
| 9 | CFC-11 | Not stated. |
| 10 | CFC-12 | Not stated. |
| 11 | total CO2 | Not stated. |
| 12 | alkalinity | Not stated. |
| 13 | anthropogenic CO2 | Not stated. |
| 14 | radiocarbon (d14C) | Not stated. |
| 15 | **d13C** | **per mil (‰)**, documented (see below). |
| 16 | AOU (apparent oxygen utilization) | Not stated. |
| 17 | potential temperature | Not stated. |
| 18 | sigma-0 | Not stated. |
| 19 | sigma-2 | Not stated. |
| 20 | sigma-4 | Not stated. |

What is and is not documented:

- **δ13C is in ‰.** The NCEI page says so, the paper uses ‰ throughout, and the OCADS XML metadata lists the variable as `DEL13C` with the description `/MILLE` ([NCEI OCADS page](https://www.ncei.noaa.gov/access/ocean-carbon-acidification-data-system/oceans/Schmittner13bg.html); [OCADS XML record](https://www.ncei.noaa.gov/data/oceans/ncei/ocads/data/0157698/oceanbt/mercury-ops2.ornl.gov_OceanOME_admin_OceanMetadata_discrete_Global_compilation_of_Carbon_13_measurements_during_1990_2005_in_dissolved_inorganic_carbon_d13C_DIC_.xml)). The XML lists no other variables.
- **Everything else: units unverified.** I did not find a primary source stating the units of the other columns as used in this file. The source databases (GLODAP: [NCEI GLODAP data page](https://www.ncei.noaa.gov/access/ocean-carbon-acidification-data-system/oceans/glodap/GlopDV.html), [glodap.info](https://glodap.info/)) are where to look, but the pages I opened do not list per-variable units. Work out units from the source cruise documentation before using these columns quantitatively.
- Two small hints from the paper, not statements about this file: sea-surface temperature is in °C in the paper's equations (Eq. 5, Sect. 2.1), and the paper expresses Δ14C changes in ‰ (Sect. 2.1) ([Schmittner et al. 2013](https://bg.copernicus.org/articles/10/5793/2013/bg-10-5793-2013.pdf)). The paper defines AOU as saturation oxygen minus measured oxygen (Sect. 4) and does not give units in the passage I read.
- **What I saw in the first rows** (a peek at the top of [d13c.dat](https://www.ncei.noaa.gov/data/oceans/ncei/ocads/data/0157698/d13c.dat); this is my observation, not documentation): the first station is at 28.27 and −33.39 (columns 1 and 2) on 22 Feb 1996, with depth rising from 9 to 1643 and d13C falling from 1.2 near the surface to 0.5 at the deepest listed depth. Missing values appear as `-999` in these rows (for example in the d14C column). The README does not mention a missing-value code, so treat `-999` as **unverified** until you check the whole file.

### 5.4 NetCDF in two minutes

NetCDF is a family of software libraries and machine-independent file formats for creating, accessing and sharing array-oriented scientific data, and is a community standard for that purpose ([Unidata NetCDF](https://www.unidata.ucar.edu/software/netcdf/)). A NetCDF file holds named *variables* (arrays) with *dimensions* (such as longitude, latitude, depth) and *attributes* (text such as units). Unlike d13c.dat, which is one row per measurement, d13c.nc is gridded on the World Ocean Atlas grid (README), so it holds averaged values on a regular 3-D grid.

Where to learn more: the [NetCDF User's Guide](https://docs.unidata.ucar.edu/nug/current/index.html) and its [introduction](https://docs.unidata.ucar.edu/nug/current/netcdf_introduction.html). Unidata's page says Python interfaces exist ([Unidata NetCDF](https://www.unidata.ucar.edu/software/netcdf/)). I did not open the 90 MB file, so I cannot say which variable names or unit attributes it contains. Check its attributes first, because they may settle the units question in 5.3.

### 5.5 Caveats checklist

- It is a **1990-2005 snapshot**. Values already include an anthropogenic (Suess) signal (Section 3.4).
- **Not quality controlled** at the source, with an estimated **accuracy of 0.1-0.2 ‰** (NCEI page; Schmittner App. A). That is comparable to the year-to-year signals you might hope to see, so be careful with fine differences.
- **Pre-1990 data excluded** (GEOSECS, TTO), so no early baseline.
- **Mixed sources:** GLODAP/CARINA cruises, one Scripps set, one Oregon State transect, each with its own calibration history. The paper blames "unresolved intercalibration issues between laboratories" for the accuracy limit.
- **Uneven coverage in space and time**: it comes from research cruises, not a regular grid. I did not quantify coverage.
- **No separate dataset DOI.** The DOI shown on the NCEI page (10.5194/bg-10-5793-2013) is the DOI of the *paper*, and I saw no distinct DOI for the data themselves on that page. The OCADS XML cites the discussion version of the paper (Biogeosciences Discussions), not the final one. Cite the final paper: Schmittner, A., Gruber, N., Mix, A. C., Key, R. M., Tagliabue, A., and Westberry, T. K. (2013), *Biogeosciences* 10, 5793-5816, [doi:10.5194/bg-10-5793-2013](https://doi.org/10.5194/bg-10-5793-2013).
- **Related data:** the NCEI page says the Keeling dataset is also at NCEI accession 0115689 ([NCEI OCADS page](https://www.ncei.noaa.gov/access/ocean-carbon-acidification-data-system/oceans/Schmittner13bg.html)).

---

## Sources

All checked on **2026-11-02**. "Opened" means I read the content; "status 200" means the URL resolved (HTTP 200 with redirects followed). Where a publisher blocks automated checks (HTTP 403), I list the citation without a link.

**Primary papers and data**

- https://bg.copernicus.org/articles/10/5793/2013/ : Schmittner et al. 2013, journal page with abstract. Opened.
- https://bg.copernicus.org/articles/10/5793/2013/bg-10-5793-2013.pdf : Full text of the same paper. Opened (sections cited above).
- https://doi.org/10.5194/bg-10-5793-2013 : DOI link for the paper. Status 200.
- https://www.ncei.noaa.gov/access/ocean-carbon-acidification-data-system/oceans/Schmittner13bg.html : NCEI OCADS dataset page. Opened.
- https://www.ncei.noaa.gov/data/oceans/ncei/ocads/data/0157698/ : Data directory listing. Opened.
- https://www.ncei.noaa.gov/data/oceans/ncei/ocads/data/0157698/README : Dataset README (column list). Opened.
- https://www.ncei.noaa.gov/data/oceans/ncei/ocads/data/0157698/d13c.dat : Main ASCII table. Status 200; only the first lines were viewed.
- https://www.ncei.noaa.gov/data/oceans/ncei/ocads/data/0157698/d13c.dat.txt : Same-size text copy. Status 200 only.
- https://www.ncei.noaa.gov/data/oceans/ncei/ocads/data/0157698/d13c.nc : Gridded NetCDF file. Status 200 only; not opened.
- https://www.ncei.noaa.gov/data/oceans/ncei/ocads/data/0157698/c13_CDIAC.xlsx : CDIAC-only Excel file. Status 200 only; not opened.
- https://www.ncei.noaa.gov/data/oceans/ncei/ocads/data/0157698/Model/ : Model folder listing. Opened (listing only).
- https://www.ncei.noaa.gov/data/oceans/ncei/ocads/data/0157698/oceanbt/ : Metadata folder listing. Opened.
- https://www.ncei.noaa.gov/data/oceans/ncei/ocads/data/0157698/oceanbt/mercury-ops2.ornl.gov_OceanOME_admin_OceanMetadata_discrete_Global_compilation_of_Carbon_13_measurements_during_1990_2005_in_dissolved_inorganic_carbon_d13C_DIC_.xml : OCADS XML metadata record. Opened.
- https://www.ncei.noaa.gov/access/ocean-carbon-acidification-data-system/oceans/glodap/GlopDV.html : NCEI GLODAP data page (no per-variable units found). Opened.
- https://glodap.info/ : GLODAP project site (no δ13C or unit details found). Opened.

**Atmosphere, Suess effect, climate**

- https://gml.noaa.gov/ccgg/isotopes/c13tellsus.html : NOAA GML, "What 13C tells us" (preindustrial and current δ13C, Suess effect). Opened.
- https://gml.noaa.gov/ccgg/isotopes/stable.html : NOAA GML, stable carbon and the carbon cycle (abundance, photosynthesis). Opened.
- https://gml.noaa.gov/ccgg/isotopes/deltavalues.html : NOAA GML, how delta values are determined (formula idea, PDB ratio table). Opened.
- https://gml.noaa.gov/ccgg/trends/ : NOAA GML, Mauna Loa CO2 monthly values (Sept 2026: 426.07 ppm). Opened.
- https://keelinglabsites.ucsd.edu/websitedataco2/monthly_flask_c13_mlo.csv : Scripps CO2 Program, Mauna Loa monthly 13C record (1980 on). Opened (header, 1980 and 2024 rows).
- https://scrippsco2.ucsd.edu/data/atmospheric-co2-data/sampling-station-records/mauna-loa-observatory-hawaii/ : Scripps Mauna Loa data file index. Opened.
- https://www.ipcc.ch/report/ar6/wg1/downloads/report/IPCC_AR6_WGI_Chapter05.pdf : IPCC AR6 WG1 Chapter 5 (carbon budget, δ13C as evidence). Opened (searched text).
- https://www.ipcc.ch/report/ar6/wg1/downloads/report/IPCC_AR6_WGI_SPM.pdf : IPCC AR6 WG1 Summary for Policymakers (CO2 concentration, warming). Opened.
- https://doi.org/10.1016/0160-4120%2879%2990005-9 : Keeling 1979, Suess effect (status 200; abstract not read).
- https://boris.unibe.ch/158809 : Gruber et al. 1999 repository record (status 200; content not read, a bot check blocked the follow-up page).

**Reference scale and file format**

- https://pmc.ncbi.nlm.nih.gov/articles/PMC12676516/ : Moossen et al., "How Well Do We Know VPDB, Part 2" (VPDB scale and NBS 19 = +1.95 ‰). Opened (first part only).
- https://www.unidata.ucar.edu/software/netcdf/ : Unidata NetCDF overview. Opened.
- https://docs.unidata.ucar.edu/nug/current/index.html : NetCDF User's Guide. Status 200.
- https://docs.unidata.ucar.edu/nug/current/netcdf_introduction.html : Introduction to NetCDF. Status 200.

**Cited without links (publisher blocks automated checks, HTTP 403)**

- Quay, P., Sonnerup, R., Westby, T., Stutsman, J., McNichol, A. (2003). *Global Biogeochemical Cycles* 17, 1004, doi:10.1029/2001GB001817. Details taken from Schmittner et al.'s reference list; not read.

---

## Glossary

- **12C, 13C, 14C**: carbon isotopes. 12C and 13C are stable; 14C is radioactive.
- **δ13C (delta-13-C)**: the 13C/12C ratio of a sample relative to a standard, expressed in ‰.
- **Per mil (‰)**: parts per thousand.
- **PDB / VPDB**: the reference scale for δ13C. Zero ‰ by definition; NBS 19 is +1.95 ‰ on it.
- **Fractionation**: a process favouring one isotope over another (for example, photosynthesis favouring 12C).
- **Isotopically light / heavy**: low / high in 13C, so more negative / less negative δ13C.
- **C3 / C4**: two photosynthesis pathways in land plants, with typical δ13C of about −28 ‰ and −14 ‰.
- **DIC (dissolved inorganic carbon)**: CO2, bicarbonate and carbonate dissolved in seawater. The dataset's δ13C refers to DIC.
- **Biological pump**: plankton take up carbon at the surface; sinking organic matter moves it to depth.
- **Remineralization**: decay of organic matter back into dissolved inorganic carbon and nutrients.
- **Air-sea gas exchange**: movement of CO2 between the atmosphere and the ocean surface.
- **Suess effect**: the fall in atmospheric δ13C (and 14C) caused by fossil fuel CO2. The **ocean Suess effect** is the same signal appearing in ocean DIC.
- **Anthropogenic carbon**: carbon added by human activity (here, mostly from fossil fuels).
- **AOU (apparent oxygen utilization)**: oxygen saturation level minus measured oxygen. It is a measure of how much oxygen biology has used up since the water left the surface. Per Schmittner et al., it ties to remineralized carbon.
- **NADW / AAIW**: North Atlantic Deep Water / Antarctic Intermediate Water, two named water masses.
- **CFC-11, CFC-12**: man-made chlorofluorocarbon gases, measured in seawater as tracers of how recently the water was at the surface (general oceanographic definition, **unverified** in the sources above; the README lists them only by name).
- **d14C (Δ14C)**: radiocarbon content, a tracer of water age and of fossil carbon.
- **Potential temperature, sigma-0/2/4**: temperature and density measures adjusted for pressure (general oceanographic definition, **unverified** in the sources above).
- **GLODAP / CARINA**: compiled ocean carbon datasets from many research cruises. GLODAP describes itself as a uniformly calibrated open-ocean data product ([glodap.info](https://glodap.info/)); CARINA stands for Carbon Dioxide in the Atlantic Ocean ([Schmittner et al. 2013, App. A](https://bg.copernicus.org/articles/10/5793/2013/bg-10-5793-2013.pdf)).
- **NetCDF**: a self-describing file format for gridded scientific arrays ([Unidata](https://www.unidata.ucar.edu/software/netcdf/)).
- **ppm**: parts per million, the usual unit for atmospheric CO2 concentration.
- **PgC**: petagrams (10^15 g) of carbon; used in carbon budgets.

---

## Suggested reading order

1. **This primer**, start to finish.
2. **NOAA GML "What 13C tells us"** and **"Determining Delta Values"**: short, friendly pages that repeat the main ideas ([c13tellsus](https://gml.noaa.gov/ccgg/isotopes/c13tellsus.html), [deltavalues](https://gml.noaa.gov/ccgg/isotopes/deltavalues.html)).
3. **Schmittner et al. 2013**: read the [abstract](https://bg.copernicus.org/articles/10/5793/2013/) and Introduction first, then the Results (Sect. 5.2) and Appendix A; skim the model sections ([PDF](https://bg.copernicus.org/articles/10/5793/2013/bg-10-5793-2013.pdf)).
4. **The NCEI dataset page and README**, then the directory ([page](https://www.ncei.noaa.gov/access/ocean-carbon-acidification-data-system/oceans/Schmittner13bg.html), [README](https://www.ncei.noaa.gov/data/oceans/ncei/ocads/data/0157698/README)).
5. **Unidata's NetCDF introduction**, before opening d13c.nc ([intro](https://docs.unidata.ucar.edu/nug/current/netcdf_introduction.html)).
6. **IPCC AR6 WG1 Chapter 5, Sect. 5.2.1** for the carbon budget and the isotope evidence in context ([PDF](https://www.ipcc.ch/report/ar6/wg1/downloads/report/IPCC_AR6_WGI_Chapter05.pdf)).
7. **Scripps Mauna Loa 13C record**, to plot the Suess effect yourself ([file](https://keelinglabsites.ucsd.edu/websitedataco2/monthly_flask_c13_mlo.csv)).
8. **Advanced:** Gruber et al. 1999, Quay et al. 2003 and Keeling 1979 for the ocean and atmospheric Suess effect in depth (Section 3.5).
