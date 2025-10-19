import { useState } from 'react'
import { OptimizationObjectives, OptimizationResult, MaterialProperties } from '@/lib/types'
import { optimizeMaterial } from '@/lib/materialSimulation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Sliders, Sparkle, TrendUp } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface OptimizationDialogProps {
  targetProperties?: Partial<MaterialProperties>
  onSelectResult: (result: OptimizationResult) => void
}

export function OptimizationDialog({ targetProperties, onSelectResult }: OptimizationDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<OptimizationResult[]>([])
  const [objectives, setObjectives] = useState<OptimizationObjectives>({
    cost: 50,
    performance: 80,
    sustainability: 60,
    availability: 70,
    weight: 50,
  })

  const handleOptimize = async () => {
    setLoading(true)
    try {
      const optimizedResults = await optimizeMaterial(
        targetProperties || {},
        objectives,
        {}
      )
      setResults(optimizedResults)
      toast.success('Optimization complete!')
    } catch (error) {
      toast.error('Optimization failed. Please try again.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectResult = (result: OptimizationResult) => {
    onSelectResult(result)
    setOpen(false)
    toast.success(`Selected ${result.material.name}`)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="lg" className="gap-2">
          <Sliders size={20} />
          Optimize Material
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkle size={24} className="text-accent" weight="fill" />
            Multi-Objective Optimization
          </DialogTitle>
          <DialogDescription>
            Balance trade-offs between competing objectives to find optimal material solutions
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <h3 className="font-semibold">Optimization Objectives</h3>
            <div className="space-y-4">
              {Object.entries(objectives).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="capitalize">{key}</Label>
                    <span className="text-sm font-medium">{value}</span>
                  </div>
                  <Slider
                    value={[value]}
                    onValueChange={([v]) => setObjectives({ ...objectives, [key]: v })}
                    max={100}
                    step={5}
                  />
                </div>
              ))}
            </div>
            <Button 
              onClick={handleOptimize} 
              disabled={loading}
              className="w-full mt-4"
            >
              {loading ? 'Optimizing...' : 'Run Optimization'}
            </Button>
          </Card>

          {results.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <TrendUp size={20} />
                Optimization Results
              </h3>
              {results.map((result, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">#{index + 1}</Badge>
                          <h4 className="font-semibold">{result.material.name}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {result.material.description}
                        </p>
                      </div>
                      <Badge className="shrink-0">
                        Score: {result.score.toFixed(1)}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs font-medium text-muted-foreground">Composition</div>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(result.material.composition).map(([symbol, percent]) => (
                          <Badge key={symbol} variant="secondary">
                            {symbol} {percent.toFixed(1)}%
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="text-xs font-medium text-muted-foreground">Trade-offs</div>
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(result.tradeoffs).map(([key, value]) => (
                          <div key={key} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="capitalize text-muted-foreground">{key}</span>
                              <span className="font-medium">{value.toFixed(0)}</span>
                            </div>
                            <Progress value={value} className="h-1.5" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      variant="default"
                      className="w-full"
                      onClick={() => handleSelectResult(result)}
                    >
                      Use This Material
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
