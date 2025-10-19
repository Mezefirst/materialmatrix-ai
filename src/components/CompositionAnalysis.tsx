import { useState } from 'react'
import { Composition, MaterialProperties } from '@/lib/types'
import { analyzeCompositionIssues, CompositionModification } from '@/lib/recommendations'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { MagnifyingGlass, Warning, Info, TrendUp, Plus, Minus } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface CompositionAnalysisProps {
  composition: Composition
  properties: MaterialProperties
  onApplyModification: (newComposition: Composition) => void
}

export function CompositionAnalysis({ 
  composition, 
  properties,
  onApplyModification 
}: CompositionAnalysisProps) {
  const [loading, setLoading] = useState(false)
  const [issues, setIssues] = useState<string[]>([])
  const [suggestions, setSuggestions] = useState<CompositionModification[]>([])
  const [analyzed, setAnalyzed] = useState(false)

  const handleAnalyze = async () => {
    setLoading(true)
    try {
      const result = await analyzeCompositionIssues(composition, properties)
      setIssues(result.issues)
      setSuggestions(result.suggestions)
      setAnalyzed(true)
      toast.success('Analysis complete')
    } catch (error) {
      toast.error('Analysis failed')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleApplyModification = (modification: CompositionModification) => {
    const newComposition = { ...composition }
    
    if (modification.type === 'add' || modification.type === 'increase') {
      if (newComposition[modification.element]) {
        newComposition[modification.element] += modification.amount
      } else {
        newComposition[modification.element] = modification.amount
      }
    } else if (modification.type === 'decrease') {
      if (newComposition[modification.element]) {
        newComposition[modification.element] = Math.max(0, newComposition[modification.element] - modification.amount)
        if (newComposition[modification.element] === 0) {
          delete newComposition[modification.element]
        }
      }
    } else if (modification.type === 'remove') {
      delete newComposition[modification.element]
    }

    const total = Object.values(newComposition).reduce((a, b) => a + b, 0)
    const normalized: Composition = {}
    for (const [symbol, percent] of Object.entries(newComposition)) {
      normalized[symbol] = (percent / total) * 100
    }

    onApplyModification(normalized)
    toast.success(`Modified ${modification.element}`)
  }

  const getModificationIcon = (type: string) => {
    switch (type) {
      case 'add':
      case 'increase':
        return <Plus size={16} className="text-success" weight="bold" />
      case 'decrease':
      case 'remove':
        return <Minus size={16} className="text-destructive" weight="bold" />
      default:
        return <TrendUp size={16} />
    }
  }

  const getModificationBadgeVariant = (type: string) => {
    if (type === 'add' || type === 'increase') return 'default'
    if (type === 'remove' || type === 'decrease') return 'destructive'
    return 'secondary'
  }

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <MagnifyingGlass size={24} className="text-primary" weight="bold" />
            Composition Analysis
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Identify issues and get targeted improvement suggestions
          </p>
        </div>
      </div>

      <Button 
        onClick={handleAnalyze}
        disabled={loading}
        className="w-full gap-2"
        variant="outline"
      >
        <MagnifyingGlass size={18} />
        {loading ? 'Analyzing...' : analyzed ? 'Refresh Analysis' : 'Analyze Composition'}
      </Button>

      {analyzed && (
        <div className="space-y-4">
          {issues.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-medium flex items-center gap-2">
                <Warning size={18} className="text-destructive" />
                Identified Issues
              </div>
              {issues.map((issue, index) => (
                <Alert key={index} variant="destructive">
                  <Info className="h-4 w-4" />
                  <AlertDescription className="text-sm">{issue}</AlertDescription>
                </Alert>
              ))}
            </div>
          )}

          {issues.length === 0 && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                No major issues detected with this composition
              </AlertDescription>
            </Alert>
          )}

          {suggestions.length > 0 && (
            <div className="space-y-3">
              <div className="text-sm font-medium flex items-center gap-2">
                <TrendUp size={18} className="text-success" />
                Quick Improvements
              </div>
              {suggestions.map((suggestion, index) => (
                <Card 
                  key={index} 
                  className="p-4 space-y-3 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {getModificationIcon(suggestion.type)}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant={getModificationBadgeVariant(suggestion.type)}>
                          {suggestion.type} {suggestion.element}
                        </Badge>
                        {suggestion.amount > 0 && (
                          <span className="text-sm text-muted-foreground font-mono">
                            {suggestion.type === 'add' || suggestion.type === 'increase' ? '+' : '−'}
                            {suggestion.amount.toFixed(1)}%
                          </span>
                        )}
                      </div>
                      <div className="text-sm">
                        <div className="font-medium text-foreground mb-1">
                          {suggestion.reason}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          Expected: {suggestion.expectedEffect}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleApplyModification(suggestion)}
                        className="w-full"
                      >
                        Apply This Change
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </Card>
  )
}
