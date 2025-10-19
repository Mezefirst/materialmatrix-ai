import { Element } from './types'

export const periodicTableData: Element[] = [
  { symbol: 'H', name: 'Hydrogen', atomicNumber: 1, atomicMass: 1.008, category: 'nonmetal', group: 1, period: 1, electronegativity: 2.20, meltingPoint: 14, boilingPoint: 20 },
  { symbol: 'He', name: 'Helium', atomicNumber: 2, atomicMass: 4.003, category: 'noble-gas', group: 18, period: 1, meltingPoint: 1, boilingPoint: 4 },
  
  { symbol: 'Li', name: 'Lithium', atomicNumber: 3, atomicMass: 6.94, category: 'alkali-metal', group: 1, period: 2, electronegativity: 0.98, meltingPoint: 454, boilingPoint: 1615 },
  { symbol: 'Be', name: 'Beryllium', atomicNumber: 4, atomicMass: 9.012, category: 'alkaline-earth-metal', group: 2, period: 2, electronegativity: 1.57, meltingPoint: 1560, boilingPoint: 2742 },
  { symbol: 'B', name: 'Boron', atomicNumber: 5, atomicMass: 10.81, category: 'metalloid', group: 13, period: 2, electronegativity: 2.04, meltingPoint: 2349, boilingPoint: 4200 },
  { symbol: 'C', name: 'Carbon', atomicNumber: 6, atomicMass: 12.01, category: 'nonmetal', group: 14, period: 2, electronegativity: 2.55, meltingPoint: 3823, boilingPoint: 4098 },
  { symbol: 'N', name: 'Nitrogen', atomicNumber: 7, atomicMass: 14.01, category: 'nonmetal', group: 15, period: 2, electronegativity: 3.04, meltingPoint: 63, boilingPoint: 77 },
  { symbol: 'O', name: 'Oxygen', atomicNumber: 8, atomicMass: 16.00, category: 'nonmetal', group: 16, period: 2, electronegativity: 3.44, meltingPoint: 54, boilingPoint: 90 },
  { symbol: 'F', name: 'Fluorine', atomicNumber: 9, atomicMass: 19.00, category: 'halogen', group: 17, period: 2, electronegativity: 3.98, meltingPoint: 53, boilingPoint: 85 },
  { symbol: 'Ne', name: 'Neon', atomicNumber: 10, atomicMass: 20.18, category: 'noble-gas', group: 18, period: 2, meltingPoint: 25, boilingPoint: 27 },
  
  { symbol: 'Na', name: 'Sodium', atomicNumber: 11, atomicMass: 22.99, category: 'alkali-metal', group: 1, period: 3, electronegativity: 0.93, meltingPoint: 371, boilingPoint: 1156 },
  { symbol: 'Mg', name: 'Magnesium', atomicNumber: 12, atomicMass: 24.31, category: 'alkaline-earth-metal', group: 2, period: 3, electronegativity: 1.31, meltingPoint: 923, boilingPoint: 1363 },
  { symbol: 'Al', name: 'Aluminum', atomicNumber: 13, atomicMass: 26.98, category: 'post-transition-metal', group: 13, period: 3, electronegativity: 1.61, meltingPoint: 933, boilingPoint: 2792 },
  { symbol: 'Si', name: 'Silicon', atomicNumber: 14, atomicMass: 28.09, category: 'metalloid', group: 14, period: 3, electronegativity: 1.90, meltingPoint: 1687, boilingPoint: 3538 },
  { symbol: 'P', name: 'Phosphorus', atomicNumber: 15, atomicMass: 30.97, category: 'nonmetal', group: 15, period: 3, electronegativity: 2.19, meltingPoint: 317, boilingPoint: 550 },
  { symbol: 'S', name: 'Sulfur', atomicNumber: 16, atomicMass: 32.07, category: 'nonmetal', group: 16, period: 3, electronegativity: 2.58, meltingPoint: 388, boilingPoint: 718 },
  { symbol: 'Cl', name: 'Chlorine', atomicNumber: 17, atomicMass: 35.45, category: 'halogen', group: 17, period: 3, electronegativity: 3.16, meltingPoint: 172, boilingPoint: 239 },
  { symbol: 'Ar', name: 'Argon', atomicNumber: 18, atomicMass: 39.95, category: 'noble-gas', group: 18, period: 3, meltingPoint: 84, boilingPoint: 87 },
  
  { symbol: 'K', name: 'Potassium', atomicNumber: 19, atomicMass: 39.10, category: 'alkali-metal', group: 1, period: 4, electronegativity: 0.82, meltingPoint: 336, boilingPoint: 1032 },
  { symbol: 'Ca', name: 'Calcium', atomicNumber: 20, atomicMass: 40.08, category: 'alkaline-earth-metal', group: 2, period: 4, electronegativity: 1.00, meltingPoint: 1115, boilingPoint: 1757 },
  { symbol: 'Sc', name: 'Scandium', atomicNumber: 21, atomicMass: 44.96, category: 'transition-metal', group: 3, period: 4, electronegativity: 1.36, meltingPoint: 1814, boilingPoint: 3109 },
  { symbol: 'Ti', name: 'Titanium', atomicNumber: 22, atomicMass: 47.87, category: 'transition-metal', group: 4, period: 4, electronegativity: 1.54, meltingPoint: 1941, boilingPoint: 3560 },
  { symbol: 'V', name: 'Vanadium', atomicNumber: 23, atomicMass: 50.94, category: 'transition-metal', group: 5, period: 4, electronegativity: 1.63, meltingPoint: 2183, boilingPoint: 3680 },
  { symbol: 'Cr', name: 'Chromium', atomicNumber: 24, atomicMass: 52.00, category: 'transition-metal', group: 6, period: 4, electronegativity: 1.66, meltingPoint: 2180, boilingPoint: 2944 },
  { symbol: 'Mn', name: 'Manganese', atomicNumber: 25, atomicMass: 54.94, category: 'transition-metal', group: 7, period: 4, electronegativity: 1.55, meltingPoint: 1519, boilingPoint: 2334 },
  { symbol: 'Fe', name: 'Iron', atomicNumber: 26, atomicMass: 55.85, category: 'transition-metal', group: 8, period: 4, electronegativity: 1.83, meltingPoint: 1811, boilingPoint: 3134 },
  { symbol: 'Co', name: 'Cobalt', atomicNumber: 27, atomicMass: 58.93, category: 'transition-metal', group: 9, period: 4, electronegativity: 1.88, meltingPoint: 1768, boilingPoint: 3200 },
  { symbol: 'Ni', name: 'Nickel', atomicNumber: 28, atomicMass: 58.69, category: 'transition-metal', group: 10, period: 4, electronegativity: 1.91, meltingPoint: 1728, boilingPoint: 3186 },
  { symbol: 'Cu', name: 'Copper', atomicNumber: 29, atomicMass: 63.55, category: 'transition-metal', group: 11, period: 4, electronegativity: 1.90, meltingPoint: 1358, boilingPoint: 2835 },
  { symbol: 'Zn', name: 'Zinc', atomicNumber: 30, atomicMass: 65.38, category: 'transition-metal', group: 12, period: 4, electronegativity: 1.65, meltingPoint: 693, boilingPoint: 1180 },
  { symbol: 'Ga', name: 'Gallium', atomicNumber: 31, atomicMass: 69.72, category: 'post-transition-metal', group: 13, period: 4, electronegativity: 1.81, meltingPoint: 303, boilingPoint: 2477 },
  { symbol: 'Ge', name: 'Germanium', atomicNumber: 32, atomicMass: 72.63, category: 'metalloid', group: 14, period: 4, electronegativity: 2.01, meltingPoint: 1211, boilingPoint: 3106 },
  { symbol: 'As', name: 'Arsenic', atomicNumber: 33, atomicMass: 74.92, category: 'metalloid', group: 15, period: 4, electronegativity: 2.18, meltingPoint: 1090, boilingPoint: 887 },
  { symbol: 'Se', name: 'Selenium', atomicNumber: 34, atomicMass: 78.97, category: 'nonmetal', group: 16, period: 4, electronegativity: 2.55, meltingPoint: 494, boilingPoint: 958 },
  { symbol: 'Br', name: 'Bromine', atomicNumber: 35, atomicMass: 79.90, category: 'halogen', group: 17, period: 4, electronegativity: 2.96, meltingPoint: 266, boilingPoint: 332 },
  { symbol: 'Kr', name: 'Krypton', atomicNumber: 36, atomicMass: 83.80, category: 'noble-gas', group: 18, period: 4, meltingPoint: 116, boilingPoint: 120 },
  
  { symbol: 'Rb', name: 'Rubidium', atomicNumber: 37, atomicMass: 85.47, category: 'alkali-metal', group: 1, period: 5, electronegativity: 0.82, meltingPoint: 312, boilingPoint: 961 },
  { symbol: 'Sr', name: 'Strontium', atomicNumber: 38, atomicMass: 87.62, category: 'alkaline-earth-metal', group: 2, period: 5, electronegativity: 0.95, meltingPoint: 1050, boilingPoint: 1655 },
  { symbol: 'Y', name: 'Yttrium', atomicNumber: 39, atomicMass: 88.91, category: 'transition-metal', group: 3, period: 5, electronegativity: 1.22, meltingPoint: 1799, boilingPoint: 3609 },
  { symbol: 'Zr', name: 'Zirconium', atomicNumber: 40, atomicMass: 91.22, category: 'transition-metal', group: 4, period: 5, electronegativity: 1.33, meltingPoint: 2128, boilingPoint: 4682 },
  { symbol: 'Nb', name: 'Niobium', atomicNumber: 41, atomicMass: 92.91, category: 'transition-metal', group: 5, period: 5, electronegativity: 1.60, meltingPoint: 2750, boilingPoint: 5017 },
  { symbol: 'Mo', name: 'Molybdenum', atomicNumber: 42, atomicMass: 95.95, category: 'transition-metal', group: 6, period: 5, electronegativity: 2.16, meltingPoint: 2896, boilingPoint: 4912 },
  { symbol: 'Tc', name: 'Technetium', atomicNumber: 43, atomicMass: 98, category: 'transition-metal', group: 7, period: 5, electronegativity: 1.90, meltingPoint: 2430, boilingPoint: 4538 },
  { symbol: 'Ru', name: 'Ruthenium', atomicNumber: 44, atomicMass: 101.07, category: 'transition-metal', group: 8, period: 5, electronegativity: 2.20, meltingPoint: 2607, boilingPoint: 4423 },
  { symbol: 'Rh', name: 'Rhodium', atomicNumber: 45, atomicMass: 102.91, category: 'transition-metal', group: 9, period: 5, electronegativity: 2.28, meltingPoint: 2237, boilingPoint: 3968 },
  { symbol: 'Pd', name: 'Palladium', atomicNumber: 46, atomicMass: 106.42, category: 'transition-metal', group: 10, period: 5, electronegativity: 2.20, meltingPoint: 1828, boilingPoint: 3236 },
  { symbol: 'Ag', name: 'Silver', atomicNumber: 47, atomicMass: 107.87, category: 'transition-metal', group: 11, period: 5, electronegativity: 1.93, meltingPoint: 1235, boilingPoint: 2435 },
  { symbol: 'Cd', name: 'Cadmium', atomicNumber: 48, atomicMass: 112.41, category: 'transition-metal', group: 12, period: 5, electronegativity: 1.69, meltingPoint: 594, boilingPoint: 1040 },
  { symbol: 'In', name: 'Indium', atomicNumber: 49, atomicMass: 114.82, category: 'post-transition-metal', group: 13, period: 5, electronegativity: 1.78, meltingPoint: 430, boilingPoint: 2345 },
  { symbol: 'Sn', name: 'Tin', atomicNumber: 50, atomicMass: 118.71, category: 'post-transition-metal', group: 14, period: 5, electronegativity: 1.96, meltingPoint: 505, boilingPoint: 2875 },
  { symbol: 'Sb', name: 'Antimony', atomicNumber: 51, atomicMass: 121.76, category: 'metalloid', group: 15, period: 5, electronegativity: 2.05, meltingPoint: 904, boilingPoint: 1860 },
  { symbol: 'Te', name: 'Tellurium', atomicNumber: 52, atomicMass: 127.60, category: 'metalloid', group: 16, period: 5, electronegativity: 2.10, meltingPoint: 723, boilingPoint: 1261 },
  { symbol: 'I', name: 'Iodine', atomicNumber: 53, atomicMass: 126.90, category: 'halogen', group: 17, period: 5, electronegativity: 2.66, meltingPoint: 387, boilingPoint: 457 },
  { symbol: 'Xe', name: 'Xenon', atomicNumber: 54, atomicMass: 131.29, category: 'noble-gas', group: 18, period: 5, meltingPoint: 161, boilingPoint: 165 },
  
  { symbol: 'Cs', name: 'Cesium', atomicNumber: 55, atomicMass: 132.91, category: 'alkali-metal', group: 1, period: 6, electronegativity: 0.79, meltingPoint: 302, boilingPoint: 944 },
  { symbol: 'Ba', name: 'Barium', atomicNumber: 56, atomicMass: 137.33, category: 'alkaline-earth-metal', group: 2, period: 6, electronegativity: 0.89, meltingPoint: 1000, boilingPoint: 2170 },
  { symbol: 'Hf', name: 'Hafnium', atomicNumber: 72, atomicMass: 178.49, category: 'transition-metal', group: 4, period: 6, electronegativity: 1.30, meltingPoint: 2506, boilingPoint: 4876 },
  { symbol: 'Ta', name: 'Tantalum', atomicNumber: 73, atomicMass: 180.95, category: 'transition-metal', group: 5, period: 6, electronegativity: 1.50, meltingPoint: 3290, boilingPoint: 5731 },
  { symbol: 'W', name: 'Tungsten', atomicNumber: 74, atomicMass: 183.84, category: 'transition-metal', group: 6, period: 6, electronegativity: 2.36, meltingPoint: 3695, boilingPoint: 5828 },
  { symbol: 'Re', name: 'Rhenium', atomicNumber: 75, atomicMass: 186.21, category: 'transition-metal', group: 7, period: 6, electronegativity: 1.90, meltingPoint: 3459, boilingPoint: 5869 },
  { symbol: 'Os', name: 'Osmium', atomicNumber: 76, atomicMass: 190.23, category: 'transition-metal', group: 8, period: 6, electronegativity: 2.20, meltingPoint: 3306, boilingPoint: 5285 },
  { symbol: 'Ir', name: 'Iridium', atomicNumber: 77, atomicMass: 192.22, category: 'transition-metal', group: 9, period: 6, electronegativity: 2.20, meltingPoint: 2719, boilingPoint: 4701 },
  { symbol: 'Pt', name: 'Platinum', atomicNumber: 78, atomicMass: 195.08, category: 'transition-metal', group: 10, period: 6, electronegativity: 2.28, meltingPoint: 2041, boilingPoint: 4098 },
  { symbol: 'Au', name: 'Gold', atomicNumber: 79, atomicMass: 196.97, category: 'transition-metal', group: 11, period: 6, electronegativity: 2.54, meltingPoint: 1337, boilingPoint: 3129 },
  { symbol: 'Hg', name: 'Mercury', atomicNumber: 80, atomicMass: 200.59, category: 'transition-metal', group: 12, period: 6, electronegativity: 2.00, meltingPoint: 234, boilingPoint: 630 },
  { symbol: 'Tl', name: 'Thallium', atomicNumber: 81, atomicMass: 204.38, category: 'post-transition-metal', group: 13, period: 6, electronegativity: 1.62, meltingPoint: 577, boilingPoint: 1746 },
  { symbol: 'Pb', name: 'Lead', atomicNumber: 82, atomicMass: 207.2, category: 'post-transition-metal', group: 14, period: 6, electronegativity: 2.33, meltingPoint: 601, boilingPoint: 2022 },
  { symbol: 'Bi', name: 'Bismuth', atomicNumber: 83, atomicMass: 208.98, category: 'post-transition-metal', group: 15, period: 6, electronegativity: 2.02, meltingPoint: 544, boilingPoint: 1837 },
]

export const elementsBySymbol = periodicTableData.reduce((acc, element) => {
  acc[element.symbol] = element
  return acc
}, {} as Record<string, Element>)

export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'alkali-metal': 'oklch(0.68 0.20 50)',
    'alkaline-earth-metal': 'oklch(0.72 0.18 70)',
    'transition-metal': 'oklch(0.60 0.15 270)',
    'post-transition-metal': 'oklch(0.65 0.12 200)',
    'metalloid': 'oklch(0.62 0.16 150)',
    'nonmetal': 'oklch(0.70 0.20 120)',
    'halogen': 'oklch(0.68 0.22 180)',
    'noble-gas': 'oklch(0.75 0.18 300)',
    'lanthanide': 'oklch(0.65 0.14 320)',
    'actinide': 'oklch(0.58 0.16 340)',
  }
  return colors[category] || 'oklch(0.60 0.10 260)'
}