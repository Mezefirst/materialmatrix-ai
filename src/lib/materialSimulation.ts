import { Composition, MaterialProperties, EnvironmentalConditions, OptimizationObjectives, OptimizationResult, Material } from './types'
import { elementsBySymbol } from './periodicTable'

export async function predictMaterialProperties(
  composition: Composition,
  conditions: EnvironmentalConditions
): Promise<MaterialProperties> {
  const compositionStr = Object.entries(composition)
    .map(([symbol, percent]) => `${symbol}: ${percent.toFixed(1)}%`)
    .join(', ')

  const promptText = `You are a materials science AI that predicts material properties based on composition and environmental conditions.

Given composition: ${compositionStr}
Temperature: ${conditions.temperature}°C
Humidity: ${conditions.humidity}%
Pressure: ${conditions.pressure} atm

Predict the following properties with realistic values based on materials science principles:

Mechanical Properties:
- Tensile Strength (MPa)
- Yield Strength (MPa)
- Young's Modulus/Elasticity (GPa)
- Hardness (HV)
- Density (g/cm³)
- Toughness (score 0-100)

Electrical Properties:
- Electrical Conductivity (MS/m)
- Resistivity (µΩ·m)
- Dielectric Constant (if applicable)
- Band Gap (eV, for semiconductors)

Chemical Properties:
- Corrosion Resistance (score 0-100)
- Reactivity (score 0-100, lower is less reactive)
- Stability (score 0-100)
- Oxidation Resistance (score 0-100)

Sustainability Metrics:
- Overall Sustainability Score (0-100, higher is better)
- Recyclability (0-100, ease of recycling)
- Carbon Footprint (0-100, lower is better - production emissions)
- Toxicity (0-100, lower is better - environmental/health impact)
- Abundance (0-100, availability in earth's crust)
- Environmental Impact (0-100, lower is better - overall ecological footprint)

Cost Metrics:
- Estimated Cost (0-100, relative cost score, lower is cheaper)
- Cost Per Kg (USD/kg, realistic market price)
- Processing Cost (0-100, complexity and energy requirements)
- Availability (0-100, supply chain reliability)
- Market Stability (0-100, price volatility - higher is more stable)

Consider:
- Rare earth elements (La, Ce, Nd, etc.) are expensive and have moderate environmental impact
- Precious metals (Au, Pt, Ag) are very expensive but recyclable
- Common metals (Fe, Al, Cu) are cheap and relatively sustainable
- Reactive metals (Li, Na, K) have higher processing costs
- Heavy metals (Pb, Hg, Cd) have high toxicity scores

Also provide a confidence score (0-1) for the prediction.

Return ONLY a valid JSON object with this structure (no additional text):
{
  "mechanical": {
    "tensileStrength": number,
    "yieldStrength": number,
    "elasticity": number,
    "hardness": number,
    "density": number,
    "toughness": number
  },
  "electrical": {
    "conductivity": number,
    "resistivity": number,
    "dielectricConstant": number,
    "bandGap": number
  },
  "chemical": {
    "corrosionResistance": number,
    "reactivity": number,
    "stability": number,
    "oxidationResistance": number
  },
  "sustainability": {
    "overallScore": number,
    "recyclability": number,
    "carbonFootprint": number,
    "toxicity": number,
    "abundance": number,
    "environmentalImpact": number
  },
  "cost": {
    "estimatedCost": number,
    "costPerKg": number,
    "processingCost": number,
    "availability": number,
    "marketStability": number
  },
  "confidence": number
}`

  const response = await window.spark.llm(promptText, 'gpt-4o-mini', true)
  const properties = JSON.parse(response) as MaterialProperties
  
  return properties
}

