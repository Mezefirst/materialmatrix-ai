import { MaterialProperties } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Leaf, CurrencyDollar, Recycle, Plant, Warning } from '@phosphor-icons/react'

interface SustainabilityCostSummaryProps {
  properties: MaterialProperties
}

export function SustainabilityCostSummary({ properties }: SustainabilityCostSummaryProps) {
  const { sustainability, cost } = properties

  if (!sustainability && !cost) {
    return null
  }

  const getSustainabilityLevel = (score?: number): { label: string; variant: 'default' | 'secondary' | 'destructive' } => {
    if (!score) return { label: 'Unknown', variant: 'secondary' }
    if (score >= 70) return { label: 'Excellent', variant: 'default' }
    if (score >= 50) return { label: 'Good', variant: 'secondary' }
    if (score >= 30) return { label: 'Fair', variant: 'secondary' }
    return { label: 'Poor', variant: 'destructive' }
  }

  const getCostLevel = (score?: number): { label: string; variant: 'default' | 'secondary' | 'destructive' } => {
    if (!score) return { label: 'Unknown', variant: 'secondary' }
    if (score <= 30) return { label: 'Low Cost', variant: 'default' }
    if (score <= 50) return { label: 'Moderate', variant: 'secondary' }
    if (score <= 70) return { label: 'High', variant: 'secondary' }
    return { label: 'Very High', variant: 'destructive' }
  }

  const sustainabilityLevel = getSustainabilityLevel(sustainability?.overallScore)
  const costLevel = getCostLevel(cost?.estimatedCost)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {sustainability && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Leaf size={24} className="text-success" weight="fill" />
              </div>
              <div>
                <h4 className="font-semibold">Sustainability Score</h4>
                <p className="text-xs text-muted-foreground">Environmental impact assessment</p>
              </div>
            </div>
            <Badge variant={sustainabilityLevel.variant}>
              {sustainabilityLevel.label}
            </Badge>
          </div>

          {sustainability.overallScore !== undefined && (
            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-muted-foreground">Overall Score</span>
                <span className="text-2xl font-bold">
                  {sustainability.overallScore.toFixed(0)}<span className="text-sm text-muted-foreground">/100</span>
                </span>
              </div>
              <Progress value={sustainability.overallScore} className="h-3" />
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 pt-2 border-t">
            {sustainability.recyclability !== undefined && (
              <div className="flex items-center gap-2">
                <Recycle size={16} className="text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground">Recyclability</div>
                  <div className="font-semibold text-sm">{sustainability.recyclability.toFixed(0)}/100</div>
                </div>
              </div>
            )}
            {sustainability.abundance !== undefined && (
              <div className="flex items-center gap-2">
                <Plant size={16} className="text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground">Abundance</div>
                  <div className="font-semibold text-sm">{sustainability.abundance.toFixed(0)}/100</div>
                </div>
              </div>
            )}
            {sustainability.toxicity !== undefined && (
              <div className="flex items-center gap-2">
                <Warning size={16} className="text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground">Toxicity</div>
                  <div className="font-semibold text-sm">{sustainability.toxicity.toFixed(0)}/100</div>
                </div>
              </div>
            )}
            {sustainability.carbonFootprint !== undefined && (
              <div className="flex items-center gap-2">
                <Leaf size={16} className="text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground">Carbon</div>
                  <div className="font-semibold text-sm">{sustainability.carbonFootprint.toFixed(0)}/100</div>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {cost && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <CurrencyDollar size={24} className="text-accent" weight="fill" />
              </div>
              <div>
                <h4 className="font-semibold">Cost Analysis</h4>
                <p className="text-xs text-muted-foreground">Economic feasibility assessment</p>
              </div>
            </div>
            <Badge variant={costLevel.variant}>
              {costLevel.label}
            </Badge>
          </div>

          {cost.estimatedCost !== undefined && (
            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-muted-foreground">Cost Score</span>
                <span className="text-2xl font-bold">
                  {cost.estimatedCost.toFixed(0)}<span className="text-sm text-muted-foreground">/100</span>
                </span>
              </div>
              <Progress value={cost.estimatedCost} className="h-3" />
              <div className="text-xs text-muted-foreground">Lower score = more cost-effective</div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 pt-2 border-t">
            {cost.costPerKg !== undefined && (
              <div className="flex items-center gap-2">
                <CurrencyDollar size={16} className="text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground">Per Kilogram</div>
                  <div className="font-semibold text-sm">
                    ${cost.costPerKg.toFixed(cost.costPerKg > 100 ? 0 : 2)}
                  </div>
                </div>
              </div>
            )}
            {cost.availability !== undefined && (
              <div className="flex items-center gap-2">
                <Plant size={16} className="text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground">Availability</div>
                  <div className="font-semibold text-sm">{cost.availability.toFixed(0)}/100</div>
                </div>
              </div>
            )}
            {cost.processingCost !== undefined && (
              <div className="flex items-center gap-2">
                <div className="text-xs text-muted-foreground">Processing</div>
                <div className="font-semibold text-sm">{cost.processingCost.toFixed(0)}/100</div>
              </div>
            )}
            {cost.marketStability !== undefined && (
              <div className="flex items-center gap-2">
                <div className="text-xs text-muted-foreground">Stability</div>
                <div className="font-semibold text-sm">{cost.marketStability.toFixed(0)}/100</div>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}
