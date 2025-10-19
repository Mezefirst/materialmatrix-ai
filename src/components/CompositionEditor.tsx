import { Composition } from '@/lib/types'
import { elementsBySymbol } from '@/lib/periodicTable'
import { Card } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { X } from '@phosphor-icons/react'

interface CompositionEditorProps {
  composition: Composition
  onChange: (composition: Composition) => void
}

export function CompositionEditor({ composition, onChange }: CompositionEditorProps) {
  const elements = Object.keys(composition)
  const totalPercent = Object.values(composition).reduce((sum, val) => sum + val, 0)

  const handlePercentChange = (symbol: string, value: number) => {
    const newComposition = { ...composition, [symbol]: value }
    onChange(newComposition)
  }

  const handleRemove = (symbol: string) => {
    const newComposition = { ...composition }
    delete newComposition[symbol]
    onChange(newComposition)
  }

  const handleNormalize = () => {
    if (totalPercent === 0) return
    const normalized: Composition = {}
    for (const [symbol, percent] of Object.entries(composition)) {
      normalized[symbol] = (percent / totalPercent) * 100
    }
    onChange(normalized)
  }

  if (elements.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">
          Select elements from the periodic table to begin building your material
        </p>
      </Card>
    )
  }

  const isValid = Math.abs(totalPercent - 100) < 0.1

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Composition</h3>
          <p className="text-sm text-muted-foreground">
            Adjust element percentages
          </p>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-bold ${isValid ? 'text-success' : 'text-destructive'}`}>
            {totalPercent.toFixed(1)}%
          </div>
          <div className="text-xs text-muted-foreground">Total</div>
        </div>
      </div>

      <div className="space-y-4">
        {elements.map(symbol => {
          const element = elementsBySymbol[symbol]
          const percent = composition[symbol]

          return (
            <div key={symbol} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <span className="font-semibold">{symbol}</span>
                  <span className="text-muted-foreground text-xs">{element?.name}</span>
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={percent.toFixed(1)}
                    onChange={(e) => handlePercentChange(symbol, parseFloat(e.target.value) || 0)}
                    className="w-20 h-8 text-right"
                    min={0}
                    max={100}
                    step={0.1}
                  />
                  <span className="text-sm text-muted-foreground">%</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemove(symbol)}
                    className="h-8 w-8 p-0"
                  >
                    <X size={16} />
                  </Button>
                </div>
              </div>
              <Slider
                value={[percent]}
                onValueChange={([value]) => handlePercentChange(symbol, value)}
                max={100}
                step={0.1}
                className="w-full"
              />
            </div>
          )
        })}
      </div>

      {!isValid && (
        <div className="flex items-center justify-between pt-2 border-t">
          <p className="text-sm text-muted-foreground">
            Composition must total 100%
          </p>
          {totalPercent > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleNormalize}
            >
              Normalize to 100%
            </Button>
          )}
        </div>
      )}
    </Card>
  )
}
