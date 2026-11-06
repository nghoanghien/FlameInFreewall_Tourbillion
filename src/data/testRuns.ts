import type { TestRun } from '../types';

export const TEST_RUNS: TestRun[] = [
  {
    "id": "BASS-RUN-01",
    "investigationId": "bass",
    "externalRunKey": "PSI-BASS-TR-1001",
    "materialType": "PMMA Flat Sheet",
    "sampleGeometry": "10 mm × 50 mm Flat Sheet",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 5,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0.85,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1580,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 74,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 23,
      "flameWidthMm": 17,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 15,
        "flameRadiusMm": 9.32,
        "temperatureK": 1165,
        "sootDensity": 0.4
      },
      {
        "timeSec": 30,
        "flameRadiusMm": 10.64,
        "temperatureK": 1560,
        "sootDensity": 0.4
      },
      {
        "timeSec": 52,
        "flameRadiusMm": 12.57,
        "temperatureK": 1503,
        "sootDensity": 0.4
      },
      {
        "timeSec": 74,
        "flameRadiusMm": 14.5,
        "temperatureK": 1446,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/bass/run_1.mp4",
    "notes": "Quiescent opposed flow with stable blue leading edge and trailing soot zone"
  },
  {
    "id": "BASS-RUN-02",
    "investigationId": "bass",
    "externalRunKey": "PSI-BASS-TR-1002",
    "materialType": "PMMA Flat Sheet",
    "sampleGeometry": "10 mm × 50 mm Flat Sheet",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 18,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 2,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0.32,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1420,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 45,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 15,
      "flameWidthMm": 11,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 9,
        "flameRadiusMm": 9.3,
        "temperatureK": 1047,
        "sootDensity": 0.4
      },
      {
        "timeSec": 18,
        "flameRadiusMm": 10.6,
        "temperatureK": 1403,
        "sootDensity": 0.4
      },
      {
        "timeSec": 31,
        "flameRadiusMm": 12.48,
        "temperatureK": 1355,
        "sootDensity": 0.4
      },
      {
        "timeSec": 45,
        "flameRadiusMm": 14.5,
        "temperatureK": 1302,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/bass/run_2.mp4",
    "notes": "Near-quench threshold; low ventilation causes oxygen starvation"
  },
  {
    "id": "BASS-RUN-03",
    "investigationId": "bass",
    "externalRunKey": "PSI-BASS-TR-1003",
    "materialType": "PMMA Flat Sheet",
    "sampleGeometry": "10 mm × 50 mm Flat Sheet",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 25,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 10,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 1.45,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1720,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 92,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 32,
      "flameWidthMm": 23,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 18,
        "flameRadiusMm": 9.27,
        "temperatureK": 1226,
        "sootDensity": 0.4
      },
      {
        "timeSec": 37,
        "flameRadiusMm": 10.61,
        "temperatureK": 1698,
        "sootDensity": 0.4
      },
      {
        "timeSec": 64,
        "flameRadiusMm": 12.52,
        "temperatureK": 1636,
        "sootDensity": 0.4
      },
      {
        "timeSec": 92,
        "flameRadiusMm": 14.5,
        "temperatureK": 1571,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/bass/run_3.mp4",
    "notes": "Concurrent flow acceleration; continuous flame front attachment"
  },
  {
    "id": "BASS-RUN-04",
    "investigationId": "bass",
    "externalRunKey": "PSI-BASS-TR-1004",
    "materialType": "PMMA Cylindrical Rod",
    "sampleGeometry": "9.5 mm Diameter Rod",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 4,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0.72,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1540,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 68,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 21,
      "flameWidthMm": 15,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 14,
        "flameRadiusMm": 9.34,
        "temperatureK": 1151,
        "sootDensity": 0.4
      },
      {
        "timeSec": 27,
        "flameRadiusMm": 10.58,
        "temperatureK": 1522,
        "sootDensity": 0.4
      },
      {
        "timeSec": 48,
        "flameRadiusMm": 12.59,
        "temperatureK": 1465,
        "sootDensity": 0.4
      },
      {
        "timeSec": 68,
        "flameRadiusMm": 14.5,
        "temperatureK": 1410,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/bass/run_4.mp4",
    "notes": "Axisymmetric cylindrical regression with stable standoff distance"
  },
  {
    "id": "BASS-RUN-05",
    "investigationId": "bass",
    "externalRunKey": "PSI-BASS-TR-1005",
    "materialType": "PMMA Cylindrical Rod",
    "sampleGeometry": "6.3 mm Diameter Rod",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 30,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 8,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 1.95,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1810,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 110,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 39,
      "flameWidthMm": 28,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 22,
        "flameRadiusMm": 9.3,
        "temperatureK": 1307,
        "sootDensity": 0.4
      },
      {
        "timeSec": 44,
        "flameRadiusMm": 10.6,
        "temperatureK": 1787,
        "sootDensity": 0.4
      },
      {
        "timeSec": 77,
        "flameRadiusMm": 12.55,
        "temperatureK": 1719,
        "sootDensity": 0.4
      },
      {
        "timeSec": 110,
        "flameRadiusMm": 14.5,
        "temperatureK": 1651,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/bass/run_5.mp4",
    "notes": "High-oxygen rapid propagation along polymer axis"
  },
  {
    "id": "BASS-RUN-06",
    "investigationId": "bass",
    "externalRunKey": "PSI-BASS-TR-1006",
    "materialType": "Cotton-Fiberglass SIBAL",
    "sampleGeometry": "20 mm × 100 mm Fabric",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 5,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 1.15,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1610,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 58,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 27,
      "flameWidthMm": 20,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 12,
        "flameRadiusMm": 9.34,
        "temperatureK": 1203,
        "sootDensity": 0.4
      },
      {
        "timeSec": 23,
        "flameRadiusMm": 10.58,
        "temperatureK": 1591,
        "sootDensity": 0.4
      },
      {
        "timeSec": 41,
        "flameRadiusMm": 12.59,
        "temperatureK": 1530,
        "sootDensity": 0.4
      },
      {
        "timeSec": 58,
        "flameRadiusMm": 14.5,
        "temperatureK": 1472,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/bass/run_6.mp4",
    "notes": "Composite weave opposed burn; cellulose vaporizes leaving fiberglass skeleton"
  },
  {
    "id": "BASS-RUN-07",
    "investigationId": "bass",
    "externalRunKey": "PSI-BASS-TR-1007",
    "materialType": "Cotton-Fiberglass SIBAL",
    "sampleGeometry": "20 mm × 100 mm Fabric",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 17,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 1.5,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0.28,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1390,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 32,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 14,
      "flameWidthMm": 11,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 6,
        "flameRadiusMm": 9.22,
        "temperatureK": 981,
        "sootDensity": 0.4
      },
      {
        "timeSec": 13,
        "flameRadiusMm": 10.64,
        "temperatureK": 1373,
        "sootDensity": 0.4
      },
      {
        "timeSec": 22,
        "flameRadiusMm": 12.47,
        "temperatureK": 1327,
        "sootDensity": 0.4
      },
      {
        "timeSec": 32,
        "flameRadiusMm": 14.5,
        "temperatureK": 1276,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/bass/run_7.mp4",
    "notes": "Near-extinction limit under gentle 1.5 cm/s ventilation"
  },
  {
    "id": "BASS-RUN-08",
    "investigationId": "bass",
    "externalRunKey": "PSI-BASS-TR-1008",
    "materialType": "Ultem Film",
    "sampleGeometry": "0.05 mm Film Strip",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 28,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 12,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 2.1,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1780,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 85,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 42,
      "flameWidthMm": 29,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 17,
        "flameRadiusMm": 9.3,
        "temperatureK": 1287,
        "sootDensity": 0.4
      },
      {
        "timeSec": 34,
        "flameRadiusMm": 10.6,
        "temperatureK": 1758,
        "sootDensity": 0.4
      },
      {
        "timeSec": 59,
        "flameRadiusMm": 12.51,
        "temperatureK": 1693,
        "sootDensity": 0.4
      },
      {
        "timeSec": 85,
        "flameRadiusMm": 14.5,
        "temperatureK": 1625,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/bass/run_8.mp4",
    "notes": "High-temperature polymer thin film burn in concurrent microgravity wake"
  },
  {
    "id": "BASS-II-RUN-01",
    "investigationId": "bass-ii",
    "externalRunKey": "PSI-BASS-II-TR-1009",
    "materialType": "Cast PMMA Slab",
    "sampleGeometry": "20 mm × 80 mm × 3 mm Slab",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 6,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0.65,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1520,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 88,
      "extinctionLimitO2Pct": 15.5,
      "flameLengthMm": 20,
      "flameWidthMm": 15,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 18,
        "flameRadiusMm": 9.33,
        "temperatureK": 1132,
        "sootDensity": 0.4
      },
      {
        "timeSec": 35,
        "flameRadiusMm": 10.59,
        "temperatureK": 1502,
        "sootDensity": 0.4
      },
      {
        "timeSec": 62,
        "flameRadiusMm": 12.58,
        "temperatureK": 1446,
        "sootDensity": 0.4
      },
      {
        "timeSec": 88,
        "flameRadiusMm": 14.5,
        "temperatureK": 1392,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/bass-ii/run_1.mp4",
    "notes": "Thick sample thermal penetration with slow steady flame creep"
  },
  {
    "id": "BASS-II-RUN-02",
    "investigationId": "bass-ii",
    "externalRunKey": "PSI-BASS-II-TR-1010",
    "materialType": "Cast PMMA Slab",
    "sampleGeometry": "20 mm × 80 mm × 3 mm Slab",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 27,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 10,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 1.35,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1690,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 105,
      "extinctionLimitO2Pct": 15.5,
      "flameLengthMm": 30,
      "flameWidthMm": 22,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 21,
        "flameRadiusMm": 9.3,
        "temperatureK": 1227,
        "sootDensity": 0.4
      },
      {
        "timeSec": 42,
        "flameRadiusMm": 10.6,
        "temperatureK": 1669,
        "sootDensity": 0.4
      },
      {
        "timeSec": 74,
        "flameRadiusMm": 12.58,
        "temperatureK": 1606,
        "sootDensity": 0.4
      },
      {
        "timeSec": 105,
        "flameRadiusMm": 14.5,
        "temperatureK": 1544,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/bass-ii/run_2.mp4",
    "notes": "Oxygen enrichment speeds solid pyrolysis despite thick thermal inertia"
  },
  {
    "id": "BASS-II-RUN-03",
    "investigationId": "bass-ii",
    "externalRunKey": "PSI-BASS-II-TR-1011",
    "materialType": "Nomex HT90-40 Fabric",
    "sampleGeometry": "25 mm Ribbon",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 30,
      "pressurePsi": 10.2,
      "flowVelocityCmS": 8,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0.92,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1640,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 62,
      "extinctionLimitO2Pct": 15.5,
      "flameLengthMm": 24,
      "flameWidthMm": 17,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 12,
        "flameRadiusMm": 9.26,
        "temperatureK": 1165,
        "sootDensity": 0.4
      },
      {
        "timeSec": 25,
        "flameRadiusMm": 10.62,
        "temperatureK": 1619,
        "sootDensity": 0.4
      },
      {
        "timeSec": 43,
        "flameRadiusMm": 12.51,
        "temperatureK": 1561,
        "sootDensity": 0.4
      },
      {
        "timeSec": 62,
        "flameRadiusMm": 14.5,
        "temperatureK": 1499,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/bass-ii/run_3.mp4",
    "notes": "Lunar habitat atmosphere simulation; Nomex sustains flame once ignited"
  },
  {
    "id": "BASS-II-RUN-04",
    "investigationId": "bass-ii",
    "externalRunKey": "PSI-BASS-II-TR-1012",
    "materialType": "Nomex HT90-40 Fabric",
    "sampleGeometry": "25 mm Ribbon",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 5,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1150,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 12,
      "extinctionLimitO2Pct": 15.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 2,
        "flameRadiusMm": 9.33,
        "temperatureK": 772,
        "sootDensity": 0.4
      },
      {
        "timeSec": 5,
        "flameRadiusMm": 8.33,
        "temperatureK": 1135,
        "sootDensity": 0.4
      },
      {
        "timeSec": 8,
        "flameRadiusMm": 7.33,
        "temperatureK": 1103,
        "sootDensity": 0.4
      },
      {
        "timeSec": 12,
        "flameRadiusMm": 6,
        "temperatureK": 1061,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/bass-ii/run_4.mp4",
    "notes": "Self-extinguishes in 21% O2 upon igniter cut-off"
  },
  {
    "id": "BASS-II-RUN-05",
    "investigationId": "bass-ii",
    "externalRunKey": "PSI-BASS-II-TR-1013",
    "materialType": "SIBAL Fabric",
    "sampleGeometry": "50 mm Wide Strip",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 15,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 1.8,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1670,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 76,
      "extinctionLimitO2Pct": 15.5,
      "flameLengthMm": 37,
      "flameWidthMm": 26,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 15,
        "flameRadiusMm": 9.28,
        "temperatureK": 1201,
        "sootDensity": 0.4
      },
      {
        "timeSec": 30,
        "flameRadiusMm": 10.57,
        "temperatureK": 1651,
        "sootDensity": 0.4
      },
      {
        "timeSec": 53,
        "flameRadiusMm": 12.53,
        "temperatureK": 1588,
        "sootDensity": 0.4
      },
      {
        "timeSec": 76,
        "flameRadiusMm": 14.5,
        "temperatureK": 1526,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/bass-ii/run_5.mp4",
    "notes": "Opposed flame spread with enhanced convective oxidizer transport"
  },
  {
    "id": "BASS-II-RUN-06",
    "investigationId": "bass-ii",
    "externalRunKey": "PSI-BASS-II-TR-1014",
    "materialType": "SIBAL Fabric",
    "sampleGeometry": "50 mm Wide Strip",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 19,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 25,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 1.4,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1590,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 54,
      "extinctionLimitO2Pct": 15.5,
      "flameLengthMm": 31,
      "flameWidthMm": 22,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 11,
        "flameRadiusMm": 9.32,
        "temperatureK": 1176,
        "sootDensity": 0.4
      },
      {
        "timeSec": 22,
        "flameRadiusMm": 10.65,
        "temperatureK": 1569,
        "sootDensity": 0.4
      },
      {
        "timeSec": 38,
        "flameRadiusMm": 12.57,
        "temperatureK": 1512,
        "sootDensity": 0.4
      },
      {
        "timeSec": 54,
        "flameRadiusMm": 14.5,
        "temperatureK": 1455,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/bass-ii/run_6.mp4",
    "notes": "Convective cooling at 25 cm/s reduces flame spread velocity"
  },
  {
    "id": "BASS-II-RUN-07",
    "investigationId": "bass-ii",
    "externalRunKey": "PSI-BASS-II-TR-1015",
    "materialType": "Extruded PMMA Rod",
    "sampleGeometry": "12.7 mm Rod",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 23,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 5,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0.58,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1560,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 95,
      "extinctionLimitO2Pct": 15.5,
      "flameLengthMm": 19,
      "flameWidthMm": 14,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 19,
        "flameRadiusMm": 9.3,
        "temperatureK": 1140,
        "sootDensity": 0.4
      },
      {
        "timeSec": 38,
        "flameRadiusMm": 10.6,
        "temperatureK": 1541,
        "sootDensity": 0.4
      },
      {
        "timeSec": 67,
        "flameRadiusMm": 12.58,
        "temperatureK": 1483,
        "sootDensity": 0.4
      },
      {
        "timeSec": 95,
        "flameRadiusMm": 14.5,
        "temperatureK": 1428,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/bass-ii/run_7.mp4",
    "notes": "Extrusion voids create minor surface boiling and bubble ejection"
  },
  {
    "id": "BASS-II-RUN-08",
    "investigationId": "bass-ii",
    "externalRunKey": "PSI-BASS-II-TR-1016",
    "materialType": "Extruded PMMA Rod",
    "sampleGeometry": "12.7 mm Rod",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 30,
      "pressurePsi": 12,
      "flowVelocityCmS": 10,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 1.55,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1740,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 120,
      "extinctionLimitO2Pct": 15.5,
      "flameLengthMm": 33,
      "flameWidthMm": 24,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 24,
        "flameRadiusMm": 9.3,
        "temperatureK": 1260,
        "sootDensity": 0.4
      },
      {
        "timeSec": 48,
        "flameRadiusMm": 10.6,
        "temperatureK": 1718,
        "sootDensity": 0.4
      },
      {
        "timeSec": 84,
        "flameRadiusMm": 12.55,
        "temperatureK": 1654,
        "sootDensity": 0.4
      },
      {
        "timeSec": 120,
        "flameRadiusMm": 14.5,
        "temperatureK": 1589,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/bass-ii/run_8.mp4",
    "notes": "Reduced pressure high-O2 run; intense core radiance"
  },
  {
    "id": "SAFFIRE-I-RUN-01",
    "investigationId": "saffire-i",
    "externalRunKey": "PSI-SAFFIRE-I-TR-1017",
    "materialType": "Cotton-Fiberglass SIBAL",
    "sampleGeometry": "0.4 m × 1.0 m Fabric Sheet",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 20,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 2.45,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1680,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 180,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 47,
      "flameWidthMm": 33,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 36,
        "flameRadiusMm": 9.3,
        "temperatureK": 1220,
        "sootDensity": 0.4
      },
      {
        "timeSec": 72,
        "flameRadiusMm": 10.6,
        "temperatureK": 1659,
        "sootDensity": 0.4
      },
      {
        "timeSec": 126,
        "flameRadiusMm": 12.55,
        "temperatureK": 1597,
        "sootDensity": 0.4
      },
      {
        "timeSec": 180,
        "flameRadiusMm": 14.5,
        "temperatureK": 1535,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/saffire-i/run_1.mp4",
    "notes": "Historic largest intentional spacecraft fire on Cygnus vehicle post-unberth"
  },
  {
    "id": "SAFFIRE-I-RUN-02",
    "investigationId": "saffire-i",
    "externalRunKey": "PSI-SAFFIRE-I-TR-1018",
    "materialType": "Cotton-Fiberglass SIBAL",
    "sampleGeometry": "0.4 m × 1.0 m Fabric Sheet",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 10,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 1.65,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1610,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 240,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 35,
      "flameWidthMm": 25,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 48,
        "flameRadiusMm": 9.3,
        "temperatureK": 1173,
        "sootDensity": 0.4
      },
      {
        "timeSec": 96,
        "flameRadiusMm": 10.6,
        "temperatureK": 1590,
        "sootDensity": 0.4
      },
      {
        "timeSec": 168,
        "flameRadiusMm": 12.55,
        "temperatureK": 1531,
        "sootDensity": 0.4
      },
      {
        "timeSec": 240,
        "flameRadiusMm": 14.5,
        "temperatureK": 1472,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/saffire-i/run_2.mp4",
    "notes": "Low duct velocity test; large continuous pyrolyzing flame sheet"
  },
  {
    "id": "SAFFIRE-I-RUN-03",
    "investigationId": "saffire-i",
    "externalRunKey": "PSI-SAFFIRE-I-TR-1019",
    "materialType": "Cotton-Fiberglass SIBAL",
    "sampleGeometry": "0.4 m × 1.0 m Fabric Sheet",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 30,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 3.1,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1730,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 150,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 57,
      "flameWidthMm": 39,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 30,
        "flameRadiusMm": 9.3,
        "temperatureK": 1253,
        "sootDensity": 0.4
      },
      {
        "timeSec": 60,
        "flameRadiusMm": 10.6,
        "temperatureK": 1709,
        "sootDensity": 0.4
      },
      {
        "timeSec": 105,
        "flameRadiusMm": 12.55,
        "temperatureK": 1644,
        "sootDensity": 0.4
      },
      {
        "timeSec": 150,
        "flameRadiusMm": 14.5,
        "temperatureK": 1580,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/saffire-i/run_3.mp4",
    "notes": "High airflow concurrent run; flame trailing edge reaches flow vent"
  },
  {
    "id": "SAFFIRE-I-RUN-04",
    "investigationId": "saffire-i",
    "externalRunKey": "PSI-SAFFIRE-I-TR-1020",
    "materialType": "Cotton-Fiberglass SIBAL",
    "sampleGeometry": "0.4 m × 1.0 m Fabric Sheet",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 18,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 15,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 1.2,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1530,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 210,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 28,
      "flameWidthMm": 20,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 42,
        "flameRadiusMm": 9.3,
        "temperatureK": 1120,
        "sootDensity": 0.4
      },
      {
        "timeSec": 84,
        "flameRadiusMm": 10.6,
        "temperatureK": 1512,
        "sootDensity": 0.4
      },
      {
        "timeSec": 147,
        "flameRadiusMm": 12.55,
        "temperatureK": 1456,
        "sootDensity": 0.4
      },
      {
        "timeSec": 210,
        "flameRadiusMm": 14.5,
        "temperatureK": 1401,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/saffire-i/run_4.mp4",
    "notes": "Sub-atmospheric O2 verification of large-scale extinguishment boundary"
  },
  {
    "id": "SAFFIRE-I-RUN-05",
    "investigationId": "saffire-i",
    "externalRunKey": "PSI-SAFFIRE-I-TR-1021",
    "materialType": "Cotton-Fiberglass SIBAL",
    "sampleGeometry": "0.4 m × 1.0 m Fabric Sheet",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 23,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 20,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 2.85,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1710,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 165,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 53,
      "flameWidthMm": 37,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 33,
        "flameRadiusMm": 9.3,
        "temperatureK": 1240,
        "sootDensity": 0.4
      },
      {
        "timeSec": 66,
        "flameRadiusMm": 10.6,
        "temperatureK": 1689,
        "sootDensity": 0.4
      },
      {
        "timeSec": 115,
        "flameRadiusMm": 12.53,
        "temperatureK": 1626,
        "sootDensity": 0.4
      },
      {
        "timeSec": 165,
        "flameRadiusMm": 14.5,
        "temperatureK": 1562,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/saffire-i/run_5.mp4",
    "notes": "Mild oxygen enrichment accelerating large panel burn"
  },
  {
    "id": "SAFFIRE-I-RUN-06",
    "investigationId": "saffire-i",
    "externalRunKey": "PSI-SAFFIRE-I-TR-1022",
    "materialType": "Cotton-Fiberglass SIBAL",
    "sampleGeometry": "0.4 m × 1.0 m Fabric Sheet",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 12,
      "flowVelocityCmS": 15,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 1.75,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1590,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 200,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 36,
      "flameWidthMm": 26,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 40,
        "flameRadiusMm": 9.3,
        "temperatureK": 1160,
        "sootDensity": 0.4
      },
      {
        "timeSec": 80,
        "flameRadiusMm": 10.6,
        "temperatureK": 1571,
        "sootDensity": 0.4
      },
      {
        "timeSec": 140,
        "flameRadiusMm": 12.55,
        "temperatureK": 1513,
        "sootDensity": 0.4
      },
      {
        "timeSec": 200,
        "flameRadiusMm": 14.5,
        "temperatureK": 1455,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/saffire-i/run_6.mp4",
    "notes": "Depressurized Cygnus cabin condition; soot accumulation on filter"
  },
  {
    "id": "SAFFIRE-I-RUN-07",
    "investigationId": "saffire-i",
    "externalRunKey": "PSI-SAFFIRE-I-TR-1023",
    "materialType": "Cotton-Fiberglass SIBAL",
    "sampleGeometry": "0.4 m × 1.0 m Fabric Sheet",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 5,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0.95,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1490,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 290,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 24,
      "flameWidthMm": 18,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 58,
        "flameRadiusMm": 9.3,
        "temperatureK": 1093,
        "sootDensity": 0.4
      },
      {
        "timeSec": 116,
        "flameRadiusMm": 10.6,
        "temperatureK": 1472,
        "sootDensity": 0.4
      },
      {
        "timeSec": 203,
        "flameRadiusMm": 12.55,
        "temperatureK": 1419,
        "sootDensity": 0.4
      },
      {
        "timeSec": 290,
        "flameRadiusMm": 14.5,
        "temperatureK": 1365,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/saffire-i/run_7.mp4",
    "notes": "Minimal ventilation survival limit over 1 meter cloth specimen"
  },
  {
    "id": "SAFFIRE-I-RUN-08",
    "investigationId": "saffire-i",
    "externalRunKey": "PSI-SAFFIRE-I-TR-1024",
    "materialType": "Cotton-Fiberglass SIBAL",
    "sampleGeometry": "0.4 m × 1.0 m Fabric Sheet",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 25,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 25,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 3.35,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1750,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 140,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 60,
      "flameWidthMm": 42,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 28,
        "flameRadiusMm": 9.3,
        "temperatureK": 1267,
        "sootDensity": 0.4
      },
      {
        "timeSec": 56,
        "flameRadiusMm": 10.6,
        "temperatureK": 1728,
        "sootDensity": 0.4
      },
      {
        "timeSec": 98,
        "flameRadiusMm": 12.55,
        "temperatureK": 1663,
        "sootDensity": 0.4
      },
      {
        "timeSec": 140,
        "flameRadiusMm": 14.5,
        "temperatureK": 1598,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/saffire-i/run_8.mp4",
    "notes": "Concurrent flow speed limit benchmarking"
  },
  {
    "id": "SAFFIRE-II-RUN-01",
    "investigationId": "saffire-ii",
    "externalRunKey": "PSI-SAFFIRE-II-TR-1025",
    "materialType": "Nomex HT90-40",
    "sampleGeometry": "50 mm × 300 mm Strip",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 20,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1200,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 15,
      "extinctionLimitO2Pct": 17,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 3,
        "flameRadiusMm": 9.2,
        "temperatureK": 900,
        "sootDensity": 0.4
      },
      {
        "timeSec": 6,
        "flameRadiusMm": 8.4,
        "temperatureK": 1187,
        "sootDensity": 0.4
      },
      {
        "timeSec": 11,
        "flameRadiusMm": 7.07,
        "temperatureK": 1142,
        "sootDensity": 0.4
      },
      {
        "timeSec": 15,
        "flameRadiusMm": 6,
        "temperatureK": 1106,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/saffire-ii/run_1.mp4",
    "notes": "Nomex sample extinguishes after hot-wire igniter is shut down"
  },
  {
    "id": "SAFFIRE-II-RUN-02",
    "investigationId": "saffire-ii",
    "externalRunKey": "PSI-SAFFIRE-II-TR-1026",
    "materialType": "Plexiglas (PMMA)",
    "sampleGeometry": "50 mm × 300 mm × 10 mm Slab",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 20,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0.52,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1530,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 320,
      "extinctionLimitO2Pct": 17,
      "flameLengthMm": 18,
      "flameWidthMm": 13,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 64,
        "flameRadiusMm": 9.3,
        "temperatureK": 1120,
        "sootDensity": 0.4
      },
      {
        "timeSec": 128,
        "flameRadiusMm": 10.6,
        "temperatureK": 1512,
        "sootDensity": 0.4
      },
      {
        "timeSec": 224,
        "flameRadiusMm": 12.55,
        "temperatureK": 1456,
        "sootDensity": 0.4
      },
      {
        "timeSec": 320,
        "flameRadiusMm": 14.5,
        "temperatureK": 1401,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/saffire-ii/run_2.mp4",
    "notes": "NASA standard test material burning stably in Cygnus wind tunnel"
  },
  {
    "id": "SAFFIRE-II-RUN-03",
    "investigationId": "saffire-ii",
    "externalRunKey": "PSI-SAFFIRE-II-TR-1027",
    "materialType": "Silicone Sheet",
    "sampleGeometry": "50 mm × 300 mm Strip",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 20,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0.4,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1480,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 260,
      "extinctionLimitO2Pct": 17,
      "flameLengthMm": 16,
      "flameWidthMm": 12,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 52,
        "flameRadiusMm": 9.3,
        "temperatureK": 1087,
        "sootDensity": 0.4
      },
      {
        "timeSec": 104,
        "flameRadiusMm": 10.6,
        "temperatureK": 1462,
        "sootDensity": 0.4
      },
      {
        "timeSec": 182,
        "flameRadiusMm": 12.55,
        "temperatureK": 1409,
        "sootDensity": 0.4
      },
      {
        "timeSec": 260,
        "flameRadiusMm": 14.5,
        "temperatureK": 1356,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/saffire-ii/run_3.mp4",
    "notes": "Silicone elastomer produces white silica aerosol deposition"
  },
  {
    "id": "SAFFIRE-II-RUN-04",
    "investigationId": "saffire-ii",
    "externalRunKey": "PSI-SAFFIRE-II-TR-1028",
    "materialType": "Cotton Fabric",
    "sampleGeometry": "50 mm × 300 mm Strip",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 15,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 2.1,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1640,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 140,
      "extinctionLimitO2Pct": 17,
      "flameLengthMm": 42,
      "flameWidthMm": 29,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 28,
        "flameRadiusMm": 9.3,
        "temperatureK": 1193,
        "sootDensity": 0.4
      },
      {
        "timeSec": 56,
        "flameRadiusMm": 10.6,
        "temperatureK": 1620,
        "sootDensity": 0.4
      },
      {
        "timeSec": 98,
        "flameRadiusMm": 12.55,
        "temperatureK": 1560,
        "sootDensity": 0.4
      },
      {
        "timeSec": 140,
        "flameRadiusMm": 14.5,
        "temperatureK": 1499,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/saffire-ii/run_4.mp4",
    "notes": "Rapid cotton burn with significant incandescent embers"
  },
  {
    "id": "SAFFIRE-II-RUN-05",
    "investigationId": "saffire-ii",
    "externalRunKey": "PSI-SAFFIRE-II-TR-1029",
    "materialType": "Polyethylene",
    "sampleGeometry": "50 mm × 300 mm Strip",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 20,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 1.85,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1690,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 155,
      "extinctionLimitO2Pct": 17,
      "flameLengthMm": 38,
      "flameWidthMm": 27,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 31,
        "flameRadiusMm": 9.3,
        "temperatureK": 1227,
        "sootDensity": 0.4
      },
      {
        "timeSec": 62,
        "flameRadiusMm": 10.6,
        "temperatureK": 1669,
        "sootDensity": 0.4
      },
      {
        "timeSec": 109,
        "flameRadiusMm": 12.57,
        "temperatureK": 1606,
        "sootDensity": 0.4
      },
      {
        "timeSec": 155,
        "flameRadiusMm": 14.5,
        "temperatureK": 1544,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/saffire-ii/run_5.mp4",
    "notes": "Dripping melt-pool behavior altered completely by 0g capillary surface tension"
  },
  {
    "id": "SAFFIRE-II-RUN-06",
    "investigationId": "saffire-ii",
    "externalRunKey": "PSI-SAFFIRE-II-TR-1030",
    "materialType": "Solid PMMA",
    "sampleGeometry": "50 mm × 300 mm × 5 mm Slab",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 10,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0.42,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1510,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 380,
      "extinctionLimitO2Pct": 17,
      "flameLengthMm": 16,
      "flameWidthMm": 12,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 76,
        "flameRadiusMm": 9.3,
        "temperatureK": 1107,
        "sootDensity": 0.4
      },
      {
        "timeSec": 152,
        "flameRadiusMm": 10.6,
        "temperatureK": 1492,
        "sootDensity": 0.4
      },
      {
        "timeSec": 266,
        "flameRadiusMm": 12.55,
        "temperatureK": 1437,
        "sootDensity": 0.4
      },
      {
        "timeSec": 380,
        "flameRadiusMm": 14.5,
        "temperatureK": 1383,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/saffire-ii/run_6.mp4",
    "notes": "Steady low-speed opposed burn without buoyant flicker"
  },
  {
    "id": "SAFFIRE-II-RUN-07",
    "investigationId": "saffire-ii",
    "externalRunKey": "PSI-SAFFIRE-II-TR-1031",
    "materialType": "SIBAL Fabric",
    "sampleGeometry": "50 mm × 300 mm Strip",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 25,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 2.3,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1660,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 130,
      "extinctionLimitO2Pct": 17,
      "flameLengthMm": 45,
      "flameWidthMm": 31,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 26,
        "flameRadiusMm": 9.3,
        "temperatureK": 1207,
        "sootDensity": 0.4
      },
      {
        "timeSec": 52,
        "flameRadiusMm": 10.6,
        "temperatureK": 1640,
        "sootDensity": 0.4
      },
      {
        "timeSec": 91,
        "flameRadiusMm": 12.55,
        "temperatureK": 1578,
        "sootDensity": 0.4
      },
      {
        "timeSec": 130,
        "flameRadiusMm": 14.5,
        "temperatureK": 1517,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/saffire-ii/run_7.mp4",
    "notes": "Direct comparison with Saffire-I full-scale cloth"
  },
  {
    "id": "SAFFIRE-II-RUN-08",
    "investigationId": "saffire-ii",
    "externalRunKey": "PSI-SAFFIRE-II-TR-1032",
    "materialType": "Nomex HT90-40",
    "sampleGeometry": "50 mm × 300 mm Strip",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 28,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 20,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0.85,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1580,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 65,
      "extinctionLimitO2Pct": 17,
      "flameLengthMm": 23,
      "flameWidthMm": 17,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 13,
        "flameRadiusMm": 9.3,
        "temperatureK": 1153,
        "sootDensity": 0.4
      },
      {
        "timeSec": 26,
        "flameRadiusMm": 10.6,
        "temperatureK": 1561,
        "sootDensity": 0.4
      },
      {
        "timeSec": 46,
        "flameRadiusMm": 12.6,
        "temperatureK": 1502,
        "sootDensity": 0.4
      },
      {
        "timeSec": 65,
        "flameRadiusMm": 14.5,
        "temperatureK": 1446,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/saffire-ii/run_8.mp4",
    "notes": "Elevated oxygen threshold mapping for spacecraft fabrics"
  },
  {
    "id": "SAFFIRE-III-RUN-01",
    "investigationId": "saffire-iii",
    "externalRunKey": "PSI-SAFFIRE-III-TR-1033",
    "materialType": "Cotton-Fiberglass SIBAL",
    "sampleGeometry": "0.4 m × 1.0 m Fabric Sheet",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 20,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 2.5,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1690,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 175,
      "extinctionLimitO2Pct": 19,
      "flameLengthMm": 48,
      "flameWidthMm": 33,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 35,
        "flameRadiusMm": 9.3,
        "temperatureK": 1227,
        "sootDensity": 0.4
      },
      {
        "timeSec": 70,
        "flameRadiusMm": 10.6,
        "temperatureK": 1669,
        "sootDensity": 0.4
      },
      {
        "timeSec": 122,
        "flameRadiusMm": 12.53,
        "temperatureK": 1607,
        "sootDensity": 0.4
      },
      {
        "timeSec": 175,
        "flameRadiusMm": 14.5,
        "temperatureK": 1544,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/saffire-iii/run_1.mp4",
    "notes": "Validation of Saffire-I repeatability across Cygnus mission profiles"
  },
  {
    "id": "SAFFIRE-III-RUN-02",
    "investigationId": "saffire-iii",
    "externalRunKey": "PSI-SAFFIRE-III-TR-1034",
    "materialType": "Cotton-Fiberglass SIBAL",
    "sampleGeometry": "0.4 m × 1.0 m Fabric Sheet",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 12,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 1.7,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1620,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 230,
      "extinctionLimitO2Pct": 19,
      "flameLengthMm": 36,
      "flameWidthMm": 25,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 46,
        "flameRadiusMm": 9.3,
        "temperatureK": 1180,
        "sootDensity": 0.4
      },
      {
        "timeSec": 92,
        "flameRadiusMm": 10.6,
        "temperatureK": 1600,
        "sootDensity": 0.4
      },
      {
        "timeSec": 161,
        "flameRadiusMm": 12.55,
        "temperatureK": 1541,
        "sootDensity": 0.4
      },
      {
        "timeSec": 230,
        "flameRadiusMm": 14.5,
        "temperatureK": 1481,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/saffire-iii/run_2.mp4",
    "notes": "Thermocouple rake records gas-phase thermal boundary layer thickness"
  },
  {
    "id": "SAFFIRE-III-RUN-03",
    "investigationId": "saffire-iii",
    "externalRunKey": "PSI-SAFFIRE-III-TR-1035",
    "materialType": "Cotton-Fiberglass SIBAL",
    "sampleGeometry": "0.4 m × 1.0 m Fabric Sheet",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 28,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 2.95,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1720,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 145,
      "extinctionLimitO2Pct": 19,
      "flameLengthMm": 54,
      "flameWidthMm": 38,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 29,
        "flameRadiusMm": 9.3,
        "temperatureK": 1247,
        "sootDensity": 0.4
      },
      {
        "timeSec": 58,
        "flameRadiusMm": 10.6,
        "temperatureK": 1699,
        "sootDensity": 0.4
      },
      {
        "timeSec": 102,
        "flameRadiusMm": 12.57,
        "temperatureK": 1634,
        "sootDensity": 0.4
      },
      {
        "timeSec": 145,
        "flameRadiusMm": 14.5,
        "temperatureK": 1571,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/saffire-iii/run_3.mp4",
    "notes": "Turbulent flow transition tests inside 0.5m duct cross-section"
  },
  {
    "id": "SAFFIRE-III-RUN-04",
    "investigationId": "saffire-iii",
    "externalRunKey": "PSI-SAFFIRE-III-TR-1036",
    "materialType": "Cotton-Fiberglass SIBAL",
    "sampleGeometry": "0.4 m × 1.0 m Fabric Sheet",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 19.5,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 20,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 2.1,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1640,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 190,
      "extinctionLimitO2Pct": 19,
      "flameLengthMm": 42,
      "flameWidthMm": 29,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 38,
        "flameRadiusMm": 9.3,
        "temperatureK": 1193,
        "sootDensity": 0.4
      },
      {
        "timeSec": 76,
        "flameRadiusMm": 10.6,
        "temperatureK": 1620,
        "sootDensity": 0.4
      },
      {
        "timeSec": 133,
        "flameRadiusMm": 12.55,
        "temperatureK": 1560,
        "sootDensity": 0.4
      },
      {
        "timeSec": 190,
        "flameRadiusMm": 14.5,
        "temperatureK": 1499,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/saffire-iii/run_4.mp4",
    "notes": "Controlled cabin depressurization and nitrogen injection test"
  },
  {
    "id": "SAFFIRE-III-RUN-05",
    "investigationId": "saffire-iii",
    "externalRunKey": "PSI-SAFFIRE-III-TR-1037",
    "materialType": "Cotton-Fiberglass SIBAL",
    "sampleGeometry": "0.4 m × 1.0 m Fabric Sheet",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 24,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 20,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 3.2,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1760,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 140,
      "extinctionLimitO2Pct": 19,
      "flameLengthMm": 58,
      "flameWidthMm": 40,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 28,
        "flameRadiusMm": 9.3,
        "temperatureK": 1273,
        "sootDensity": 0.4
      },
      {
        "timeSec": 56,
        "flameRadiusMm": 10.6,
        "temperatureK": 1738,
        "sootDensity": 0.4
      },
      {
        "timeSec": 98,
        "flameRadiusMm": 12.55,
        "temperatureK": 1672,
        "sootDensity": 0.4
      },
      {
        "timeSec": 140,
        "flameRadiusMm": 14.5,
        "temperatureK": 1607,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/saffire-iii/run_5.mp4",
    "notes": "Enhanced oxygen test simulating exploration vehicle leak"
  },
  {
    "id": "SAFFIRE-III-RUN-06",
    "investigationId": "saffire-iii",
    "externalRunKey": "PSI-SAFFIRE-III-TR-1038",
    "materialType": "Cotton-Fiberglass SIBAL",
    "sampleGeometry": "0.4 m × 1.0 m Fabric Sheet",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 10.5,
      "flowVelocityCmS": 20,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 2.2,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1650,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 180,
      "extinctionLimitO2Pct": 19,
      "flameLengthMm": 43,
      "flameWidthMm": 30,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 36,
        "flameRadiusMm": 9.3,
        "temperatureK": 1200,
        "sootDensity": 0.4
      },
      {
        "timeSec": 72,
        "flameRadiusMm": 10.6,
        "temperatureK": 1630,
        "sootDensity": 0.4
      },
      {
        "timeSec": 126,
        "flameRadiusMm": 12.55,
        "temperatureK": 1569,
        "sootDensity": 0.4
      },
      {
        "timeSec": 180,
        "flameRadiusMm": 14.5,
        "temperatureK": 1508,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/saffire-iii/run_6.mp4",
    "notes": "Exploration pressure test at 10.5 psia confirming Damköhler scaling"
  },
  {
    "id": "SAFFIRE-III-RUN-07",
    "investigationId": "saffire-iii",
    "externalRunKey": "PSI-SAFFIRE-III-TR-1039",
    "materialType": "Cotton-Fiberglass SIBAL",
    "sampleGeometry": "0.4 m × 1.0 m Fabric Sheet",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 8,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 1.3,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1560,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 260,
      "extinctionLimitO2Pct": 19,
      "flameLengthMm": 30,
      "flameWidthMm": 21,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 52,
        "flameRadiusMm": 9.3,
        "temperatureK": 1140,
        "sootDensity": 0.4
      },
      {
        "timeSec": 104,
        "flameRadiusMm": 10.6,
        "temperatureK": 1541,
        "sootDensity": 0.4
      },
      {
        "timeSec": 182,
        "flameRadiusMm": 12.55,
        "temperatureK": 1484,
        "sootDensity": 0.4
      },
      {
        "timeSec": 260,
        "flameRadiusMm": 14.5,
        "temperatureK": 1428,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/saffire-iii/run_7.mp4",
    "notes": "Low-speed ventilation boundary mapping"
  },
  {
    "id": "SAFFIRE-III-RUN-08",
    "investigationId": "saffire-iii",
    "externalRunKey": "PSI-SAFFIRE-III-TR-1040",
    "materialType": "Cotton-Fiberglass SIBAL",
    "sampleGeometry": "0.4 m × 1.0 m Fabric Sheet",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 27,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 20,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 3.6,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1790,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 120,
      "extinctionLimitO2Pct": 19,
      "flameLengthMm": 64,
      "flameWidthMm": 44,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 24,
        "flameRadiusMm": 9.3,
        "temperatureK": 1293,
        "sootDensity": 0.4
      },
      {
        "timeSec": 48,
        "flameRadiusMm": 10.6,
        "temperatureK": 1768,
        "sootDensity": 0.4
      },
      {
        "timeSec": 84,
        "flameRadiusMm": 12.55,
        "temperatureK": 1701,
        "sootDensity": 0.4
      },
      {
        "timeSec": 120,
        "flameRadiusMm": 14.5,
        "temperatureK": 1634,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/saffire-iii/run_8.mp4",
    "notes": "High O2 mole fraction spread run"
  },
  {
    "id": "SAFFIRE-IV-RUN-01",
    "investigationId": "saffire-iv",
    "externalRunKey": "PSI-SAFFIRE-IV-TR-1041",
    "materialType": "SIBAL & PMMA",
    "sampleGeometry": "Multiple Chamber Samples",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 26,
      "pressurePsi": 8.2,
      "flowVelocityCmS": 20,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 2.8,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1730,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 160,
      "extinctionLimitO2Pct": 20,
      "flameLengthMm": 52,
      "flameWidthMm": 36,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 32,
        "flameRadiusMm": 9.3,
        "temperatureK": 1253,
        "sootDensity": 0.4
      },
      {
        "timeSec": 64,
        "flameRadiusMm": 10.6,
        "temperatureK": 1709,
        "sootDensity": 0.4
      },
      {
        "timeSec": 112,
        "flameRadiusMm": 12.55,
        "temperatureK": 1644,
        "sootDensity": 0.4
      },
      {
        "timeSec": 160,
        "flameRadiusMm": 14.5,
        "temperatureK": 1580,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/saffire-iv/run_1.mp4",
    "notes": "Exploration atmosphere test: 26% O2 at 8.2 psia (Exploration Atmosphere standard)"
  },
  {
    "id": "SAFFIRE-IV-RUN-02",
    "investigationId": "saffire-iv",
    "externalRunKey": "PSI-SAFFIRE-IV-TR-1042",
    "materialType": "Nomex Fabric",
    "sampleGeometry": "Fabric Ribbon",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 30,
      "pressurePsi": 8.2,
      "flowVelocityCmS": 15,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 1.05,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1650,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 95,
      "extinctionLimitO2Pct": 20,
      "flameLengthMm": 26,
      "flameWidthMm": 19,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 19,
        "flameRadiusMm": 9.3,
        "temperatureK": 1200,
        "sootDensity": 0.4
      },
      {
        "timeSec": 38,
        "flameRadiusMm": 10.6,
        "temperatureK": 1630,
        "sootDensity": 0.4
      },
      {
        "timeSec": 67,
        "flameRadiusMm": 12.58,
        "temperatureK": 1568,
        "sootDensity": 0.4
      },
      {
        "timeSec": 95,
        "flameRadiusMm": 14.5,
        "temperatureK": 1508,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/saffire-iv/run_2.mp4",
    "notes": "Artemis suit material sustained burning under exploration pressure"
  },
  {
    "id": "SAFFIRE-IV-RUN-03",
    "investigationId": "saffire-iv",
    "externalRunKey": "PSI-SAFFIRE-IV-TR-1043",
    "materialType": "Cast PMMA",
    "sampleGeometry": "Thick Acrylic Rod",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 28,
      "pressurePsi": 8.2,
      "flowVelocityCmS": 18,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 1.25,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1680,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 140,
      "extinctionLimitO2Pct": 20,
      "flameLengthMm": 29,
      "flameWidthMm": 21,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 28,
        "flameRadiusMm": 9.3,
        "temperatureK": 1220,
        "sootDensity": 0.4
      },
      {
        "timeSec": 56,
        "flameRadiusMm": 10.6,
        "temperatureK": 1659,
        "sootDensity": 0.4
      },
      {
        "timeSec": 98,
        "flameRadiusMm": 12.55,
        "temperatureK": 1597,
        "sootDensity": 0.4
      },
      {
        "timeSec": 140,
        "flameRadiusMm": 14.5,
        "temperatureK": 1535,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/saffire-iv/run_3.mp4",
    "notes": "Post-fire depressurization and combustion product smoke scrubbing run"
  },
  {
    "id": "SAFFIRE-IV-RUN-04",
    "investigationId": "saffire-iv",
    "externalRunKey": "PSI-SAFFIRE-IV-TR-1044",
    "materialType": "Polyethylene Tube",
    "sampleGeometry": "Hollow Cylinder",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 26,
      "pressurePsi": 8.2,
      "flowVelocityCmS": 12,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 1.9,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1700,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 110,
      "extinctionLimitO2Pct": 20,
      "flameLengthMm": 39,
      "flameWidthMm": 27,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 22,
        "flameRadiusMm": 9.3,
        "temperatureK": 1233,
        "sootDensity": 0.4
      },
      {
        "timeSec": 44,
        "flameRadiusMm": 10.6,
        "temperatureK": 1679,
        "sootDensity": 0.4
      },
      {
        "timeSec": 77,
        "flameRadiusMm": 12.55,
        "temperatureK": 1616,
        "sootDensity": 0.4
      },
      {
        "timeSec": 110,
        "flameRadiusMm": 14.5,
        "temperatureK": 1553,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/saffire-iv/run_4.mp4",
    "notes": "Cable insulation fire scenario with pyrolysis gases expanding in duct"
  },
  {
    "id": "SAFFIRE-IV-RUN-05",
    "investigationId": "saffire-iv",
    "externalRunKey": "PSI-SAFFIRE-IV-TR-1045",
    "materialType": "Nomex Fabric",
    "sampleGeometry": "Fabric Ribbon",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 24,
      "pressurePsi": 8.2,
      "flowVelocityCmS": 15,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0.15,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1380,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 25,
      "extinctionLimitO2Pct": 20,
      "flameLengthMm": 12,
      "flameWidthMm": 10,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 5,
        "flameRadiusMm": 9.3,
        "temperatureK": 1020,
        "sootDensity": 0.4
      },
      {
        "timeSec": 10,
        "flameRadiusMm": 10.6,
        "temperatureK": 1364,
        "sootDensity": 0.4
      },
      {
        "timeSec": 18,
        "flameRadiusMm": 12.68,
        "temperatureK": 1312,
        "sootDensity": 0.4
      },
      {
        "timeSec": 25,
        "flameRadiusMm": 14.5,
        "temperatureK": 1267,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/saffire-iv/run_5.mp4",
    "notes": "Near-threshold limit for Nomex at 24% O2, 8.2 psia"
  },
  {
    "id": "SAFFIRE-IV-RUN-06",
    "investigationId": "saffire-iv",
    "externalRunKey": "PSI-SAFFIRE-IV-TR-1046",
    "materialType": "Cotton Fabric",
    "sampleGeometry": "Fabric Ribbon",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 26,
      "pressurePsi": 8.2,
      "flowVelocityCmS": 25,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 3.4,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1770,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 80,
      "extinctionLimitO2Pct": 20,
      "flameLengthMm": 61,
      "flameWidthMm": 42,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 16,
        "flameRadiusMm": 9.3,
        "temperatureK": 1280,
        "sootDensity": 0.4
      },
      {
        "timeSec": 32,
        "flameRadiusMm": 10.6,
        "temperatureK": 1748,
        "sootDensity": 0.4
      },
      {
        "timeSec": 56,
        "flameRadiusMm": 12.55,
        "temperatureK": 1682,
        "sootDensity": 0.4
      },
      {
        "timeSec": 80,
        "flameRadiusMm": 14.5,
        "temperatureK": 1616,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/saffire-iv/run_6.mp4",
    "notes": "Rapid concurrent flame spread in elevated exploration oxygen"
  },
  {
    "id": "SAFFIRE-IV-RUN-07",
    "investigationId": "saffire-iv",
    "externalRunKey": "PSI-SAFFIRE-IV-TR-1047",
    "materialType": "SIBAL Fabric",
    "sampleGeometry": "Fabric Ribbon",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 8.2,
      "flowVelocityCmS": 15,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 1.6,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1590,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 135,
      "extinctionLimitO2Pct": 20,
      "flameLengthMm": 34,
      "flameWidthMm": 24,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 27,
        "flameRadiusMm": 9.3,
        "temperatureK": 1160,
        "sootDensity": 0.4
      },
      {
        "timeSec": 54,
        "flameRadiusMm": 10.6,
        "temperatureK": 1571,
        "sootDensity": 0.4
      },
      {
        "timeSec": 95,
        "flameRadiusMm": 12.57,
        "temperatureK": 1512,
        "sootDensity": 0.4
      },
      {
        "timeSec": 135,
        "flameRadiusMm": 14.5,
        "temperatureK": 1455,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/saffire-iv/run_7.mp4",
    "notes": "Low total pressure comparison with standard 14.7 psia Saffire-I data"
  },
  {
    "id": "SAFFIRE-IV-RUN-08",
    "investigationId": "saffire-iv",
    "externalRunKey": "PSI-SAFFIRE-IV-TR-1048",
    "materialType": "PMMA Flat Slab",
    "sampleGeometry": "5 mm Slab",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 30,
      "pressurePsi": 8.2,
      "flowVelocityCmS": 10,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 1.45,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1710,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 150,
      "extinctionLimitO2Pct": 20,
      "flameLengthMm": 32,
      "flameWidthMm": 23,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 30,
        "flameRadiusMm": 9.3,
        "temperatureK": 1240,
        "sootDensity": 0.4
      },
      {
        "timeSec": 60,
        "flameRadiusMm": 10.6,
        "temperatureK": 1689,
        "sootDensity": 0.4
      },
      {
        "timeSec": 105,
        "flameRadiusMm": 12.55,
        "temperatureK": 1625,
        "sootDensity": 0.4
      },
      {
        "timeSec": 150,
        "flameRadiusMm": 14.5,
        "temperatureK": 1562,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/saffire-iv/run_8.mp4",
    "notes": "Exploration standard acrylic flammability qualification"
  },
  {
    "id": "SAME-RUN-01",
    "investigationId": "same",
    "externalRunKey": "PSI-SAME-TR-1049",
    "materialType": "Cellulose Particles",
    "sampleGeometry": "Pyrolysis Aerosol Generator",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 10,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 580,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 120,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 24,
        "flameRadiusMm": 9.2,
        "temperatureK": 487,
        "sootDensity": 0.4
      },
      {
        "timeSec": 48,
        "flameRadiusMm": 8.4,
        "temperatureK": 576,
        "sootDensity": 0.4
      },
      {
        "timeSec": 84,
        "flameRadiusMm": 7.2,
        "temperatureK": 563,
        "sootDensity": 0.4
      },
      {
        "timeSec": 120,
        "flameRadiusMm": 6,
        "temperatureK": 551,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/same/run_1.mp4",
    "notes": "Smoke particulate size distribution measured via laser obscuration"
  },
  {
    "id": "SAME-RUN-02",
    "investigationId": "same",
    "externalRunKey": "PSI-SAME-TR-1050",
    "materialType": "Silicone Insulation",
    "sampleGeometry": "Thermal Overload Wire",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 10,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 640,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 150,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 30,
        "flameRadiusMm": 9.2,
        "temperatureK": 527,
        "sootDensity": 0.4
      },
      {
        "timeSec": 60,
        "flameRadiusMm": 8.4,
        "temperatureK": 635,
        "sootDensity": 0.4
      },
      {
        "timeSec": 105,
        "flameRadiusMm": 7.2,
        "temperatureK": 620,
        "sootDensity": 0.4
      },
      {
        "timeSec": 150,
        "flameRadiusMm": 6,
        "temperatureK": 604,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/same/run_2.mp4",
    "notes": "Pre-ignition smoldering smoke characterization in MSG glovebox"
  },
  {
    "id": "SAME-RUN-03",
    "investigationId": "same",
    "externalRunKey": "PSI-SAME-TR-1051",
    "materialType": "PTFE (Teflon)",
    "sampleGeometry": "Overheated Wire Jacket",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 8,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 690,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 110,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 22,
        "flameRadiusMm": 9.2,
        "temperatureK": 560,
        "sootDensity": 0.4
      },
      {
        "timeSec": 44,
        "flameRadiusMm": 8.4,
        "temperatureK": 684,
        "sootDensity": 0.4
      },
      {
        "timeSec": 77,
        "flameRadiusMm": 7.2,
        "temperatureK": 667,
        "sootDensity": 0.4
      },
      {
        "timeSec": 110,
        "flameRadiusMm": 6,
        "temperatureK": 649,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/same/run_3.mp4",
    "notes": "Fluoropolymer toxic particulate yield and aerosol agglomeration kinetics"
  },
  {
    "id": "SAME-RUN-04",
    "investigationId": "same",
    "externalRunKey": "PSI-SAME-TR-1052",
    "materialType": "Aramid Fabric",
    "sampleGeometry": "Smoldering Cloth Sample",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 12,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 590,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 140,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 28,
        "flameRadiusMm": 9.2,
        "temperatureK": 493,
        "sootDensity": 0.4
      },
      {
        "timeSec": 56,
        "flameRadiusMm": 8.4,
        "temperatureK": 586,
        "sootDensity": 0.4
      },
      {
        "timeSec": 98,
        "flameRadiusMm": 7.2,
        "temperatureK": 573,
        "sootDensity": 0.4
      },
      {
        "timeSec": 140,
        "flameRadiusMm": 6,
        "temperatureK": 560,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/same/run_4.mp4",
    "notes": "Smolder-to-flaming transition prevented by oxygen diffusion limit"
  },
  {
    "id": "SAME-RUN-05",
    "investigationId": "same",
    "externalRunKey": "PSI-SAME-TR-1053",
    "materialType": "Kapton Polyimide",
    "sampleGeometry": "Arc Tracking Simulation Wire",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 10,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 720,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 90,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 18,
        "flameRadiusMm": 9.2,
        "temperatureK": 580,
        "sootDensity": 0.4
      },
      {
        "timeSec": 36,
        "flameRadiusMm": 8.4,
        "temperatureK": 714,
        "sootDensity": 0.4
      },
      {
        "timeSec": 63,
        "flameRadiusMm": 7.2,
        "temperatureK": 695,
        "sootDensity": 0.4
      },
      {
        "timeSec": 90,
        "flameRadiusMm": 6,
        "temperatureK": 676,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/same/run_5.mp4",
    "notes": "Sub-micron smoke particle nucleation in absence of buoyant sorting"
  },
  {
    "id": "SAME-RUN-06",
    "investigationId": "same",
    "externalRunKey": "PSI-SAME-TR-1054",
    "materialType": "Cotton Cloth",
    "sampleGeometry": "Smoldering Smudge",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 5,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 530,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 180,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 36,
        "flameRadiusMm": 9.2,
        "temperatureK": 453,
        "sootDensity": 0.4
      },
      {
        "timeSec": 72,
        "flameRadiusMm": 8.4,
        "temperatureK": 527,
        "sootDensity": 0.4
      },
      {
        "timeSec": 126,
        "flameRadiusMm": 7.2,
        "temperatureK": 516,
        "sootDensity": 0.4
      },
      {
        "timeSec": 180,
        "flameRadiusMm": 6,
        "temperatureK": 506,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/same/run_6.mp4",
    "notes": "Large agglomerated carbonaceous smoke flocs (>10 µm) observed"
  },
  {
    "id": "SAME-RUN-07",
    "investigationId": "same",
    "externalRunKey": "PSI-SAME-TR-1055",
    "materialType": "Polyurethane Foam",
    "sampleGeometry": "Porous Cushion Sample",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 6,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 610,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 130,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 26,
        "flameRadiusMm": 9.2,
        "temperatureK": 507,
        "sootDensity": 0.4
      },
      {
        "timeSec": 52,
        "flameRadiusMm": 8.4,
        "temperatureK": 605,
        "sootDensity": 0.4
      },
      {
        "timeSec": 91,
        "flameRadiusMm": 7.2,
        "temperatureK": 591,
        "sootDensity": 0.4
      },
      {
        "timeSec": 130,
        "flameRadiusMm": 6,
        "temperatureK": 577,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/same/run_7.mp4",
    "notes": "Deep interior smolder with delayed exterior smoke plume release"
  },
  {
    "id": "SAME-RUN-08",
    "investigationId": "same",
    "externalRunKey": "PSI-SAME-TR-1056",
    "materialType": "Cellulose Aerosol",
    "sampleGeometry": "Smoke Generator Loop",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 15,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 570,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 100,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 20,
        "flameRadiusMm": 9.2,
        "temperatureK": 480,
        "sootDensity": 0.4
      },
      {
        "timeSec": 40,
        "flameRadiusMm": 8.4,
        "temperatureK": 566,
        "sootDensity": 0.4
      },
      {
        "timeSec": 70,
        "flameRadiusMm": 7.2,
        "temperatureK": 554,
        "sootDensity": 0.4
      },
      {
        "timeSec": 100,
        "flameRadiusMm": 6,
        "temperatureK": 542,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/same/run_8.mp4",
    "notes": "High velocity aerosol transport through detector duct"
  },
  {
    "id": "SAME-R-RUN-01",
    "investigationId": "same-r",
    "externalRunKey": "PSI-SAME-R-TR-1057",
    "materialType": "Cellulose Smolder",
    "sampleGeometry": "Standard Aerosol Cartridge",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 10,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 570,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 130,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 26,
        "flameRadiusMm": 9.2,
        "temperatureK": 480,
        "sootDensity": 0.4
      },
      {
        "timeSec": 52,
        "flameRadiusMm": 8.4,
        "temperatureK": 566,
        "sootDensity": 0.4
      },
      {
        "timeSec": 91,
        "flameRadiusMm": 7.2,
        "temperatureK": 554,
        "sootDensity": 0.4
      },
      {
        "timeSec": 130,
        "flameRadiusMm": 6,
        "temperatureK": 542,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/same-r/run_1.mp4",
    "notes": "Reflight calibration verifying ISS detector chamber response times"
  },
  {
    "id": "SAME-R-RUN-02",
    "investigationId": "same-r",
    "externalRunKey": "PSI-SAME-R-TR-1058",
    "materialType": "Teflon Wire Insulation",
    "sampleGeometry": "Resistance Heating Element",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 10,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 680,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 120,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 24,
        "flameRadiusMm": 9.2,
        "temperatureK": 553,
        "sootDensity": 0.4
      },
      {
        "timeSec": 48,
        "flameRadiusMm": 8.4,
        "temperatureK": 674,
        "sootDensity": 0.4
      },
      {
        "timeSec": 84,
        "flameRadiusMm": 7.2,
        "temperatureK": 657,
        "sootDensity": 0.4
      },
      {
        "timeSec": 120,
        "flameRadiusMm": 6,
        "temperatureK": 640,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/same-r/run_2.mp4",
    "notes": "Ionization detector sensitivity degradation under microgravity smoke sizes"
  },
  {
    "id": "SAME-R-RUN-03",
    "investigationId": "same-r",
    "externalRunKey": "PSI-SAME-R-TR-1059",
    "materialType": "Silicone Wiring",
    "sampleGeometry": "Overload Wire Lead",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 8,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 620,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 160,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 32,
        "flameRadiusMm": 9.2,
        "temperatureK": 513,
        "sootDensity": 0.4
      },
      {
        "timeSec": 64,
        "flameRadiusMm": 8.4,
        "temperatureK": 615,
        "sootDensity": 0.4
      },
      {
        "timeSec": 112,
        "flameRadiusMm": 7.2,
        "temperatureK": 601,
        "sootDensity": 0.4
      },
      {
        "timeSec": 160,
        "flameRadiusMm": 6,
        "temperatureK": 586,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/same-r/run_3.mp4",
    "notes": "Optical obscuration sensor calibration across variable flow rates"
  },
  {
    "id": "SAME-R-RUN-04",
    "investigationId": "same-r",
    "externalRunKey": "PSI-SAME-R-TR-1060",
    "materialType": "Cotton Wick",
    "sampleGeometry": "Charring Smolder Sample",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 15,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 550,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 140,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 28,
        "flameRadiusMm": 9.2,
        "temperatureK": 467,
        "sootDensity": 0.4
      },
      {
        "timeSec": 56,
        "flameRadiusMm": 8.4,
        "temperatureK": 546,
        "sootDensity": 0.4
      },
      {
        "timeSec": 98,
        "flameRadiusMm": 7.2,
        "temperatureK": 535,
        "sootDensity": 0.4
      },
      {
        "timeSec": 140,
        "flameRadiusMm": 6,
        "temperatureK": 524,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/same-r/run_4.mp4",
    "notes": "Higher ventilation yields smaller mean particle diameter"
  },
  {
    "id": "SAME-R-RUN-05",
    "investigationId": "same-r",
    "externalRunKey": "PSI-SAME-R-TR-1061",
    "materialType": "Polyimide Film",
    "sampleGeometry": "Heated Shroud Strip",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 10,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 700,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 95,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 19,
        "flameRadiusMm": 9.2,
        "temperatureK": 567,
        "sootDensity": 0.4
      },
      {
        "timeSec": 38,
        "flameRadiusMm": 8.4,
        "temperatureK": 694,
        "sootDensity": 0.4
      },
      {
        "timeSec": 67,
        "flameRadiusMm": 7.18,
        "temperatureK": 676,
        "sootDensity": 0.4
      },
      {
        "timeSec": 95,
        "flameRadiusMm": 6,
        "temperatureK": 658,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/same-r/run_5.mp4",
    "notes": "Verification of photoelectric vs ionization smoke sensor cross-sensitivities"
  },
  {
    "id": "SAME-R-RUN-06",
    "investigationId": "same-r",
    "externalRunKey": "PSI-SAME-R-TR-1062",
    "materialType": "Nomex Garment Swatch",
    "sampleGeometry": "Pyrolysis Cell",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 6,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 630,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 110,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 22,
        "flameRadiusMm": 9.2,
        "temperatureK": 520,
        "sootDensity": 0.4
      },
      {
        "timeSec": 44,
        "flameRadiusMm": 8.4,
        "temperatureK": 625,
        "sootDensity": 0.4
      },
      {
        "timeSec": 77,
        "flameRadiusMm": 7.2,
        "temperatureK": 610,
        "sootDensity": 0.4
      },
      {
        "timeSec": 110,
        "flameRadiusMm": 6,
        "temperatureK": 595,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/same-r/run_6.mp4",
    "notes": "Low-flow particulate settling behavior in sealed ISS Columbus module"
  },
  {
    "id": "SAME-R-RUN-07",
    "investigationId": "same-r",
    "externalRunKey": "PSI-SAME-R-TR-1063",
    "materialType": "Cellulose Aerosol",
    "sampleGeometry": "Dual-Chamber Detector Test",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 12,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 560,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 150,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 30,
        "flameRadiusMm": 9.2,
        "temperatureK": 473,
        "sootDensity": 0.4
      },
      {
        "timeSec": 60,
        "flameRadiusMm": 8.4,
        "temperatureK": 556,
        "sootDensity": 0.4
      },
      {
        "timeSec": 105,
        "flameRadiusMm": 7.2,
        "temperatureK": 544,
        "sootDensity": 0.4
      },
      {
        "timeSec": 150,
        "flameRadiusMm": 6,
        "temperatureK": 533,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/same-r/run_7.mp4",
    "notes": "Aerosol mass spectrometer ground telemetry correlation"
  },
  {
    "id": "SAME-R-RUN-08",
    "investigationId": "same-r",
    "externalRunKey": "PSI-SAME-R-TR-1064",
    "materialType": "Silicone Pyrolysis",
    "sampleGeometry": "Sensor Calibration Cartridge",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 4,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 605,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 140,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 28,
        "flameRadiusMm": 9.2,
        "temperatureK": 503,
        "sootDensity": 0.4
      },
      {
        "timeSec": 56,
        "flameRadiusMm": 8.4,
        "temperatureK": 600,
        "sootDensity": 0.4
      },
      {
        "timeSec": 98,
        "flameRadiusMm": 7.2,
        "temperatureK": 587,
        "sootDensity": 0.4
      },
      {
        "timeSec": 140,
        "flameRadiusMm": 6,
        "temperatureK": 573,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/same-r/run_8.mp4",
    "notes": "Low flow aerosol aging dynamics"
  },
  {
    "id": "SOFIE-GEL-RUN-01",
    "investigationId": "sofie-gel",
    "externalRunKey": "PSI-SOFIE-GEL-TR-1065",
    "materialType": "Thick PMMA Flat",
    "sampleGeometry": "30 mm × 100 mm × 10 mm Flat",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 5,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0.45,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1510,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 190,
      "extinctionLimitO2Pct": 17,
      "flameLengthMm": 17,
      "flameWidthMm": 13,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 38,
        "flameRadiusMm": 9.3,
        "temperatureK": 1107,
        "sootDensity": 0.4
      },
      {
        "timeSec": 76,
        "flameRadiusMm": 10.6,
        "temperatureK": 1492,
        "sootDensity": 0.4
      },
      {
        "timeSec": 133,
        "flameRadiusMm": 12.55,
        "temperatureK": 1437,
        "sootDensity": 0.4
      },
      {
        "timeSec": 190,
        "flameRadiusMm": 14.5,
        "temperatureK": 1383,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/sofie-gel/run_1.mp4",
    "notes": "SoFIE CIR chamber test; precise laser absorption pyrometry"
  },
  {
    "id": "SOFIE-GEL-RUN-02",
    "investigationId": "sofie-gel",
    "externalRunKey": "PSI-SOFIE-GEL-TR-1066",
    "materialType": "Thick PMMA Flat",
    "sampleGeometry": "30 mm × 100 mm × 10 mm Flat",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 17.5,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 3,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0.18,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1390,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 95,
      "extinctionLimitO2Pct": 17,
      "flameLengthMm": 13,
      "flameWidthMm": 10,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 19,
        "flameRadiusMm": 9.3,
        "temperatureK": 1027,
        "sootDensity": 0.4
      },
      {
        "timeSec": 38,
        "flameRadiusMm": 10.6,
        "temperatureK": 1374,
        "sootDensity": 0.4
      },
      {
        "timeSec": 67,
        "flameRadiusMm": 12.58,
        "temperatureK": 1324,
        "sootDensity": 0.4
      },
      {
        "timeSec": 95,
        "flameRadiusMm": 14.5,
        "temperatureK": 1276,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/sofie-gel/run_2.mp4",
    "notes": "Determining solid fuel extinction limit at reduced oxygen"
  },
  {
    "id": "SOFIE-GEL-RUN-03",
    "investigationId": "sofie-gel",
    "externalRunKey": "PSI-SOFIE-GEL-TR-1067",
    "materialType": "Thick PMMA Flat",
    "sampleGeometry": "30 mm × 100 mm × 10 mm Flat",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 30,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 8,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 1.4,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1720,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 140,
      "extinctionLimitO2Pct": 17,
      "flameLengthMm": 31,
      "flameWidthMm": 22,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 28,
        "flameRadiusMm": 9.3,
        "temperatureK": 1247,
        "sootDensity": 0.4
      },
      {
        "timeSec": 56,
        "flameRadiusMm": 10.6,
        "temperatureK": 1699,
        "sootDensity": 0.4
      },
      {
        "timeSec": 98,
        "flameRadiusMm": 12.55,
        "temperatureK": 1635,
        "sootDensity": 0.4
      },
      {
        "timeSec": 140,
        "flameRadiusMm": 14.5,
        "temperatureK": 1571,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/sofie-gel/run_3.mp4",
    "notes": "Artemis oxygen enrichment acceleration over thick substrate"
  },
  {
    "id": "SOFIE-GEL-RUN-04",
    "investigationId": "sofie-gel",
    "externalRunKey": "PSI-SOFIE-GEL-TR-1068",
    "materialType": "Thick PMMA Flat",
    "sampleGeometry": "30 mm × 100 mm × 10 mm Flat",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 0.5,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0.08,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1310,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 45,
      "extinctionLimitO2Pct": 17,
      "flameLengthMm": 11,
      "flameWidthMm": 9,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 9,
        "flameRadiusMm": 9.3,
        "temperatureK": 973,
        "sootDensity": 0.4
      },
      {
        "timeSec": 18,
        "flameRadiusMm": 10.6,
        "temperatureK": 1295,
        "sootDensity": 0.4
      },
      {
        "timeSec": 31,
        "flameRadiusMm": 12.48,
        "temperatureK": 1251,
        "sootDensity": 0.4
      },
      {
        "timeSec": 45,
        "flameRadiusMm": 14.5,
        "temperatureK": 1204,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/sofie-gel/run_4.mp4",
    "notes": "Quiescent radiative quenching limit; flame self-extinguishes"
  },
  {
    "id": "SOFIE-GEL-RUN-05",
    "investigationId": "sofie-gel",
    "externalRunKey": "PSI-SOFIE-GEL-TR-1069",
    "materialType": "Thick PMMA Flat",
    "sampleGeometry": "30 mm × 100 mm × 10 mm Flat",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 25,
      "pressurePsi": 10.2,
      "flowVelocityCmS": 6,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0.88,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1620,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 160,
      "extinctionLimitO2Pct": 17,
      "flameLengthMm": 23,
      "flameWidthMm": 17,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 32,
        "flameRadiusMm": 9.3,
        "temperatureK": 1180,
        "sootDensity": 0.4
      },
      {
        "timeSec": 64,
        "flameRadiusMm": 10.6,
        "temperatureK": 1600,
        "sootDensity": 0.4
      },
      {
        "timeSec": 112,
        "flameRadiusMm": 12.55,
        "temperatureK": 1541,
        "sootDensity": 0.4
      },
      {
        "timeSec": 160,
        "flameRadiusMm": 14.5,
        "temperatureK": 1481,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/sofie-gel/run_5.mp4",
    "notes": "Combined low pressure and elevated oxygen boundary check"
  },
  {
    "id": "SOFIE-GEL-RUN-06",
    "investigationId": "sofie-gel",
    "externalRunKey": "PSI-SOFIE-GEL-TR-1070",
    "materialType": "Thick PMMA Flat",
    "sampleGeometry": "30 mm × 100 mm × 10 mm Flat",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 15,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0.95,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1590,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 170,
      "extinctionLimitO2Pct": 17,
      "flameLengthMm": 24,
      "flameWidthMm": 18,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 34,
        "flameRadiusMm": 9.3,
        "temperatureK": 1160,
        "sootDensity": 0.4
      },
      {
        "timeSec": 68,
        "flameRadiusMm": 10.6,
        "temperatureK": 1571,
        "sootDensity": 0.4
      },
      {
        "timeSec": 119,
        "flameRadiusMm": 12.55,
        "temperatureK": 1513,
        "sootDensity": 0.4
      },
      {
        "timeSec": 170,
        "flameRadiusMm": 14.5,
        "temperatureK": 1455,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/sofie-gel/run_6.mp4",
    "notes": "Opposed forced flow boundary layer transition in CIR chamber"
  },
  {
    "id": "SOFIE-GEL-RUN-07",
    "investigationId": "sofie-gel",
    "externalRunKey": "PSI-SOFIE-GEL-TR-1071",
    "materialType": "Thick PMMA Flat",
    "sampleGeometry": "30 mm × 100 mm × 10 mm Flat",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 16.5,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 6,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1220,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 18,
      "extinctionLimitO2Pct": 17,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 4,
        "flameRadiusMm": 9.11,
        "temperatureK": 981,
        "sootDensity": 0.4
      },
      {
        "timeSec": 7,
        "flameRadiusMm": 8.44,
        "temperatureK": 1208,
        "sootDensity": 0.4
      },
      {
        "timeSec": 13,
        "flameRadiusMm": 7.11,
        "temperatureK": 1162,
        "sootDensity": 0.4
      },
      {
        "timeSec": 18,
        "flameRadiusMm": 6,
        "temperatureK": 1123,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/sofie-gel/run_7.mp4",
    "notes": "Below LOI threshold: flame quenches immediately after spark"
  },
  {
    "id": "SOFIE-GEL-RUN-08",
    "investigationId": "sofie-gel",
    "externalRunKey": "PSI-SOFIE-GEL-TR-1072",
    "materialType": "Thick PMMA Flat",
    "sampleGeometry": "30 mm × 100 mm × 10 mm Flat",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 35,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 10,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 2.2,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1830,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 120,
      "extinctionLimitO2Pct": 17,
      "flameLengthMm": 43,
      "flameWidthMm": 30,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 24,
        "flameRadiusMm": 9.3,
        "temperatureK": 1320,
        "sootDensity": 0.4
      },
      {
        "timeSec": 48,
        "flameRadiusMm": 10.6,
        "temperatureK": 1807,
        "sootDensity": 0.4
      },
      {
        "timeSec": 84,
        "flameRadiusMm": 12.55,
        "temperatureK": 1738,
        "sootDensity": 0.4
      },
      {
        "timeSec": 120,
        "flameRadiusMm": 14.5,
        "temperatureK": 1669,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/sofie-gel/run_8.mp4",
    "notes": "High oxygen extreme flammability benchmark"
  },
  {
    "id": "SOFIE-MIST-RUN-01",
    "investigationId": "sofie-mist",
    "externalRunKey": "PSI-SOFIE-MIST-TR-1073",
    "materialType": "PMMA Cylinders",
    "sampleGeometry": "6.35 mm Diameter Cylinder",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 5,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0.7,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1540,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 120,
      "extinctionLimitO2Pct": 18,
      "flameLengthMm": 21,
      "flameWidthMm": 15,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 24,
        "flameRadiusMm": 9.3,
        "temperatureK": 1127,
        "sootDensity": 0.4
      },
      {
        "timeSec": 48,
        "flameRadiusMm": 10.6,
        "temperatureK": 1521,
        "sootDensity": 0.4
      },
      {
        "timeSec": 84,
        "flameRadiusMm": 12.55,
        "temperatureK": 1466,
        "sootDensity": 0.4
      },
      {
        "timeSec": 120,
        "flameRadiusMm": 14.5,
        "temperatureK": 1410,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/sofie-mist/run_1.mp4",
    "notes": "Axial radiant flux exposure testing ignition delay time"
  },
  {
    "id": "SOFIE-MIST-RUN-02",
    "investigationId": "sofie-mist",
    "externalRunKey": "PSI-SOFIE-MIST-TR-1074",
    "materialType": "PMMA Cylinders",
    "sampleGeometry": "6.35 mm Diameter Cylinder",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 26,
      "pressurePsi": 10.2,
      "flowVelocityCmS": 8,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 1.3,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1670,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 150,
      "extinctionLimitO2Pct": 18,
      "flameLengthMm": 30,
      "flameWidthMm": 21,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 30,
        "flameRadiusMm": 9.3,
        "temperatureK": 1213,
        "sootDensity": 0.4
      },
      {
        "timeSec": 60,
        "flameRadiusMm": 10.6,
        "temperatureK": 1649,
        "sootDensity": 0.4
      },
      {
        "timeSec": 105,
        "flameRadiusMm": 12.55,
        "temperatureK": 1588,
        "sootDensity": 0.4
      },
      {
        "timeSec": 150,
        "flameRadiusMm": 14.5,
        "temperatureK": 1526,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/sofie-mist/run_2.mp4",
    "notes": "Exploration atmosphere test with 10 kW/m2 radiant heat flux"
  },
  {
    "id": "SOFIE-MIST-RUN-03",
    "investigationId": "sofie-mist",
    "externalRunKey": "PSI-SOFIE-MIST-TR-1075",
    "materialType": "PMMA Cylinders",
    "sampleGeometry": "6.35 mm Diameter Cylinder",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 30,
      "pressurePsi": 10.2,
      "flowVelocityCmS": 10,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 1.85,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1760,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 165,
      "extinctionLimitO2Pct": 18,
      "flameLengthMm": 38,
      "flameWidthMm": 27,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 33,
        "flameRadiusMm": 9.3,
        "temperatureK": 1273,
        "sootDensity": 0.4
      },
      {
        "timeSec": 66,
        "flameRadiusMm": 10.6,
        "temperatureK": 1738,
        "sootDensity": 0.4
      },
      {
        "timeSec": 115,
        "flameRadiusMm": 12.53,
        "temperatureK": 1673,
        "sootDensity": 0.4
      },
      {
        "timeSec": 165,
        "flameRadiusMm": 14.5,
        "temperatureK": 1607,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/sofie-mist/run_3.mp4",
    "notes": "High flux + high O2 creates continuous vapor jet combustion"
  },
  {
    "id": "SOFIE-MIST-RUN-04",
    "investigationId": "sofie-mist",
    "externalRunKey": "PSI-SOFIE-MIST-TR-1076",
    "materialType": "Nomex Rod",
    "sampleGeometry": "8.0 mm Diameter Rod",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 34,
      "pressurePsi": 10.2,
      "flowVelocityCmS": 6,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0.75,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1610,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 85,
      "extinctionLimitO2Pct": 18,
      "flameLengthMm": 21,
      "flameWidthMm": 16,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 17,
        "flameRadiusMm": 9.3,
        "temperatureK": 1173,
        "sootDensity": 0.4
      },
      {
        "timeSec": 34,
        "flameRadiusMm": 10.6,
        "temperatureK": 1590,
        "sootDensity": 0.4
      },
      {
        "timeSec": 59,
        "flameRadiusMm": 12.51,
        "temperatureK": 1533,
        "sootDensity": 0.4
      },
      {
        "timeSec": 85,
        "flameRadiusMm": 14.5,
        "temperatureK": 1472,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/sofie-mist/run_4.mp4",
    "notes": "External radiant flux allows Nomex ignition in lunar exploration gas"
  },
  {
    "id": "SOFIE-MIST-RUN-05",
    "investigationId": "sofie-mist",
    "externalRunKey": "PSI-SOFIE-MIST-TR-1077",
    "materialType": "Nomex Rod",
    "sampleGeometry": "8.0 mm Diameter Rod",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 5,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1180,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 20,
      "extinctionLimitO2Pct": 18,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 4,
        "flameRadiusMm": 9.2,
        "temperatureK": 887,
        "sootDensity": 0.4
      },
      {
        "timeSec": 8,
        "flameRadiusMm": 8.4,
        "temperatureK": 1167,
        "sootDensity": 0.4
      },
      {
        "timeSec": 14,
        "flameRadiusMm": 7.2,
        "temperatureK": 1127,
        "sootDensity": 0.4
      },
      {
        "timeSec": 20,
        "flameRadiusMm": 6,
        "temperatureK": 1088,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/sofie-mist/run_5.mp4",
    "notes": "Non-ignition verified at nominal ISS air under 15 kW/m2 flux"
  },
  {
    "id": "SOFIE-MIST-RUN-06",
    "investigationId": "sofie-mist",
    "externalRunKey": "PSI-SOFIE-MIST-TR-1078",
    "materialType": "PMMA Cylinders",
    "sampleGeometry": "9.5 mm Diameter Cylinder",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 18,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 4,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0.35,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1430,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 90,
      "extinctionLimitO2Pct": 18,
      "flameLengthMm": 15,
      "flameWidthMm": 12,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 18,
        "flameRadiusMm": 9.3,
        "temperatureK": 1053,
        "sootDensity": 0.4
      },
      {
        "timeSec": 36,
        "flameRadiusMm": 10.6,
        "temperatureK": 1413,
        "sootDensity": 0.4
      },
      {
        "timeSec": 63,
        "flameRadiusMm": 12.55,
        "temperatureK": 1362,
        "sootDensity": 0.4
      },
      {
        "timeSec": 90,
        "flameRadiusMm": 14.5,
        "temperatureK": 1311,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/sofie-mist/run_6.mp4",
    "notes": "Radiative cooling dominates thermal balance for large cylinder"
  },
  {
    "id": "SOFIE-MIST-RUN-07",
    "investigationId": "sofie-mist",
    "externalRunKey": "PSI-SOFIE-MIST-TR-1079",
    "materialType": "PMMA Cylinders",
    "sampleGeometry": "6.35 mm Diameter Cylinder",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 20,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 1.1,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1600,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 110,
      "extinctionLimitO2Pct": 18,
      "flameLengthMm": 27,
      "flameWidthMm": 19,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 22,
        "flameRadiusMm": 9.3,
        "temperatureK": 1167,
        "sootDensity": 0.4
      },
      {
        "timeSec": 44,
        "flameRadiusMm": 10.6,
        "temperatureK": 1581,
        "sootDensity": 0.4
      },
      {
        "timeSec": 77,
        "flameRadiusMm": 12.55,
        "temperatureK": 1522,
        "sootDensity": 0.4
      },
      {
        "timeSec": 110,
        "flameRadiusMm": 14.5,
        "temperatureK": 1464,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/sofie-mist/run_7.mp4",
    "notes": "Flow velocity sweep establishing opposed flame standoff"
  },
  {
    "id": "SOFIE-MIST-RUN-08",
    "investigationId": "sofie-mist",
    "externalRunKey": "PSI-SOFIE-MIST-TR-1080",
    "materialType": "PMMA Cylinders",
    "sampleGeometry": "6.35 mm Diameter Cylinder",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 32,
      "pressurePsi": 8.2,
      "flowVelocityCmS": 12,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 1.95,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1780,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 130,
      "extinctionLimitO2Pct": 18,
      "flameLengthMm": 39,
      "flameWidthMm": 28,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 26,
        "flameRadiusMm": 9.3,
        "temperatureK": 1287,
        "sootDensity": 0.4
      },
      {
        "timeSec": 52,
        "flameRadiusMm": 10.6,
        "temperatureK": 1758,
        "sootDensity": 0.4
      },
      {
        "timeSec": 91,
        "flameRadiusMm": 12.55,
        "temperatureK": 1691,
        "sootDensity": 0.4
      },
      {
        "timeSec": 130,
        "flameRadiusMm": 14.5,
        "temperatureK": 1625,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/sofie-mist/run_8.mp4",
    "notes": "Low total pressure (8.2 psia) exploration baseline"
  },
  {
    "id": "SOFIE-RT10-RUN-01",
    "investigationId": "sofie-rt10",
    "externalRunKey": "PSI-SOFIE-RT10-TR-1081",
    "materialType": "Thin Cellulose",
    "sampleGeometry": "100 mm Sample Strip",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 4,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 1.4,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1580,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 70,
      "extinctionLimitO2Pct": 16,
      "flameLengthMm": 31,
      "flameWidthMm": 22,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 14,
        "flameRadiusMm": 9.3,
        "temperatureK": 1153,
        "sootDensity": 0.4
      },
      {
        "timeSec": 28,
        "flameRadiusMm": 10.6,
        "temperatureK": 1561,
        "sootDensity": 0.4
      },
      {
        "timeSec": 49,
        "flameRadiusMm": 12.55,
        "temperatureK": 1503,
        "sootDensity": 0.4
      },
      {
        "timeSec": 70,
        "flameRadiusMm": 14.5,
        "temperatureK": 1446,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/sofie-rt10/run_1.mp4",
    "notes": "Residence time effect: long sample allows flame length stabilization"
  },
  {
    "id": "SOFIE-RT10-RUN-02",
    "investigationId": "sofie-rt10",
    "externalRunKey": "PSI-SOFIE-RT10-TR-1082",
    "materialType": "Thin Cellulose",
    "sampleGeometry": "100 mm Sample Strip",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 1.5,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0.6,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1450,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 140,
      "extinctionLimitO2Pct": 16,
      "flameLengthMm": 19,
      "flameWidthMm": 14,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 28,
        "flameRadiusMm": 9.3,
        "temperatureK": 1067,
        "sootDensity": 0.4
      },
      {
        "timeSec": 56,
        "flameRadiusMm": 10.6,
        "temperatureK": 1433,
        "sootDensity": 0.4
      },
      {
        "timeSec": 98,
        "flameRadiusMm": 12.55,
        "temperatureK": 1381,
        "sootDensity": 0.4
      },
      {
        "timeSec": 140,
        "flameRadiusMm": 14.5,
        "temperatureK": 1329,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/sofie-rt10/run_2.mp4",
    "notes": "Oxygen diffusion length equals boundary layer thickness"
  },
  {
    "id": "SOFIE-RT10-RUN-03",
    "investigationId": "sofie-rt10",
    "externalRunKey": "PSI-SOFIE-RT10-TR-1083",
    "materialType": "Thin Cellulose",
    "sampleGeometry": "100 mm Sample Strip",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 28,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 8,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 2.8,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1750,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 45,
      "extinctionLimitO2Pct": 16,
      "flameLengthMm": 52,
      "flameWidthMm": 36,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 9,
        "flameRadiusMm": 9.3,
        "temperatureK": 1267,
        "sootDensity": 0.4
      },
      {
        "timeSec": 18,
        "flameRadiusMm": 10.6,
        "temperatureK": 1728,
        "sootDensity": 0.4
      },
      {
        "timeSec": 31,
        "flameRadiusMm": 12.48,
        "temperatureK": 1665,
        "sootDensity": 0.4
      },
      {
        "timeSec": 45,
        "flameRadiusMm": 14.5,
        "temperatureK": 1598,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/sofie-rt10/run_3.mp4",
    "notes": "Rapid concurrent flame spread across entire 100 mm strip"
  },
  {
    "id": "SOFIE-RT10-RUN-04",
    "investigationId": "sofie-rt10",
    "externalRunKey": "PSI-SOFIE-RT10-TR-1084",
    "materialType": "Thin Cellulose",
    "sampleGeometry": "100 mm Sample Strip",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 17,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 5,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0.25,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1360,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 60,
      "extinctionLimitO2Pct": 16,
      "flameLengthMm": 14,
      "flameWidthMm": 11,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 12,
        "flameRadiusMm": 9.3,
        "temperatureK": 1007,
        "sootDensity": 0.4
      },
      {
        "timeSec": 24,
        "flameRadiusMm": 10.6,
        "temperatureK": 1344,
        "sootDensity": 0.4
      },
      {
        "timeSec": 42,
        "flameRadiusMm": 12.55,
        "temperatureK": 1296,
        "sootDensity": 0.4
      },
      {
        "timeSec": 60,
        "flameRadiusMm": 14.5,
        "temperatureK": 1249,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/sofie-rt10/run_4.mp4",
    "notes": "Opposed spread near quenching boundary"
  },
  {
    "id": "SOFIE-RT10-RUN-05",
    "investigationId": "sofie-rt10",
    "externalRunKey": "PSI-SOFIE-RT10-TR-1085",
    "materialType": "Thin PMMA Strip",
    "sampleGeometry": "100 mm × 0.5 mm Strip",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 6,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 1.1,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1560,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 85,
      "extinctionLimitO2Pct": 16,
      "flameLengthMm": 27,
      "flameWidthMm": 19,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 17,
        "flameRadiusMm": 9.3,
        "temperatureK": 1140,
        "sootDensity": 0.4
      },
      {
        "timeSec": 34,
        "flameRadiusMm": 10.6,
        "temperatureK": 1541,
        "sootDensity": 0.4
      },
      {
        "timeSec": 59,
        "flameRadiusMm": 12.51,
        "temperatureK": 1486,
        "sootDensity": 0.4
      },
      {
        "timeSec": 85,
        "flameRadiusMm": 14.5,
        "temperatureK": 1428,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/sofie-rt10/run_5.mp4",
    "notes": "Thermally thin PMMA behavior compared with thick slab data"
  },
  {
    "id": "SOFIE-RT10-RUN-06",
    "investigationId": "sofie-rt10",
    "externalRunKey": "PSI-SOFIE-RT10-TR-1086",
    "materialType": "Thin PMMA Strip",
    "sampleGeometry": "100 mm × 0.5 mm Strip",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 30,
      "pressurePsi": 10.2,
      "flowVelocityCmS": 10,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 2.4,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1740,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 50,
      "extinctionLimitO2Pct": 16,
      "flameLengthMm": 46,
      "flameWidthMm": 32,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 10,
        "flameRadiusMm": 9.3,
        "temperatureK": 1260,
        "sootDensity": 0.4
      },
      {
        "timeSec": 20,
        "flameRadiusMm": 10.6,
        "temperatureK": 1718,
        "sootDensity": 0.4
      },
      {
        "timeSec": 35,
        "flameRadiusMm": 12.55,
        "temperatureK": 1654,
        "sootDensity": 0.4
      },
      {
        "timeSec": 50,
        "flameRadiusMm": 14.5,
        "temperatureK": 1589,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/sofie-rt10/run_6.mp4",
    "notes": "Exploration atmosphere acceleration on thin polymer sheet"
  },
  {
    "id": "SOFIE-RT10-RUN-07",
    "investigationId": "sofie-rt10",
    "externalRunKey": "PSI-SOFIE-RT10-TR-1087",
    "materialType": "Thin PMMA Strip",
    "sampleGeometry": "100 mm × 0.5 mm Strip",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 18,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 1,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0.12,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1320,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 40,
      "extinctionLimitO2Pct": 16,
      "flameLengthMm": 12,
      "flameWidthMm": 9,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 8,
        "flameRadiusMm": 9.3,
        "temperatureK": 980,
        "sootDensity": 0.4
      },
      {
        "timeSec": 16,
        "flameRadiusMm": 10.6,
        "temperatureK": 1305,
        "sootDensity": 0.4
      },
      {
        "timeSec": 28,
        "flameRadiusMm": 12.55,
        "temperatureK": 1259,
        "sootDensity": 0.4
      },
      {
        "timeSec": 40,
        "flameRadiusMm": 14.5,
        "temperatureK": 1213,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/sofie-rt10/run_7.mp4",
    "notes": "Slow creep with large dim blue luminous halo"
  },
  {
    "id": "SOFIE-RT10-RUN-08",
    "investigationId": "sofie-rt10",
    "externalRunKey": "PSI-SOFIE-RT10-TR-1088",
    "materialType": "Thin Cellulose",
    "sampleGeometry": "100 mm Sample Strip",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 25,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 12,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 2.6,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1710,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 55,
      "extinctionLimitO2Pct": 16,
      "flameLengthMm": 49,
      "flameWidthMm": 34,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 11,
        "flameRadiusMm": 9.3,
        "temperatureK": 1240,
        "sootDensity": 0.4
      },
      {
        "timeSec": 22,
        "flameRadiusMm": 10.6,
        "temperatureK": 1689,
        "sootDensity": 0.4
      },
      {
        "timeSec": 39,
        "flameRadiusMm": 12.61,
        "temperatureK": 1623,
        "sootDensity": 0.4
      },
      {
        "timeSec": 55,
        "flameRadiusMm": 14.5,
        "temperatureK": 1562,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/sofie-rt10/run_8.mp4",
    "notes": "Concurrent wind tunnel velocity sweep"
  },
  {
    "id": "FLEX-RUN-01",
    "investigationId": "flex",
    "externalRunKey": "PSI-FLEX-TR-1089",
    "materialType": "n-Heptane Droplet",
    "sampleGeometry": "2.5 mm Tethered Droplet",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 0,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 680,
      "sootVolumeFraction": 0.02,
      "burnDurationSec": 22,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": true
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.02
      },
      {
        "timeSec": 4,
        "flameRadiusMm": 9.27,
        "temperatureK": 530,
        "sootDensity": 0.02
      },
      {
        "timeSec": 9,
        "flameRadiusMm": 8.36,
        "temperatureK": 674,
        "sootDensity": 0.02
      },
      {
        "timeSec": 15,
        "flameRadiusMm": 7.27,
        "temperatureK": 658,
        "sootDensity": 0.02
      },
      {
        "timeSec": 22,
        "flameRadiusMm": 6,
        "temperatureK": 640,
        "sootDensity": 0.02
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/flex/run_1.mp4",
    "notes": "Discovery of quasi-steady invisible cool flames after radiative hot extinction"
  },
  {
    "id": "FLEX-RUN-02",
    "investigationId": "flex",
    "externalRunKey": "PSI-FLEX-TR-1090",
    "materialType": "n-Heptane Droplet",
    "sampleGeometry": "3.0 mm Tethered Droplet",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 0,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 710,
      "sootVolumeFraction": 0.02,
      "burnDurationSec": 28,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": true
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.02
      },
      {
        "timeSec": 6,
        "flameRadiusMm": 9.14,
        "temperatureK": 593,
        "sootDensity": 0.02
      },
      {
        "timeSec": 11,
        "flameRadiusMm": 8.43,
        "temperatureK": 704,
        "sootDensity": 0.02
      },
      {
        "timeSec": 20,
        "flameRadiusMm": 7.14,
        "temperatureK": 685,
        "sootDensity": 0.02
      },
      {
        "timeSec": 28,
        "flameRadiusMm": 6,
        "temperatureK": 667,
        "sootDensity": 0.02
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/flex/run_2.mp4",
    "notes": "Cool flame burning continues for 15s after visible soot luminescence ends"
  },
  {
    "id": "FLEX-RUN-03",
    "investigationId": "flex",
    "externalRunKey": "PSI-FLEX-TR-1091",
    "materialType": "n-Heptane Droplet",
    "sampleGeometry": "2.0 mm Free Droplet",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 0,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 660,
      "sootVolumeFraction": 0.02,
      "burnDurationSec": 18,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": true
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.02
      },
      {
        "timeSec": 4,
        "flameRadiusMm": 9.11,
        "temperatureK": 567,
        "sootDensity": 0.02
      },
      {
        "timeSec": 7,
        "flameRadiusMm": 8.44,
        "temperatureK": 655,
        "sootDensity": 0.02
      },
      {
        "timeSec": 13,
        "flameRadiusMm": 7.11,
        "temperatureK": 637,
        "sootDensity": 0.02
      },
      {
        "timeSec": 18,
        "flameRadiusMm": 6,
        "temperatureK": 622,
        "sootDensity": 0.02
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/flex/run_3.mp4",
    "notes": "Free-floating droplet; spherical symmetry confirmed by OH* chemiluminescence"
  },
  {
    "id": "FLEX-RUN-04",
    "investigationId": "flex",
    "externalRunKey": "PSI-FLEX-TR-1092",
    "materialType": "Methanol Droplet",
    "sampleGeometry": "2.5 mm Droplet",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 0,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1420,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 14,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 3,
        "flameRadiusMm": 9.14,
        "temperatureK": 1100,
        "sootDensity": 0.4
      },
      {
        "timeSec": 6,
        "flameRadiusMm": 8.29,
        "temperatureK": 1398,
        "sootDensity": 0.4
      },
      {
        "timeSec": 10,
        "flameRadiusMm": 7.14,
        "temperatureK": 1350,
        "sootDensity": 0.4
      },
      {
        "timeSec": 14,
        "flameRadiusMm": 6,
        "temperatureK": 1302,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/flex/run_4.mp4",
    "notes": "Pure alcohol droplet burns with zero soot, single-stage hot extinction"
  },
  {
    "id": "FLEX-RUN-05",
    "investigationId": "flex",
    "externalRunKey": "PSI-FLEX-TR-1093",
    "materialType": "n-Decane Droplet",
    "sampleGeometry": "2.8 mm Droplet",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 0,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 730,
      "sootVolumeFraction": 0.02,
      "burnDurationSec": 34,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": true
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.02
      },
      {
        "timeSec": 7,
        "flameRadiusMm": 9.18,
        "temperatureK": 595,
        "sootDensity": 0.02
      },
      {
        "timeSec": 14,
        "flameRadiusMm": 8.35,
        "temperatureK": 723,
        "sootDensity": 0.02
      },
      {
        "timeSec": 24,
        "flameRadiusMm": 7.18,
        "temperatureK": 704,
        "sootDensity": 0.02
      },
      {
        "timeSec": 34,
        "flameRadiusMm": 6,
        "temperatureK": 685,
        "sootDensity": 0.02
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/flex/run_5.mp4",
    "notes": "Longer chain alkane exhibiting vigorous two-stage cool flame combustion"
  },
  {
    "id": "FLEX-RUN-06",
    "investigationId": "flex",
    "externalRunKey": "PSI-FLEX-TR-1094",
    "materialType": "n-Heptane Droplet",
    "sampleGeometry": "2.5 mm Droplet",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 18,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 0,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 640,
      "sootVolumeFraction": 0.02,
      "burnDurationSec": 20,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": true
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.02
      },
      {
        "timeSec": 4,
        "flameRadiusMm": 9.2,
        "temperatureK": 527,
        "sootDensity": 0.02
      },
      {
        "timeSec": 8,
        "flameRadiusMm": 8.4,
        "temperatureK": 635,
        "sootDensity": 0.02
      },
      {
        "timeSec": 14,
        "flameRadiusMm": 7.2,
        "temperatureK": 620,
        "sootDensity": 0.02
      },
      {
        "timeSec": 20,
        "flameRadiusMm": 6,
        "temperatureK": 604,
        "sootDensity": 0.02
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/flex/run_6.mp4",
    "notes": "Lower oxygen accelerates first-stage hot flame extinction"
  },
  {
    "id": "FLEX-RUN-07",
    "investigationId": "flex",
    "externalRunKey": "PSI-FLEX-TR-1095",
    "materialType": "n-Heptane Droplet",
    "sampleGeometry": "2.5 mm Droplet",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 30,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 0,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 780,
      "sootVolumeFraction": 0.02,
      "burnDurationSec": 38,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": true
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.02
      },
      {
        "timeSec": 8,
        "flameRadiusMm": 9.16,
        "temperatureK": 637,
        "sootDensity": 0.02
      },
      {
        "timeSec": 15,
        "flameRadiusMm": 8.42,
        "temperatureK": 773,
        "sootDensity": 0.02
      },
      {
        "timeSec": 27,
        "flameRadiusMm": 7.16,
        "temperatureK": 750,
        "sootDensity": 0.02
      },
      {
        "timeSec": 38,
        "flameRadiusMm": 6,
        "temperatureK": 730,
        "sootDensity": 0.02
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/flex/run_7.mp4",
    "notes": "Elevated O2 prolongs cool flame residence time and burning rate"
  },
  {
    "id": "FLEX-RUN-08",
    "investigationId": "flex",
    "externalRunKey": "PSI-FLEX-TR-1096",
    "materialType": "n-Octane Droplet",
    "sampleGeometry": "2.4 mm Droplet",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 0,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 700,
      "sootVolumeFraction": 0.02,
      "burnDurationSec": 26,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": true
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.02
      },
      {
        "timeSec": 5,
        "flameRadiusMm": 9.23,
        "temperatureK": 556,
        "sootDensity": 0.02
      },
      {
        "timeSec": 10,
        "flameRadiusMm": 8.46,
        "temperatureK": 695,
        "sootDensity": 0.02
      },
      {
        "timeSec": 18,
        "flameRadiusMm": 7.23,
        "temperatureK": 676,
        "sootDensity": 0.02
      },
      {
        "timeSec": 26,
        "flameRadiusMm": 6,
        "temperatureK": 658,
        "sootDensity": 0.02
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/flex/run_8.mp4",
    "notes": "Multi-component hydrocarbon fuel verification in CIR"
  },
  {
    "id": "FLEX-2-RUN-01",
    "investigationId": "flex-2",
    "externalRunKey": "PSI-FLEX-2-TR-1097",
    "materialType": "n-Heptane / Hexadecane",
    "sampleGeometry": "3.0 mm Binary Droplet",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 0,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 690,
      "sootVolumeFraction": 0.02,
      "burnDurationSec": 36,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": true
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.02
      },
      {
        "timeSec": 7,
        "flameRadiusMm": 9.22,
        "temperatureK": 553,
        "sootDensity": 0.02
      },
      {
        "timeSec": 14,
        "flameRadiusMm": 8.44,
        "temperatureK": 685,
        "sootDensity": 0.02
      },
      {
        "timeSec": 25,
        "flameRadiusMm": 7.22,
        "temperatureK": 667,
        "sootDensity": 0.02
      },
      {
        "timeSec": 36,
        "flameRadiusMm": 6,
        "temperatureK": 649,
        "sootDensity": 0.02
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/flex-2/run_1.mp4",
    "notes": "Binary mixture showing preferential vaporization and micro-explosions"
  },
  {
    "id": "FLEX-2-RUN-02",
    "investigationId": "flex-2",
    "externalRunKey": "PSI-FLEX-2-TR-1098",
    "materialType": "n-Decane / Diesel Surrogate",
    "sampleGeometry": "2.8 mm Droplet",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 0,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 740,
      "sootVolumeFraction": 0.02,
      "burnDurationSec": 42,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": true
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.02
      },
      {
        "timeSec": 8,
        "flameRadiusMm": 9.24,
        "temperatureK": 579,
        "sootDensity": 0.02
      },
      {
        "timeSec": 17,
        "flameRadiusMm": 8.38,
        "temperatureK": 733,
        "sootDensity": 0.02
      },
      {
        "timeSec": 29,
        "flameRadiusMm": 7.24,
        "temperatureK": 714,
        "sootDensity": 0.02
      },
      {
        "timeSec": 42,
        "flameRadiusMm": 6,
        "temperatureK": 694,
        "sootDensity": 0.02
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/flex-2/run_2.mp4",
    "notes": "Diesel fuel surrogate cool flame kinetics under microgravity"
  },
  {
    "id": "FLEX-2-RUN-03",
    "investigationId": "flex-2",
    "externalRunKey": "PSI-FLEX-2-TR-1099",
    "materialType": "n-Heptane Droplet",
    "sampleGeometry": "4.0 mm Large Droplet",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 0,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 720,
      "sootVolumeFraction": 0.02,
      "burnDurationSec": 54,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": true
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.02
      },
      {
        "timeSec": 11,
        "flameRadiusMm": 9.19,
        "temperatureK": 585,
        "sootDensity": 0.02
      },
      {
        "timeSec": 22,
        "flameRadiusMm": 8.37,
        "temperatureK": 713,
        "sootDensity": 0.02
      },
      {
        "timeSec": 38,
        "flameRadiusMm": 7.19,
        "temperatureK": 695,
        "sootDensity": 0.02
      },
      {
        "timeSec": 54,
        "flameRadiusMm": 6,
        "temperatureK": 676,
        "sootDensity": 0.02
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/flex-2/run_3.mp4",
    "notes": "Large diameter droplet confirming d-squared evaporation law extension"
  },
  {
    "id": "FLEX-2-RUN-04",
    "investigationId": "flex-2",
    "externalRunKey": "PSI-FLEX-2-TR-1100",
    "materialType": "Ethanol Droplet",
    "sampleGeometry": "2.5 mm Droplet",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 0,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1460,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 16,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 3,
        "flameRadiusMm": 9.25,
        "temperatureK": 1025,
        "sootDensity": 0.4
      },
      {
        "timeSec": 6,
        "flameRadiusMm": 8.5,
        "temperatureK": 1447,
        "sootDensity": 0.4
      },
      {
        "timeSec": 11,
        "flameRadiusMm": 7.25,
        "temperatureK": 1393,
        "sootDensity": 0.4
      },
      {
        "timeSec": 16,
        "flameRadiusMm": 6,
        "temperatureK": 1338,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/flex-2/run_4.mp4",
    "notes": "Non-sooting biofuel reference in 0.0g"
  },
  {
    "id": "FLEX-2-RUN-05",
    "investigationId": "flex-2",
    "externalRunKey": "PSI-FLEX-2-TR-1101",
    "materialType": "n-Heptane / CO2 Diluent",
    "sampleGeometry": "2.5 mm Droplet",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 0,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 630,
      "sootVolumeFraction": 0.02,
      "burnDurationSec": 19,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": true
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.02
      },
      {
        "timeSec": 4,
        "flameRadiusMm": 9.16,
        "temperatureK": 532,
        "sootDensity": 0.02
      },
      {
        "timeSec": 8,
        "flameRadiusMm": 8.32,
        "temperatureK": 624,
        "sootDensity": 0.02
      },
      {
        "timeSec": 13,
        "flameRadiusMm": 7.26,
        "temperatureK": 611,
        "sootDensity": 0.02
      },
      {
        "timeSec": 19,
        "flameRadiusMm": 6,
        "temperatureK": 595,
        "sootDensity": 0.02
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/flex-2/run_5.mp4",
    "notes": "CO2 inerting effects on low-temperature oxidation pathway"
  },
  {
    "id": "FLEX-2-RUN-06",
    "investigationId": "flex-2",
    "externalRunKey": "PSI-FLEX-2-TR-1102",
    "materialType": "n-Decane Droplet",
    "sampleGeometry": "3.2 mm Droplet",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 25,
      "pressurePsi": 12,
      "flowVelocityCmS": 0,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 760,
      "sootVolumeFraction": 0.02,
      "burnDurationSec": 44,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": true
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.02
      },
      {
        "timeSec": 9,
        "flameRadiusMm": 9.18,
        "temperatureK": 614,
        "sootDensity": 0.02
      },
      {
        "timeSec": 18,
        "flameRadiusMm": 8.36,
        "temperatureK": 752,
        "sootDensity": 0.02
      },
      {
        "timeSec": 31,
        "flameRadiusMm": 7.18,
        "temperatureK": 732,
        "sootDensity": 0.02
      },
      {
        "timeSec": 44,
        "flameRadiusMm": 6,
        "temperatureK": 712,
        "sootDensity": 0.02
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/flex-2/run_6.mp4",
    "notes": "Exploration pressure and oxygen mixture droplet run"
  },
  {
    "id": "FLEX-2-RUN-07",
    "investigationId": "flex-2",
    "externalRunKey": "PSI-FLEX-2-TR-1103",
    "materialType": "n-Heptane Droplet",
    "sampleGeometry": "2.0 mm Droplet",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 15,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 0,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 590,
      "sootVolumeFraction": 0.02,
      "burnDurationSec": 12,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": true
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.02
      },
      {
        "timeSec": 2,
        "flameRadiusMm": 9.33,
        "temperatureK": 461,
        "sootDensity": 0.02
      },
      {
        "timeSec": 5,
        "flameRadiusMm": 8.33,
        "temperatureK": 585,
        "sootDensity": 0.02
      },
      {
        "timeSec": 8,
        "flameRadiusMm": 7.33,
        "temperatureK": 574,
        "sootDensity": 0.02
      },
      {
        "timeSec": 12,
        "flameRadiusMm": 6,
        "temperatureK": 560,
        "sootDensity": 0.02
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/flex-2/run_7.mp4",
    "notes": "Near-limiting oxygen concentration for cool flame sustainment"
  },
  {
    "id": "FLEX-2-RUN-08",
    "investigationId": "flex-2",
    "externalRunKey": "PSI-FLEX-2-TR-1104",
    "materialType": "n-Heptane Droplet",
    "sampleGeometry": "3.5 mm Droplet",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 0,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 715,
      "sootVolumeFraction": 0.02,
      "burnDurationSec": 48,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": true
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.02
      },
      {
        "timeSec": 10,
        "flameRadiusMm": 9.17,
        "temperatureK": 588,
        "sootDensity": 0.02
      },
      {
        "timeSec": 19,
        "flameRadiusMm": 8.42,
        "temperatureK": 709,
        "sootDensity": 0.02
      },
      {
        "timeSec": 34,
        "flameRadiusMm": 7.17,
        "temperatureK": 690,
        "sootDensity": 0.02
      },
      {
        "timeSec": 48,
        "flameRadiusMm": 6,
        "temperatureK": 671,
        "sootDensity": 0.02
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/flex-2/run_8.mp4",
    "notes": "Long duration cool flame observation"
  },
  {
    "id": "CFI-RUN-01",
    "investigationId": "cfi",
    "externalRunKey": "PSI-CFI-TR-1105",
    "materialType": "Interior Droplet Spread",
    "sampleGeometry": "Capillary Channel Vane",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 2,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0.8,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1490,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 50,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 22,
      "flameWidthMm": 16,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 10,
        "flameRadiusMm": 9.3,
        "temperatureK": 1093,
        "sootDensity": 0.4
      },
      {
        "timeSec": 20,
        "flameRadiusMm": 10.6,
        "temperatureK": 1472,
        "sootDensity": 0.4
      },
      {
        "timeSec": 35,
        "flameRadiusMm": 12.55,
        "temperatureK": 1419,
        "sootDensity": 0.4
      },
      {
        "timeSec": 50,
        "flameRadiusMm": 14.5,
        "temperatureK": 1365,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/cfi/run_1.mp4",
    "notes": "Capillary liquid fuel positioning governs flame propagation geometry"
  },
  {
    "id": "CFI-RUN-02",
    "investigationId": "cfi",
    "externalRunKey": "PSI-CFI-TR-1106",
    "materialType": "Interior Droplet Spread",
    "sampleGeometry": "Capillary Channel Vane",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 25,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 4,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 1.35,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1620,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 65,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 30,
      "flameWidthMm": 22,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 13,
        "flameRadiusMm": 9.3,
        "temperatureK": 1180,
        "sootDensity": 0.4
      },
      {
        "timeSec": 26,
        "flameRadiusMm": 10.6,
        "temperatureK": 1600,
        "sootDensity": 0.4
      },
      {
        "timeSec": 46,
        "flameRadiusMm": 12.6,
        "temperatureK": 1539,
        "sootDensity": 0.4
      },
      {
        "timeSec": 65,
        "flameRadiusMm": 14.5,
        "temperatureK": 1481,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/cfi/run_2.mp4",
    "notes": "Enhanced capillary suction feeding hot flame front"
  },
  {
    "id": "CFI-RUN-03",
    "investigationId": "cfi",
    "externalRunKey": "PSI-CFI-TR-1107",
    "materialType": "Silicone Oil Droplet",
    "sampleGeometry": "Capillary Wedge",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 0,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0.25,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1380,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 40,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 14,
      "flameWidthMm": 11,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 8,
        "flameRadiusMm": 9.3,
        "temperatureK": 1020,
        "sootDensity": 0.4
      },
      {
        "timeSec": 16,
        "flameRadiusMm": 10.6,
        "temperatureK": 1364,
        "sootDensity": 0.4
      },
      {
        "timeSec": 28,
        "flameRadiusMm": 12.55,
        "temperatureK": 1315,
        "sootDensity": 0.4
      },
      {
        "timeSec": 40,
        "flameRadiusMm": 14.5,
        "temperatureK": 1267,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/cfi/run_3.mp4",
    "notes": "Liquid fluid dynamics coupled with surface tension gradient combustion"
  },
  {
    "id": "CFI-RUN-04",
    "investigationId": "cfi",
    "externalRunKey": "PSI-CFI-TR-1108",
    "materialType": "n-Heptane Pool",
    "sampleGeometry": "Small Capillary Trench",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 3,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 1.1,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1540,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 55,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 27,
      "flameWidthMm": 19,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 11,
        "flameRadiusMm": 9.3,
        "temperatureK": 1127,
        "sootDensity": 0.4
      },
      {
        "timeSec": 22,
        "flameRadiusMm": 10.6,
        "temperatureK": 1521,
        "sootDensity": 0.4
      },
      {
        "timeSec": 39,
        "flameRadiusMm": 12.61,
        "temperatureK": 1464,
        "sootDensity": 0.4
      },
      {
        "timeSec": 55,
        "flameRadiusMm": 14.5,
        "temperatureK": 1410,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/cfi/run_4.mp4",
    "notes": "Trench geometry simulates spacecraft liquid fuel line rupture"
  },
  {
    "id": "CFI-RUN-05",
    "investigationId": "cfi",
    "externalRunKey": "PSI-CFI-TR-1109",
    "materialType": "n-Heptane Pool",
    "sampleGeometry": "Small Capillary Trench",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 18,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 1,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0.35,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1410,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 30,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 15,
      "flameWidthMm": 12,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 6,
        "flameRadiusMm": 9.3,
        "temperatureK": 1040,
        "sootDensity": 0.4
      },
      {
        "timeSec": 12,
        "flameRadiusMm": 10.6,
        "temperatureK": 1393,
        "sootDensity": 0.4
      },
      {
        "timeSec": 21,
        "flameRadiusMm": 12.55,
        "temperatureK": 1343,
        "sootDensity": 0.4
      },
      {
        "timeSec": 30,
        "flameRadiusMm": 14.5,
        "temperatureK": 1293,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/cfi/run_5.mp4",
    "notes": "Low flow suppression threshold over liquid channel"
  },
  {
    "id": "CFI-RUN-06",
    "investigationId": "cfi",
    "externalRunKey": "PSI-CFI-TR-1110",
    "materialType": "Methanol Capillary",
    "sampleGeometry": "Glass Corner Vane",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 2.5,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0.9,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1470,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 45,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 24,
      "flameWidthMm": 17,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 9,
        "flameRadiusMm": 9.3,
        "temperatureK": 1080,
        "sootDensity": 0.4
      },
      {
        "timeSec": 18,
        "flameRadiusMm": 10.6,
        "temperatureK": 1452,
        "sootDensity": 0.4
      },
      {
        "timeSec": 31,
        "flameRadiusMm": 12.48,
        "temperatureK": 1402,
        "sootDensity": 0.4
      },
      {
        "timeSec": 45,
        "flameRadiusMm": 14.5,
        "temperatureK": 1347,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/cfi/run_6.mp4",
    "notes": "Wetting fluid interface prevents dryout during active combustion"
  },
  {
    "id": "CFI-RUN-07",
    "investigationId": "cfi",
    "externalRunKey": "PSI-CFI-TR-1111",
    "materialType": "Hydrocarbon Blend",
    "sampleGeometry": "Capillary Wedge",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 28,
      "pressurePsi": 10.2,
      "flowVelocityCmS": 5,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 1.7,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1680,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 70,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 36,
      "flameWidthMm": 25,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 14,
        "flameRadiusMm": 9.3,
        "temperatureK": 1220,
        "sootDensity": 0.4
      },
      {
        "timeSec": 28,
        "flameRadiusMm": 10.6,
        "temperatureK": 1659,
        "sootDensity": 0.4
      },
      {
        "timeSec": 49,
        "flameRadiusMm": 12.55,
        "temperatureK": 1597,
        "sootDensity": 0.4
      },
      {
        "timeSec": 70,
        "flameRadiusMm": 14.5,
        "temperatureK": 1535,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/cfi/run_7.mp4",
    "notes": "Exploration habitat fuel leak capillary propagation"
  },
  {
    "id": "CFI-RUN-08",
    "investigationId": "cfi",
    "externalRunKey": "PSI-CFI-TR-1112",
    "materialType": "n-Heptane Pool",
    "sampleGeometry": "Small Capillary Trench",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 10.2,
      "flowVelocityCmS": 2,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0.75,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1510,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 60,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 21,
      "flameWidthMm": 16,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 12,
        "flameRadiusMm": 9.3,
        "temperatureK": 1107,
        "sootDensity": 0.4
      },
      {
        "timeSec": 24,
        "flameRadiusMm": 10.6,
        "temperatureK": 1492,
        "sootDensity": 0.4
      },
      {
        "timeSec": 42,
        "flameRadiusMm": 12.55,
        "temperatureK": 1437,
        "sootDensity": 0.4
      },
      {
        "timeSec": 60,
        "flameRadiusMm": 14.5,
        "temperatureK": 1383,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/cfi/run_8.mp4",
    "notes": "Reduced pressure capillary wick combustion"
  },
  {
    "id": "ACME CFI-G-RUN-01",
    "investigationId": "acme-cfi-g",
    "externalRunKey": "PSI-ACME CFI-G-TR-1113",
    "materialType": "Methane-Air Co-flow",
    "sampleGeometry": "Circular Fuel Nozzle",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 8,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1850,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 120,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 24,
        "flameRadiusMm": 9.2,
        "temperatureK": 1333,
        "sootDensity": 0.4
      },
      {
        "timeSec": 48,
        "flameRadiusMm": 8.4,
        "temperatureK": 1827,
        "sootDensity": 0.4
      },
      {
        "timeSec": 84,
        "flameRadiusMm": 7.2,
        "temperatureK": 1757,
        "sootDensity": 0.4
      },
      {
        "timeSec": 120,
        "flameRadiusMm": 6,
        "temperatureK": 1687,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/acme-cfi-g/run_1.mp4",
    "notes": "Gas coflow burner establishing non-buoyant laminar flame structure"
  },
  {
    "id": "ACME CFI-G-RUN-02",
    "investigationId": "acme-cfi-g",
    "externalRunKey": "PSI-ACME CFI-G-TR-1114",
    "materialType": "Methane-Air Co-flow",
    "sampleGeometry": "Circular Fuel Nozzle",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 18,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 5,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1720,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 90,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 18,
        "flameRadiusMm": 9.2,
        "temperatureK": 1247,
        "sootDensity": 0.4
      },
      {
        "timeSec": 36,
        "flameRadiusMm": 8.4,
        "temperatureK": 1699,
        "sootDensity": 0.4
      },
      {
        "timeSec": 63,
        "flameRadiusMm": 7.2,
        "temperatureK": 1635,
        "sootDensity": 0.4
      },
      {
        "timeSec": 90,
        "flameRadiusMm": 6,
        "temperatureK": 1571,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/acme-cfi-g/run_2.mp4",
    "notes": "Diluted oxidizer liftoff and reattachment dynamics"
  },
  {
    "id": "ACME CFI-G-RUN-03",
    "investigationId": "acme-cfi-g",
    "externalRunKey": "PSI-ACME CFI-G-TR-1115",
    "materialType": "Ethylene-Air Co-flow",
    "sampleGeometry": "Circular Fuel Nozzle",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 10,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1980,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 110,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 22,
        "flameRadiusMm": 9.2,
        "temperatureK": 1420,
        "sootDensity": 0.4
      },
      {
        "timeSec": 44,
        "flameRadiusMm": 8.4,
        "temperatureK": 1955,
        "sootDensity": 0.4
      },
      {
        "timeSec": 77,
        "flameRadiusMm": 7.2,
        "temperatureK": 1879,
        "sootDensity": 0.4
      },
      {
        "timeSec": 110,
        "flameRadiusMm": 6,
        "temperatureK": 1804,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/acme-cfi-g/run_3.mp4",
    "notes": "High soot yield gaseous fuel yielding circular orange luminous mantle"
  },
  {
    "id": "ACME CFI-G-RUN-04",
    "investigationId": "acme-cfi-g",
    "externalRunKey": "PSI-ACME CFI-G-TR-1116",
    "materialType": "Ethylene-Air Co-flow",
    "sampleGeometry": "Circular Fuel Nozzle",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 25,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 12,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 2090,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 130,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 26,
        "flameRadiusMm": 9.2,
        "temperatureK": 1493,
        "sootDensity": 0.4
      },
      {
        "timeSec": 52,
        "flameRadiusMm": 8.4,
        "temperatureK": 2063,
        "sootDensity": 0.4
      },
      {
        "timeSec": 91,
        "flameRadiusMm": 7.2,
        "temperatureK": 1983,
        "sootDensity": 0.4
      },
      {
        "timeSec": 130,
        "flameRadiusMm": 6,
        "temperatureK": 1902,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/acme-cfi-g/run_4.mp4",
    "notes": "Enhanced soot volume fraction measured via 2D laser extinction"
  },
  {
    "id": "ACME CFI-G-RUN-05",
    "investigationId": "acme-cfi-g",
    "externalRunKey": "PSI-ACME CFI-G-TR-1117",
    "materialType": "Propane-Air Co-flow",
    "sampleGeometry": "Circular Fuel Nozzle",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 6,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1890,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 100,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 20,
        "flameRadiusMm": 9.2,
        "temperatureK": 1360,
        "sootDensity": 0.4
      },
      {
        "timeSec": 40,
        "flameRadiusMm": 8.4,
        "temperatureK": 1866,
        "sootDensity": 0.4
      },
      {
        "timeSec": 70,
        "flameRadiusMm": 7.2,
        "temperatureK": 1795,
        "sootDensity": 0.4
      },
      {
        "timeSec": 100,
        "flameRadiusMm": 6,
        "temperatureK": 1723,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/acme-cfi-g/run_5.mp4",
    "notes": "Hydrocarbon fuel comparing terrestrial and microgravity smoke points"
  },
  {
    "id": "ACME CFI-G-RUN-06",
    "investigationId": "acme-cfi-g",
    "externalRunKey": "PSI-ACME CFI-G-TR-1118",
    "materialType": "Methane / N2 Dilution",
    "sampleGeometry": "Circular Fuel Nozzle",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 4,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1660,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 80,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 16,
        "flameRadiusMm": 9.2,
        "temperatureK": 1207,
        "sootDensity": 0.4
      },
      {
        "timeSec": 32,
        "flameRadiusMm": 8.4,
        "temperatureK": 1640,
        "sootDensity": 0.4
      },
      {
        "timeSec": 56,
        "flameRadiusMm": 7.2,
        "temperatureK": 1578,
        "sootDensity": 0.4
      },
      {
        "timeSec": 80,
        "flameRadiusMm": 6,
        "temperatureK": 1517,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/acme-cfi-g/run_6.mp4",
    "notes": "Thermal diluent lowering flame peak temperature"
  },
  {
    "id": "ACME CFI-G-RUN-07",
    "investigationId": "acme-cfi-g",
    "externalRunKey": "PSI-ACME CFI-G-TR-1119",
    "materialType": "Methane-Air Co-flow",
    "sampleGeometry": "Circular Fuel Nozzle",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 30,
      "pressurePsi": 10.2,
      "flowVelocityCmS": 8,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1990,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 140,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 28,
        "flameRadiusMm": 9.2,
        "temperatureK": 1427,
        "sootDensity": 0.4
      },
      {
        "timeSec": 56,
        "flameRadiusMm": 8.4,
        "temperatureK": 1965,
        "sootDensity": 0.4
      },
      {
        "timeSec": 98,
        "flameRadiusMm": 7.2,
        "temperatureK": 1889,
        "sootDensity": 0.4
      },
      {
        "timeSec": 140,
        "flameRadiusMm": 6,
        "temperatureK": 1813,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/acme-cfi-g/run_7.mp4",
    "notes": "Exploration habitat coflow flame validation"
  },
  {
    "id": "ACME CFI-G-RUN-08",
    "investigationId": "acme-cfi-g",
    "externalRunKey": "PSI-ACME CFI-G-TR-1120",
    "materialType": "Ethylene-Air Co-flow",
    "sampleGeometry": "Circular Fuel Nozzle",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 28,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 15,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 2120,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 125,
      "extinctionLimitO2Pct": 15,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 25,
        "flameRadiusMm": 9.2,
        "temperatureK": 1513,
        "sootDensity": 0.4
      },
      {
        "timeSec": 50,
        "flameRadiusMm": 8.4,
        "temperatureK": 2093,
        "sootDensity": 0.4
      },
      {
        "timeSec": 88,
        "flameRadiusMm": 7.18,
        "temperatureK": 2010,
        "sootDensity": 0.4
      },
      {
        "timeSec": 125,
        "flameRadiusMm": 6,
        "temperatureK": 1929,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/acme-cfi-g/run_8.mp4",
    "notes": "High temperature gas diffusion flame structure"
  },
  {
    "id": "ACME BRE-RUN-01",
    "investigationId": "acme-bre",
    "externalRunKey": "PSI-ACME BRE-TR-1121",
    "materialType": "Gaseous Methane Flat Burner",
    "sampleGeometry": "25 mm Sintered Bronze Flat Burner",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 4,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1550,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 140,
      "extinctionLimitO2Pct": 14.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 28,
        "flameRadiusMm": 9.2,
        "temperatureK": 1133,
        "sootDensity": 0.4
      },
      {
        "timeSec": 56,
        "flameRadiusMm": 8.4,
        "temperatureK": 1531,
        "sootDensity": 0.4
      },
      {
        "timeSec": 98,
        "flameRadiusMm": 7.2,
        "temperatureK": 1475,
        "sootDensity": 0.4
      },
      {
        "timeSec": 140,
        "flameRadiusMm": 6,
        "temperatureK": 1419,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/acme-bre/run_1.mp4",
    "notes": "Simulates condensed fuel burning rate without solid pyrolysis complications"
  },
  {
    "id": "ACME BRE-RUN-02",
    "investigationId": "acme-bre",
    "externalRunKey": "PSI-ACME BRE-TR-1122",
    "materialType": "Gaseous Methane Flat Burner",
    "sampleGeometry": "25 mm Sintered Bronze Flat Burner",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 17,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 2,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1380,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 80,
      "extinctionLimitO2Pct": 14.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 16,
        "flameRadiusMm": 9.2,
        "temperatureK": 1020,
        "sootDensity": 0.4
      },
      {
        "timeSec": 32,
        "flameRadiusMm": 8.4,
        "temperatureK": 1364,
        "sootDensity": 0.4
      },
      {
        "timeSec": 56,
        "flameRadiusMm": 7.2,
        "temperatureK": 1315,
        "sootDensity": 0.4
      },
      {
        "timeSec": 80,
        "flameRadiusMm": 6,
        "temperatureK": 1267,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/acme-bre/run_2.mp4",
    "notes": "Simulated PMMA burning at low-speed opposed ventilation"
  },
  {
    "id": "ACME BRE-RUN-03",
    "investigationId": "acme-bre",
    "externalRunKey": "PSI-ACME BRE-TR-1123",
    "materialType": "Gaseous Ethylene Burner",
    "sampleGeometry": "25 mm Flat Burner",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 6,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1680,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 150,
      "extinctionLimitO2Pct": 14.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 30,
        "flameRadiusMm": 9.2,
        "temperatureK": 1220,
        "sootDensity": 0.4
      },
      {
        "timeSec": 60,
        "flameRadiusMm": 8.4,
        "temperatureK": 1659,
        "sootDensity": 0.4
      },
      {
        "timeSec": 105,
        "flameRadiusMm": 7.2,
        "temperatureK": 1597,
        "sootDensity": 0.4
      },
      {
        "timeSec": 150,
        "flameRadiusMm": 6,
        "temperatureK": 1535,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/acme-bre/run_3.mp4",
    "notes": "Emulating sooting polymer vaporization and heat feedback"
  },
  {
    "id": "ACME BRE-RUN-04",
    "investigationId": "acme-bre",
    "externalRunKey": "PSI-ACME BRE-TR-1124",
    "materialType": "Gaseous Methane Flat Burner",
    "sampleGeometry": "50 mm Large Flat Burner",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 5,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1520,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 180,
      "extinctionLimitO2Pct": 14.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 36,
        "flameRadiusMm": 9.2,
        "temperatureK": 1113,
        "sootDensity": 0.4
      },
      {
        "timeSec": 72,
        "flameRadiusMm": 8.4,
        "temperatureK": 1502,
        "sootDensity": 0.4
      },
      {
        "timeSec": 126,
        "flameRadiusMm": 7.2,
        "temperatureK": 1447,
        "sootDensity": 0.4
      },
      {
        "timeSec": 180,
        "flameRadiusMm": 6,
        "temperatureK": 1392,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/acme-bre/run_4.mp4",
    "notes": "Sample scale effects on radiative heat loss to burner surface"
  },
  {
    "id": "ACME BRE-RUN-05",
    "investigationId": "acme-bre",
    "externalRunKey": "PSI-ACME BRE-TR-1125",
    "materialType": "Gaseous Methane Flat Burner",
    "sampleGeometry": "25 mm Flat Burner",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 28,
      "pressurePsi": 10.2,
      "flowVelocityCmS": 8,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1710,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 160,
      "extinctionLimitO2Pct": 14.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 32,
        "flameRadiusMm": 9.2,
        "temperatureK": 1240,
        "sootDensity": 0.4
      },
      {
        "timeSec": 64,
        "flameRadiusMm": 8.4,
        "temperatureK": 1689,
        "sootDensity": 0.4
      },
      {
        "timeSec": 112,
        "flameRadiusMm": 7.2,
        "temperatureK": 1625,
        "sootDensity": 0.4
      },
      {
        "timeSec": 160,
        "flameRadiusMm": 6,
        "temperatureK": 1562,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/acme-bre/run_5.mp4",
    "notes": "Emulating Moon Base exploration conditions over flat burning surface"
  },
  {
    "id": "ACME BRE-RUN-06",
    "investigationId": "acme-bre",
    "externalRunKey": "PSI-ACME BRE-TR-1126",
    "materialType": "Gaseous Methane Flat Burner",
    "sampleGeometry": "25 mm Flat Burner",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 16,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 1,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1290,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 40,
      "extinctionLimitO2Pct": 14.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 8,
        "flameRadiusMm": 9.2,
        "temperatureK": 960,
        "sootDensity": 0.4
      },
      {
        "timeSec": 16,
        "flameRadiusMm": 8.4,
        "temperatureK": 1275,
        "sootDensity": 0.4
      },
      {
        "timeSec": 28,
        "flameRadiusMm": 7.2,
        "temperatureK": 1231,
        "sootDensity": 0.4
      },
      {
        "timeSec": 40,
        "flameRadiusMm": 6,
        "temperatureK": 1186,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/acme-bre/run_6.mp4",
    "notes": "Radiative quenching limit observed when fuel mass flux is constrained"
  },
  {
    "id": "ACME BRE-RUN-07",
    "investigationId": "acme-bre",
    "externalRunKey": "PSI-ACME BRE-TR-1127",
    "materialType": "Gaseous Ethylene Burner",
    "sampleGeometry": "25 mm Flat Burner",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 30,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 10,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1820,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 170,
      "extinctionLimitO2Pct": 14.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 34,
        "flameRadiusMm": 9.2,
        "temperatureK": 1313,
        "sootDensity": 0.4
      },
      {
        "timeSec": 68,
        "flameRadiusMm": 8.4,
        "temperatureK": 1797,
        "sootDensity": 0.4
      },
      {
        "timeSec": 119,
        "flameRadiusMm": 7.2,
        "temperatureK": 1729,
        "sootDensity": 0.4
      },
      {
        "timeSec": 170,
        "flameRadiusMm": 6,
        "temperatureK": 1660,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/acme-bre/run_7.mp4",
    "notes": "High-temperature emulation of flashover conditions"
  },
  {
    "id": "ACME BRE-RUN-08",
    "investigationId": "acme-bre",
    "externalRunKey": "PSI-ACME BRE-TR-1128",
    "materialType": "Gaseous Methane Flat Burner",
    "sampleGeometry": "25 mm Flat Burner",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 12,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1610,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 130,
      "extinctionLimitO2Pct": 14.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 26,
        "flameRadiusMm": 9.2,
        "temperatureK": 1173,
        "sootDensity": 0.4
      },
      {
        "timeSec": 52,
        "flameRadiusMm": 8.4,
        "temperatureK": 1590,
        "sootDensity": 0.4
      },
      {
        "timeSec": 91,
        "flameRadiusMm": 7.2,
        "temperatureK": 1531,
        "sootDensity": 0.4
      },
      {
        "timeSec": 130,
        "flameRadiusMm": 6,
        "temperatureK": 1472,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/acme-bre/run_8.mp4",
    "notes": "High convective flow boundary layer simulation"
  },
  {
    "id": "ACME E-FIELD-RUN-01",
    "investigationId": "acme-e-field",
    "externalRunKey": "PSI-ACME E-FIELD-TR-1129",
    "materialType": "Methane Flame / +2.5 kV Field",
    "sampleGeometry": "Circular Burner with Electrodes",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 6,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1890,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 110,
      "extinctionLimitO2Pct": 18,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 22,
        "flameRadiusMm": 9.2,
        "temperatureK": 1360,
        "sootDensity": 0.4
      },
      {
        "timeSec": 44,
        "flameRadiusMm": 8.4,
        "temperatureK": 1866,
        "sootDensity": 0.4
      },
      {
        "timeSec": 77,
        "flameRadiusMm": 7.2,
        "temperatureK": 1795,
        "sootDensity": 0.4
      },
      {
        "timeSec": 110,
        "flameRadiusMm": 6,
        "temperatureK": 1723,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/acme-e-field/run_1.mp4",
    "notes": "Electric field ion wind induces controlled synthetic buoyancy in 0g"
  },
  {
    "id": "ACME E-FIELD-RUN-02",
    "investigationId": "acme-e-field",
    "externalRunKey": "PSI-ACME E-FIELD-TR-1130",
    "materialType": "Methane Flame / +5.0 kV Field",
    "sampleGeometry": "Circular Burner with Electrodes",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 6,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1940,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 120,
      "extinctionLimitO2Pct": 18,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 24,
        "flameRadiusMm": 9.2,
        "temperatureK": 1393,
        "sootDensity": 0.4
      },
      {
        "timeSec": 48,
        "flameRadiusMm": 8.4,
        "temperatureK": 1915,
        "sootDensity": 0.4
      },
      {
        "timeSec": 84,
        "flameRadiusMm": 7.2,
        "temperatureK": 1842,
        "sootDensity": 0.4
      },
      {
        "timeSec": 120,
        "flameRadiusMm": 6,
        "temperatureK": 1768,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/acme-e-field/run_2.mp4",
    "notes": "Flame elongates into simulated 0.2g to 0.5g partial-gravity shape"
  },
  {
    "id": "ACME E-FIELD-RUN-03",
    "investigationId": "acme-e-field",
    "externalRunKey": "PSI-ACME E-FIELD-TR-1131",
    "materialType": "Ethylene Flame / +3.0 kV Field",
    "sampleGeometry": "Circular Burner with Electrodes",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 8,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 2010,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 100,
      "extinctionLimitO2Pct": 18,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 20,
        "flameRadiusMm": 9.2,
        "temperatureK": 1440,
        "sootDensity": 0.4
      },
      {
        "timeSec": 40,
        "flameRadiusMm": 8.4,
        "temperatureK": 1984,
        "sootDensity": 0.4
      },
      {
        "timeSec": 70,
        "flameRadiusMm": 7.2,
        "temperatureK": 1907,
        "sootDensity": 0.4
      },
      {
        "timeSec": 100,
        "flameRadiusMm": 6,
        "temperatureK": 1830,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/acme-e-field/run_3.mp4",
    "notes": "Soot deposition redirected away from burner rim via electrostatic drift"
  },
  {
    "id": "ACME E-FIELD-RUN-04",
    "investigationId": "acme-e-field",
    "externalRunKey": "PSI-ACME E-FIELD-TR-1132",
    "materialType": "Methane Flame / -2.5 kV Field",
    "sampleGeometry": "Circular Burner with Electrodes",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 6,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1870,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 105,
      "extinctionLimitO2Pct": 18,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 21,
        "flameRadiusMm": 9.2,
        "temperatureK": 1347,
        "sootDensity": 0.4
      },
      {
        "timeSec": 42,
        "flameRadiusMm": 8.4,
        "temperatureK": 1846,
        "sootDensity": 0.4
      },
      {
        "timeSec": 74,
        "flameRadiusMm": 7.18,
        "temperatureK": 1775,
        "sootDensity": 0.4
      },
      {
        "timeSec": 105,
        "flameRadiusMm": 6,
        "temperatureK": 1705,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/acme-e-field/run_4.mp4",
    "notes": "Reversed field polarity alters radical recombination and chemi-ion flux"
  },
  {
    "id": "ACME E-FIELD-RUN-05",
    "investigationId": "acme-e-field",
    "externalRunKey": "PSI-ACME E-FIELD-TR-1133",
    "materialType": "Methane Flame / Variable AC Field",
    "sampleGeometry": "Circular Burner with Electrodes",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 5,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1860,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 90,
      "extinctionLimitO2Pct": 18,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 18,
        "flameRadiusMm": 9.2,
        "temperatureK": 1340,
        "sootDensity": 0.4
      },
      {
        "timeSec": 36,
        "flameRadiusMm": 8.4,
        "temperatureK": 1837,
        "sootDensity": 0.4
      },
      {
        "timeSec": 63,
        "flameRadiusMm": 7.2,
        "temperatureK": 1766,
        "sootDensity": 0.4
      },
      {
        "timeSec": 90,
        "flameRadiusMm": 6,
        "temperatureK": 1696,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/acme-e-field/run_5.mp4",
    "notes": "Oscillating electric field alters flame flicker resonance"
  },
  {
    "id": "ACME E-FIELD-RUN-06",
    "investigationId": "acme-e-field",
    "externalRunKey": "PSI-ACME E-FIELD-TR-1134",
    "materialType": "Ethylene Flame / +5.0 kV Field",
    "sampleGeometry": "Circular Burner with Electrodes",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 25,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 10,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 2080,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 130,
      "extinctionLimitO2Pct": 18,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 26,
        "flameRadiusMm": 9.2,
        "temperatureK": 1487,
        "sootDensity": 0.4
      },
      {
        "timeSec": 52,
        "flameRadiusMm": 8.4,
        "temperatureK": 2053,
        "sootDensity": 0.4
      },
      {
        "timeSec": 91,
        "flameRadiusMm": 7.2,
        "temperatureK": 1973,
        "sootDensity": 0.4
      },
      {
        "timeSec": 130,
        "flameRadiusMm": 6,
        "temperatureK": 1893,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/acme-e-field/run_6.mp4",
    "notes": "Electrostatic soot suppression demonstrated in microgravity"
  },
  {
    "id": "ACME E-FIELD-RUN-07",
    "investigationId": "acme-e-field",
    "externalRunKey": "PSI-ACME E-FIELD-TR-1135",
    "materialType": "Methane Flame / 0 kV Field (Baseline)",
    "sampleGeometry": "Circular Burner with Electrodes",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 6,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1820,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 100,
      "extinctionLimitO2Pct": 18,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 20,
        "flameRadiusMm": 9.2,
        "temperatureK": 1313,
        "sootDensity": 0.4
      },
      {
        "timeSec": 40,
        "flameRadiusMm": 8.4,
        "temperatureK": 1797,
        "sootDensity": 0.4
      },
      {
        "timeSec": 70,
        "flameRadiusMm": 7.2,
        "temperatureK": 1729,
        "sootDensity": 0.4
      },
      {
        "timeSec": 100,
        "flameRadiusMm": 6,
        "temperatureK": 1660,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/acme-e-field/run_7.mp4",
    "notes": "Zero-voltage microgravity baseline for E-FIELD comparison"
  },
  {
    "id": "ACME E-FIELD-RUN-08",
    "investigationId": "acme-e-field",
    "externalRunKey": "PSI-ACME E-FIELD-TR-1136",
    "materialType": "Ethylene Flame / +4.0 kV Field",
    "sampleGeometry": "Circular Burner with Electrodes",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 10.5,
      "flowVelocityCmS": 6,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1960,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 115,
      "extinctionLimitO2Pct": 18,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 23,
        "flameRadiusMm": 9.2,
        "temperatureK": 1407,
        "sootDensity": 0.4
      },
      {
        "timeSec": 46,
        "flameRadiusMm": 8.4,
        "temperatureK": 1935,
        "sootDensity": 0.4
      },
      {
        "timeSec": 81,
        "flameRadiusMm": 7.18,
        "temperatureK": 1859,
        "sootDensity": 0.4
      },
      {
        "timeSec": 115,
        "flameRadiusMm": 6,
        "temperatureK": 1786,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/acme-e-field/run_8.mp4",
    "notes": "Synthetic gravity scaling under reduced exploration pressure"
  },
  {
    "id": "SPICE-RUN-01",
    "investigationId": "spice",
    "externalRunKey": "PSI-SPICE-TR-1137",
    "materialType": "Ethylene / Nitrogen Co-flow",
    "sampleGeometry": "Coflow Laminar Burner",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 5,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1920,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 95,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 19,
        "flameRadiusMm": 9.2,
        "temperatureK": 1380,
        "sootDensity": 0.4
      },
      {
        "timeSec": 38,
        "flameRadiusMm": 8.4,
        "temperatureK": 1896,
        "sootDensity": 0.4
      },
      {
        "timeSec": 67,
        "flameRadiusMm": 7.18,
        "temperatureK": 1822,
        "sootDensity": 0.4
      },
      {
        "timeSec": 95,
        "flameRadiusMm": 6,
        "temperatureK": 1750,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/spice/run_1.mp4",
    "notes": "Smoke point threshold in 0g requires 2x higher fuel flow than 1g"
  },
  {
    "id": "SPICE-RUN-02",
    "investigationId": "spice",
    "externalRunKey": "PSI-SPICE-TR-1138",
    "materialType": "Ethylene / Nitrogen Co-flow",
    "sampleGeometry": "Coflow Laminar Burner",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 10,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1990,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 110,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 22,
        "flameRadiusMm": 9.2,
        "temperatureK": 1427,
        "sootDensity": 0.4
      },
      {
        "timeSec": 44,
        "flameRadiusMm": 8.4,
        "temperatureK": 1965,
        "sootDensity": 0.4
      },
      {
        "timeSec": 77,
        "flameRadiusMm": 7.2,
        "temperatureK": 1889,
        "sootDensity": 0.4
      },
      {
        "timeSec": 110,
        "flameRadiusMm": 6,
        "temperatureK": 1813,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/spice/run_2.mp4",
    "notes": "Soot volume fraction peaks in annular zone surrounding blue flame base"
  },
  {
    "id": "SPICE-RUN-03",
    "investigationId": "spice",
    "externalRunKey": "PSI-SPICE-TR-1139",
    "materialType": "Propane / Nitrogen Co-flow",
    "sampleGeometry": "Coflow Laminar Burner",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 6,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1870,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 85,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 17,
        "flameRadiusMm": 9.2,
        "temperatureK": 1347,
        "sootDensity": 0.4
      },
      {
        "timeSec": 34,
        "flameRadiusMm": 8.4,
        "temperatureK": 1846,
        "sootDensity": 0.4
      },
      {
        "timeSec": 59,
        "flameRadiusMm": 7.22,
        "temperatureK": 1777,
        "sootDensity": 0.4
      },
      {
        "timeSec": 85,
        "flameRadiusMm": 6,
        "temperatureK": 1705,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/spice/run_3.mp4",
    "notes": "Propane smoke point comparison with terrestrial ASTM D1322 lamp"
  },
  {
    "id": "SPICE-RUN-04",
    "investigationId": "spice",
    "externalRunKey": "PSI-SPICE-TR-1140",
    "materialType": "Ethylene / Nitrogen Co-flow",
    "sampleGeometry": "Coflow Laminar Burner",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 26,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 8,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 2050,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 120,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 24,
        "flameRadiusMm": 9.2,
        "temperatureK": 1467,
        "sootDensity": 0.4
      },
      {
        "timeSec": 48,
        "flameRadiusMm": 8.4,
        "temperatureK": 2024,
        "sootDensity": 0.4
      },
      {
        "timeSec": 84,
        "flameRadiusMm": 7.2,
        "temperatureK": 1945,
        "sootDensity": 0.4
      },
      {
        "timeSec": 120,
        "flameRadiusMm": 6,
        "temperatureK": 1866,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/spice/run_4.mp4",
    "notes": "Increased oxidizer O2 suppresses soot emission by accelerating burnout"
  },
  {
    "id": "SPICE-RUN-05",
    "investigationId": "spice",
    "externalRunKey": "PSI-SPICE-TR-1141",
    "materialType": "Methane / Ethylene Blend",
    "sampleGeometry": "Coflow Laminar Burner",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 7,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1910,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 100,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 20,
        "flameRadiusMm": 9.2,
        "temperatureK": 1373,
        "sootDensity": 0.4
      },
      {
        "timeSec": 40,
        "flameRadiusMm": 8.4,
        "temperatureK": 1886,
        "sootDensity": 0.4
      },
      {
        "timeSec": 70,
        "flameRadiusMm": 7.2,
        "temperatureK": 1813,
        "sootDensity": 0.4
      },
      {
        "timeSec": 100,
        "flameRadiusMm": 6,
        "temperatureK": 1741,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/spice/run_5.mp4",
    "notes": "Transition from non-sooting to heavily sooting gas mixture"
  },
  {
    "id": "SPICE-RUN-06",
    "investigationId": "spice",
    "externalRunKey": "PSI-SPICE-TR-1142",
    "materialType": "Ethylene / Nitrogen Co-flow",
    "sampleGeometry": "Coflow Laminar Burner",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 18,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 4,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1780,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 75,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 15,
        "flameRadiusMm": 9.2,
        "temperatureK": 1287,
        "sootDensity": 0.4
      },
      {
        "timeSec": 30,
        "flameRadiusMm": 8.4,
        "temperatureK": 1758,
        "sootDensity": 0.4
      },
      {
        "timeSec": 53,
        "flameRadiusMm": 7.17,
        "temperatureK": 1690,
        "sootDensity": 0.4
      },
      {
        "timeSec": 75,
        "flameRadiusMm": 6,
        "temperatureK": 1625,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/spice/run_6.mp4",
    "notes": "Low oxygen smoke point shift towards tip opening"
  },
  {
    "id": "SPICE-RUN-07",
    "investigationId": "spice",
    "externalRunKey": "PSI-SPICE-TR-1143",
    "materialType": "Ethylene / Nitrogen Co-flow",
    "sampleGeometry": "Coflow Laminar Burner",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 10.2,
      "flowVelocityCmS": 6,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1880,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 90,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 18,
        "flameRadiusMm": 9.2,
        "temperatureK": 1353,
        "sootDensity": 0.4
      },
      {
        "timeSec": 36,
        "flameRadiusMm": 8.4,
        "temperatureK": 1856,
        "sootDensity": 0.4
      },
      {
        "timeSec": 63,
        "flameRadiusMm": 7.2,
        "temperatureK": 1785,
        "sootDensity": 0.4
      },
      {
        "timeSec": 90,
        "flameRadiusMm": 6,
        "temperatureK": 1714,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/spice/run_7.mp4",
    "notes": "Exploration pressure soot yield reduction"
  },
  {
    "id": "SPICE-RUN-08",
    "investigationId": "spice",
    "externalRunKey": "PSI-SPICE-TR-1144",
    "materialType": "Ethylene / Nitrogen Co-flow",
    "sampleGeometry": "Coflow Laminar Burner",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 30,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 12,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 2110,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 130,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 26,
        "flameRadiusMm": 9.2,
        "temperatureK": 1507,
        "sootDensity": 0.4
      },
      {
        "timeSec": 52,
        "flameRadiusMm": 8.4,
        "temperatureK": 2083,
        "sootDensity": 0.4
      },
      {
        "timeSec": 91,
        "flameRadiusMm": 7.2,
        "temperatureK": 2001,
        "sootDensity": 0.4
      },
      {
        "timeSec": 130,
        "flameRadiusMm": 6,
        "temperatureK": 1920,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/spice/run_8.mp4",
    "notes": "High oxidizer soot oxidation dynamics"
  },
  {
    "id": "SLICE-RUN-01",
    "investigationId": "slice",
    "externalRunKey": "PSI-SLICE-TR-1145",
    "materialType": "Methane Flame",
    "sampleGeometry": "Miniature Jet Burner",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 4,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1840,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 80,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 16,
        "flameRadiusMm": 9.2,
        "temperatureK": 1327,
        "sootDensity": 0.4
      },
      {
        "timeSec": 32,
        "flameRadiusMm": 8.4,
        "temperatureK": 1817,
        "sootDensity": 0.4
      },
      {
        "timeSec": 56,
        "flameRadiusMm": 7.2,
        "temperatureK": 1748,
        "sootDensity": 0.4
      },
      {
        "timeSec": 80,
        "flameRadiusMm": 6,
        "temperatureK": 1678,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/slice/run_1.mp4",
    "notes": "Flame liftoff velocity measurements in quiescent and low-speed flow"
  },
  {
    "id": "SLICE-RUN-02",
    "investigationId": "slice",
    "externalRunKey": "PSI-SLICE-TR-1146",
    "materialType": "Ethylene Flame",
    "sampleGeometry": "Miniature Jet Burner",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 6,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1960,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 100,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 20,
        "flameRadiusMm": 9.2,
        "temperatureK": 1407,
        "sootDensity": 0.4
      },
      {
        "timeSec": 40,
        "flameRadiusMm": 8.4,
        "temperatureK": 1935,
        "sootDensity": 0.4
      },
      {
        "timeSec": 70,
        "flameRadiusMm": 7.2,
        "temperatureK": 1860,
        "sootDensity": 0.4
      },
      {
        "timeSec": 100,
        "flameRadiusMm": 6,
        "temperatureK": 1786,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/slice/run_2.mp4",
    "notes": "Liftoff height increases linearly with jet velocity before blowout"
  },
  {
    "id": "SLICE-RUN-03",
    "investigationId": "slice",
    "externalRunKey": "PSI-SLICE-TR-1147",
    "materialType": "Methane Flame",
    "sampleGeometry": "Miniature Jet Burner",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 18,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 3,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1690,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 60,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 12,
        "flameRadiusMm": 9.2,
        "temperatureK": 1227,
        "sootDensity": 0.4
      },
      {
        "timeSec": 24,
        "flameRadiusMm": 8.4,
        "temperatureK": 1669,
        "sootDensity": 0.4
      },
      {
        "timeSec": 42,
        "flameRadiusMm": 7.2,
        "temperatureK": 1607,
        "sootDensity": 0.4
      },
      {
        "timeSec": 60,
        "flameRadiusMm": 6,
        "temperatureK": 1544,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/slice/run_3.mp4",
    "notes": "Blowoff occurs at lower jet velocity under oxygen-depleted air"
  },
  {
    "id": "SLICE-RUN-04",
    "investigationId": "slice",
    "externalRunKey": "PSI-SLICE-TR-1148",
    "materialType": "Methane Flame",
    "sampleGeometry": "Miniature Jet Burner",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 28,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 8,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1980,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 110,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 22,
        "flameRadiusMm": 9.2,
        "temperatureK": 1420,
        "sootDensity": 0.4
      },
      {
        "timeSec": 44,
        "flameRadiusMm": 8.4,
        "temperatureK": 1955,
        "sootDensity": 0.4
      },
      {
        "timeSec": 77,
        "flameRadiusMm": 7.2,
        "temperatureK": 1879,
        "sootDensity": 0.4
      },
      {
        "timeSec": 110,
        "flameRadiusMm": 6,
        "temperatureK": 1804,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/slice/run_4.mp4",
    "notes": "Elevated oxygen anchors flame closer to burner rim"
  },
  {
    "id": "SLICE-RUN-05",
    "investigationId": "slice",
    "externalRunKey": "PSI-SLICE-TR-1149",
    "materialType": "Propane Flame",
    "sampleGeometry": "Miniature Jet Burner",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 5,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1880,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 85,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 17,
        "flameRadiusMm": 9.2,
        "temperatureK": 1353,
        "sootDensity": 0.4
      },
      {
        "timeSec": 34,
        "flameRadiusMm": 8.4,
        "temperatureK": 1856,
        "sootDensity": 0.4
      },
      {
        "timeSec": 59,
        "flameRadiusMm": 7.22,
        "temperatureK": 1787,
        "sootDensity": 0.4
      },
      {
        "timeSec": 85,
        "flameRadiusMm": 6,
        "temperatureK": 1714,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/slice/run_5.mp4",
    "notes": "Multi-fuel jet stability map for space habitat leak detection"
  },
  {
    "id": "SLICE-RUN-06",
    "investigationId": "slice",
    "externalRunKey": "PSI-SLICE-TR-1150",
    "materialType": "Methane Flame",
    "sampleGeometry": "Miniature Jet Burner",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 10.5,
      "flowVelocityCmS": 4,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1810,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 75,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 15,
        "flameRadiusMm": 9.2,
        "temperatureK": 1307,
        "sootDensity": 0.4
      },
      {
        "timeSec": 30,
        "flameRadiusMm": 8.4,
        "temperatureK": 1787,
        "sootDensity": 0.4
      },
      {
        "timeSec": 53,
        "flameRadiusMm": 7.17,
        "temperatureK": 1718,
        "sootDensity": 0.4
      },
      {
        "timeSec": 75,
        "flameRadiusMm": 6,
        "temperatureK": 1651,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/slice/run_6.mp4",
    "notes": "Reduced pressure liftoff stability limit"
  },
  {
    "id": "SLICE-RUN-07",
    "investigationId": "slice",
    "externalRunKey": "PSI-SLICE-TR-1151",
    "materialType": "Ethylene Flame",
    "sampleGeometry": "Miniature Jet Burner",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 25,
      "pressurePsi": 10.5,
      "flowVelocityCmS": 7,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1990,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 105,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 21,
        "flameRadiusMm": 9.2,
        "temperatureK": 1427,
        "sootDensity": 0.4
      },
      {
        "timeSec": 42,
        "flameRadiusMm": 8.4,
        "temperatureK": 1965,
        "sootDensity": 0.4
      },
      {
        "timeSec": 74,
        "flameRadiusMm": 7.18,
        "temperatureK": 1887,
        "sootDensity": 0.4
      },
      {
        "timeSec": 105,
        "flameRadiusMm": 6,
        "temperatureK": 1813,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/slice/run_7.mp4",
    "notes": "Exploration atmosphere jet blowout validation"
  },
  {
    "id": "SLICE-RUN-08",
    "investigationId": "slice",
    "externalRunKey": "PSI-SLICE-TR-1152",
    "materialType": "Methane Flame",
    "sampleGeometry": "Miniature Jet Burner",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 10,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 1860,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 90,
      "extinctionLimitO2Pct": 20.5,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 18,
        "flameRadiusMm": 9.2,
        "temperatureK": 1340,
        "sootDensity": 0.4
      },
      {
        "timeSec": 36,
        "flameRadiusMm": 8.4,
        "temperatureK": 1837,
        "sootDensity": 0.4
      },
      {
        "timeSec": 63,
        "flameRadiusMm": 7.2,
        "temperatureK": 1766,
        "sootDensity": 0.4
      },
      {
        "timeSec": 90,
        "flameRadiusMm": 6,
        "temperatureK": 1696,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/slice/run_8.mp4",
    "notes": "High co-flow liftoff stability boundary"
  },
  {
    "id": "FINE-WATER-MIST-RUN-01",
    "investigationId": "fine-water-mist",
    "externalRunKey": "PSI-FINE-WATER-MIST-TR-1153",
    "materialType": "Polymer Sheet with Water Mist",
    "sampleGeometry": "Duct Sample with Mist Injector",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 10,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0.1,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 850,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 25,
      "extinctionLimitO2Pct": 18,
      "flameLengthMm": 12,
      "flameWidthMm": 9,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 5,
        "flameRadiusMm": 9.3,
        "temperatureK": 667,
        "sootDensity": 0.4
      },
      {
        "timeSec": 10,
        "flameRadiusMm": 10.6,
        "temperatureK": 842,
        "sootDensity": 0.4
      },
      {
        "timeSec": 18,
        "flameRadiusMm": 12.68,
        "temperatureK": 815,
        "sootDensity": 0.4
      },
      {
        "timeSec": 25,
        "flameRadiusMm": 14.5,
        "temperatureK": 792,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/fine-water-mist/run_1.mp4",
    "notes": "Ultra-fine water droplets (<30 µm) rapidly suppress microgravity flame front"
  },
  {
    "id": "FINE-WATER-MIST-RUN-02",
    "investigationId": "fine-water-mist",
    "externalRunKey": "PSI-FINE-WATER-MIST-TR-1154",
    "materialType": "Cotton Fabric with Mist",
    "sampleGeometry": "Fabric Strip with Mist Spray",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 15,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0.05,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 720,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 18,
      "extinctionLimitO2Pct": 18,
      "flameLengthMm": 11,
      "flameWidthMm": 9,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 4,
        "flameRadiusMm": 9.44,
        "temperatureK": 611,
        "sootDensity": 0.4
      },
      {
        "timeSec": 7,
        "flameRadiusMm": 10.53,
        "temperatureK": 714,
        "sootDensity": 0.4
      },
      {
        "timeSec": 13,
        "flameRadiusMm": 12.69,
        "temperatureK": 693,
        "sootDensity": 0.4
      },
      {
        "timeSec": 18,
        "flameRadiusMm": 14.5,
        "temperatureK": 676,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/fine-water-mist/run_2.mp4",
    "notes": "Latent heat of vaporization extracts heat without flooding habitat electronics"
  },
  {
    "id": "FINE-WATER-MIST-RUN-03",
    "investigationId": "fine-water-mist",
    "externalRunKey": "PSI-FINE-WATER-MIST-TR-1155",
    "materialType": "PMMA Rod with Water Mist",
    "sampleGeometry": "Cylindrical Rod",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 25,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 8,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0.12,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 920,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 32,
      "extinctionLimitO2Pct": 18,
      "flameLengthMm": 12,
      "flameWidthMm": 9,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 6,
        "flameRadiusMm": 9.22,
        "temperatureK": 688,
        "sootDensity": 0.4
      },
      {
        "timeSec": 13,
        "flameRadiusMm": 10.64,
        "temperatureK": 910,
        "sootDensity": 0.4
      },
      {
        "timeSec": 22,
        "flameRadiusMm": 12.47,
        "temperatureK": 884,
        "sootDensity": 0.4
      },
      {
        "timeSec": 32,
        "flameRadiusMm": 14.5,
        "temperatureK": 855,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/fine-water-mist/run_3.mp4",
    "notes": "Mist penetration into opposed flow wake terminates pyrolysis"
  },
  {
    "id": "FINE-WATER-MIST-RUN-04",
    "investigationId": "fine-water-mist",
    "externalRunKey": "PSI-FINE-WATER-MIST-TR-1156",
    "materialType": "Methane Gas Burner with Mist",
    "sampleGeometry": "Flat Gas Burner",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 5,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 650,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 15,
      "extinctionLimitO2Pct": 18,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 3,
        "flameRadiusMm": 9.2,
        "temperatureK": 533,
        "sootDensity": 0.4
      },
      {
        "timeSec": 6,
        "flameRadiusMm": 8.4,
        "temperatureK": 645,
        "sootDensity": 0.4
      },
      {
        "timeSec": 11,
        "flameRadiusMm": 7.07,
        "temperatureK": 627,
        "sootDensity": 0.4
      },
      {
        "timeSec": 15,
        "flameRadiusMm": 6,
        "temperatureK": 613,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/fine-water-mist/run_4.mp4",
    "notes": "Gas-phase chemical quenching via steam dilution and thermal ballast"
  },
  {
    "id": "FINE-WATER-MIST-RUN-05",
    "investigationId": "fine-water-mist",
    "externalRunKey": "PSI-FINE-WATER-MIST-TR-1157",
    "materialType": "Cotton Fabric with Mist",
    "sampleGeometry": "Fabric Strip with Mist Spray",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 30,
      "pressurePsi": 10.2,
      "flowVelocityCmS": 10,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0.18,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 980,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 28,
      "extinctionLimitO2Pct": 18,
      "flameLengthMm": 13,
      "flameWidthMm": 10,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 6,
        "flameRadiusMm": 9.39,
        "temperatureK": 786,
        "sootDensity": 0.4
      },
      {
        "timeSec": 11,
        "flameRadiusMm": 10.55,
        "temperatureK": 971,
        "sootDensity": 0.4
      },
      {
        "timeSec": 20,
        "flameRadiusMm": 12.64,
        "temperatureK": 938,
        "sootDensity": 0.4
      },
      {
        "timeSec": 28,
        "flameRadiusMm": 14.5,
        "temperatureK": 909,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/fine-water-mist/run_5.mp4",
    "notes": "Artemis exploration habitat mist suppression efficiency test"
  },
  {
    "id": "FINE-WATER-MIST-RUN-06",
    "investigationId": "fine-water-mist",
    "externalRunKey": "PSI-FINE-WATER-MIST-TR-1158",
    "materialType": "PMMA Sheet with Low-Dose Mist",
    "sampleGeometry": "10 mm Flat Sheet",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 8,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0.35,
      "quenchingDiameterMm": 2.1,
      "peakTempK": 1250,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 45,
      "extinctionLimitO2Pct": 18,
      "flameLengthMm": 15,
      "flameWidthMm": 12,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 8,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 9,
        "flameRadiusMm": 9.3,
        "temperatureK": 933,
        "sootDensity": 0.4
      },
      {
        "timeSec": 18,
        "flameRadiusMm": 10.6,
        "temperatureK": 1236,
        "sootDensity": 0.4
      },
      {
        "timeSec": 31,
        "flameRadiusMm": 12.48,
        "temperatureK": 1195,
        "sootDensity": 0.4
      },
      {
        "timeSec": 45,
        "flameRadiusMm": 14.5,
        "temperatureK": 1150,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/fine-water-mist/run_6.mp4",
    "notes": "Sub-critical water droplet mass flux: slow flame retardation"
  },
  {
    "id": "FINE-WATER-MIST-RUN-07",
    "investigationId": "fine-water-mist",
    "externalRunKey": "PSI-FINE-WATER-MIST-TR-1159",
    "materialType": "Polymer Cable Insulation with Mist",
    "sampleGeometry": "Insulated Cable Rake",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 12,
      "radiantFluxKWPerM2": 0,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 610,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 14,
      "extinctionLimitO2Pct": 18,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 3,
        "flameRadiusMm": 9.14,
        "temperatureK": 521,
        "sootDensity": 0.4
      },
      {
        "timeSec": 6,
        "flameRadiusMm": 8.29,
        "temperatureK": 604,
        "sootDensity": 0.4
      },
      {
        "timeSec": 10,
        "flameRadiusMm": 7.14,
        "temperatureK": 591,
        "sootDensity": 0.4
      },
      {
        "timeSec": 14,
        "flameRadiusMm": 6,
        "temperatureK": 577,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/fine-water-mist/run_7.mp4",
    "notes": "Rapid extinguishment of electrical fire simulation"
  },
  {
    "id": "FINE-WATER-MIST-RUN-08",
    "investigationId": "fine-water-mist",
    "externalRunKey": "PSI-FINE-WATER-MIST-TR-1160",
    "materialType": "PMMA Sheet with Water Mist",
    "sampleGeometry": "10 mm Flat Sheet",
    "gravity": 0,
    "conditions": {
      "oxygenPct": 21,
      "pressurePsi": 14.7,
      "flowVelocityCmS": 5,
      "radiantFluxKWPerM2": 10,
      "ambientTempK": 295.15,
      "gravityG": 0
    },
    "measurements": {
      "flameSpreadRateMmS": 0,
      "quenchingDiameterMm": 3.5,
      "peakTempK": 580,
      "sootVolumeFraction": 0.35,
      "burnDurationSec": 20,
      "extinctionLimitO2Pct": 18,
      "flameLengthMm": 8,
      "flameWidthMm": 8,
      "coolFlameObserved": false
    },
    "telemetrySeries": [
      {
        "timeSec": 0,
        "flameRadiusMm": 10,
        "temperatureK": 300,
        "sootDensity": 0.4
      },
      {
        "timeSec": 4,
        "flameRadiusMm": 9.2,
        "temperatureK": 487,
        "sootDensity": 0.4
      },
      {
        "timeSec": 8,
        "flameRadiusMm": 8.4,
        "temperatureK": 576,
        "sootDensity": 0.4
      },
      {
        "timeSec": 14,
        "flameRadiusMm": 7.2,
        "temperatureK": 563,
        "sootDensity": 0.4
      },
      {
        "timeSec": 20,
        "flameRadiusMm": 6,
        "temperatureK": 551,
        "sootDensity": 0.4
      }
    ],
    "dataStatus": "Verified",
    "videoAssetUrl": "https://psi.nasa.gov/assets/video/fine-water-mist/run_8.mp4",
    "notes": "Complete suppression under quiescent conditions"
  }
];

export const TEST_RUNS_BY_ID: Record<string, TestRun> = TEST_RUNS.reduce(
  (acc, item) => {
    acc[item.id] = item;
    return acc;
  },
  {} as Record<string, TestRun>
);

export const TEST_RUNS_BY_INVESTIGATION: Record<string, TestRun[]> = TEST_RUNS.reduce(
  (acc, item) => {
    if (!acc[item.investigationId]) {
      acc[item.investigationId] = [];
    }
    acc[item.investigationId].push(item);
    return acc;
  },
  {} as Record<string, TestRun[]>
);
