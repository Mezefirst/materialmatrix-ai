import { Monomer, MonomerCategory, FunctionalGroup, PolymerizationType } from './types'

export const COMMON_MONOMERS: Monomer[] = [
  {
    id: 'ethylene',
    name: 'Ethylene',
    structure: 'C₂H₄',
    smiles: 'C=C',
    functionalGroups: ['vinyl'],
    molecularWeight: 28.05,
    reactivity: 0.85,
    category: 'vinyl',
    composition: { C: 85.7, H: 14.3 },
    properties: {
      polymerizationType: ['addition', 'radical'],
      glassTransitionTemp: -125,
      reactivityIndex: 0.85,
      toxicity: 'low'
    }
  },
  {
    id: 'propylene',
    name: 'Propylene',
    structure: 'C₃H₆',
    smiles: 'CC=C',
    functionalGroups: ['vinyl'],
    molecularWeight: 42.08,
    reactivity: 0.82,
    category: 'vinyl',
    composition: { C: 85.7, H: 14.3 },
    properties: {
      polymerizationType: ['addition', 'radical', 'ionic'],
      glassTransitionTemp: -20,
      reactivityIndex: 0.82,
      toxicity: 'low'
    }
  },
  {
    id: 'styrene',
    name: 'Styrene',
    structure: 'C₈H₈',
    smiles: 'C=CC1=CC=CC=C1',
    functionalGroups: ['vinyl', 'aromatic'],
    molecularWeight: 104.15,
    reactivity: 0.78,
    category: 'styrenic',
    composition: { C: 92.3, H: 7.7 },
    properties: {
      polymerizationType: ['addition', 'radical'],
      glassTransitionTemp: 100,
      reactivityIndex: 0.78,
      toxicity: 'moderate'
    }
  },
  {
    id: 'vinyl-chloride',
    name: 'Vinyl Chloride',
    structure: 'C₂H₃Cl',
    smiles: 'C=CCl',
    functionalGroups: ['vinyl'],
    molecularWeight: 62.50,
    reactivity: 0.75,
    category: 'vinyl',
    composition: { C: 38.4, H: 4.8, Cl: 56.8 },
    properties: {
      polymerizationType: ['addition', 'radical'],
      glassTransitionTemp: 81,
      reactivityIndex: 0.75,
      toxicity: 'high'
    }
  },
  {
    id: 'methyl-methacrylate',
    name: 'Methyl Methacrylate',
    structure: 'C₅H₈O₂',
    smiles: 'C=C(C)C(=O)OC',
    functionalGroups: ['vinyl', 'ester'],
    molecularWeight: 100.12,
    reactivity: 0.88,
    category: 'methacrylate',
    composition: { C: 59.98, H: 8.05, O: 31.97 },
    properties: {
      polymerizationType: ['addition', 'radical'],
      glassTransitionTemp: 105,
      reactivityIndex: 0.88,
      toxicity: 'moderate'
    }
  },
  {
    id: 'butadiene',
    name: '1,3-Butadiene',
    structure: 'C₄H₆',
    smiles: 'C=CC=C',
    functionalGroups: ['vinyl'],
    molecularWeight: 54.09,
    reactivity: 0.92,
    category: 'diene',
    composition: { C: 88.9, H: 11.1 },
    properties: {
      polymerizationType: ['addition', 'radical'],
      glassTransitionTemp: -102,
      reactivityIndex: 0.92,
      toxicity: 'moderate'
    }
  },
  {
    id: 'isoprene',
    name: 'Isoprene',
    structure: 'C₅H₈',
    smiles: 'CC(=C)C=C',
    functionalGroups: ['vinyl'],
    molecularWeight: 68.12,
    reactivity: 0.89,
    category: 'diene',
    composition: { C: 88.2, H: 11.8 },
    properties: {
      polymerizationType: ['addition', 'radical'],
      glassTransitionTemp: -70,
      reactivityIndex: 0.89,
      toxicity: 'moderate'
    }
  },
  {
    id: 'acrylic-acid',
    name: 'Acrylic Acid',
    structure: 'C₃H₄O₂',
    smiles: 'C=CC(=O)O',
    functionalGroups: ['vinyl', 'carboxyl'],
    molecularWeight: 72.06,
    reactivity: 0.86,
    category: 'acrylic',
    composition: { C: 50.0, H: 5.6, O: 44.4 },
    properties: {
      polymerizationType: ['addition', 'radical'],
      glassTransitionTemp: 106,
      reactivityIndex: 0.86,
      toxicity: 'moderate'
    }
  },
  {
    id: 'acrylonitrile',
    name: 'Acrylonitrile',
    structure: 'C₃H₃N',
    smiles: 'C=CC#N',
    functionalGroups: ['vinyl'],
    molecularWeight: 53.06,
    reactivity: 0.84,
    category: 'acrylic',
    composition: { C: 67.9, H: 5.7, N: 26.4 },
    properties: {
      polymerizationType: ['addition', 'radical'],
      glassTransitionTemp: 97,
      reactivityIndex: 0.84,
      toxicity: 'high'
    }
  },
  {
    id: 'vinyl-acetate',
    name: 'Vinyl Acetate',
    structure: 'C₄H₆O₂',
    smiles: 'C=COC(=O)C',
    functionalGroups: ['vinyl', 'ester'],
    molecularWeight: 86.09,
    reactivity: 0.73,
    category: 'vinyl',
    composition: { C: 55.8, H: 7.0, O: 37.2 },
    properties: {
      polymerizationType: ['addition', 'radical'],
      glassTransitionTemp: 28,
      reactivityIndex: 0.73,
      toxicity: 'moderate'
    }
  },
  {
    id: 'tetrafluoroethylene',
    name: 'Tetrafluoroethylene',
    structure: 'C₂F₄',
    smiles: 'FC(F)=C(F)F',
    functionalGroups: ['vinyl'],
    molecularWeight: 100.02,
    reactivity: 0.95,
    category: 'vinyl',
    composition: { C: 24.0, F: 76.0 },
    properties: {
      polymerizationType: ['addition', 'radical'],
      glassTransitionTemp: -97,
      reactivityIndex: 0.95,
      toxicity: 'low'
    }
  },
  {
    id: 'caprolactam',
    name: 'ε-Caprolactam',
    structure: 'C₆H₁₁NO',
    smiles: 'O=C1CCCCCN1',
    functionalGroups: ['amide'],
    molecularWeight: 113.16,
    reactivity: 0.70,
    category: 'amide',
    composition: { C: 63.7, H: 9.8, N: 12.4, O: 14.1 },
    properties: {
      polymerizationType: ['ring-opening', 'step-growth'],
      glassTransitionTemp: 60,
      reactivityIndex: 0.70,
      toxicity: 'low'
    }
  },
  {
    id: 'ethylene-glycol',
    name: 'Ethylene Glycol',
    structure: 'C₂H₆O₂',
    smiles: 'OCCO',
    functionalGroups: ['hydroxyl'],
    molecularWeight: 62.07,
    reactivity: 0.68,
    category: 'ether',
    composition: { C: 38.7, H: 9.7, O: 51.6 },
    properties: {
      polymerizationType: ['step-growth', 'condensation'],
      glassTransitionTemp: -67,
      reactivityIndex: 0.68,
      toxicity: 'high'
    }
  },
  {
    id: 'terephthalic-acid',
    name: 'Terephthalic Acid',
    structure: 'C₈H₆O₄',
    smiles: 'O=C(O)C1=CC=C(C(=O)O)C=C1',
    functionalGroups: ['carboxyl', 'aromatic'],
    molecularWeight: 166.13,
    reactivity: 0.65,
    category: 'ester',
    composition: { C: 57.8, H: 3.6, O: 38.6 },
    properties: {
      polymerizationType: ['step-growth', 'condensation'],
      glassTransitionTemp: 80,
      reactivityIndex: 0.65,
      toxicity: 'low'
    }
  },
  {
    id: 'bisphenol-a',
    name: 'Bisphenol A',
    structure: 'C₁₅H₁₆O₂',
    smiles: 'CC(C)(C1=CC=C(O)C=C1)C2=CC=C(O)C=C2',
    functionalGroups: ['hydroxyl', 'aromatic'],
    molecularWeight: 228.29,
    reactivity: 0.62,
    category: 'epoxy',
    composition: { C: 78.9, H: 7.1, O: 14.0 },
    properties: {
      polymerizationType: ['step-growth', 'condensation'],
      glassTransitionTemp: 155,
      reactivityIndex: 0.62,
      toxicity: 'moderate'
    }
  },
  {
    id: 'epichlorohydrin',
    name: 'Epichlorohydrin',
    structure: 'C₃H₅ClO',
    smiles: 'C1CO1CCl',
    functionalGroups: ['epoxide'],
    molecularWeight: 92.52,
    reactivity: 0.87,
    category: 'epoxy',
    composition: { C: 38.9, H: 5.4, Cl: 38.3, O: 17.3 },
    properties: {
      polymerizationType: ['ring-opening', 'step-growth'],
      glassTransitionTemp: -22,
      reactivityIndex: 0.87,
      toxicity: 'high'
    }
  },
  {
    id: 'dimethylsiloxane',
    name: 'Dimethylsiloxane',
    structure: 'C₂H₈OSi₂',
    smiles: 'C[Si](C)O[Si](C)C',
    functionalGroups: ['ether'],
    molecularWeight: 148.23,
    reactivity: 0.71,
    category: 'siloxane',
    composition: { C: 32.4, H: 10.9, O: 21.6, Si: 35.1 },
    properties: {
      polymerizationType: ['ring-opening', 'condensation'],
      glassTransitionTemp: -125,
      reactivityIndex: 0.71,
      toxicity: 'low'
    }
  },
  {
    id: 'toluene-diisocyanate',
    name: 'Toluene Diisocyanate',
    structure: 'C₉H₆N₂O₂',
    smiles: 'CC1=C(C=C(C=C1)N=C=O)N=C=O',
    functionalGroups: ['isocyanate', 'aromatic'],
    molecularWeight: 174.16,
    reactivity: 0.93,
    category: 'urethane',
    composition: { C: 62.1, H: 3.5, N: 16.1, O: 18.4 },
    properties: {
      polymerizationType: ['step-growth', 'addition'],
      glassTransitionTemp: -60,
      reactivityIndex: 0.93,
      toxicity: 'high'
    }
  }
]

export const getMonomersByCategory = (category: MonomerCategory): Monomer[] => {
  return COMMON_MONOMERS.filter(m => m.category === category)
}

export const getMonomerById = (id: string): Monomer | undefined => {
  return COMMON_MONOMERS.find(m => m.id === id)
}

export const searchMonomers = (query: string): Monomer[] => {
  const lowerQuery = query.toLowerCase()
  return COMMON_MONOMERS.filter(m => 
    m.name.toLowerCase().includes(lowerQuery) ||
    m.structure.toLowerCase().includes(lowerQuery) ||
    m.category.toLowerCase().includes(lowerQuery)
  )
}

export const getCompatibleMonomers = (monomer: Monomer): Monomer[] => {
  return COMMON_MONOMERS.filter(m => {
    if (m.id === monomer.id) return false
    
    const hasCommonPolymerization = m.properties.polymerizationType.some(type =>
      monomer.properties.polymerizationType.includes(type)
    )
    
    return hasCommonPolymerization
  })
}
