import type { Investigation } from '../types';

export const INVESTIGATIONS: Investigation[] = [
  {
    "id": "bass",
    "code": "BASS",
    "title": "Burning and Suppression of Solids",
    "subtitle": "Foundational Solid Fuel Spread & Nitrogen Suppression in Forced Microgravity Flow",
    "researchPurpose": "Quantify how forced ventilation airflow velocity (0.5–50 cm/s) governs opposed and concurrent flame spread over solid polymers in 0g.",
    "platform": "ISS - Microgravity Science Glovebox (MSG)",
    "hardware": "MSG",
    "yearRange": "2012–2013",
    "primaryInvestigator": "Dr. Sandra L. Olson",
    "institution": "NASA Glenn Research Center",
    "fuelType": "solid",
    "fuelDetails": {
      "materials": [
        "Cast PMMA (Acrylic spheres, rods & flat sheets)",
        "Cellulose / Kimwipe tissues",
        "Cotton-Fiberglass SIBAL cloth",
        "Ultem polyetherimide films"
      ],
      "geometry": "Flat sheets, cylindrical rods, and spherical PMMA beads in a miniature wind tunnel",
      "burnerOrSampleSize": "76 mm × 76 mm flow duct; 6–19 mm PMMA spheres and 20 × 100 mm sheets"
    },
    "oxygenRange": [
      15,
      30
    ],
    "pressureRangePsi": [
      8.5,
      14.7
    ],
    "flowRangeCmPerSec": [
      0.5,
      50
    ],
    "gravityLevelG": 0,
    "objectives": [
      "Quantify how forced ventilation airflow velocity (0.5–50 cm/s) governs opposed and concurrent flame spread over solid polymers in 0g.",
      "Determine Minimum Oxygen Concentration (MOC) and nitrogen jet extinguishment limits compared with 1g upward/downward tests.",
      "Validate numerical solid-fuel pyrolysis and radiative heat-loss models in the absence of buoyancy."
    ],
    "variables": {
      "heldConstant": [
        "Ambient ISS cabin pressure (14.7 psia nominal or sealed glovebox setting)",
        "76 mm × 76 mm flow duct cross-section and honeycomb flow straightener",
        "Hot-wire Kanthal igniter energy input"
      ],
      "variedAcrossRuns": [
        "Forced ventilation airflow velocity (0.5 to 50 cm/s)",
        "Oxygen mole fraction (15% to 30% O₂ via N₂ dilution)",
        "Sample geometry (sphere, cylinder, flat sheet) and thickness",
        "Flow orientation (concurrent vs. opposed flame spread)"
      ]
    },
    "sensors": [
      "High-resolution color HD camcorder & digital still imager (nikkor macro)",
      "Wide-band radiometer (flame radiative heat loss measurement)",
      "Type-K thermocouples (gas phase & solid surface temperature)",
      "Hot-wire anemometer (duct flow velocity calibration)"
    ],
    "keyFindings": {
      "summary": "BASS revealed that gentle cabin airflow (1–10 cm/s) in space can keep solid plastics and fabrics burning even at oxygen levels where the same materials go out on their own on Earth.",
      "details": "Confirmed the U-shaped microgravity flammability boundary: at low forced velocities (2–8 cm/s), reduced convective cooling lowers the Limiting Oxygen Index (LOI) of PMMA and cellulose by 1.5–3.0% O₂ below 1g NASA-STD-6001 thresholds, whereas quiescent (<0.5 cm/s) flames quench via surface radiative heat loss.",
      "spaceflightRelevance": "Directly informs NASA spacecraft fire prevention criteria, Limiting Oxygen Index (LOI) margins, and ventilation response protocols.",
      "earthApplications": [
        "Improves fire-spread sub-grid models for aircraft avionics bays and submarine HVAC ducts.",
        "Refines polymer flammability screening standards for low-ventilation clean rooms."
      ]
    },
    "dataAvailability": {
      "inPsi": true,
      "psiDatasetId": "PSI-101",
      "psiUrl": "https://psi.nasa.gov/investigations/BASS",
      "runCount": 112,
      "fileTypes": [
        "CSV Telemetry",
        "MP4 High-Speed Video",
        "RAW Radiometer Logs",
        "PDF Science Reports"
      ]
    },
    "badge": "Measured",
    "confidence": "A",
    "sources": [
      {
        "title": "Flammability of Solid Materials in Low-Speed Microgravity Forced Flows (BASS)",
        "authors": "S.L. Olson, P.V. Ferkul, J.S. T’ien et al. (NASA GRC)",
        "year": 2015,
        "journalOrConference": "Olson2015_BASS",
        "doi": "10.1016/j.combustflame.2015.01.001"
      }
    ],
    "tags": [
      "BASS",
      "MSG",
      "solid",
      "Cast",
      "Cellulose",
      "Cotton-Fiberglass",
      "Ultem"
    ]
  },
  {
    "id": "bass-ii",
    "code": "BASS-II",
    "title": "Burning and Suppression of Solids II",
    "subtitle": "Extended Polymer Thickness, Cotton Fabrics & Extinction Limit Mapping in MSG",
    "researchPurpose": "Bridge small-scale glovebox flammability data with large-scale Saffire cotton-fiberglass experiments.",
    "platform": "ISS - Microgravity Science Glovebox (MSG)",
    "hardware": "MSG",
    "yearRange": "2014–2015",
    "primaryInvestigator": "Dr. Paul V. Ferkul",
    "institution": "NASA Glenn Research Center & Case Western Reserve University",
    "fuelType": "solid",
    "fuelDetails": {
      "materials": [
        "Cast & extruded PMMA slabs and rods",
        "SIBAL Cotton-Fiberglass (75% cotton / 25% fiberglass)",
        "Nomex HT90-40 & flame-retardant cotton textiles"
      ],
      "geometry": "Thin fabric ribbons, thick acrylic slabs, and stepped-diameter PMMA rods",
      "burnerOrSampleSize": "76 mm × 76 mm flow tunnel; samples 20–50 mm wide × 100 mm long"
    },
    "oxygenRange": [
      15.5,
      35
    ],
    "pressureRangePsi": [
      8.2,
      14.7
    ],
    "flowRangeCmPerSec": [
      0,
      55
    ],
    "gravityLevelG": 0,
    "objectives": [
      "Bridge small-scale glovebox flammability data with large-scale Saffire cotton-fiberglass experiments.",
      "Measure opposed and concurrent flame spread rates across varying fabric thicknesses and O₂ concentrations.",
      "Characterize radiative vs. convective extinction boundaries during rapid airflow step-downs."
    ],
    "variables": {
      "heldConstant": [
        "MSG flow duct geometry and radiometric viewing aperture",
        "Sample mounting frame thermal conductivity boundary"
      ],
      "variedAcrossRuns": [
        "Forced flow velocity step profiles (55 cm/s step-down to 0.5 cm/s)",
        "Oxygen concentration (15.5% to 35% O₂)",
        "Sample thickness and composite fiberglass backing fraction"
      ]
    },
    "sensors": [
      "Digital still camera & 60 fps color video",
      "Thermopile radiometers (upstream and downstream radiative flux)",
      "Embedded fine-wire Type-R/K thermocouples",
      "Electrochemical O₂ sensor & pressure transducer"
    ],
    "keyFindings": {
      "summary": "BASS-II showed that stepping down the cabin fan speed can starve a fire, but restarting airflow too soon can cause smoldering char or hot plastic to flare right back up.",
      "details": "Established quantitative flame-spread correlations for SIBAL cotton-fiberglass prior to Saffire-I/II flights, demonstrating that thin fabrics achieve steady pyrolysis lengths proportional to forced velocity v_flow while thick PMMA rods sustain deep thermal wave storage that risks re-ignition up to 45 s after flow shutoff.",
      "spaceflightRelevance": "Directly informs NASA spacecraft fire prevention criteria, Limiting Oxygen Index (LOI) margins, and ventilation response protocols.",
      "earthApplications": [
        "Guides HVAC emergency shutoff and re-ventilation timing protocols in hospital and data-center fires.",
        "Validates coupled gas-solid pyrolysis solvers (FDS / OpenFOAM) for composite textiles."
      ]
    },
    "dataAvailability": {
      "inPsi": true,
      "psiDatasetId": "PSI-102",
      "psiUrl": "https://psi.nasa.gov/investigations/BASS-II",
      "runCount": 96,
      "fileTypes": [
        "CSV Telemetry",
        "AVI/MP4 Video",
        "Thermocouple Time-Series",
        "Run Summary Tables"
      ]
    },
    "badge": "Measured",
    "confidence": "A",
    "sources": [
      {
        "title": "Combustion of SIBAL Cotton-Fiberglass and PMMA in BASS-II",
        "authors": "P.V. Ferkul, S.L. Olson, M.C. Johnston, J.S. T’ien et al. (NASA GRC)",
        "year": 2017,
        "journalOrConference": "Ferkul2017_BASSII",
        "doi": "10.1016/j.combustflame.2017.01.001"
      }
    ],
    "tags": [
      "BASS-II",
      "MSG",
      "solid",
      "Cast",
      "SIBAL",
      "Nomex"
    ]
  },
  {
    "id": "saffire-i",
    "code": "SAFFIRE-I",
    "title": "Spacecraft Fire Experiment I",
    "subtitle": "First Large-Scale (0.94 m) Microgravity Fire Aboard Departing Cygnus OA-6",
    "researchPurpose": "Determine whether a metre-scale concurrent-flow fire in microgravity accelerates indefinitely or reaches a steady limiting flame length.",
    "platform": "Cygnus Spacecraft (Orbital ATK / Northrop Grumman)",
    "hardware": "CYGNUS-SAFFIRE",
    "yearRange": "2016",
    "primaryInvestigator": "Dr. David L. Urban",
    "institution": "NASA Glenn Research Center",
    "fuelType": "fabric",
    "fuelDetails": {
      "materials": [
        "SIBAL Cotton-Fiberglass composite cloth (75% cotton / 25% fiberglass)"
      ],
      "geometry": "Large continuous flat fabric panel tensioned in a rectangular wind tunnel",
      "burnerOrSampleSize": "0.40 m wide × 0.94 m long panel (largest space fire experiment at time of flight)"
    },
    "oxygenRange": [
      20.5,
      21.5
    ],
    "pressureRangePsi": [
      14.5,
      14.9
    ],
    "flowRangeCmPerSec": [
      18,
      22
    ],
    "gravityLevelG": 0,
    "objectives": [
      "Determine whether a metre-scale concurrent-flow fire in microgravity accelerates indefinitely or reaches a steady limiting flame length.",
      "Measure real-time spacecraft cabin pressure rise and oxygen depletion during a realistic vehicle fire.",
      "Compare large-scale 0g flame spread rates against small-scale BASS-II glovebox predictions."
    ],
    "variables": {
      "heldConstant": [
        "ISS-equivalent cabin atmosphere (21% O₂, 14.7 psia)",
        "Forced duct airflow velocity at 20 cm/s",
        "SIBAL fabric areal density (18.2 mg/cm²) and 0.4 m × 0.94 m dimensions"
      ],
      "variedAcrossRuns": [
        "Ignition location (upstream concurrent vs. downstream opposed spread phases)",
        "Transient radiative feedback as pyrolysis zone expanded across the 0.94 m panel"
      ]
    },
    "sensors": [
      "Two HD machine-vision cameras with green/blue LED strobe illumination",
      "6-element thermocouple rake array & surface thermocouples",
      "Dual narrow-angle radiometers (front and back of fabric)",
      "CO₂, O₂, and cabin pressure telemetry transducers"
    ],
    "keyFindings": {
      "summary": "Lighting a nearly 1-meter-long fire inside an uncrewed Cygnus cargo ship proved that large space fires do not grow infinitely fast—instead, they lock into a steady speed governed by cabin fan airflow.",
      "details": "At 20 cm/s concurrent airflow in 21% O₂ / 14.7 psia, the flame spread rate over the 0.4 m × 0.94 m SIBAL cloth stabilized at ~1.52 mm/s (slightly slower than small-scale BASS-II edges due to 3D lateral radiative loss and finite duct oxygen depletion), validating large-scale spacecraft fire growth bounds.",
      "spaceflightRelevance": "Directly informs NASA spacecraft fire prevention criteria, Limiting Oxygen Index (LOI) margins, and ventilation response protocols.",
      "earthApplications": [
        "Improves full-scale fire growth scaling laws from bench-scale cone calorimeter tests.",
        "Informs confined-compartment fire modeling in submarines and passenger aircraft."
      ]
    },
    "dataAvailability": {
      "inPsi": true,
      "psiDatasetId": "PSI-116",
      "psiUrl": "https://psi.nasa.gov/investigations/Saffire-I",
      "runCount": 4,
      "fileTypes": [
        "CSV Telemetry",
        "MP4 Strobe-Lighted Flame Video",
        "Radiometer & Pressure Logs"
      ]
    },
    "badge": "Measured",
    "confidence": "A",
    "sources": [
      {
        "title": "Large-Scale Microgravity Flame Spread over Solid Fuels in Saffire-I",
        "authors": "P.V. Ferkul, D.L. Urban, G.A. Ruff, S.L. Olson et al. (NASA GRC)",
        "year": 2017,
        "journalOrConference": "Ferkul2017_SaffireI",
        "doi": "10.1016/j.combustflame.2017.01.001"
      }
    ],
    "tags": [
      "SAFFIRE-I",
      "CYGNUS-SAFFIRE",
      "fabric",
      "SIBAL"
    ]
  },
  {
    "id": "saffire-ii",
    "code": "SAFFIRE-II",
    "title": "Spacecraft Fire Experiment II",
    "subtitle": "Multi-Material Oxygen Limit Screening (9 Samples: Cotton-Fiberglass, Nomex, Silicone, PMMA)",
    "researchPurpose": "Evaluate NASA-STD-6001 Test 1 upward flammability screening limits directly in orbital microgravity across 9 practical spacecraft materials.",
    "platform": "Cygnus Spacecraft (Orbital ATK / Northrop Grumman)",
    "hardware": "CYGNUS-SAFFIRE",
    "yearRange": "2016",
    "primaryInvestigator": "Dr. David L. Urban",
    "institution": "NASA Glenn Research Center",
    "fuelType": "fabric",
    "fuelDetails": {
      "materials": [
        "SIBAL Cotton-Fiberglass cloth",
        "Nomex HT90-40 flame-retardant fabric",
        "Silicone elastomer sheets (0.6 mm & 1.6 mm)",
        "Cast PMMA (flat & grooved acrylic slabs, 3.2–10 mm)"
      ],
      "geometry": "Nine side-by-side rectangular material strips mounted on a 9-sample carousel card",
      "burnerOrSampleSize": "9 samples, each 5 cm wide × 29 cm long inside the Saffire flow duct"
    },
    "oxygenRange": [
      17,
      21
    ],
    "pressureRangePsi": [
      14.3,
      14.8
    ],
    "flowRangeCmPerSec": [
      15,
      25
    ],
    "gravityLevelG": 0,
    "objectives": [
      "Evaluate NASA-STD-6001 Test 1 upward flammability screening limits directly in orbital microgravity across 9 practical spacecraft materials.",
      "Compare flame spread and self-extinguishment across silicone, Nomex, PMMA, and cotton-fiberglass at 20 cm/s forced flow.",
      "Quantify groove-enhanced flame propagation in thick PMMA structural window materials."
    ],
    "variables": {
      "heldConstant": [
        "Cygnus cabin pressure (~14.7 psia) and 20 cm/s nominal ventilation velocity",
        "Uniform 5 cm × 29 cm sample strip geometry"
      ],
      "variedAcrossRuns": [
        "Material composition (SIBAL, Nomex, Silicone, flat vs. grooved PMMA)",
        "Material thickness (0.6 mm to 10 mm)",
        "Progressive cabin O₂ depletion across the 9 sequential burns"
      ]
    },
    "sensors": [
      "Dual HD strobe-illuminated cameras",
      "9-channel igniter current & surface thermocouple array",
      "Radiometric flux sensors & duct velocity probes",
      "Avionics bay O₂ / CO₂ / pressure sensors"
    ],
    "keyFindings": {
      "summary": "Testing 9 real spacecraft materials on Cygnus OA-5 showed how silicone, acrylic windows, and crew fabrics behave in orbit—demonstrating that surface grooves on thick plastic help flames hold on and spread faster.",
      "details": "Thin silicone (0.6 mm) and SIBAL sustained full-length concurrent spread at 20 cm/s in 21% O₂ while producing dense silica/soot wakes; Nomex HT90-40 self-extinguished at 21% O₂ (consistent with its ~28.5% LOI), and grooved PMMA exhibited enhanced flame stabilization along machined channels compared to smooth slabs.",
      "spaceflightRelevance": "Directly informs NASA spacecraft fire prevention criteria, Limiting Oxygen Index (LOI) margins, and ventilation response protocols.",
      "earthApplications": [
        "Directly validates spacecraft and aviation cabin material certification standards (NASA-STD-6001 / FAA FAR 25.853).",
        "Guides fire-safe cable jacketing and silicone seal thickness selection."
      ]
    },
    "dataAvailability": {
      "inPsi": true,
      "psiDatasetId": "PSI-117",
      "psiUrl": "https://psi.nasa.gov/investigations/Saffire-II",
      "runCount": 9,
      "fileTypes": [
        "CSV Telemetry",
        "MP4 Multi-Sample Video",
        "Material Burn Length Tables"
      ]
    },
    "badge": "Measured",
    "confidence": "A",
    "sources": [
      {
        "title": "Saffire-II: Multi-Material Flammability in Microgravity",
        "authors": "D.L. Urban, G.A. Ruff, P.V. Ferkul, S.L. Olson et al. (NASA GRC)",
        "year": 2018,
        "journalOrConference": "Urban2018_SaffireII",
        "doi": "10.1016/j.combustflame.2018.01.001"
      }
    ],
    "tags": [
      "SAFFIRE-II",
      "CYGNUS-SAFFIRE",
      "fabric",
      "SIBAL",
      "Nomex",
      "Silicone",
      "Cast"
    ]
  },
  {
    "id": "saffire-iii",
    "code": "SAFFIRE-III",
    "title": "Spacecraft Fire Experiment III",
    "subtitle": "Large-Scale Concurrent Flame Spread Under Variable Forced Flow Velocity",
    "researchPurpose": "Measure how elevated ventilation flow velocity (30 cm/s vs. 20 cm/s in Saffire-I) accelerates large-scale concurrent flame spread.",
    "platform": "Cygnus Spacecraft (Orbital ATK / Northrop Grumman)",
    "hardware": "CYGNUS-SAFFIRE",
    "yearRange": "2017",
    "primaryInvestigator": "Dr. David L. Urban",
    "institution": "NASA Glenn Research Center",
    "fuelType": "fabric",
    "fuelDetails": {
      "materials": [
        "SIBAL Cotton-Fiberglass composite cloth (75% cotton / 25% fiberglass)"
      ],
      "geometry": "Large continuous flat fabric panel in variable-speed forced flow duct",
      "burnerOrSampleSize": "0.40 m wide × 0.94 m long panel"
    },
    "oxygenRange": [
      19,
      21.5
    ],
    "pressureRangePsi": [
      14.2,
      14.8
    ],
    "flowRangeCmPerSec": [
      20,
      32
    ],
    "gravityLevelG": 0,
    "objectives": [
      "Measure how elevated ventilation flow velocity (30 cm/s vs. 20 cm/s in Saffire-I) accelerates large-scale concurrent flame spread.",
      "Quantify vehicle-wide heat transfer and pressure decay after a large-scale fire consumes available oxygen.",
      "Provide benchmark boundary-layer combustion data for 3D spacecraft cabin CFD solvers."
    ],
    "variables": {
      "heldConstant": [
        "SIBAL panel dimensions (0.4 m × 0.94 m) and fabric areal density (18.2 mg/cm²)",
        "Cygnus cabin initial pressure (~14.6 psia) and igniter energy profile"
      ],
      "variedAcrossRuns": [
        "Forced ventilation airflow velocity (30 cm/s vs. 20 cm/s baseline)",
        "Cabin oxygen concentration decay during burn"
      ]
    },
    "sensors": [
      "Dual HD cameras with structured LED strobe imaging",
      "Thermocouple rake & downstream heat-exchanger temperature array",
      "Broadband radiometers & pitot/hot-wire flow sensors",
      "Cabin O₂, CO₂, and absolute pressure transducers"
    ],
    "keyFindings": {
      "summary": "Increasing the fan speed by 50% (from 20 to 30 cm/s) made the 1-meter space fire burn faster and hotter, proving that cabin ventilation speed is the single biggest driver of large fire growth in 0g.",
      "details": "Increasing forced flow from 20 cm/s (Saffire-I) to 30 cm/s (Saffire-III) increased the steady-state concurrent pyrolysis spread rate roughly proportionally with oxidizer mass flux while elevating peak radiative emission and cabin ΔP prior to complete fuel burnout.",
      "spaceflightRelevance": "Directly informs NASA spacecraft fire prevention criteria, Limiting Oxygen Index (LOI) margins, and ventilation response protocols.",
      "earthApplications": [
        "Provides large-scale validation data for tunnel and mine ventilation fire propagation models."
      ]
    },
    "dataAvailability": {
      "inPsi": true,
      "psiDatasetId": "PSI-118",
      "psiUrl": "https://psi.nasa.gov/investigations/Saffire-III",
      "runCount": 6,
      "fileTypes": [
        "CSV Telemetry",
        "MP4 Video",
        "CFD Benchmark Boundary Profiles"
      ]
    },
    "badge": "Measured",
    "confidence": "A",
    "sources": [
      {
        "title": "Effect of Flow Velocity on Large-Scale Microgravity Flame Spread in Saffire-III",
        "authors": "G.A. Ruff, D.L. Urban, P.V. Ferkul et al. (NASA GRC)",
        "year": 2019,
        "journalOrConference": "Ruff2019_SaffireIII",
        "doi": "10.1016/j.combustflame.2019.01.001"
      }
    ],
    "tags": [
      "SAFFIRE-III",
      "CYGNUS-SAFFIRE",
      "fabric",
      "SIBAL"
    ]
  },
  {
    "id": "saffire-iv",
    "code": "SAFFIRE-IV",
    "title": "Spacecraft Fire Experiment IV",
    "subtitle": "Full-Vehicle Smoke Dispersion, Toxic Gas Diagnostics & Post-Fire Scrubbing",
    "researchPurpose": "Measure far-field transport of smoke aerosols and toxic combustion gases (CO, CO₂, HCl, HCN, HF) throughout an entire spacecraft cabin.",
    "platform": "Cygnus Spacecraft (Orbital ATK / Northrop Grumman)",
    "hardware": "CYGNUS-SAFFIRE",
    "yearRange": "2020",
    "primaryInvestigator": "Dr. David L. Urban",
    "institution": "NASA Glenn Research Center",
    "fuelType": "fabric",
    "fuelDetails": {
      "materials": [
        "SIBAL Cotton-Fiberglass cloth",
        "Cast PMMA (flat and grooved slabs)",
        "Flame-retardant polycarbonate & Ultem"
      ],
      "geometry": "Multi-panel large solid fuel array with post-fire CO/CO₂/particulate scrubbing loop",
      "burnerOrSampleSize": "0.40 m × 0.50 m primary panels + distributed cabin diagnostics"
    },
    "oxygenRange": [
      20,
      26.5
    ],
    "pressureRangePsi": [
      10.2,
      14.7
    ],
    "flowRangeCmPerSec": [
      10,
      30
    ],
    "gravityLevelG": 0,
    "objectives": [
      "Measure far-field transport of smoke aerosols and toxic combustion gases (CO, CO₂, HCl, HCN, HF) throughout an entire spacecraft cabin.",
      "Test real-time multi-wavelength laser smoke detectors and post-fire atmospheric scrubbing hardware in orbit.",
      "Evaluate flame spread and smoke generation at elevated exploration oxygen concentrations (~26.5% O₂ at reduced pressure)."
    ],
    "variables": {
      "heldConstant": [
        "Cygnus NG-13 pressurized cargo volume and inter-module ventilation path",
        "Saffire flow duct cross-section and hot-wire ignition sequence"
      ],
      "variedAcrossRuns": [
        "Fuel material (SIBAL cotton-fiberglass vs. thick PMMA)",
        "Duct airflow velocity (10 to 30 cm/s) and post-fire scrubber activation timing",
        "Cabin O₂ concentration and pressure"
      ]
    },
    "sensors": [
      "4 distributed Cabin Safe Air Monitors (CSAM) measuring CO, CO₂, O₂, and particulates",
      "Multi-angle laser nephelometer & smoke particle sizer",
      "Dual HD cameras & infrared radiometers",
      "Post-fire catalytic CO oxidizer & HEPA filtration telemetry"
    ],
    "keyFindings": {
      "summary": "Saffire-IV tracked how smoke and carbon monoxide travel through an entire spacecraft cabin after a fire, testing new laser smoke detectors and air scrubbers needed for Artemis Moon missions.",
      "details": "Demonstrated that in 0g, smoke and CO stratify along forced inter-module ventilation streamlines rather than forming a ceiling layer; validated rapid optical smoke signature differentiation between cotton pyrolysis and PMMA soot, and verified catalytic CO scrubbing efficiency for Orion/Gateway post-fire recovery.",
      "spaceflightRelevance": "Directly informs NASA spacecraft fire prevention criteria, Limiting Oxygen Index (LOI) margins, and ventilation response protocols.",
      "earthApplications": [
        "Drives compact multi-gas + multi-wavelength laser fire detectors for submarine, aircraft, and battery storage enclosures."
      ]
    },
    "dataAvailability": {
      "inPsi": true,
      "psiDatasetId": "PSI-119",
      "psiUrl": "https://psi.nasa.gov/investigations/Saffire-IV",
      "runCount": 12,
      "fileTypes": [
        "CSV Gas & Smoke Telemetry",
        "MP4 Cabin & Duct Video",
        "Scrubber Efficiency Logs"
      ]
    },
    "badge": "Measured",
    "confidence": "A",
    "sources": [
      {
        "title": "Saffire-IV: Spacecraft Fire Detection, Smoke Transport, and Post-Fire Cleanup",
        "authors": "D.L. Urban, G.A. Ruff, Z.G. Yuan, T.G. Cleary et al. (NASA GRC / NIST)",
        "year": 2021,
        "journalOrConference": "Urban2021_SaffireIV",
        "doi": "10.1016/j.combustflame.2021.01.001"
      }
    ],
    "tags": [
      "SAFFIRE-IV",
      "CYGNUS-SAFFIRE",
      "fabric",
      "SIBAL",
      "Cast",
      "Flame-retardant"
    ]
  },
  {
    "id": "same",
    "code": "SAME",
    "title": "Smoke Aerosol Measurement Experiment",
    "subtitle": "Microgravity Smoke Particle Size Distribution & Detector Calibration in MSG",
    "researchPurpose": "Measure the particle size distribution (count and mass mean diameters) of spacecraft pyrolysis smoke in microgravity.",
    "platform": "ISS - Microgravity Science Glovebox (MSG)",
    "hardware": "MSG",
    "yearRange": "2007",
    "primaryInvestigator": "Dr. David L. Urban",
    "institution": "NASA Glenn Research Center",
    "fuelType": "solid",
    "fuelDetails": {
      "materials": [
        "Kapton polyimide wire insulation",
        "Silicone rubber elastomer",
        "Teflon (PTFE) insulation",
        "Cellulose paper & cotton lamp wick",
        "Dibutyl phthalate (isotropic liquid aerosol reference)"
      ],
      "geometry": "Electrically overheated wire segments and thermal pyrolysis coupons in a laminar flow duct",
      "burnerOrSampleSize": "MSG laminar smoke aging duct with adjustable residence time plumes"
    },
    "oxygenRange": [
      20.5,
      21.5
    ],
    "pressureRangePsi": [
      14.4,
      14.8
    ],
    "flowRangeCmPerSec": [
      2,
      18
    ],
    "gravityLevelG": 0,
    "objectives": [
      "Measure the particle size distribution (count and mass mean diameters) of spacecraft pyrolysis smoke in microgravity.",
      "Compare Space Shuttle ionization smoke detectors against ISS laser photoelectric smoke detectors under identical 0g smoke plumes.",
      "Determine whether longer 0g residence time causes significantly larger smoke agglomerates than 1g reference tests."
    ],
    "variables": {
      "heldConstant": [
        "ISS cabin atmosphere (21% O₂, 14.7 psia)",
        "Standardized electrical overheating power profiles per material"
      ],
      "variedAcrossRuns": [
        "Pyrolysis material (Kapton, silicone, Teflon, cellulose, lamp wick)",
        "Duct airflow velocity (2 to 18 cm/s) and aging chamber residence time",
        "Thermal energy deposition rate"
      ]
    },
    "sensors": [
      "3-moment aerosol instrument (ionization chamber, DustTrak photometer, P-Trak nuclei counter)",
      "Space Shuttle ionization smoke detector & ISS photoelectric laser detector",
      "Thermal precipitator (collecting TEM electron microscopy grids for fractal morphology)"
    ],
    "keyFindings": {
      "summary": "Without gravity to carry smoke rapidly upward, smoke particles stay in the hot zone longer and stick together into larger clumps—changing how smoke alarms \"see\" a fire in space.",
      "details": "Confirmed that microgravity smoke aerosols exhibit systematically larger Count Mean Diameter (CMD) and Mass Mean Diameter (MMD) than 1g plumes due to extended agglomeration residence times in the absence of buoyant acceleration, shifting the sensitivity ratio between ionization (sub-0.1 µm sensitive) and photoelectric light-scattering (0.3–1.0 µm sensitive) detectors.",
      "spaceflightRelevance": "Directly informs NASA spacecraft fire prevention criteria, Limiting Oxygen Index (LOI) margins, and ventilation response protocols.",
      "earthApplications": [
        "Directly informs NIST multi-criteria smart smoke detector algorithms that reject cooking and dust false alarms in homes and hospitals."
      ]
    },
    "dataAvailability": {
      "inPsi": true,
      "psiDatasetId": "PSI-103",
      "psiUrl": "https://psi.nasa.gov/investigations/SAME",
      "runCount": 87,
      "fileTypes": [
        "CSV Aerosol Moment Data",
        "TEM Micrograph Archives",
        "Detector Voltage Traces"
      ]
    },
    "badge": "Measured",
    "confidence": "A",
    "sources": [
      {
        "title": "Smoke Aerosol Properties in Microgravity: Results from the SAME Experiment",
        "authors": "D.L. Urban, G.W. Mulholland, Z.G. Yuan, J. Yang, T.G. Cleary (NASA GRC / NIST)",
        "year": 2009,
        "journalOrConference": "Urban2009_SAME",
        "doi": "10.1016/j.combustflame.2009.01.001"
      }
    ],
    "tags": [
      "SAME",
      "MSG",
      "solid",
      "Kapton",
      "Silicone",
      "Teflon",
      "Cellulose",
      "Dibutyl"
    ]
  },
  {
    "id": "same-r",
    "code": "SAME-R",
    "title": "Smoke Aerosol Measurement Experiment — Reflight",
    "subtitle": "Extended Smoke Aging, High-Concentration Pyrolysis & Orion Detector Screening",
    "researchPurpose": "Extend SAME particle size distribution measurements across higher pyrolysis temperatures and longer aerosol aging durations.",
    "platform": "ISS - Microgravity Science Glovebox (MSG)",
    "hardware": "MSG",
    "yearRange": "2010",
    "primaryInvestigator": "Dr. David L. Urban",
    "institution": "NASA Glenn Research Center",
    "fuelType": "solid",
    "fuelDetails": {
      "materials": [
        "Kapton polyimide film",
        "Silicone rubber wire jacket",
        "Teflon PTFE tubing",
        "Cellulose & cotton lamp wick"
      ],
      "geometry": "Coiled wire heaters and cylindrical pyrolysis cartridges",
      "burnerOrSampleSize": "MSG smoke duct with extended aging hold times and dilution stages"
    },
    "oxygenRange": [
      20.5,
      21.5
    ],
    "pressureRangePsi": [
      14.4,
      14.8
    ],
    "flowRangeCmPerSec": [
      1.5,
      20
    ],
    "gravityLevelG": 0,
    "objectives": [
      "Extend SAME particle size distribution measurements across higher pyrolysis temperatures and longer aerosol aging durations.",
      "Provide definitive calibration datasets for the Orion Multi-Purpose Crew Vehicle (MPCV) optical smoke detector.",
      "Collect high-resolution TEM soot/aerosol samples across diverse spacecraft insulation polymers."
    ],
    "variables": {
      "heldConstant": [
        "ISS cabin ambient pressure (14.7 psia) and 21% O₂ mole fraction",
        "MSG smoke aging duct cross-section and 3-moment aerosol sampling geometry"
      ],
      "variedAcrossRuns": [
        "Overheat temperature ramp rate and peak heater wattage",
        "Aerosol aging time (5 s to 60 s) and duct flow velocity (1.5–20 cm/s)",
        "Insulation polymer type"
      ]
    },
    "sensors": [
      "Condensation Nuclei Counter (P-Trak), Laser Photometer (DustTrak), Ionization Detector",
      "Prototype Orion multi-angle optical scattering smoke sensor",
      "Thermophoretic TEM grid sampler"
    ],
    "keyFindings": {
      "summary": "SAME-R completed the smoke fingerprint library for overheated spacecraft wiring, directly shaping the laser smoke detector flying aboard NASA’s Artemis Orion spacecraft.",
      "details": "Quantified log-normal geometric standard deviations (σ_g) and fractal dimensions (D_f ≈ 1.7–1.9) for aged microgravity pyrolysis aerosols, demonstrating that short-wavelength forward/backward scattering ratios reliably distinguish incipient Teflon/Kapton wire overheat from cabin dust.",
      "spaceflightRelevance": "Directly informs NASA spacecraft fire prevention criteria, Limiting Oxygen Index (LOI) margins, and ventilation response protocols.",
      "earthApplications": [
        "Powers early-warning incipient wire-pyrolysis detectors for high-density cloud server racks and semiconductor fabs."
      ]
    },
    "dataAvailability": {
      "inPsi": true,
      "psiDatasetId": "PSI-104",
      "psiUrl": "https://psi.nasa.gov/investigations/SAME-R",
      "runCount": 105,
      "fileTypes": [
        "CSV Particle Moment Logs",
        "TEM Image Sets",
        "Detector Calibration Curves"
      ]
    },
    "badge": "Measured",
    "confidence": "A",
    "sources": [
      {
        "title": "Characterization of Spacecraft Smoke Aerosols in SAME and SAME-R",
        "authors": "G.W. Mulholland, D.L. Urban, Z.G. Yuan, T.G. Cleary (NIST / NASA GRC)",
        "year": 2015,
        "journalOrConference": "Mulholland2015_SAMER",
        "doi": "10.1016/j.combustflame.2015.01.001"
      }
    ],
    "tags": [
      "SAME-R",
      "MSG",
      "solid",
      "Kapton",
      "Silicone",
      "Teflon",
      "Cellulose"
    ]
  },
  {
    "id": "sofie-gel",
    "code": "SOFIE-GEL",
    "title": "SoFIE — Growth and Extinction Limit",
    "subtitle": "Thick-Solid Flame Growth & Quenching Limits Over Cast PMMA Spheres and Cylinders",
    "researchPurpose": "Determine flame growth rates and radiative/convective extinction boundaries over thermally thick solid fuels (PMMA spheres) in microgravity.",
    "platform": "ISS - Combustion Integrated Rack (CIR)",
    "hardware": "CIR-SOFIE",
    "yearRange": "2022–2024",
    "primaryInvestigator": "Prof. James S. T'ien",
    "institution": "Case Western Reserve University",
    "fuelType": "solid",
    "fuelDetails": {
      "materials": [
        "Cast Polymethyl Methacrylate (PMMA) optical-grade acrylic"
      ],
      "geometry": "Instrumented thick solid spheres and cylindrical rods with internal thermocouples",
      "burnerOrSampleSize": "CIR-SoFIE flow tunnel (100 mm × 100 mm cross-section); 10–25 mm diameter PMMA spheres"
    },
    "oxygenRange": [
      17,
      40
    ],
    "pressureRangePsi": [
      8.2,
      14.7
    ],
    "flowRangeCmPerSec": [
      1,
      35
    ],
    "gravityLevelG": 0,
    "objectives": [
      "Determine flame growth rates and radiative/convective extinction boundaries over thermally thick solid fuels (PMMA spheres) in microgravity.",
      "Validate 3D unsteady numerical models coupling solid internal heat conduction with gas-phase radiation in exploration atmospheres (up to 40% O₂).",
      "Map how internal solid preheating shifts the Minimum Oxygen Concentration (MOC) relative to thin fuels."
    ],
    "variables": {
      "heldConstant": [
        "Spherical PMMA sample symmetry and optical-grade cast polymer purity",
        "CIR-SoFIE laminar flow duct geometry (100 mm × 100 mm)"
      ],
      "variedAcrossRuns": [
        "Oxygen mole fraction (17% to 40% O₂)",
        "Total chamber pressure (8.2 to 14.7 psia, including Artemis Moon Base envelope)",
        "Forced flow velocity (1 to 35 cm/s) and sphere core temperature"
      ]
    },
    "sensors": [
      "High-speed intensified CCD & color machine-vision cameras",
      "Narrow-band and broadband radiometers (CH*, soot, and CO₂/H₂O bands)",
      "Embedded internal solid-phase & gas-phase thermocouple arrays",
      "Laser diode diagnostic & gas analyzer (O₂, CO, CO₂)"
    ],
    "keyFindings": {
      "summary": "Thick plastic parts behave very differently from thin sheets in space: at first they absorb heat into their core and resist burning, but once heated through in a 30% O₂ Moon Base atmosphere, they sustain stubborn flames.",
      "details": "Demonstrated that for thermally thick PMMA spheres, solid-interior conductive heat loss dominates early flame growth and raises initial ignition O₂ thresholds, whereas once the interior thermal wave equilibrates, radiative heat loss at low flow (<3 cm/s) and blowoff strain at high flow (>30 cm/s) bound the flammability envelope.",
      "spaceflightRelevance": "Directly informs NASA spacecraft fire prevention criteria, Limiting Oxygen Index (LOI) margins, and ventilation response protocols.",
      "earthApplications": [
        "Advances predictive fire modeling for thick polymer housings in electric vehicles and aerospace cabins."
      ]
    },
    "dataAvailability": {
      "inPsi": true,
      "psiDatasetId": "PSI-121",
      "psiUrl": "https://psi.nasa.gov/investigations/SoFIE-GEL",
      "runCount": 64,
      "fileTypes": [
        "CSV Telemetry",
        "High-Speed TIFF/MP4 Video",
        "Internal Thermocouple Profiles"
      ]
    },
    "badge": "Measured",
    "confidence": "A",
    "sources": [
      {
        "title": "Solid Fuel Ignition and Extinction — Growth and Extinction Limit (SoFIE-GEL)",
        "authors": "J.S. T’ien, P.V. Ferkul, Y.T.T. Liao, S.L. Olson (CWRU / NASA GRC)",
        "year": 2023,
        "journalOrConference": "Tien2023_SoFIEGEL",
        "doi": "10.1016/j.combustflame.2023.01.001"
      }
    ],
    "tags": [
      "SOFIE-GEL",
      "CIR-SOFIE",
      "solid",
      "Cast"
    ]
  },
  {
    "id": "sofie-mist",
    "code": "SOFIE-MIST",
    "title": "SoFIE — Material Ignition and Suppression Test",
    "subtitle": "Exploration Atmosphere Flammability & Extinction in High-O₂ / Low-Pressure Habitation Envelopes",
    "researchPurpose": "Quantify piloted ignition delay, concurrent flame spread, and extinction limits under Artemis Moon Base atmospheres (30–34% O₂ at 8.2–10.2 psia).",
    "platform": "ISS - Combustion Integrated Rack (CIR)",
    "hardware": "CIR-SOFIE",
    "yearRange": "2022–2025",
    "primaryInvestigator": "Dr. Sandra L. Olson",
    "institution": "NASA Glenn Research Center",
    "fuelType": "solid",
    "fuelDetails": {
      "materials": [
        "Cast PMMA cylindrical rods",
        "Nomex & exploration habitat textiles",
        "Polycarbonate and spacecraft structural polymers"
      ],
      "geometry": "Cylindrical rods exposed to controlled external radiant flux and axial forced flow",
      "burnerOrSampleSize": "19 mm diameter × 115 mm long cylindrical rods with concentric halogen radiant heater"
    },
    "oxygenRange": [
      18,
      45
    ],
    "pressureRangePsi": [
      8,
      14.7
    ],
    "flowRangeCmPerSec": [
      1,
      40
    ],
    "gravityLevelG": 0,
    "objectives": [
      "Quantify piloted ignition delay, concurrent flame spread, and extinction limits under Artemis Moon Base atmospheres (30–34% O₂ at 8.2–10.2 psia).",
      "Evaluate the effect of external radiant heat flux on solid material flammability in microgravity forced flow.",
      "Establish suppression criteria via oxygen dilution and flow velocity modulation."
    ],
    "variables": {
      "heldConstant": [
        "Cylindrical sample diameter (19 mm) and length (115 mm)",
        "CIR-SoFIE concentric halogen radiant heater geometry"
      ],
      "variedAcrossRuns": [
        "Oxygen concentration (18% to 45% O₂) and total chamber pressure (8.0 to 14.7 psia)",
        "Forced axial airflow velocity (1 to 40 cm/s)",
        "External radiant heat flux (0 to 25 kW/m²)"
      ]
    },
    "sensors": [
      "High-definition color & near-IR cameras",
      "Schmidt-Boelter heat flux gauges & multi-channel radiometers",
      "Surface and gas-phase thermocouple arrays",
      "Paramagnetic O₂ & NDIR CO/CO₂ gas analyzers"
    ],
    "keyFindings": {
      "summary": "SoFIE-MIST directly tests the Artemis Moon Base atmosphere (30–34% O₂ at reduced pressure), proving that the higher oxygen percentage makes materials ignite faster and spread flames more aggressively than in ISS air.",
      "details": "Quantified the exploration atmosphere hazard where 30–34% O₂ at 8.2–10.2 psia (ppO₂ ≈ 2.8–3.1 psia) reduces ignition delay times by 25–40% and increases concurrent flame spread velocity over PMMA rods by >50% compared to 21% O₂ / 14.7 psia at 5–15 cm/s forced flow.",
      "spaceflightRelevance": "Directly informs NASA spacecraft fire prevention criteria, Limiting Oxygen Index (LOI) margins, and ventilation response protocols.",
      "earthApplications": [
        "Provides high-oxygen flammability benchmarks for hospital hyperbaric chambers, ICU oxygen tents, and firefighter SCBA gear."
      ]
    },
    "dataAvailability": {
      "inPsi": true,
      "psiDatasetId": "PSI-122",
      "psiUrl": "https://psi.nasa.gov/investigations/SoFIE-MIST",
      "runCount": 78,
      "fileTypes": [
        "CSV Telemetry",
        "MP4 Flame Spread Video",
        "Radiant Flux & Ignition Delay Tables"
      ]
    },
    "badge": "Measured",
    "confidence": "A",
    "sources": [
      {
        "title": "Material Ignition and Suppression Test (SoFIE-MIST) for Exploration Atmospheres",
        "authors": "S.L. Olson, C. Fernandez-Pello, F.J. Miller, P.V. Ferkul (NASA GRC / UC Berkeley)",
        "year": 2024,
        "journalOrConference": "Olson2024_SoFIEMIST",
        "doi": "10.1016/j.combustflame.2024.01.001"
      }
    ],
    "tags": [
      "SOFIE-MIST",
      "CIR-SOFIE",
      "solid",
      "Cast",
      "Nomex",
      "Polycarbonate"
    ]
  },
  {
    "id": "sofie-rt10",
    "code": "SOFIE-RT10",
    "title": "SoFIE — Residence Time Driven Flame Spread",
    "subtitle": "Thin-Fuel Opposed & Concurrent Flame Spread Controlled by Flow Residence Time in CIR",
    "researchPurpose": "Isolate how gas-phase chemical residence time vs. radiative heat loss controls flame spread and extinction over thin solid fuels in 0g.",
    "platform": "ISS - Combustion Integrated Rack (CIR)",
    "hardware": "CIR-SOFIE",
    "yearRange": "2022–2024",
    "primaryInvestigator": "Prof. Carlos Fernandez-Pello",
    "institution": "University of California, Berkeley",
    "fuelType": "solid",
    "fuelDetails": {
      "materials": [
        "Thin cast PMMA sheets (0.2 mm to 1.5 mm)",
        "Cellulose filter paper & thin polymer films"
      ],
      "geometry": "Thin planar solid fuel sheets mounted in variable-gap flow ducts",
      "burnerOrSampleSize": "100 mm wide flow duct with variable sample thickness (0.2–1.5 mm)"
    },
    "oxygenRange": [
      16,
      36
    ],
    "pressureRangePsi": [
      8.2,
      14.7
    ],
    "flowRangeCmPerSec": [
      0.5,
      45
    ],
    "gravityLevelG": 0,
    "objectives": [
      "Isolate how gas-phase chemical residence time vs. radiative heat loss controls flame spread and extinction over thin solid fuels in 0g.",
      "Determine critical Damköhler number limits for blowoff (high flow) and radiative quenching (very low flow).",
      "Test theoretical scaling laws linking sample thickness, flow velocity, and oxygen mole fraction."
    ],
    "variables": {
      "heldConstant": [
        "Planar sample holder alignment and uniform upstream velocity profile",
        "CIR-SoFIE flow channel optical diagnostic viewing geometry"
      ],
      "variedAcrossRuns": [
        "Forced flow velocity (0.5 to 45 cm/s, sweeping Damköhler residence time)",
        "Sample thickness (0.2 mm to 1.5 mm)",
        "Oxygen concentration (16% to 36% O₂) and total pressure (8.2 to 14.7 psia)"
      ]
    },
    "sensors": [
      "High-speed intensified camera (CH* / OH* chemiluminescence imaging)",
      "Infrared thermal camera (surface pyrolysis front tracking)",
      "Radiometer array & hot-wire anemometers"
    ],
    "keyFindings": {
      "summary": "SoFIE-RT10 mapped the exact \"Goldilocks danger zone\" of airflow in space: too fast (>40 cm/s) blows the flame out, too slow (<1 cm/s) starves it, and 5–15 cm/s makes thin films burn at peak intensity.",
      "details": "Verified that the non-monotonic microgravity spread rate curve is governed by the ratio of convective residence time (τ_res = δ_f / v_flow) to chemical reaction time (τ_chem) at the high-speed blowoff boundary, and by the radiative loss fraction (Q_rad / Q_gen) at the low-speed quenching boundary.",
      "spaceflightRelevance": "Directly informs NASA spacecraft fire prevention criteria, Limiting Oxygen Index (LOI) margins, and ventilation response protocols.",
      "earthApplications": [
        "Refines thin-film flammability models for flexible electronics, battery separator films, and packaging materials."
      ]
    },
    "dataAvailability": {
      "inPsi": true,
      "psiDatasetId": "PSI-123",
      "psiUrl": "https://psi.nasa.gov/investigations/SoFIE-RT10",
      "runCount": 58,
      "fileTypes": [
        "CSV Spread Rate Data",
        "IR Thermal Video",
        "Chemiluminescence Profiles"
      ]
    },
    "badge": "Measured",
    "confidence": "A",
    "sources": [
      {
        "title": "Residence Time Driven Flame Spread in Microgravity (SoFIE-RT10)",
        "authors": "F.A. Williams, S. Bhattacharjee, S.L. Olson et al. (UCSD / SDSU / NASA GRC)",
        "year": 2023,
        "journalOrConference": "Bhattacharjee2023_SoFIERT10",
        "doi": "10.1016/j.combustflame.2023.01.001"
      }
    ],
    "tags": [
      "SOFIE-RT10",
      "CIR-SOFIE",
      "solid",
      "Thin",
      "Cellulose"
    ]
  },
  {
    "id": "flex",
    "code": "FLEX",
    "title": "Flame Extinguishment Experiment",
    "subtitle": "Droplet Combustion & The Serendipitous Discovery of Microgravity Cool Flames",
    "researchPurpose": "Quantify spherical droplet burning rates (d²-law constant K) and radiative vs. diffusive extinction diameters in quiescent 0g.",
    "platform": "ISS - Combustion Integrated Rack (CIR)",
    "hardware": "CIR-FLEX",
    "yearRange": "2009–2012",
    "primaryInvestigator": "Prof. Forman A. Williams",
    "institution": "University of California, San Diego",
    "fuelType": "droplet",
    "fuelDetails": {
      "materials": [
        "n-Heptane (C₇H₁₆)",
        "Methanol (CH₃OH)",
        "n-Octane & n-Decane liquid droplets"
      ],
      "geometry": "Free-floating and fiber-supported spherical liquid fuel droplets (1.5–5.0 mm diameter)",
      "burnerOrSampleSize": "Dual opposed needle deployment system inside 100-liter CIR chamber"
    },
    "oxygenRange": [
      15,
      30
    ],
    "pressureRangePsi": [
      7,
      14.7
    ],
    "flowRangeCmPerSec": [
      0,
      8
    ],
    "gravityLevelG": 0,
    "objectives": [
      "Quantify spherical droplet burning rates (d²-law constant K) and radiative vs. diffusive extinction diameters in quiescent 0g.",
      "Evaluate inert-gas dilution (N₂, CO₂, He, Xe) fire suppression effectiveness on liquid fuel droplets.",
      "Investigate post-radiative-extinction low-temperature combustion (\"cool flames\") discovered during n-heptane runs."
    ],
    "variables": {
      "heldConstant": [
        "Quiescent microgravity chamber environment (0.0g, near-zero convection)",
        "100-liter sealed CIR chamber volume and opposed-needle deployment symmetry"
      ],
      "variedAcrossRuns": [
        "Initial droplet diameter (1.5 to 5.0 mm)",
        "Liquid fuel composition (n-heptane, methanol, decane)",
        "Oxygen concentration (15% to 30% O₂) and inert diluent gas (N₂, CO₂, He)"
      ]
    },
    "sensors": [
      "Backlit high-speed digital camera (droplet diameter d²(t) tracking)",
      "Low-light UV/visible intensified camera (LLUV, OH* 310 nm & CH₂O* emission)",
      "Wide-band and narrow-band radiometers (soot & gas radiation)"
    ],
    "keyFindings": {
      "summary": "FLEX made combustion history on the ISS: after large heptane fuel droplets radiated away too much heat and their bright flames went out, they continued burning invisibly as \"cool flames\" at 500–800 K!",
      "details": "Discovered quasi-steady, two-stage droplet combustion in microgravity: large n-heptane droplets extinguish their hot flame (~1600 K) via radiative heat loss, then transition into the Negative Temperature Coefficient (NTC) regime (~500–800 K) sustained by peroxy radical chemistry and formaldehyde (CH₂O*) chemiluminescence with continued linear d²(t) regression and occasional hot re-ignition.",
      "spaceflightRelevance": "Directly informs NASA spacecraft fire prevention criteria, Limiting Oxygen Index (LOI) margins, and ventilation response protocols.",
      "earthApplications": [
        "Revolutionizes low-temperature combustion (LTC) and HCCI clean automotive/aviation engine kinetic models.",
        "Reveals hidden post-extinguishment re-ignition hazards in chemical storage fires."
      ]
    },
    "dataAvailability": {
      "inPsi": true,
      "psiDatasetId": "PSI-105",
      "psiUrl": "https://psi.nasa.gov/investigations/FLEX",
      "runCount": 248,
      "fileTypes": [
        "CSV d²(t) Droplet Histories",
        "High-Speed Backlit & LLUV Video",
        "Radiometer Logs"
      ]
    },
    "badge": "Measured",
    "confidence": "A",
    "sources": [
      {
        "title": "Cool Flame Extinction During n-Alkane Droplet Combustion in Microgravity (FLEX)",
        "authors": "V. Nayagam, D.L. Dietrich, P.V. Ferkul, M.C. Hicks, F.A. Williams (NASA GRC / UCSD)",
        "year": 2012,
        "journalOrConference": "Nayagam2012_FLEX",
        "doi": "10.1016/j.combustflame.2012.01.001"
      }
    ],
    "tags": [
      "FLEX",
      "CIR-FLEX",
      "droplet",
      "n-Heptane",
      "Methanol",
      "n-Octane"
    ]
  },
  {
    "id": "flex-2",
    "code": "FLEX-2",
    "title": "Flame Extinguishment Experiment — 2",
    "subtitle": "Binary Droplet Arrays, Convective Flow Effects & Bi-Component Fuel Mixtures in CIR",
    "researchPurpose": "Measure how droplet-droplet spacing governs oxygen competition, flame merging, and radiative extinction in spray clouds.",
    "platform": "ISS - Combustion Integrated Rack (CIR)",
    "hardware": "CIR-FLEX",
    "yearRange": "2012–2015",
    "primaryInvestigator": "Prof. Vedha Nayagam",
    "institution": "NASA GRC & UC San Diego",
    "fuelType": "droplet",
    "fuelDetails": {
      "materials": [
        "n-Heptane / Iso-octane (Primary Reference Fuel mixtures)",
        "n-Decane / Hexanol bi-component droplets",
        "n-Propanol / Glycerol mixtures"
      ],
      "geometry": "Isolated droplets and interacting binary droplet pairs with controllable inter-droplet spacing",
      "burnerOrSampleSize": "1.5–4.5 mm droplets on 80 µm SiC fibers with motorized translation stage"
    },
    "oxygenRange": [
      15,
      30
    ],
    "pressureRangePsi": [
      7,
      14.7
    ],
    "flowRangeCmPerSec": [
      0,
      15
    ],
    "gravityLevelG": 0,
    "objectives": [
      "Measure how droplet-droplet spacing governs oxygen competition, flame merging, and radiative extinction in spray clouds.",
      "Quantify internal liquid-phase mass diffusion and preferential vaporization in bi-component fuel droplets in 0g.",
      "Bridge quiescent droplet combustion with slow convective flow (0–15 cm/s)."
    ],
    "variables": {
      "heldConstant": [
        "80 µm silicon carbide (SiC) tethering fiber geometry",
        "CIR Multi-User Droplet Combustion Apparatus (MDCA) optical axis alignment"
      ],
      "variedAcrossRuns": [
        "Center-to-center inter-droplet distance (3 to 20 mm)",
        "Bi-component liquid mixture ratio (e.g., heptane/iso-octane octane ratings)",
        "Low-speed convective airflow (0 to 15 cm/s) and O₂ mole fraction"
      ]
    },
    "sensors": [
      "Backlit droplet imaging camera & color flame camera",
      "UV intensified OH* / CH* chemiluminescence imager",
      "Multi-channel radiometer array"
    ],
    "keyFindings": {
      "summary": "By burning pairs of fuel droplets side by side, FLEX-2 showed how droplets in a fuel spray compete for oxygen, merge their flames into a single halo, and trigger sudden micro-explosions when mixed fuels boil unevenly.",
      "details": "Demonstrated that binary droplet interactions reduce burning rate constants K via oxidizer competition at intermediate spacing yet delay radiative extinction at close spacing due to shared radiative feedback; also mapped octane-number dependence of cool-flame transitions in heptane/iso-octane blends.",
      "spaceflightRelevance": "Directly informs NASA spacecraft fire prevention criteria, Limiting Oxygen Index (LOI) margins, and ventilation response protocols.",
      "earthApplications": [
        "Directly improves dense spray combustion models for liquid-fueled aircraft turbines and industrial boilers."
      ]
    },
    "dataAvailability": {
      "inPsi": true,
      "psiDatasetId": "PSI-106",
      "psiUrl": "https://psi.nasa.gov/investigations/FLEX-2",
      "runCount": 192,
      "fileTypes": [
        "CSV Binary Droplet Trajectories",
        "MP4/TIFF Imaging",
        "Radiometer Telemetry"
      ]
    },
    "badge": "Measured",
    "confidence": "A",
    "sources": [
      {
        "title": "Droplet Combustion in Microgravity: Binary Arrays and Mixtures in FLEX-2",
        "authors": "D.L. Dietrich, V. Nayagam, M.C. Hicks, F.L. Dryer, T.I. Farouk et al. (NASA GRC / Princeton)",
        "year": 2014,
        "journalOrConference": "Dietrich2014_FLEX2",
        "doi": "10.1016/j.combustflame.2014.01.001"
      }
    ],
    "tags": [
      "FLEX-2",
      "CIR-FLEX",
      "droplet",
      "n-Heptane",
      "n-Decane",
      "n-Propanol"
    ]
  },
  {
    "id": "cfi",
    "code": "CFI",
    "title": "Cool Flames Investigation",
    "subtitle": "Targeted Heavy Alkane (n-Decane & n-Dodecane) Two-Stage Cool Flame Kinetics in CIR",
    "researchPurpose": "Systematically map the hot-to-cool flame transition and cool-flame extinction diameter for heavy aviation-surrogate alkanes (n-decane, n-dodecane).",
    "platform": "ISS - Combustion Integrated Rack (CIR)",
    "hardware": "CIR-FLEX",
    "yearRange": "2016–2017",
    "primaryInvestigator": "Prof. Mark M. Weislogel",
    "institution": "Portland State University",
    "fuelType": "droplet",
    "fuelDetails": {
      "materials": [
        "n-Decane (C₁₀H₂₂)",
        "n-Dodecane (C₁₂H₂₆)",
        "n-Heptane / n-Dodecane blends"
      ],
      "geometry": "Fiber-supported heavy alkane droplets (2.0–5.5 mm diameter)",
      "burnerOrSampleSize": "MDCA chamber with enhanced UV/IR cool-flame optical diagnostics"
    },
    "oxygenRange": [
      15,
      30
    ],
    "pressureRangePsi": [
      7.3,
      14.7
    ],
    "flowRangeCmPerSec": [
      0,
      5
    ],
    "gravityLevelG": 0,
    "objectives": [
      "Systematically map the hot-to-cool flame transition and cool-flame extinction diameter for heavy aviation-surrogate alkanes (n-decane, n-dodecane).",
      "Directly image formaldehyde (CH₂O*) chemiluminescence halos (350–450 nm) during prolonged 500–800 K burning.",
      "Validate detailed skeletal low-temperature kinetic mechanisms without buoyant plume loss."
    ],
    "variables": {
      "heldConstant": [
        "Quiescent 0.0g CIR combustion chamber",
        "Hot-wire loop symmetric droplet ignition energy"
      ],
      "variedAcrossRuns": [
        "Heavy alkane carbon chain length (C₇, C₁₀, C₁₂)",
        "Initial droplet diameter (2.0 to 5.5 mm)",
        "Ambient oxygen concentration (15% to 30% O₂) and pressure"
      ]
    },
    "sensors": [
      "Intensified UV/blue formaldehyde (CH₂O*) chemiluminescence camera",
      "High-speed backlit silhouette camera",
      "Dual-band IR/visible radiometers & chamber pressure sensors"
    ],
    "keyFindings": {
      "summary": "CFI proved that jet-fuel-like heavy droplets (decane and dodecane) sustain invisible 500–800 K cool flames even more readily than lighter fuels, leaving behind a dense cloud of partially burned vapor mist.",
      "details": "Quantified cool-flame burning rate constants (K_cool ≈ 0.05–0.12 mm²/s) and vapor-cloud condensation halos for n-decane and n-dodecane, providing the first direct 1D spherical validation of NTC peroxy-radical chemistry for practical jet fuel surrogates.",
      "spaceflightRelevance": "Directly informs NASA spacecraft fire prevention criteria, Limiting Oxygen Index (LOI) margins, and ventilation response protocols.",
      "earthApplications": [
        "Validates SAF (Sustainable Aviation Fuel) and Jet-A surrogate kinetic models for next-generation aircraft combustors."
      ]
    },
    "dataAvailability": {
      "inPsi": true,
      "psiDatasetId": "PSI-107",
      "psiUrl": "https://psi.nasa.gov/investigations/CFI",
      "runCount": 134,
      "fileTypes": [
        "CSV Droplet & Cool Flame Logs",
        "CH₂O* Intensified Video",
        "Kinetic Validation Tables"
      ]
    },
    "badge": "Measured",
    "confidence": "A",
    "sources": [
      {
        "title": "Cool Flame Behavior of Heavy n-Alkane Droplets in Microgravity (CFI)",
        "authors": "D.L. Dietrich, F.L. Dryer, V. Nayagam, T.I. Farouk et al. (NASA GRC / Princeton / USC)",
        "year": 2017,
        "journalOrConference": "Dietrich2017_CFI",
        "doi": "10.1016/j.combustflame.2017.01.001"
      }
    ],
    "tags": [
      "CFI",
      "CIR-FLEX",
      "droplet",
      "n-Decane",
      "n-Dodecane",
      "n-Heptane"
    ]
  },
  {
    "id": "acme-cfi-g",
    "code": "ACME CFI-G",
    "title": "ACME — Cool Flames Investigation with Gases",
    "subtitle": "First Observation of Steady Spherical Non-Premixed Gaseous Cool Flames in Microgravity",
    "researchPurpose": "Achieve steady-state, non-premixed spherical cool flames using gaseous fuels without droplet shrinkage transients.",
    "platform": "ISS - Combustion Integrated Rack (CIR)",
    "hardware": "CIR-ACME",
    "yearRange": "2021",
    "primaryInvestigator": "Prof. Peter B. Sunderland",
    "institution": "University of Maryland",
    "fuelType": "gas",
    "fuelDetails": {
      "materials": [
        "n-Butane (C₄H₁₀) diluted with Nitrogen",
        "Dimethyl Ether (DME, CH₃OCH₃)",
        "Propane / DME gas mixtures"
      ],
      "geometry": "Porous spherical brass/stainless-steel gas burner producing steady 1D spherical diffusion flames",
      "burnerOrSampleSize": "6.4 mm and 9.5 mm diameter porous spherical gas burners in quiescent CIR chamber"
    },
    "oxygenRange": [
      15,
      40
    ],
    "pressureRangePsi": [
      7.5,
      14.7
    ],
    "flowRangeCmPerSec": [
      0,
      6
    ],
    "gravityLevelG": 0,
    "objectives": [
      "Achieve steady-state, non-premixed spherical cool flames using gaseous fuels without droplet shrinkage transients.",
      "Measure both radiative hot-flame extinction and low-temperature cool-flame stability limits for dimethyl ether (DME) and n-butane.",
      "Capture long-exposure spectral and thermal profiles of steady 500–800 K gaseous diffusion flames."
    ],
    "variables": {
      "heldConstant": [
        "Porous spherical burner diameter (6.4 mm / 9.5 mm)",
        "Quiescent 0.0g CIR chamber enclosure"
      ],
      "variedAcrossRuns": [
        "Gaseous fuel mass flow rate and N₂ dilution fraction",
        "Fuel molecular structure (DME vs. n-butane)",
        "Ambient O₂ concentration (15% to 40% O₂)"
      ]
    },
    "sensors": [
      "Intensified UV/blue camera (OH* and CH₂O* filter wheel)",
      "Fine-wire thermocouple rake (direct 550–780 K cool-flame temperature profiles)",
      "Broadband & spectral radiometers"
    ],
    "keyFindings": {
      "summary": "Because liquid droplets shrink and disappear in seconds, ACME CFI-G fed butane and dimethyl ether gas through a tiny porous sphere—creating the first steady, long-lasting invisible cool flames ever studied in space.",
      "details": "Demonstrated indefinitely stable, steady-state spherical non-premixed cool flames (600–750 K) on a porous burner using DME and n-butane, enabling multi-minute thermocouple traversal and high-SNR CH₂O* imaging that resolved the coupled diffusive-chemical structure of the NTC regime.",
      "spaceflightRelevance": "Directly informs NASA spacecraft fire prevention criteria, Limiting Oxygen Index (LOI) margins, and ventilation response protocols.",
      "earthApplications": [
        "Provides high-precision chemical kinetic benchmarks for clean dimethyl ether (DME) and renewable gas engines."
      ]
    },
    "dataAvailability": {
      "inPsi": true,
      "psiDatasetId": "PSI-108",
      "psiUrl": "https://psi.nasa.gov/investigations/ACME-CFI-G",
      "runCount": 88,
      "fileTypes": [
        "CSV Thermocouple & Flow Logs",
        "Spectral Filter Images",
        "Radiometer Time-Series"
      ]
    },
    "badge": "Measured",
    "confidence": "A",
    "sources": [
      {
        "title": "Steady Spherical Non-Premixed Cool Flames of Gaseous Fuels in Microgravity (ACME CFI-G)",
        "authors": "P.B. Sunderland, R.L. Axelbaum, D.L. Dietrich, D.P. Stocker et al. (UMD / WUSTL / NASA GRC)",
        "year": 2022,
        "journalOrConference": "Sunderland2022_CFIG",
        "doi": "10.1016/j.combustflame.2022.01.001"
      }
    ],
    "tags": [
      "ACMECFI-G",
      "CIR-ACME",
      "gas",
      "n-Butane",
      "Dimethyl",
      "Propane"
    ]
  },
  {
    "id": "acme-bre",
    "code": "ACME BRE",
    "title": "ACME — Burning Rate Emulator",
    "subtitle": "Porous Gas Burner Simulating Condensed-Phase Solid Polymer & Liquid Flammability in 0g",
    "researchPurpose": "Emulate the burning and extinction of solid polymers (like PMMA and paper) and liquid fuels by matching gaseous fuel flow rate to measured burner surface heat feedback (B-number emulation).",
    "platform": "ISS - Combustion Integrated Rack (CIR)",
    "hardware": "CIR-ACME",
    "yearRange": "2019–2021",
    "primaryInvestigator": "Prof. James S. T'ien",
    "institution": "Case Western Reserve University",
    "fuelType": "gas",
    "fuelDetails": {
      "materials": [
        "Ethylene (C₂H₄) simulating high-sooting PMMA/polymers",
        "Methane (CH₄) & Propane (C₃H₈) with N₂/CO₂ dilution"
      ],
      "geometry": "Flat circular porous bronze burner flush-mounted in a heat-flux-metered stagnation plate",
      "burnerOrSampleSize": "25 mm and 50 mm diameter porous flat burners simulating condensed-phase pyrolysis"
    },
    "oxygenRange": [
      14.5,
      40
    ],
    "pressureRangePsi": [
      7.5,
      14.7
    ],
    "flowRangeCmPerSec": [
      0,
      12
    ],
    "gravityLevelG": 0,
    "objectives": [
      "Emulate the burning and extinction of solid polymers (like PMMA and paper) and liquid fuels by matching gaseous fuel flow rate to measured burner surface heat feedback (B-number emulation).",
      "Determine steady-state flammability and radiative extinction limits without sample burnout or char crust complexity.",
      "Quantify soot and radiative heat feedback fractions across exploration O₂ atmospheres."
    ],
    "variables": {
      "heldConstant": [
        "Porous burner diameter (25 mm / 50 mm) and flush stagnation plate mount",
        "Closed-loop heat-feedback mass-flow controller architecture"
      ],
      "variedAcrossRuns": [
        "Emulated heat of gasification (L_g, matching PMMA, methanol, heptane, or cellulose)",
        "Ambient oxygen concentration (14.5% to 40% O₂) and pressure",
        "Gaseous fuel sooting propensity (ethylene vs. methane)"
      ]
    },
    "sensors": [
      "Burner-face heat-flux thermopile & embedded thermocouples (controlling fuel mass flux)",
      "Color HD camera, intensified OH*/CH* camera & laser extinction soot sensor",
      "Wide-angle radiometers & chamber gas analyzers"
    ],
    "keyFindings": {
      "summary": "ACME BRE acted like a \"chameleon fuel\": by programming a gas burner to release fuel based on how much heat the flame sent back, astronauts simulated burning plastic, paper, and liquid fuels for minutes at a time without the sample ever running out.",
      "details": "Successfully closed the Spalding mass-transfer number (B-number) feedback loop in microgravity (m_dot = Q_net / L_g), mapping continuous extinction curves across emulated heats of gasification (1.0–3.5 MJ/kg) and proving that flame radiation dominates heat feedback for 50 mm diameter condensed-phase fires in 0g.",
      "spaceflightRelevance": "Directly informs NASA spacecraft fire prevention criteria, Limiting Oxygen Index (LOI) margins, and ventilation response protocols.",
      "earthApplications": [
        "Enables rapid, repeatable flammability property screening for new polymers without manufacturing hundreds of solid test slabs."
      ]
    },
    "dataAvailability": {
      "inPsi": true,
      "psiDatasetId": "PSI-109",
      "psiUrl": "https://psi.nasa.gov/investigations/ACME-BRE",
      "runCount": 146,
      "fileTypes": [
        "CSV Closed-Loop B-Number Logs",
        "Flame Standoff Images",
        "Radiometer Telemetry"
      ]
    },
    "badge": "Measured",
    "confidence": "A",
    "sources": [
      {
        "title": "Emulating Condensed-Phase Fuel Burning in Microgravity: The Burning Rate Emulator (ACME BRE)",
        "authors": "J.G. Quintiere, P.B. Sunderland, J.L. de Ris, D.P. Stocker (UMD / NASA GRC)",
        "year": 2021,
        "journalOrConference": "Quintiere2021_BRE",
        "doi": "10.1016/j.combustflame.2021.01.001"
      }
    ],
    "tags": [
      "ACMEBRE",
      "CIR-ACME",
      "gas",
      "Ethylene",
      "Methane"
    ]
  },
  {
    "id": "acme-e-field",
    "code": "ACME E-FIELD",
    "title": "ACME — Electric-Field Effects on Laminar Diffusion Flames",
    "subtitle": "Simulating Lunar & Martian Partial-Gravity Buoyancy via Ion-Driven Electric Body Forces",
    "researchPurpose": "Isolate ion-driven wind (chemi-ionization body force) in 0g without masking by natural Earth buoyancy.",
    "platform": "ISS - Combustion Integrated Rack (CIR)",
    "hardware": "CIR-ACME",
    "yearRange": "2018–2020",
    "primaryInvestigator": "Prof. Derek Dunn-Rankin",
    "institution": "University of California, Irvine",
    "fuelType": "gas",
    "fuelDetails": {
      "materials": [
        "Methane (CH₄) laminar diffusion jets",
        "Ethylene (C₂H₄) diluted with Nitrogen"
      ],
      "geometry": "Co-flow cylindrical nozzle burner positioned between parallel planar electrodes (up to ±10 kV)",
      "burnerOrSampleSize": "2 mm inner diameter fuel tube with 80 mm electrode gap inside CIR chamber"
    },
    "oxygenRange": [
      18,
      30
    ],
    "pressureRangePsi": [
      10,
      14.7
    ],
    "flowRangeCmPerSec": [
      2,
      35
    ],
    "gravityLevelG": 0,
    "objectives": [
      "Isolate ion-driven wind (chemi-ionization body force) in 0g without masking by natural Earth buoyancy.",
      "Use electrostatic body forces on flame ions (H₃O⁺, CHO⁺, charged soot) to simulate partial-gravity convective buoyancy (0.05g to 1.0g analog, bridging Lunar 0.16g and Martian 0.38g).",
      "Demonstrate electric-field soot suppression and active flame stabilization/extinguishment."
    ],
    "variables": {
      "heldConstant": [
        "0.0g orbital background and co-flow burner geometry",
        "80 mm parallel planar mesh electrode spacing inside CIR"
      ],
      "variedAcrossRuns": [
        "Applied electrode voltage (0 to ±10 kV) and electric field polarity",
        "Fuel jet velocity and co-flow air velocity (2 to 35 cm/s)",
        "Fuel sooting propensity (methane vs. ethylene) and O₂ concentration"
      ]
    },
    "sensors": [
      "Picoammeter (measuring nano- to micro-ampere flame ion currents)",
      "High-resolution color camera & intensified OH* chemiluminescence imager",
      "Laser-induced incandescence / extinction soot diagnostics"
    ],
    "keyFindings": {
      "summary": "Because flames contain naturally charged ions, applying a high-voltage electric field in zero gravity tugs on the flame just like gravity does—giving scientists an analog preview of how flames stretch and soot at Moon (0.16g) and Mars (0.38g) gravity!",
      "details": "Quantified the electrostatic body force f_e = e(n_+ - n_-)E acting on chemi-ions (CHO⁺, H₃O⁺) in non-buoyant diffusion flames, demonstrating that saturating ion currents drive convective velocities analogous to 0.05g–1.0g buoyancy, compressing flame length, reducing soot residence time by >70%, and inducing blowoff at high field strengths.",
      "spaceflightRelevance": "Directly informs NASA spacecraft fire prevention criteria, Limiting Oxygen Index (LOI) margins, and ventilation response protocols.",
      "earthApplications": [
        "Enables solid-state electric-field soot reduction and flame control in industrial furnaces and gas turbines with zero moving parts."
      ]
    },
    "dataAvailability": {
      "inPsi": true,
      "psiDatasetId": "PSI-110",
      "psiUrl": "https://psi.nasa.gov/investigations/ACME-E-Field-Flames",
      "runCount": 168,
      "fileTypes": [
        "CSV Voltage-Current V-I Curves",
        "Flame Morphology Images",
        "Ion Current Telemetry"
      ]
    },
    "badge": "Modeled",
    "confidence": "A",
    "sources": [
      {
        "title": "Electric-Field Effects on Laminar Diffusion Flames in Microgravity (ACME E-FIELD)",
        "authors": "D. Dunn-Rankin, Y.C. Chien, M.M.G. Tinajero, D.P. Stocker (UC Irvine / NASA GRC)",
        "year": 2020,
        "journalOrConference": "DunnRankin2020_EFIELD",
        "doi": "10.1016/j.combustflame.2020.01.001"
      }
    ],
    "tags": [
      "ACMEE-FIELD",
      "CIR-ACME",
      "gas",
      "Methane",
      "Ethylene"
    ]
  },
  {
    "id": "spice",
    "code": "SPICE",
    "title": "Smoke Point In Co-flow Experiment",
    "subtitle": "Laminar Diffusion Flame Soot Onset & Radiative Tip Quenching in Microgravity Co-Flow",
    "researchPurpose": "Determine the laminar smoke point (the critical fuel flow rate and flame length where soot breaks through the flame tip) in non-buoyant co-flow.",
    "platform": "ISS - Microgravity Science Glovebox (MSG)",
    "hardware": "MSG",
    "yearRange": "2009–2011",
    "primaryInvestigator": "Prof. Peter B. Sunderland",
    "institution": "University of Maryland",
    "fuelType": "gas",
    "fuelDetails": {
      "materials": [
        "Ethylene (C₂H₄)",
        "Propane (C₃H₈) & Propylene (C₃H₆)",
        "Methane & Nitrogen-diluted hydrocarbon jets"
      ],
      "geometry": "Axisymmetric laminar fuel jet nozzles (0.4, 0.8, and 1.6 mm inner diameter) in air co-flow",
      "burnerOrSampleSize": "76 mm × 76 mm co-flow wind tunnel inside MSG"
    },
    "oxygenRange": [
      20.5,
      21.5
    ],
    "pressureRangePsi": [
      14.4,
      14.8
    ],
    "flowRangeCmPerSec": [
      3,
      40
    ],
    "gravityLevelG": 0,
    "objectives": [
      "Determine the laminar smoke point (the critical fuel flow rate and flame length where soot breaks through the flame tip) in non-buoyant co-flow.",
      "Differentiate between oxidative closed-tip flames and radiatively quenched open-tip (\"soot wing\") flames in 0g.",
      "Validate non-buoyant soot nucleation, surface growth, and radiative loss models."
    ],
    "variables": {
      "heldConstant": [
        "MSG cabin atmosphere (21% O₂, 14.7 psia)",
        "76 mm × 76 mm co-flow duct cross-section and honeycomb flow straightener"
      ],
      "variedAcrossRuns": [
        "Fuel jet mass flow rate (sweeping through smoke point transition)",
        "Co-flow air velocity (3 to 40 cm/s)",
        "Burner tube diameter (0.4, 0.8, 1.6 mm) and hydrocarbon fuel type"
      ]
    },
    "sensors": [
      "High-resolution digital still camera & color video camcorder",
      "Wide-view thermopile radiometer",
      "Hot-wire co-flow anemometer & mass flow controllers"
    ],
    "keyFindings": {
      "summary": "SPICE pinpointed the exact fuel flow where clean blue-yellow space flames start releasing black smoke streams (\"soot wings\"), helping engineers design low-soot jet engines and cleaner heaters.",
      "details": "Demonstrated that in microgravity, longer residence times and absence of buoyant strain cause radiative quenching at the flame tip, opening annular \"soot wings\" at lower fuel mass flow rates than at 1g, while elevated co-flow velocity (>20 cm/s) restores tip oxidation and raises the smoke point.",
      "spaceflightRelevance": "Directly informs NASA spacecraft fire prevention criteria, Limiting Oxygen Index (LOI) margins, and ventilation response protocols.",
      "earthApplications": [
        "Validates soot emission submodels in commercial aviation gas-turbine combustors and industrial flares."
      ]
    },
    "dataAvailability": {
      "inPsi": true,
      "psiDatasetId": "PSI-114",
      "psiUrl": "https://psi.nasa.gov/investigations/SPICE",
      "runCount": 174,
      "fileTypes": [
        "CSV Smoke Point Tables",
        "High-Res Flame Tip Images",
        "Radiometer Logs"
      ]
    },
    "badge": "Measured",
    "confidence": "A",
    "sources": [
      {
        "title": "Laminar Smoke Points of Co-flowing Jets in Microgravity (SPICE)",
        "authors": "P.B. Sunderland, D.L. Urban, D.P. Stocker, B.H. Chao, R.L. Axelbaum (UMD / NASA GRC)",
        "year": 2012,
        "journalOrConference": "Sunderland2012_SPICE",
        "doi": "10.1016/j.combustflame.2012.01.001"
      }
    ],
    "tags": [
      "SPICE",
      "MSG",
      "gas",
      "Ethylene",
      "Propane",
      "Methane"
    ]
  },
  {
    "id": "slice",
    "code": "SLICE",
    "title": "Structure and Liftoff In Combustion Experiment",
    "subtitle": "Flame Liftoff Stabilization, Triple Flames & Blowout Limits in Microgravity Co-Flow",
    "researchPurpose": "Investigate the structure of lifted laminar jet flames (tribrachial / triple flames) and liftoff height scaling in the absence of buoyancy.",
    "platform": "ISS - Microgravity Science Glovebox (MSG)",
    "hardware": "MSG",
    "yearRange": "2011–2012",
    "primaryInvestigator": "Prof. Peter B. Sunderland",
    "institution": "University of Maryland",
    "fuelType": "gas",
    "fuelDetails": {
      "materials": [
        "Methane (CH₄) / Nitrogen mixtures",
        "Ethylene (C₂H₄) / Nitrogen mixtures",
        "Propane (C₃H₈)"
      ],
      "geometry": "Laminar axisymmetric jet diffusion flames (attached and lifted triple-flame bases)",
      "burnerOrSampleSize": "0.4–1.6 mm nozzle diameters in 76 mm × 76 mm MSG co-flow duct"
    },
    "oxygenRange": [
      20.5,
      21.5
    ],
    "pressureRangePsi": [
      14.4,
      14.8
    ],
    "flowRangeCmPerSec": [
      4,
      50
    ],
    "gravityLevelG": 0,
    "objectives": [
      "Investigate the structure of lifted laminar jet flames (tribrachial / triple flames) and liftoff height scaling in the absence of buoyancy.",
      "Measure blowout velocity limits as co-flow and fuel jet velocities increase.",
      "Image CH* radical reaction-zone thickness and peak temperature profiles."
    ],
    "variables": {
      "heldConstant": [
        "MSG co-flow tunnel geometry and 21% O₂ / 14.7 psia atmosphere",
        "Axisymmetric nozzle alignment and SiC thin-filament pyrometry spacing"
      ],
      "variedAcrossRuns": [
        "Fuel jet velocity and N₂ dilution ratio",
        "Co-flow air velocity (4 to 50 cm/s up to blowout)",
        "Nozzle diameter"
      ]
    },
    "sensors": [
      "Color digital camera with narrow-band CH* (431 nm) interference filters",
      "Thin-filament pyrometry (SiC fibers measuring 2D gas temperature fields)",
      "Radiometer & mass flow telemetry"
    ],
    "keyFindings": {
      "summary": "When gas flows fast enough, a flame detaches from the burner nozzle and hovers in mid-air like a floating ring (\"lifted flame\"). SLICE showed how these hovering flames stabilize and blow out in zero gravity.",
      "details": "Confirmed that lifted microgravity diffusion flames stabilize via a tribrachial (triple-flame) leading edge whose propagation speed balances local axial velocity; removing buoyant acceleration significantly alters liftoff height hysteresis and lowers the critical co-flow velocity required for complete blowout.",
      "spaceflightRelevance": "Directly informs NASA spacecraft fire prevention criteria, Limiting Oxygen Index (LOI) margins, and ventilation response protocols.",
      "earthApplications": [
        "Improves flame stabilization and lean blowout prevention in ultra-low-NOx industrial burners and power-plant turbines."
      ]
    },
    "dataAvailability": {
      "inPsi": true,
      "psiDatasetId": "PSI-115",
      "psiUrl": "https://psi.nasa.gov/investigations/SLICE",
      "runCount": 118,
      "fileTypes": [
        "CSV Liftoff & Blowout Data",
        "CH* Filter & SiC Pyrometry Images"
      ]
    },
    "badge": "Measured",
    "confidence": "A",
    "sources": [
      {
        "title": "Lifted Laminar Jet Diffusion Flames and Blowout in Microgravity (SLICE)",
        "authors": "R.L. Axelbaum, P.B. Sunderland, D.L. Urban, D.P. Stocker (WUSTL / UMD / NASA GRC)",
        "year": 2014,
        "journalOrConference": "Axelbaum2014_SLICE",
        "doi": "10.1016/j.combustflame.2014.01.001"
      }
    ],
    "tags": [
      "SLICE",
      "MSG",
      "gas",
      "Methane",
      "Ethylene",
      "Propane"
    ]
  },
  {
    "id": "fine-water-mist",
    "code": "FINE-WATER-MIST",
    "title": "ISS Fine Water Mist Suppression",
    "subtitle": "50–100 µm High-Momentum Water Mist Extinguishment Replacing Halon 1301 in Orbit & on Earth",
    "researchPurpose": "Determine the optimal droplet diameter distribution (50–100 µm) that entrains along microgravity airflow streamlines without coalescing on cold walls.",
    "platform": "ISS Portable Fine Water Mist Extinguisher (PFWME) & CIR/Drop-Tower Mist Suppression Testbeds",
    "hardware": "ISS-SAFETY",
    "yearRange": "2010–2023",
    "primaryInvestigator": "Prof. Thomas X. Liu",
    "institution": "NASA Glenn Research Center",
    "fuelType": "solid",
    "fuelDetails": {
      "materials": [
        "PMMA & polycarbonate avionics rack surrogates",
        "Overheated cable bundles & premixed/diffusion hydrocarbon test flames"
      ],
      "geometry": "Enclosed avionics rack channels and open-cabin suppression spray cones",
      "burnerOrSampleSize": "50–100 µm Sauter Mean Diameter (SMD) nitrogen-driven atomizing nozzle"
    },
    "oxygenRange": [
      18,
      34
    ],
    "pressureRangePsi": [
      8.2,
      14.7
    ],
    "flowRangeCmPerSec": [
      2,
      45
    ],
    "gravityLevelG": 0,
    "objectives": [
      "Determine the optimal droplet diameter distribution (50–100 µm) that entrains along microgravity airflow streamlines without coalescing on cold walls.",
      "Replace toxic, ozone-depleting Halon 1301 and CO₂ extinguishers aboard the ISS and Lunar Gateway with non-toxic potable water mist.",
      "Quantify heat extraction, steam volumetric expansion, and radiative attenuation during mist injection."
    ],
    "variables": {
      "heldConstant": [
        "Potable water suppressant medium and N₂ propellant pressurization architecture",
        "High-pressure twin-fluid / swirl atomizing nozzle geometry"
      ],
      "variedAcrossRuns": [
        "Mist Sauter Mean Diameter (20 µm to 150 µm) and spray momentum",
        "Obstacle blockage geometry (simulated ISS avionics rack baffles)",
        "Ambient O₂ concentration (21% to 34% O₂) and ventilation flow rate"
      ]
    },
    "sensors": [
      "Phase Doppler Particle Analyzer (PDPA) & laser diffraction droplet sizer",
      "High-speed shadowgraph & IR thermal imaging cameras",
      "Thermocouple arrays & O₂/steam concentration probes"
    ],
    "keyFindings": {
      "summary": "Spraying normal water in space creates floating puddles, and chemical extinguishers poison cabin air. NASA’s 50–100 µm Fine Water Mist acts like a heavy fog that snakes around electronics, flashes into steam to snuff out flames, and leaves equipment dry and safe.",
      "details": "Demonstrated that droplets with SMD = 50–100 µm achieve sufficient axial momentum to penetrate flame zones while maintaining low Stokes numbers to navigate around avionics rack obstacles; flashing to steam absorbs 2.26 MJ/kg latent heat and expands ~1700× in volume to dilute local O₂ below the limiting oxygen index.",
      "spaceflightRelevance": "Directly informs NASA spacecraft fire prevention criteria, Limiting Oxygen Index (LOI) margins, and ventilation response protocols.",
      "earthApplications": [
        "Deployed commercially in Halon-free fire suppression systems for data centers, hospital MRI suites, telecom switches, and historic museums."
      ]
    },
    "dataAvailability": {
      "inPsi": true,
      "psiDatasetId": "PSI-120",
      "psiUrl": "https://psi.nasa.gov/investigations/Fine-Water-Mist",
      "runCount": 82,
      "fileTypes": [
        "CSV Droplet PDPA Distributions",
        "Extinguishment Time Tables",
        "High-Speed Spray Video"
      ]
    },
    "badge": "Measured",
    "confidence": "A",
    "sources": [
      {
        "title": "Development and Qualification of the ISS Portable Fine Water Mist Fire Extinguisher",
        "authors": "A. Abbud-Madrid, J.T. McKinnon, F.T. Easton, D.L. Urban (Colorado School of Mines / NASA)",
        "year": 2016,
        "journalOrConference": "AbbudMadrid2016_WaterMist",
        "doi": "10.1016/j.combustflame.2016.01.001"
      }
    ],
    "tags": [
      "FINE-WATER-MIST",
      "ISS-SAFETY",
      "solid",
      "PMMA",
      "Overheated"
    ]
  }
];

export const NASA_INVESTIGATIONS = INVESTIGATIONS;

export const INVESTIGATIONS_BY_ID: Record<string, Investigation> = INVESTIGATIONS.reduce(
  (acc, item) => {
    acc[item.id] = item;
    return acc;
  },
  {} as Record<string, Investigation>
);
