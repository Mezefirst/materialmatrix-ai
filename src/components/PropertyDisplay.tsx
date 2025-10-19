import { MaterialProperties } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'

interface PropertyDisplayProps {
  properties: MaterialProperties
}

export function PropertyDisplay({ properties }: PropertyDisplayProps) {
  const { mechanical, electrical, chemical, confidence } = properties

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Predicted Properties</h3>
        {confidence && (
          <Badge variant={confidence > 0.8 ? 'default' : 'secondary'}>
            {(confidence * 100).toFixed(0)}% Confidence
          </Badge>
        )}
      </div>

      <Tabs defaultValue="mechanical" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="mechanical">Mechanical</TabsTrigger>
          <TabsTrigger value="electrical">Electrical</TabsTrigger>
          <TabsTrigger value="chemical">Chemical</TabsTrigger>
        </TabsList>

        <TabsContent value="mechanical" className="space-y-4">
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mechanical.tensileStrength && (
                <PropertyItem
                  label="Tensile Strength"
                  value={mechanical.tensileStrength}
                  unit="MPa"
                  max={2000}
                />
              )}
              {mechanical.yieldStrength && (
                <PropertyItem
                  label="Yield Strength"
                  value={mechanical.yieldStrength}
                  unit="MPa"
                  max={2000}
                />
              )}
              {mechanical.elasticity && (
                <PropertyItem
                  label="Young's Modulus"
                  value={mechanical.elasticity}
                  unit="GPa"
                  max={400}
                />
              )}
              {mechanical.hardness && (
                <PropertyItem
                  label="Hardness"
                  value={mechanical.hardness}
                  unit="HV"
                  max={2000}
                />
              )}
              {mechanical.density && (
                <PropertyItem
                  label="Density"
                  value={mechanical.density}
                  unit="g/cm³"
                  max={20}
                />
              )}
              {mechanical.toughness && (
                <PropertyItem
                  label="Toughness"
                  value={mechanical.toughness}
                  unit="/100"
                  max={100}
                />
              )}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="electrical" className="space-y-4">
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {electrical.conductivity !== undefined && (
                <PropertyItem
                  label="Conductivity"
                  value={electrical.conductivity}
                  unit="MS/m"
                  max={100}
                />
              )}
              {electrical.resistivity !== undefined && (
                <PropertyItem
                  label="Resistivity"
                  value={electrical.resistivity}
                  unit="µΩ·m"
                  max={1000}
                />
              )}
              {electrical.dielectricConstant !== undefined && (
                <PropertyItem
                  label="Dielectric Constant"
                  value={electrical.dielectricConstant}
                  unit=""
                  max={100}
                />
              )}
              {electrical.bandGap !== undefined && (
                <PropertyItem
                  label="Band Gap"
                  value={electrical.bandGap}
                  unit="eV"
                  max={6}
                />
              )}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="chemical" className="space-y-4">
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {chemical.corrosionResistance && (
                <PropertyItem
                  label="Corrosion Resistance"
                  value={chemical.corrosionResistance}
                  unit="/100"
                  max={100}
                />
              )}
              {chemical.reactivity && (
                <PropertyItem
                  label="Reactivity"
                  value={chemical.reactivity}
                  unit="/100"
                  max={100}
                  inverted
                />
              )}
              {chemical.stability && (
                <PropertyItem
                  label="Stability"
                  value={chemical.stability}
                  unit="/100"
                  max={100}
                />
              )}
              {chemical.oxidationResistance && (
                <PropertyItem
                  label="Oxidation Resistance"
                  value={chemical.oxidationResistance}
                  unit="/100"
                  max={100}
                />
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface PropertyItemProps {
  label: string
  value: number
  unit: string
  max: number
  inverted?: boolean
}

function PropertyItem({ label, value, unit, max, inverted }: PropertyItemProps) {
  const percentage = Math.min((value / max) * 100, 100)
  const displayValue = value > 1000 ? value.toExponential(2) : value.toFixed(2)

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <span className="text-lg font-semibold">
          {displayValue} <span className="text-sm text-muted-foreground">{unit}</span>
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
      <div className="text-xs text-muted-foreground text-right">
        {inverted ? 'Lower is better' : percentage.toFixed(0)}%
      </div>
    </div>
  )
}
