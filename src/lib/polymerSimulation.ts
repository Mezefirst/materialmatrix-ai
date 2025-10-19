import { Polymer, PolymerComposition, MaterialProperties, Monomer, ThermalProperties } from './types'

export const predictPolymerProperties = async (
  monomers: Monomer[],
  composition: PolymerComposition
): Promise<MaterialProperties & { thermal: ThermalProperties }> => {
  await new Promise(resolve => setTimeout(resolve, 1500))

  const totalMoleFraction = composition.monomers.reduce((sum, m) => sum + m.moleFraction, 0)
  
  let avgGlassTransition = 0
  let avgReactivity = 0
  let totalMolWeight = 0

  composition.monomers.forEach(unit => {
    const monomer = monomers.find(m => m.id === unit.monomerId)
    if (monomer) {
      const fraction = unit.moleFraction / totalMoleFraction
      avgGlassTransition += (monomer.properties.glassTransitionTemp || 0) * fraction
      avgReactivity += monomer.reactivity * fraction
      totalMolWeight += monomer.molecularWeight * fraction
    }
  })

  const architectureModifier = getArchitectureModifier(composition.architecture)
  const crosslinkingBonus = (composition.crosslinking || 0) * 0.5

  const tensileStrength = 20 + (avgReactivity * 80) + crosslinkingBonus * 30
  const elasticity = Math.max(0.5, 10 - (avgGlassTransition / 20) - crosslinkingBonus * 2)
  const hardness = 30 + (avgGlassTransition / 3) + crosslinkingBonus * 20
  const density = 0.9 + (totalMolWeight / 500) + crosslinkingBonus * 0.2

  const hasFluorine = monomers.some(m => m.composition.F)
  const hasAromatic = monomers.some(m => m.functionalGroups.includes('aromatic'))
  const hasCarboxyl = monomers.some(m => m.functionalGroups.includes('carboxyl'))

  const conductivity = hasFluorine ? 1e-16 : hasAromatic ? 1e-12 : 1e-14
  const dielectricConstant = hasFluorine ? 2.1 : hasAromatic ? 3.5 : 2.8

  const corrosionResistance = hasFluorine ? 9.5 : hasCarboxyl ? 5.0 : 7.0
  const stability = 7.0 + crosslinkingBonus * 2 + (hasAromatic ? 1.5 : 0)
  const oxidationResistance = 6.0 + (hasFluorine ? 3.0 : 0) + crosslinkingBonus

  const thermalConductivity = 0.1 + (hasAromatic ? 0.15 : 0) + crosslinkingBonus * 0.05
  const decompositionTemp = 200 + avgGlassTransition + (hasAromatic ? 100 : 0) + crosslinkingBonus * 50
  const meltingTemp = composition.architecture === 'network' ? undefined : avgGlassTransition + 100

  return {
    mechanical: {
      tensileStrength: tensileStrength * architectureModifier.strength,
      yieldStrength: tensileStrength * 0.7 * architectureModifier.strength,
      elasticity: elasticity * architectureModifier.elasticity,
      hardness: hardness * architectureModifier.hardness,
      density: density,
      toughness: (tensileStrength * elasticity * 0.1) * architectureModifier.toughness
    },
    electrical: {
      conductivity: conductivity,
      resistivity: 1 / conductivity,
      dielectricConstant: dielectricConstant,
      bandGap: 5.0
    },
    chemical: {
      corrosionResistance: Math.min(10, corrosionResistance),
      reactivity: 10 - avgReactivity * 10,
      stability: Math.min(10, stability),
      oxidationResistance: Math.min(10, oxidationResistance)
    },
    thermal: {
      glassTransitionTemp: avgGlassTransition,
      meltingTemp: meltingTemp,
      decompositionTemp: decompositionTemp,
      thermalConductivity: thermalConductivity,
      heatCapacity: 1.2 + (totalMolWeight / 1000)
    },
    confidence: 0.75 + (Math.random() * 0.15)
  }
}

const getArchitectureModifier = (architecture: string) => {
  switch (architecture) {
    case 'linear':
      return { strength: 1.0, elasticity: 1.2, hardness: 0.9, toughness: 1.1 }
    case 'branched':
      return { strength: 0.85, elasticity: 1.4, hardness: 0.8, toughness: 1.0 }
    case 'star':
      return { strength: 0.9, elasticity: 1.3, hardness: 0.85, toughness: 1.05 }
    case 'comb':
      return { strength: 0.8, elasticity: 1.5, hardness: 0.75, toughness: 0.95 }
    case 'dendritic':
      return { strength: 1.1, elasticity: 0.8, hardness: 1.2, toughness: 1.15 }
    case 'network':
      return { strength: 1.3, elasticity: 0.6, hardness: 1.5, toughness: 1.2 }
    default:
      return { strength: 1.0, elasticity: 1.0, hardness: 1.0, toughness: 1.0 }
  }
}

export const calculatePolymerComposition = (monomers: { monomer: Monomer; fraction: number }[]) => {
  const totalComposition: { [element: string]: number } = {}
  
  monomers.forEach(({ monomer, fraction }) => {
    Object.entries(monomer.composition).forEach(([element, percent]) => {
      const contribution = (percent / 100) * fraction
      totalComposition[element] = (totalComposition[element] || 0) + contribution
    })
  })

  const total = Object.values(totalComposition).reduce((sum, val) => sum + val, 0)
  Object.keys(totalComposition).forEach(element => {
    totalComposition[element] = (totalComposition[element] / total) * 100
  })

  return totalComposition
}

export const suggestPolymerizationMethod = (monomers: Monomer[]): string => {
  const polyTypes = monomers.flatMap(m => m.properties.polymerizationType)
  
  if (polyTypes.includes('radical')) return 'free-radical'
  if (polyTypes.includes('ring-opening')) return 'ring-opening'
  if (polyTypes.includes('ionic')) return 'anionic'
  if (polyTypes.includes('step-growth')) return 'step-growth'
  
  return 'free-radical'
}

export const validateMonomerCompatibility = (monomers: Monomer[]): { 
  compatible: boolean
  issues: string[] 
} => {
  const issues: string[] = []
  
  if (monomers.length < 1) {
    issues.push('At least one monomer is required')
    return { compatible: false, issues }
  }

  if (monomers.length > 5) {
    issues.push('Maximum 5 monomers recommended for stable polymerization')
  }

  const polyTypes = monomers.map(m => m.properties.polymerizationType)
  const hasCommonType = polyTypes[0].some(type =>
    polyTypes.every(types => types.includes(type))
  )

  if (!hasCommonType && monomers.length > 1) {
    issues.push('Selected monomers may not co-polymerize effectively - incompatible polymerization mechanisms')
  }

  const highToxicity = monomers.filter(m => m.properties.toxicity === 'high')
  if (highToxicity.length > 0) {
    issues.push(`Warning: Contains highly toxic monomer(s): ${highToxicity.map(m => m.name).join(', ')}`)
  }

  return {
    compatible: issues.length === 0 || issues.every(i => i.startsWith('Warning')),
    issues
  }
}
