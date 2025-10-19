import { useState } from 'react'
import { MaterialProperties, Composition } from '@/lib/types'
import { generateRecommendations, MaterialRecommendation } from '@/lib/recommendations'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { Lightbulb, Sparkle, TrendUp, ArrowRight, CheckCircle, Leaf, CurrencyDollar } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface RecommendationPanelProps {
  targetProperties?: Partial<MaterialProperties>
  currentComposition?: Composition
  onApplyRecommendation: (composition: Composition) => void
}

export function RecommendationPanel({ 
  targetProperties, 
  currentComposition,
  onApplyRecommendation 
}: RecommendationPanelProps) {
  const [recommendations, setRecommendations] = useState<MaterialRecommendation[]>([])
  const [loading, setLoading] = useState(false)

  const handleGetRecommendations = async () => {
    setLoading(true)
    try {
      const results = await generateRecommendations(targetProperties, currentComposition)
      setRecommendations(results)
      toast.success(`Generated ${results.length} recommendations`)
    } catch (error) {
      toast.error('Failed to generate recommendations')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleApply = (composition: Composition, name: string) => {
    onApplyRecommendation(composition)
    toast.success(`Applied ${name}`)
  }

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Lightbulb size={24} className="text-accent" weight="fill" />
            AI Recommendations
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Get intelligent suggestions for material compositions
          </p>
        </div>
      </div>

      {!loading && recommendations.length === 0 && (
        <Alert>
          <Sparkle className="h-4 w-4" />
          <AlertDescription>
            {targetProperties 
              ? 'Get AI-powered suggestions to optimize your material composition for the simulated properties.'
              : 'Simulate properties first, then get recommendations for improvements.'}
          </AlertDescription>
        </Alert>
      )}

      <Button 
        onClick={handleGetRecommendations}
        disabled={loading || !targetProperties}
        className="w-full gap-2"
        variant="outline"
      >
        <Sparkle size={18} weight={loading ? 'fill' : 'regular'} />
        {loading ? 'Generating Recommendations...' : 'Get Recommendations'}
      </Button>

      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-4 space-y-3">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
            </Card>
          ))}
        </div>
      )}

      {!loading && recommendations.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <TrendUp size={18} className="text-success" />
            <span>{recommendations.length} Recommendations Found</span>
          </div>

          {recommendations.map((rec, index) => (
            <Card 
              key={index} 
              className="p-5 space-y-4 hover:shadow-md transition-shadow border-l-4"
              style={{ 
                borderLeftColor: rec.impact === 'high' 
                  ? 'oklch(0.58 0.13 185)' 
                  : rec.impact === 'medium' 
                  ? 'oklch(0.60 0.21 295)' 
                  : 'oklch(0.50 0.01 260)' 
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={rec.impact === 'high' ? 'default' : 'secondary'}>
                      {rec.impact} impact
                    </Badge>
                    <Badge variant="outline">
                      {rec.category}
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-base mb-1">{rec.name}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {rec.rationale}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-xs font-medium text-muted-foreground mb-2">
                    Suggested Composition
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(rec.composition).map(([symbol, percent]) => (
                      <Badge key={symbol} variant="secondary" className="font-mono">
                        {symbol} {percent.toFixed(1)}%
                      </Badge>
                    ))}
                  </div>
                </div>

                {rec.expectedImprovements.length > 0 && (
                  <div>
                    <div className="text-xs font-medium text-muted-foreground mb-2">
                      Expected Improvements
                    </div>
                    <div className="space-y-1.5">
                      {rec.expectedImprovements.map((improvement, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle 
                            size={16} 
                            className="text-success shrink-0 mt-0.5" 
                            weight="fill" 
                          />
                          <span className="text-muted-foreground leading-snug">{improvement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {rec.tradeoffs && rec.tradeoffs.length > 0 && (
                  <Alert variant="default" className="bg-muted/50">
                    <AlertDescription className="text-xs">
                      <span className="font-medium">Trade-offs: </span>
                      {rec.tradeoffs.join(', ')}
                    </AlertDescription>
                  </Alert>
                )}

                {(rec.sustainabilityImpact || rec.costImpact) && (
                  <div className="flex flex-wrap gap-2">
                    {rec.sustainabilityImpact && (
                      <Badge variant="outline" className="gap-1.5 bg-success/5 border-success/20">
                        <Leaf size={14} className="text-success" />
                        <span className="text-xs">{rec.sustainabilityImpact}</span>
                      </Badge>
                    )}
                    {rec.costImpact && (
                      <Badge variant="outline" className="gap-1.5 bg-accent/5 border-accent/20">
                        <CurrencyDollar size={14} className="text-accent" />
                        <span className="text-xs">{rec.costImpact}</span>
                      </Badge>
                    )}
                  </div>
                )}
              </div>

              <Button
                onClick={() => handleApply(rec.composition, rec.name)}
                className="w-full gap-2"
                variant="outline"
              >
                Apply This Composition
                <ArrowRight size={16} />
              </Button>
            </Card>
          ))}
        </div>
      )}
    </Card>
  )
}
