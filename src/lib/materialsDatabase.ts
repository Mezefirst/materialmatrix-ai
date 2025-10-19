import { Material } from './types'

export const materialsDatabase: Material[] = [
  {
    id: 'steel-304',
    name: 'Stainless Steel 304',
    composition: { Fe: 68, Cr: 19, Ni: 10, Mn: 2, Si: 1 },
    category: 'alloy',
    description: 'Austenitic stainless steel with excellent corrosion resistance',
    properties: {
      mechanical: {
        tensileStrength: 515,
        yieldStrength: 205,
        elasticity: 193,
        hardness: 70,
        density: 8.0,
        toughness: 85
      },
      electrical: {
        conductivity: 1.4,
        resistivity: 0.72
      },
      chemical: {
        corrosionResistance: 92,
        reactivity: 25,
        stability: 88,
        oxidationResistance: 90
      },
      confidence: 0.95
    },
    createdAt: Date.now(),
    modifiedAt: Date.now()
  },
  {
    id: 'titanium-6al4v',
    name: 'Ti-6Al-4V',
    composition: { Ti: 90, Al: 6, V: 4 },
    category: 'alloy',
    description: 'Aerospace-grade titanium alloy with high strength-to-weight ratio',
    properties: {
      mechanical: {
        tensileStrength: 950,
        yieldStrength: 880,
        elasticity: 113,
        hardness: 36,
        density: 4.43,
        toughness: 75
      },
      electrical: {
        conductivity: 0.6,
        resistivity: 1.7
      },
      chemical: {
        corrosionResistance: 95,
        reactivity: 20,
        stability: 92,
        oxidationResistance: 88
      },
      confidence: 0.96
    },
    createdAt: Date.now(),
    modifiedAt: Date.now()
  },
  {
    id: 'aluminum-7075',
    name: 'Aluminum 7075',
    composition: { Al: 90, Zn: 5.6, Mg: 2.5, Cu: 1.6 },
    category: 'alloy',
    description: 'High-strength aluminum alloy used in aerospace structures',
    properties: {
      mechanical: {
        tensileStrength: 572,
        yieldStrength: 503,
        elasticity: 71.7,
        hardness: 150,
        density: 2.81,
        toughness: 68
      },
      electrical: {
        conductivity: 33,
        resistivity: 0.052
      },
      chemical: {
        corrosionResistance: 65,
        reactivity: 40,
        stability: 75,
        oxidationResistance: 70
      },
      confidence: 0.94
    },
    createdAt: Date.now(),
    modifiedAt: Date.now()
  },
  {
    id: 'silicon-semiconductor',
    name: 'Pure Silicon',
    composition: { Si: 100 },
    category: 'semiconductor',
    description: 'Elemental semiconductor for electronics',
    properties: {
      mechanical: {
        hardness: 950,
        density: 2.33,
        elasticity: 130
      },
      electrical: {
        conductivity: 0.0001,
        resistivity: 640,
        dielectricConstant: 11.7,
        bandGap: 1.12
      },
      chemical: {
        corrosionResistance: 80,
        reactivity: 30,
        stability: 95,
        oxidationResistance: 85
      },
      confidence: 0.98
    },
    createdAt: Date.now(),
    modifiedAt: Date.now()
  },
  {
    id: 'copper-pure',
    name: 'Pure Copper',
    composition: { Cu: 100 },
    category: 'metal',
    description: 'Highly conductive metal for electrical applications',
    properties: {
      mechanical: {
        tensileStrength: 220,
        yieldStrength: 70,
        elasticity: 130,
        hardness: 50,
        density: 8.96,
        toughness: 60
      },
      electrical: {
        conductivity: 59.6,
        resistivity: 0.0168,
        dielectricConstant: 1
      },
      chemical: {
        corrosionResistance: 70,
        reactivity: 45,
        stability: 80,
        oxidationResistance: 65
      },
      confidence: 0.99
    },
    createdAt: Date.now(),
    modifiedAt: Date.now()
  },
  {
    id: 'carbon-fiber-epoxy',
    name: 'Carbon Fiber Composite',
    composition: { C: 70, H: 20, O: 8, N: 2 },
    category: 'composite',
    description: 'High-performance composite material for lightweight structures',
    properties: {
      mechanical: {
        tensileStrength: 600,
        yieldStrength: 550,
        elasticity: 150,
        hardness: 65,
        density: 1.55,
        toughness: 55
      },
      electrical: {
        conductivity: 0.1,
        resistivity: 10
      },
      chemical: {
        corrosionResistance: 88,
        reactivity: 15,
        stability: 85,
        oxidationResistance: 80
      },
      confidence: 0.91
    },
    createdAt: Date.now(),
    modifiedAt: Date.now()
  },
  {
    id: 'alumina-ceramic',
    name: 'Aluminum Oxide (Alumina)',
    composition: { Al: 52.9, O: 47.1 },
    category: 'ceramic',
    description: 'High-temperature ceramic with excellent hardness',
    properties: {
      mechanical: {
        tensileStrength: 300,
        elasticity: 370,
        hardness: 1500,
        density: 3.95,
        toughness: 30
      },
      electrical: {
        conductivity: 0.00001,
        resistivity: 100000,
        dielectricConstant: 9.8
      },
      chemical: {
        corrosionResistance: 98,
        reactivity: 10,
        stability: 98,
        oxidationResistance: 99
      },
      confidence: 0.97
    },
    createdAt: Date.now(),
    modifiedAt: Date.now()
  },
  {
    id: 'inconel-718',
    name: 'Inconel 718',
    composition: { Ni: 52.5, Cr: 19, Fe: 18.5, Nb: 5, Mo: 3, Ti: 0.9, Al: 0.5 },
    category: 'alloy',
    description: 'Superalloy for extreme temperature applications',
    properties: {
      mechanical: {
        tensileStrength: 1375,
        yieldStrength: 1100,
        elasticity: 200,
        hardness: 40,
        density: 8.19,
        toughness: 90
      },
      electrical: {
        conductivity: 1.2,
        resistivity: 1.25
      },
      chemical: {
        corrosionResistance: 96,
        reactivity: 18,
        stability: 95,
        oxidationResistance: 97
      },
      confidence: 0.93
    },
    createdAt: Date.now(),
    modifiedAt: Date.now()
  },
  {
    id: 'gallium-arsenide',
    name: 'Gallium Arsenide',
    composition: { Ga: 48.2, As: 51.8 },
    category: 'semiconductor',
    description: 'High-speed semiconductor for optoelectronics',
    properties: {
      mechanical: {
        hardness: 750,
        density: 5.32,
        elasticity: 85
      },
      electrical: {
        conductivity: 0.0001,
        resistivity: 10000,
        dielectricConstant: 12.9,
        bandGap: 1.43
      },
      chemical: {
        corrosionResistance: 75,
        reactivity: 35,
        stability: 85,
        oxidationResistance: 70
      },
      confidence: 0.94
    },
    createdAt: Date.now(),
    modifiedAt: Date.now()
  },
  {
    id: 'brass-cartridge',
    name: 'Cartridge Brass',
    composition: { Cu: 70, Zn: 30 },
    category: 'alloy',
    description: 'Ductile copper-zinc alloy for manufacturing',
    properties: {
      mechanical: {
        tensileStrength: 345,
        yieldStrength: 125,
        elasticity: 110,
        hardness: 70,
        density: 8.53,
        toughness: 65
      },
      electrical: {
        conductivity: 28,
        resistivity: 0.062
      },
      chemical: {
        corrosionResistance: 78,
        reactivity: 38,
        stability: 82,
        oxidationResistance: 75
      },
      confidence: 0.95
    },
    createdAt: Date.now(),
    modifiedAt: Date.now()
  }
]
