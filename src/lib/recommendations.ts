import { Composition, MaterialProperties } from './types'

export interface MaterialRecommendation {
  name: string
  composition: Composition
  category: string
  rationale: string
  expectedImprovements: string[]
  tradeoffs?: string[]
  impact: 'high' | 'medium' | 'low'
}

export async function generateRecommendations(
  targetProperties?: Partial<MaterialProperties>,
  currentComposition?: Composition
): Promise<MaterialRecommendation[]> {
  const currentCompStr = currentComposition 
    ? Object.entries(currentComposition)
        .map(([symbol, percent]) => `${symbol}: ${percent.toFixed(1)}%`)
        .join(', ')
    : 'None (starting from scratch)'

  const propertiesStr = targetProperties 
    ? JSON.stringify(targetProperties, null, 2)
    : 'No specific targets'

  const promptText = `You are a materials science expert providing intelligent recommendations for material composition improvements.

Current Composition: ${currentCompStr}

${targetProperties ? `Target/Simulated Properties:\n${propertiesStr}` : 'No properties simulated yet'}

Based on the current composition and target properties, provide 3-5 specific, actionable recommendations for modifying the material composition to achieve better properties.

Each recommendation should:
1. Suggest a concrete composition change (adding/removing/adjusting elements)
2. Explain the scientific rationale (why this change helps)
3. List expected improvements (specific property changes)
4. Note any trade-offs (what might get worse)
5. Categorize the impact as high/medium/low

Consider:
- Alloying effects (solid solution strengthening, precipitation hardening)
- Electronic structure changes (band gap engineering, conductivity)
- Grain refinement and microstructure
- Corrosion resistance mechanisms
- Cost and availability of elements
- Processing feasibility

Return ONLY a valid JSON object with a "recommendations" property containing an array (no additional text):
{
  "recommendations": [
    {
      "name": "Descriptive name for the recommendation",
      "composition": {"symbol": percent, ...},
      "category": "strength enhancement|conductivity|corrosion resistance|cost optimization|weight reduction|thermal stability|etc",
      "rationale": "Detailed explanation of why this composition change works, including materials science principles",
      "expectedImprovements": [
        "Specific property improvement 1",
        "Specific property improvement 2",
        "Specific property improvement 3"
      ],
      "tradeoffs": [
        "Potential downside 1",
        "Potential downside 2"
      ],
      "impact": "high|medium|low"
    }
  ]
}`

  const response = await window.spark.llm(promptText, 'gpt-4o', true)
  const data = JSON.parse(response) as { recommendations: MaterialRecommendation[] }
  
  return data.recommendations
}

export interface PropertyTargetSuggestion {
  propertyName: string
  targetValue: number
  unit: string
  suggestedElements: string[]
  reasoning: string
}

export async function suggestCompositionForTarget(
  propertyTarget: {
    propertyType: 'mechanical' | 'electrical' | 'chemical'
    propertyName: string
    targetValue: number
    unit: string
  }
): Promise<MaterialRecommendation[]> {
  const promptText = `You are a materials science expert helping users achieve specific property targets.

Target Property: ${propertyTarget.propertyType} - ${propertyTarget.propertyName}
Target Value: ${propertyTarget.targetValue} ${propertyTarget.unit}

Suggest 3 different material compositions that could achieve or exceed this target property value.

For each suggestion:
1. Provide a complete composition (elements with percentages summing to 100%)
2. Explain why this composition achieves the target
3. List the key material science principles at play
4. Note any processing requirements
5. Mention trade-offs

Return ONLY a valid JSON object with a "recommendations" property containing an array (no additional text):
{
  "recommendations": [
    {
      "name": "Material name",
      "composition": {"symbol": percent, ...},
      "category": "alloy|composite|ceramic|semiconductor|polymer",
      "rationale": "Why this composition achieves the target property",
      "expectedImprovements": [
        "Key property 1",
        "Key property 2"
      ],
      "tradeoffs": [
        "Potential limitation 1"
      ],
      "impact": "high|medium|low"
    }
  ]
}`

  const response = await window.spark.llm(promptText, 'gpt-4o', true)
  const data = JSON.parse(response) as { recommendations: MaterialRecommendation[] }
  
  return data.recommendations
}

export interface CompositionModification {
  type: 'add' | 'remove' | 'increase' | 'decrease'
  element: string
  amount: number
  reason: string
  expectedEffect: string
}

export async function analyzeCompositionIssues(
  composition: Composition,
  properties: MaterialProperties
): Promise<{
  issues: string[]
  suggestions: CompositionModification[]
}> {
  const compStr = Object.entries(composition)
    .map(([symbol, percent]) => `${symbol}: ${percent.toFixed(1)}%`)
    .join(', ')

  const propsStr = JSON.stringify(properties, null, 2)

  const promptText = `You are a materials science expert analyzing material compositions for potential issues and improvements.

Composition: ${compStr}

Predicted Properties:
${propsStr}

Analyze this material and identify:
1. Any composition issues (incompatible elements, poor ratios, etc.)
2. Specific modifications to improve properties
3. Quick wins for performance enhancements

Return ONLY a valid JSON object (no additional text):
{
  "issues": [
    "Issue description 1",
    "Issue description 2"
  ],
  "suggestions": [
    {
      "type": "add|remove|increase|decrease",
      "element": "Element symbol",
      "amount": number (percentage points),
      "reason": "Why this change helps",
      "expectedEffect": "What property improves"
    }
  ]
}`

  const response = await window.spark.llm(promptText, 'gpt-4o-mini', true)
  const data = JSON.parse(response)
  
  return data
}
