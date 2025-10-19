import { useState } from 'react'
import { MaterialRecommendation, suggestCompositionForTarget } from '@/lib/recommendations'
import { Composition } from '@/lib/types'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Target, Sparkle, ArrowRight, CheckCircle } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface PropertyTargetDialogProps {
  onApplyComposition: (composition: Composition) => void
}

export function PropertyTargetDialog({ onApplyComposition }: PropertyTargetDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [recommendations, setRecommendations] = useState<MaterialRecommendation[]>([])
  
  const [propertyType, setPropertyType] = useState<'mechanical' | 'electrical' | 'chemical'>('mechanical')
  const [propertyName, setPropertyName] = useState('tensileStrength')
  const [targetValue, setTargetValue] = useState('')
  const [unit, setUnit] = useState('MPa')

  const propertyOptions = {
    mechanical: [
      { value: 'tensileStrength', label: 'Tensile Strength', unit: 'MPa' },
      { value: 'yieldStrength', label: 'Yield Strength', unit: 'MPa' },
      { value: 'elasticity', label: "Young's Modulus", unit: 'GPa' },
      { value: 'hardness', label: 'Hardness', unit: 'HV' },
      { value: 'density', label: 'Density', unit: 'g/cm³' },
    ],
    electrical: [
      { value: 'conductivity', label: 'Electrical Conductivity', unit: 'MS/m' },
      { value: 'resistivity', label: 'Resistivity', unit: 'µΩ·m' },
      { value: 'dielectricConstant', label: 'Dielectric Constant', unit: '' },
      { value: 'bandGap', label: 'Band Gap', unit: 'eV' },
    ],
    chemical: [
      { value: 'corrosionResistance', label: 'Corrosion Resistance', unit: 'score (0-100)' },
      { value: 'stability', label: 'Stability', unit: 'score (0-100)' },
      { value: 'oxidationResistance', label: 'Oxidation Resistance', unit: 'score (0-100)' },
    ],
  }

  const handlePropertyTypeChange = (value: 'mechanical' | 'electrical' | 'chemical') => {
    setPropertyType(value)
    const firstProperty = propertyOptions[value][0]
    setPropertyName(firstProperty.value)
    setUnit(firstProperty.unit)
  }

  const handlePropertyChange = (value: string) => {
    setPropertyName(value)
    const property = propertyOptions[propertyType].find(p => p.value === value)
    if (property) {
      setUnit(property.unit)
    }
  }

  const handleFindMaterials = async () => {
    if (!targetValue || parseFloat(targetValue) <= 0) {
      toast.error('Please enter a valid target value')
      return
    }

    setLoading(true)
    try {
      const results = await suggestCompositionForTarget({
        propertyType,
        propertyName,
        targetValue: parseFloat(targetValue),
        unit,
      })
      setRecommendations(results)
      toast.success(`Found ${results.length} material suggestions`)
    } catch (error) {
      toast.error('Failed to generate suggestions')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleApply = (composition: Composition, name: string) => {
    onApplyComposition(composition)
    setOpen(false)
    toast.success(`Applied ${name}`)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Target size={16} />
          <span className="hidden sm:inline">Find by Property</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target size={24} className="text-accent" />
            Find Materials by Target Property
          </DialogTitle>
          <DialogDescription>
            Enter your target property value and get AI-powered material composition suggestions
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Property Category</Label>
                <Select value={propertyType} onValueChange={handlePropertyTypeChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mechanical">Mechanical</SelectItem>
                    <SelectItem value="electrical">Electrical</SelectItem>
                    <SelectItem value="chemical">Chemical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Specific Property</Label>
                <Select value={propertyName} onValueChange={handlePropertyChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyOptions[propertyType].map((prop) => (
                      <SelectItem key={prop.value} value={prop.value}>
                        {prop.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Target Value {unit && `(${unit})`}</Label>
              <Input
                type="number"
                placeholder="Enter target value..."
                value={targetValue}
                onChange={(e) => setTargetValue(e.target.value)}
                step="any"
              />
            </div>

            <Button 
              onClick={handleFindMaterials}
              disabled={loading || !targetValue}
              className="w-full gap-2"
            >
              <Sparkle size={18} weight={loading ? 'fill' : 'regular'} />
              {loading ? 'Finding Materials...' : 'Find Materials'}
            </Button>
          </Card>

          {loading && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-5 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </Card>
              ))}
            </div>
          )}

          {!loading && recommendations.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Material Suggestions</h3>
              {recommendations.map((rec, index) => (
                <Card 
                  key={index} 
                  className="p-5 space-y-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="default">
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
                        Composition
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(rec.composition).map(([symbol, percent]) => (
                          <Badge key={symbol} variant="secondary" className="font-mono">
                            {symbol} {(percent as number).toFixed(1)}%
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {rec.expectedImprovements.length > 0 && (
                      <div>
                        <div className="text-xs font-medium text-muted-foreground mb-2">
                          Key Properties
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
                  </div>

                  <Button
                    onClick={() => handleApply(rec.composition, rec.name)}
                    className="w-full gap-2"
                  >
                    Use This Composition
                    <ArrowRight size={16} />
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
