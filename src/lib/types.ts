export interface Element {
  symbol: string
  name: string
  atomicNumber: number
  atomicMass: number
  category: ElementCategory
  group?: number
  period: number
  electronegativity?: number
  meltingPoint?: number
  boilingPoint?: number
}

export type ElementCategory = 
  | 'alkali-metal'
  | 'alkaline-earth-metal'
  | 'transition-metal'
  | 'post-transition-metal'
  | 'metalloid'
  | 'nonmetal'
  | 'halogen'
  | 'noble-gas'
  | 'lanthanide'
  | 'actinide'

export interface Composition {
  [symbol: string]: number
}

export interface Material {
  id: string
  name: string
  composition: Composition
  category: MaterialCategory
  properties: MaterialProperties
  processingParams?: ProcessingParameters
  description?: string
  createdAt: number
  modifiedAt: number
}

export type MaterialCategory = 
  | 'metal'
  | 'polymer'
  | 'ceramic'
  | 'composite'
  | 'semiconductor'
  | 'alloy'
  | 'other'

export interface MaterialProperties {
  mechanical: MechanicalProperties
  electrical: ElectricalProperties
  chemical: ChemicalProperties
  confidence?: number
}

export interface MechanicalProperties {
  tensileStrength?: number
  yieldStrength?: number
  elasticity?: number
  hardness?: number
  density?: number
  toughness?: number
}

export interface ElectricalProperties {
  conductivity?: number
  resistivity?: number
  dielectricConstant?: number
  bandGap?: number
}

export interface ChemicalProperties {
  corrosionResistance?: number
  reactivity?: number
  stability?: number
  oxidationResistance?: number
}

export interface ProcessingParameters {
  temperature?: number
  pressure?: number
  time?: number
  atmosphere?: string
}

export interface EnvironmentalConditions {
  temperature: number
  humidity: number
  pressure: number
}

export interface OptimizationObjectives {
  cost: number
  performance: number
  sustainability: number
  availability: number
  weight: number
}

export interface OptimizationResult {
  material: Material
  score: number
  tradeoffs: OptimizationObjectives
}