export function calculateCompatibility(composition: Composition): {
  score: number
  warnings: string[]
} {
  const warnings: string[] = []
  let score = 100

  const elements = Object.keys(composition)
  
  if (elements.includes('He') || elements.includes('Ne') || elements.includes('Ar') || 
      elements.includes('Kr') || elements.includes('Xe')) {
    warnings.push('Noble gases typically do not form stable compounds')
    score -= 30
  }

  if (elements.includes('Na') || elements.includes('K') || elements.includes('Li')) {
    if (elements.includes('O') || elements.includes('F') || elements.includes('Cl')) {
      warnings.push('Alkali metals react violently with halogens/oxygen - handle with care')
      score -= 15
    }
  }

  const elementCount = elements.length
  if (elementCount > 10) {
    warnings.push('High-entropy alloys with >10 elements are extremely difficult to synthesize')
    score -= 25
  } else if (elementCount > 7) {
    warnings.push('Complex alloys with >7 elements require advanced processing')
    score -= 10
  }

  let totalPercent = 0
  for (const percent of Object.values(composition)) {
    totalPercent += percent
  }
  if (Math.abs(totalPercent - 100) > 0.1) {
    warnings.push('Composition must sum to 100%')
    score = 0
  }

  return { score: Math.max(0, score), warnings }
}

export async function optimizeMaterial(
  targetProperties: Partial<MaterialProperties>,
  objectives: OptimizationObjectives,
  constraints: { maxCost?: number; minSustainability?: number }
): Promise<OptimizationResult[]> {
  const targetStr = JSON.stringify(targetProperties, null, 2)
  const objectivesStr = JSON.stringify(objectives, null, 2)
  const constraintsStr = JSON.stringify(constraints, null, 2)

  const promptText = `You are a materials optimization AI that generates material compositions to meet target properties while balancing multiple objectives.

Target Properties:
${targetStr}

Optimization Objectives (weights 0-100):
${objectivesStr}

Constraints:
${constraintsStr}

Generate 5 different material compositions that could meet these requirements. For each material:
1. Suggest a realistic element composition (must sum to 100%)
2. Predict its properties
3. Calculate how well it meets the objectives
4. Provide a name and category

Consider trade-offs between:
- Cost (rare elements like Pt, Au are expensive; Fe, Al, Cu are cheap)
- Performance (strength, conductivity, etc.)
- Sustainability (recyclability, abundance)
- Availability (common vs rare elements)
- Weight (density)

Return ONLY a valid JSON object with a "results" property containing an array of 5 materials (no additional text):
{
  "results": [
    {
      "material": {
        "id": "string",
        "name": "string",
        "composition": {"symbol": percent},
        "category": "metal|alloy|ceramic|composite|semiconductor",
        "description": "string",
        "properties": {
          "mechanical": {...},
          "electrical": {...},
          "chemical": {...},
          "confidence": number
        },
        "createdAt": number,
        "modifiedAt": number
      },
      "score": number (0-100),
      "tradeoffs": {
        "cost": number (0-100),
        "performance": number (0-100),
        "sustainability": number (0-100),
        "availability": number (0-100),
        "weight": number (0-100, higher is lighter)
      }
    }
  ]
}`

  const response = await window.spark.llm(promptText, 'gpt-4o', true)
  const data = JSON.parse(response) as { results: OptimizationResult[] }
  
  return data.results
}

export function calculateDensity(composition: Composition): number {
  let density = 0
  let totalPercent = 0
  
  for (const [symbol, percent] of Object.entries(composition)) {
    const element = elementsBySymbol[symbol]
    if (element) {
      const atomicDensity = element.atomicMass / 22.4
      density += (percent / 100) * atomicDensity
      totalPercent += percent
    }
  }
  
  return totalPercent > 0 ? density / (totalPercent / 100) : 0
}

export function getProcessingRecommendations(composition: Composition): {
  temperature: number
  pressure: number
  time: number
  atmosphere: string
} {
  const elements = Object.keys(composition)
  let maxMeltingPoint = 0
  
  for (const symbol of elements) {
    const element = elementsBySymbol[symbol]
    if (element?.meltingPoint && element.meltingPoint > maxMeltingPoint) {
      maxMeltingPoint = element.meltingPoint
    }
  }
  
  const hasReactive = elements.some(s => 
    ['Li', 'Na', 'K', 'Mg', 'Ca', 'Al', 'Ti'].includes(s)
  )
  
  return {
    temperature: Math.round(maxMeltingPoint * 0.75),
    pressure: hasReactive ? 0.001 : 1,
    time: 120,
    atmosphere: hasReactive ? 'Inert (Ar/N2)' : 'Air'
  }
}
