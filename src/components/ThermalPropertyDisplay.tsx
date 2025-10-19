import { ThermalProperties } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Thermometer, Fire, Snowflake } from '@phosphor-icons/react'

interface ThermalPropertyDisplayProps {
  properties: ThermalProperties
}

export function ThermalPropertyDisplay({ properties }: ThermalPropertyDisplayProps) {
  const formatTemp = (temp?: number) => temp ? `${temp.toFixed(1)}°C` : 'N/A'
  const formatValue = (value?: number, unit?: string) => 
    value ? `${value.toFixed(3)} ${unit || ''}` : 'N/A'

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Thermometer size={24} className="text-primary" weight="fill" />
        <h3 className="text-lg font-semibold">Thermal Properties</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Snowflake size={18} className="text-blue-500" weight="fill" />
              <span className="text-sm font-medium text-muted-foreground">
                Glass Transition Temp (Tg)
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">{formatTemp(properties.glassTransitionTemp)}</span>
              {properties.glassTransitionTemp && (
                <Badge variant={properties.glassTransitionTemp < 25 ? 'secondary' : 'default'}>
                  {properties.glassTransitionTemp < 25 ? 'Elastomeric' : 'Glassy'}
                </Badge>
              )}
            </div>
          </div>

          {properties.meltingTemp && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Fire size={18} className="text-orange-500" weight="fill" />
                <span className="text-sm font-medium text-muted-foreground">
                  Melting Temp (Tm)
                </span>
              </div>
              <div className="text-2xl font-bold">{formatTemp(properties.meltingTemp)}</div>
            </div>
          )}

          {properties.decompositionTemp && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Fire size={18} className="text-red-500" weight="fill" />
                <span className="text-sm font-medium text-muted-foreground">
                  Decomposition Temp (Td)
                </span>
              </div>
              <div className="text-2xl font-bold">{formatTemp(properties.decompositionTemp)}</div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {properties.thermalConductivity !== undefined && (
            <div className="space-y-2">
              <span className="text-sm font-medium text-muted-foreground">
                Thermal Conductivity
              </span>
              <div className="text-lg font-semibold">
                {formatValue(properties.thermalConductivity, 'W/(m·K)')}
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-red-500"
                  style={{ width: `${Math.min((properties.thermalConductivity / 0.5) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}

          {properties.heatCapacity !== undefined && (
            <div className="space-y-2">
              <span className="text-sm font-medium text-muted-foreground">
                Specific Heat Capacity
              </span>
              <div className="text-lg font-semibold">
                {formatValue(properties.heatCapacity, 'J/(g·K)')}
              </div>
            </div>
          )}

          <div className="mt-4 p-3 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground">
              <strong>Tg</strong> marks the transition from rigid to rubbery state.
              <br />
              <strong>Tm</strong> is the crystalline melting point.
              <br />
              <strong>Td</strong> is the thermal degradation onset.
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
