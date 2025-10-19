import { useState } from 'react'
import { EnvironmentalConditions, Composition, MaterialProperties } from '@/lib/types'
import { predictMaterialProperties, calculateCompatibility } from '@/lib/materialSimulation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { ArrowsClockwise, Warning, CheckCircle, Thermometer, Drop, Gauge } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface SimulationControlsProps {
  composition: Composition
  onPropertiesPredict: (properties: MaterialProperties) => void
}

export function SimulationControls({ composition, onPropertiesPredict }: SimulationControlsProps) {
  const [conditions, setConditions] = useState<EnvironmentalConditions>({
    temperature: 25,
    humidity: 50,
    pressure: 1,
  })
  const [simulating, setSimulating] = useState(false)
  const [progress, setProgress] = useState(0)

  const compatibility = calculateCompatibility(composition)
  const hasElements = Object.keys(composition).length > 0
  const isValid = Math.abs(Object.values(composition).reduce((a, b) => a + b, 0) - 100) < 0.1

  const handleSimulate = async () => {
    if (!hasElements || !isValid) {
      toast.error('Please create a valid composition first')
      return
    }

    setSimulating(true)
    setProgress(0)

    const progressInterval = setInterval(() => {
      setProgress(p => Math.min(p + 10, 90))
    }, 200)

    try {
      const properties = await predictMaterialProperties(composition, conditions)
      setProgress(100)
      onPropertiesPredict(properties)
      toast.success('Simulation complete!')
    } catch (error) {
      toast.error('Simulation failed. Please try again.')
      console.error(error)
    } finally {
      clearInterval(progressInterval)
      setTimeout(() => {
        setSimulating(false)
        setProgress(0)
      }, 500)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Environmental Conditions</h3>
          <p className="text-sm text-muted-foreground">
            Set the conditions for property simulation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Thermometer size={16} className="text-muted-foreground" />
              Temperature (°C)
            </Label>
            <Input
              type="number"
              value={conditions.temperature}
              onChange={(e) => setConditions({ ...conditions, temperature: parseFloat(e.target.value) })}
              min={-273}
              max={3000}
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Drop size={16} className="text-muted-foreground" />
              Humidity (%)
            </Label>
            <Input
              type="number"
              value={conditions.humidity}
              onChange={(e) => setConditions({ ...conditions, humidity: parseFloat(e.target.value) })}
              min={0}
              max={100}
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Gauge size={16} className="text-muted-foreground" />
              Pressure (atm)
            </Label>
            <Input
              type="number"
              value={conditions.pressure}
              onChange={(e) => setConditions({ ...conditions, pressure: parseFloat(e.target.value) })}
              min={0}
              max={100}
              step={0.1}
            />
          </div>
        </div>
      </Card>

      {hasElements && (
        <Card className="p-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Composition Analysis</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Compatibility Score</span>
              <span className="text-lg font-bold">{compatibility.score}/100</span>
            </div>
            <Progress value={compatibility.score} className="h-2" />
          </div>

          {compatibility.warnings.length > 0 && (
            <div className="space-y-2">
              {compatibility.warnings.map((warning, index) => (
                <Alert key={index} variant="destructive">
                  <Warning className="h-4 w-4" />
                  <AlertDescription>{warning}</AlertDescription>
                </Alert>
              ))}
            </div>
          )}

          {compatibility.warnings.length === 0 && isValid && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Composition appears chemically stable and feasible
              </AlertDescription>
            </Alert>
          )}
        </Card>
      )}

      <Button
        onClick={handleSimulate}
        disabled={!hasElements || !isValid || simulating}
        size="lg"
        className="w-full gap-2"
      >
        <ArrowsClockwise size={20} weight={simulating ? 'bold' : 'regular'} />
        {simulating ? 'Simulating...' : 'Simulate Properties'}
      </Button>

      {simulating && (
        <Card className="p-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Running AI prediction...</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </Card>
      )}
    </div>
  )
}
