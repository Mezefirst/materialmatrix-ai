import { Material, MaterialProperties, ThermalProperties } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { 
  ArrowLeft, 
  Atom, 
  Lightning, 
  Drop, 
  ShieldCheck, 
  CurrencyDollar,
  Leaf,
  ChartBar,
  ThermometerSimple,
  Barbell,
  Flask
} from '@phosphor-icons/react'

interface ResultsPageProps {
  material: Material | null
  composition: { [symbol: string]: number }
  properties: MaterialProperties | null
  thermalProperties: ThermalProperties | null
  materialName: string
  onBack: () => void
}

export function ResultsPage({
  material,
  composition,
  properties,
  thermalProperties,
  materialName,
  onBack
}: ResultsPageProps) {
  if (!properties) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <p className="text-muted-foreground mb-4">No simulation results available</p>
          <Button onClick={onBack}>
            <ArrowLeft size={16} />
            <span className="ml-2">Back to Builder</span>
          </Button>
        </Card>
      </div>
    )
  }

  const displayName = materialName || material?.name || 'Unnamed Material'
  const compositionEntries = Object.entries(composition)

  const getMechanicalScore = () => {
    const mech = properties.mechanical
    const values = [
      mech.tensileStrength ? mech.tensileStrength / 1000 : 0,
      mech.yieldStrength ? mech.yieldStrength / 800 : 0,
      mech.hardness ? mech.hardness / 10 : 0,
      mech.elasticity ? mech.elasticity / 400 : 0
    ].filter(v => v > 0)
    
    if (values.length === 0) return 0
    const avg = values.reduce((a, b) => a + b, 0) / values.length
    return Math.min(100, avg * 100)
  }

  const getElectricalScore = () => {
    const elec = properties.electrical
    if (elec.conductivity) {
      return Math.min(100, (elec.conductivity / 60) * 100)
    }
    if (elec.dielectricConstant) {
      return Math.min(100, (elec.dielectricConstant / 15) * 100)
    }
    return 0
  }

  const getChemicalScore = () => {
    const chem = properties.chemical
    const values = [
      chem.corrosionResistance || 0,
      chem.stability || 0,
      chem.oxidationResistance || 0,
      chem.reactivity ? (100 - chem.reactivity) : 0
    ].filter(v => v > 0)
    
    if (values.length === 0) return 0
    return values.reduce((a, b) => a + b, 0) / values.length
  }

  const getThermalScore = () => {
    if (!thermalProperties) return null
    const values: number[] = []
    
    if (thermalProperties.glassTransitionTemp && thermalProperties.glassTransitionTemp > 0) {
      values.push(Math.min(100, (thermalProperties.glassTransitionTemp / 200) * 100))
    }
    if (thermalProperties.meltingTemp && thermalProperties.meltingTemp > 0) {
      values.push(Math.min(100, (thermalProperties.meltingTemp / 400) * 100))
    }
    if (thermalProperties.decompositionTemp && thermalProperties.decompositionTemp > 0) {
      values.push(Math.min(100, (thermalProperties.decompositionTemp / 500) * 100))
    }
    
    if (values.length === 0) return null
    return values.reduce((a, b) => a + b, 0) / values.length
  }

  const mechanicalScore = getMechanicalScore()
  const electricalScore = getElectricalScore()
  const chemicalScore = getChemicalScore()
  const thermalScore = getThermalScore()

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ArrowLeft size={20} />
              Back to Builder
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Flask size={24} className="text-primary-foreground" weight="fill" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">Analysis Results</h1>
                <p className="text-xs text-muted-foreground">{displayName}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {material?.category && (
                <Badge variant="secondary">{material.category}</Badge>
              )}
              {properties.confidence && (
                <Badge variant="outline">
                  {(properties.confidence * 100).toFixed(0)}% Confidence
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Atom size={24} className="text-primary" />
              Material Composition
            </h2>
            <div className="space-y-3">
              {compositionEntries.length > 0 ? (
                compositionEntries.map(([symbol, percent]) => (
                  <div key={symbol} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{symbol}</span>
                      <span className="text-muted-foreground">{percent.toFixed(2)}%</span>
                    </div>
                    <Progress value={percent} className="h-2" />
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No composition data available</p>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ChartBar size={24} className="text-primary" />
              Overall Performance
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Mechanical</span>
                  <span className="text-muted-foreground">{mechanicalScore.toFixed(0)}%</span>
                </div>
                <Progress value={mechanicalScore} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Electrical</span>
                  <span className="text-muted-foreground">{electricalScore.toFixed(0)}%</span>
                </div>
                <Progress value={electricalScore} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Chemical Stability</span>
                  <span className="text-muted-foreground">{chemicalScore.toFixed(0)}%</span>
                </div>
                <Progress value={chemicalScore} className="h-2" />
              </div>

              {thermalScore !== null && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Thermal Performance</span>
                    <span className="text-muted-foreground">{thermalScore.toFixed(0)}%</span>
                  </div>
                  <Progress value={thermalScore} className="h-2" />
                </div>
              )}
            </div>
          </Card>
        </div>

        {properties.sustainability && properties.cost && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Leaf size={24} className="text-success" />
                Sustainability Analysis
              </h2>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold">
                      {properties.sustainability.overallScore?.toFixed(1) || 'N/A'}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">OVERALL SCORE</span>
                  </div>
                  <Progress 
                    value={properties.sustainability.overallScore || 0} 
                    className="h-2"
                  />
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  {properties.sustainability.recyclability !== undefined && (
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Recyclability</div>
                      <div className="text-lg font-semibold">
                        {properties.sustainability.recyclability.toFixed(0)}%
                      </div>
                    </div>
                  )}
                  
                  {properties.sustainability.carbonFootprint !== undefined && (
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Carbon Footprint</div>
                      <div className="text-lg font-semibold">
                        {properties.sustainability.carbonFootprint.toFixed(1)} kg CO₂
                      </div>
                    </div>
                  )}
                  
                  {properties.sustainability.toxicity !== undefined && (
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Toxicity Level</div>
                      <div className="text-lg font-semibold">
                        {properties.sustainability.toxicity.toFixed(0)}/100
                      </div>
                    </div>
                  )}
                  
                  {properties.sustainability.abundance !== undefined && (
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Resource Abundance</div>
                      <div className="text-lg font-semibold">
                        {properties.sustainability.abundance.toFixed(0)}%
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CurrencyDollar size={24} className="text-accent" />
                Cost Analysis
              </h2>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold">
                      ${properties.cost.estimatedCost?.toFixed(2) || 'N/A'}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">EST. COST/UNIT</span>
                  </div>
                  {properties.cost.availability !== undefined && (
                    <div className="flex items-center gap-2 mt-2">
                      <Progress value={properties.cost.availability} className="h-1.5 flex-1" />
                      <span className="text-xs text-muted-foreground">
                        {properties.cost.availability.toFixed(0)}% Available
                      </span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  {properties.cost.costPerKg !== undefined && (
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Cost per kg</div>
                      <div className="text-lg font-semibold">
                        ${properties.cost.costPerKg.toFixed(2)}
                      </div>
                    </div>
                  )}
                  
                  {properties.cost.processingCost !== undefined && (
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Processing Cost</div>
                      <div className="text-lg font-semibold">
                        ${properties.cost.processingCost.toFixed(2)}
                      </div>
                    </div>
                  )}
                  
                  {properties.cost.marketStability !== undefined && (
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Market Stability</div>
                      <div className="text-lg font-semibold">
                        {properties.cost.marketStability.toFixed(0)}%
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        )}

        <Tabs defaultValue="mechanical" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="mechanical" className="gap-2">
              <Barbell size={18} />
              Mechanical
            </TabsTrigger>
            <TabsTrigger value="electrical" className="gap-2">
              <Lightning size={18} />
              Electrical
            </TabsTrigger>
            <TabsTrigger value="chemical" className="gap-2">
              <Drop size={18} />
              Chemical
            </TabsTrigger>
            {thermalProperties && (
              <TabsTrigger value="thermal" className="gap-2">
                <ThermometerSimple size={18} />
                Thermal
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="mechanical" className="mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Mechanical Properties</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.mechanical.tensileStrength !== undefined && (
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Tensile Strength</div>
                    <div className="text-2xl font-bold">
                      {properties.mechanical.tensileStrength.toFixed(1)} MPa
                    </div>
                    <Progress 
                      value={Math.min(100, (properties.mechanical.tensileStrength / 1000) * 100)} 
                      className="h-2"
                    />
                  </div>
                )}
                
                {properties.mechanical.yieldStrength !== undefined && (
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Yield Strength</div>
                    <div className="text-2xl font-bold">
                      {properties.mechanical.yieldStrength.toFixed(1)} MPa
                    </div>
                    <Progress 
                      value={Math.min(100, (properties.mechanical.yieldStrength / 800) * 100)} 
                      className="h-2"
                    />
                  </div>
                )}
                
                {properties.mechanical.elasticity !== undefined && (
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Elastic Modulus</div>
                    <div className="text-2xl font-bold">
                      {properties.mechanical.elasticity.toFixed(1)} GPa
                    </div>
                    <Progress 
                      value={Math.min(100, (properties.mechanical.elasticity / 400) * 100)} 
                      className="h-2"
                    />
                  </div>
                )}
                
                {properties.mechanical.hardness !== undefined && (
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Hardness (Mohs)</div>
                    <div className="text-2xl font-bold">
                      {properties.mechanical.hardness.toFixed(1)}
                    </div>
                    <Progress 
                      value={Math.min(100, (properties.mechanical.hardness / 10) * 100)} 
                      className="h-2"
                    />
                  </div>
                )}
                
                {properties.mechanical.density !== undefined && (
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Density</div>
                    <div className="text-2xl font-bold">
                      {properties.mechanical.density.toFixed(2)} g/cm³
                    </div>
                  </div>
                )}
                
                {properties.mechanical.toughness !== undefined && (
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Toughness</div>
                    <div className="text-2xl font-bold">
                      {properties.mechanical.toughness.toFixed(1)} MJ/m³
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="electrical" className="mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Electrical Properties</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.electrical.conductivity !== undefined && (
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Electrical Conductivity</div>
                    <div className="text-2xl font-bold">
                      {properties.electrical.conductivity.toFixed(2)} MS/m
                    </div>
                    <Progress 
                      value={Math.min(100, (properties.electrical.conductivity / 60) * 100)} 
                      className="h-2"
                    />
                  </div>
                )}
                
                {properties.electrical.resistivity !== undefined && (
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Resistivity</div>
                    <div className="text-2xl font-bold">
                      {properties.electrical.resistivity.toFixed(2)} µΩ·cm
                    </div>
                  </div>
                )}
                
                {properties.electrical.dielectricConstant !== undefined && (
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Dielectric Constant</div>
                    <div className="text-2xl font-bold">
                      {properties.electrical.dielectricConstant.toFixed(2)}
                    </div>
                    <Progress 
                      value={Math.min(100, (properties.electrical.dielectricConstant / 15) * 100)} 
                      className="h-2"
                    />
                  </div>
                )}
                
                {properties.electrical.bandGap !== undefined && (
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Band Gap</div>
                    <div className="text-2xl font-bold">
                      {properties.electrical.bandGap.toFixed(2)} eV
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="chemical" className="mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Chemical Properties</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.chemical.corrosionResistance !== undefined && (
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Corrosion Resistance</div>
                    <div className="text-2xl font-bold">
                      {properties.chemical.corrosionResistance.toFixed(0)}%
                    </div>
                    <Progress 
                      value={properties.chemical.corrosionResistance} 
                      className="h-2"
                    />
                  </div>
                )}
                
                {properties.chemical.reactivity !== undefined && (
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Reactivity Level</div>
                    <div className="text-2xl font-bold">
                      {properties.chemical.reactivity.toFixed(0)}%
                    </div>
                    <Progress 
                      value={properties.chemical.reactivity} 
                      className="h-2"
                    />
                  </div>
                )}
                
                {properties.chemical.stability !== undefined && (
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Chemical Stability</div>
                    <div className="text-2xl font-bold">
                      {properties.chemical.stability.toFixed(0)}%
                    </div>
                    <Progress 
                      value={properties.chemical.stability} 
                      className="h-2"
                    />
                  </div>
                )}
                
                {properties.chemical.oxidationResistance !== undefined && (
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Oxidation Resistance</div>
                    <div className="text-2xl font-bold">
                      {properties.chemical.oxidationResistance.toFixed(0)}%
                    </div>
                    <Progress 
                      value={properties.chemical.oxidationResistance} 
                      className="h-2"
                    />
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          {thermalProperties && (
            <TabsContent value="thermal" className="mt-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Thermal Properties</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {thermalProperties.glassTransitionTemp !== undefined && (
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Glass Transition Temperature</div>
                      <div className="text-2xl font-bold">
                        {thermalProperties.glassTransitionTemp.toFixed(1)}°C
                      </div>
                    </div>
                  )}
                  
                  {thermalProperties.meltingTemp !== undefined && (
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Melting Temperature</div>
                      <div className="text-2xl font-bold">
                        {thermalProperties.meltingTemp.toFixed(1)}°C
                      </div>
                    </div>
                  )}
                  
                  {thermalProperties.decompositionTemp !== undefined && (
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Decomposition Temperature</div>
                      <div className="text-2xl font-bold">
                        {thermalProperties.decompositionTemp.toFixed(1)}°C
                      </div>
                    </div>
                  )}
                  
                  {thermalProperties.thermalConductivity !== undefined && (
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Thermal Conductivity</div>
                      <div className="text-2xl font-bold">
                        {thermalProperties.thermalConductivity.toFixed(2)} W/(m·K)
                      </div>
                    </div>
                  )}
                  
                  {thermalProperties.heatCapacity !== undefined && (
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Heat Capacity</div>
                      <div className="text-2xl font-bold">
                        {thermalProperties.heatCapacity.toFixed(2)} J/(g·K)
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  )
}
