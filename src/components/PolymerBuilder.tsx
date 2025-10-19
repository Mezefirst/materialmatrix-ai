import { useState } from 'react'
import { Monomer, PolymerComposition, PolymerArchitecture, MaterialProperties, ThermalProperties } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { predictPolymerProperties, validateMonomerCompatibility, suggestPolymerizationMethod, calculatePolymerComposition } from '@/lib/polymerSimulation'
import { ArrowsClockwise, CheckCircle, WarningCircle, Cube, Lightning } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface PolymerBuilderProps {
  selectedMonomers: Monomer[]
  onPropertiesPredict: (properties: MaterialProperties & { thermal: ThermalProperties }) => void
  onCompositionChange?: (composition: Record<string, number>) => void
}

export function PolymerBuilder({ selectedMonomers, onPropertiesPredict, onCompositionChange }: PolymerBuilderProps) {
  const [moleFractions, setMoleFractions] = useState<Record<string, number>>({})
  const [architecture, setArchitecture] = useState<PolymerArchitecture>('linear')
  const [crosslinking, setCrosslinking] = useState(0)
  const [isSimulating, setIsSimulating] = useState(false)

  const handleFractionChange = (monomerId: string, value: number) => {
    const newFractions = { ...moleFractions, [monomerId]: value }
    setMoleFractions(newFractions)
    
    if (onCompositionChange) {
      const monomerData = selectedMonomers.map(m => ({
        monomer: m,
        fraction: newFractions[m.id] || (100 / selectedMonomers.length) / 100
      }))
      const composition = calculatePolymerComposition(monomerData)
      onCompositionChange(composition)
    }
  }

  const normalizeFractions = () => {
    if (selectedMonomers.length === 0) return {}
    
    const currentTotal = Object.values(moleFractions).reduce((sum, val) => sum + val, 0)
    
    if (currentTotal === 0) {
      const equal = 100 / selectedMonomers.length
      const normalized: Record<string, number> = {}
      selectedMonomers.forEach(m => {
        normalized[m.id] = equal
      })
      return normalized
    }
    
    const normalized: Record<string, number> = {}
    Object.entries(moleFractions).forEach(([id, val]) => {
      normalized[id] = (val / currentTotal) * 100
    })
    return normalized
  }

  const handleSimulate = async () => {
    if (selectedMonomers.length === 0) {
      toast.error('Select at least one monomer')
      return
    }

    const validation = validateMonomerCompatibility(selectedMonomers)
    if (!validation.compatible) {
      toast.error('Monomer compatibility issues detected')
      validation.issues.forEach(issue => toast.warning(issue))
      return
    }

    validation.issues.forEach(issue => {
      if (issue.startsWith('Warning')) {
        toast.warning(issue)
      }
    })

    setIsSimulating(true)
    
    try {
      const normalized = normalizeFractions()
      
      const composition: PolymerComposition = {
        monomers: selectedMonomers.map(m => ({
          monomerId: m.id,
          monomerName: m.name,
          moleFraction: normalized[m.id] / 100,
          distribution: selectedMonomers.length > 1 ? 'random' : undefined
        })),
        architecture,
        crosslinking: crosslinking / 100,
        molecularWeight: 50000 + Math.random() * 150000,
        polydispersity: 1.5 + Math.random() * 1.0
      }

      const properties = await predictPolymerProperties(selectedMonomers, composition)
      onPropertiesPredict(properties)
      
      const method = suggestPolymerizationMethod(selectedMonomers)
      toast.success(`Polymer properties predicted! Suggested method: ${method}`)
    } catch (error) {
      toast.error('Simulation failed')
      console.error(error)
    } finally {
      setIsSimulating(false)
    }
  }

  const handleAutoBalance = () => {
    const equal = 100 / selectedMonomers.length
    const balanced: Record<string, number> = {}
    selectedMonomers.forEach(m => {
      balanced[m.id] = equal
    })
    setMoleFractions(balanced)
    toast.success('Mole fractions balanced equally')
  }

  if (selectedMonomers.length === 0) {
    return (
      <Card className="p-8 text-center">
        <Cube size={48} className="mx-auto mb-4 text-muted-foreground" />
        <h3 className="font-semibold mb-2">No Monomers Selected</h3>
        <p className="text-sm text-muted-foreground">
          Select monomers from the library to start building your polymer
        </p>
      </Card>
    )
  }

  const validation = validateMonomerCompatibility(selectedMonomers)
  const normalized = normalizeFractions()
  const totalFraction = Object.values(normalized).reduce((sum, val) => sum + val, 0)

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Cube size={24} className="text-primary" />
            <h2 className="text-lg font-semibold">Polymer Composition</h2>
          </div>
          {validation.compatible ? (
            <CheckCircle size={24} className="text-success" weight="fill" />
          ) : (
            <WarningCircle size={24} className="text-destructive" weight="fill" />
          )}
        </div>

        {validation.issues.length > 0 && (
          <div className="mb-4 space-y-2">
            {validation.issues.map((issue, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm">
                <WarningCircle 
                  size={16} 
                  className={issue.startsWith('Warning') ? "text-amber-500" : "text-destructive"} 
                  weight="fill"
                />
                <span className="text-muted-foreground">{issue}</span>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Mole Fractions</Label>
            <Button variant="outline" size="sm" onClick={handleAutoBalance}>
              Auto Balance
            </Button>
          </div>

          {selectedMonomers.map((monomer) => {
            const fraction = normalized[monomer.id] || 0

            return (
              <div key={monomer.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{monomer.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {monomer.structure}
                    </Badge>
                  </div>
                  <span className="text-sm font-mono font-medium">
                    {fraction.toFixed(1)}%
                  </span>
                </div>
                <Slider
                  value={[moleFractions[monomer.id] || (100 / selectedMonomers.length)]}
                  onValueChange={(values) => handleFractionChange(monomer.id, values[0])}
                  max={100}
                  step={0.5}
                  className="flex-1"
                />
              </div>
            )
          })}

          <div className="pt-2">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-medium">Total</span>
              <span className={`font-mono font-medium ${Math.abs(totalFraction - 100) > 0.1 ? 'text-amber-500' : 'text-success'}`}>
                {totalFraction.toFixed(1)}%
              </span>
            </div>
            <Progress value={totalFraction} className="h-2" />
          </div>
        </div>
      </Card>

      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Lightning size={24} className="text-primary" />
          <h3 className="text-lg font-semibold">Architecture & Processing</h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="architecture">Polymer Architecture</Label>
            <Select value={architecture} onValueChange={(v) => setArchitecture(v as PolymerArchitecture)}>
              <SelectTrigger id="architecture">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="linear">Linear (chains)</SelectItem>
                <SelectItem value="branched">Branched (side chains)</SelectItem>
                <SelectItem value="star">Star (radiating)</SelectItem>
                <SelectItem value="comb">Comb (teeth-like)</SelectItem>
                <SelectItem value="dendritic">Dendritic (tree-like)</SelectItem>
                <SelectItem value="network">Network (3D crosslinked)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Crosslinking Density</Label>
              <span className="text-sm font-mono">{crosslinking}%</span>
            </div>
            <Slider
              value={[crosslinking]}
              onValueChange={(values) => setCrosslinking(values[0])}
              max={100}
              step={1}
            />
            <p className="text-xs text-muted-foreground">
              Higher crosslinking increases strength and hardness but reduces flexibility
            </p>
          </div>
        </div>

        <Separator />

        <Button
          onClick={handleSimulate}
          disabled={isSimulating || !validation.compatible}
          className="w-full"
          size="lg"
        >
          {isSimulating ? (
            <>
              <ArrowsClockwise size={20} className="animate-spin" />
              Simulating...
            </>
          ) : (
            <>
              <ArrowsClockwise size={20} />
              Simulate Polymer Properties
            </>
          )}
        </Button>
      </Card>
    </div>
  )
}
