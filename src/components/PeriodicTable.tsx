import { Element, Composition } from '@/lib/types'
import { periodicTableData, getCategoryColor } from '@/lib/periodicTable'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Check } from '@phosphor-icons/react'

interface PeriodicTableProps {
  selectedElements: Composition
  onElementToggle: (symbol: string) => void
}

export function PeriodicTable({ selectedElements, onElementToggle }: PeriodicTableProps) {
  const maxPeriod = Math.max(...periodicTableData.map(e => e.period))
  
  const grid: (Element | null)[][] = Array.from({ length: maxPeriod }, () =>
    Array(18).fill(null)
  )

  periodicTableData.forEach(element => {
    const row = element.period - 1
    const col = element.group ? element.group - 1 : 0
    grid[row][col] = element
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Periodic Table</h3>
          <p className="text-sm text-muted-foreground">
            Click elements to build your material composition
          </p>
        </div>
        {Object.keys(selectedElements).length > 0 && (
          <Badge variant="secondary" className="text-sm">
            {Object.keys(selectedElements).length} elements selected
          </Badge>
        )}
      </div>

      <TooltipProvider delayDuration={200}>
        <div className="overflow-x-auto pb-4">
          <div className="periodic-table-grid min-w-[800px]">
            {grid.map((row, rowIndex) =>
              row.map((element, colIndex) => {
                if (!element) {
                  return <div key={`${rowIndex}-${colIndex}`} />
                }

                const isSelected = element.symbol in selectedElements
                const categoryColor = getCategoryColor(element.category)

                return (
                  <Tooltip key={element.symbol}>
                    <TooltipTrigger asChild>
                      <Button
                        variant={isSelected ? 'default' : 'outline'}
                        className="element-tile relative p-1 h-auto"
                        style={{
                          backgroundColor: isSelected ? categoryColor : 'transparent',
                          borderColor: categoryColor,
                          borderWidth: '2px',
                        }}
                        onClick={() => onElementToggle(element.symbol)}
                      >
                        {isSelected && (
                          <Check 
                            className="absolute top-0.5 right-0.5 text-white" 
                            size={12}
                            weight="bold"
                          />
                        )}
                        <div className="text-[10px] font-medium opacity-70">
                          {element.atomicNumber}
                        </div>
                        <div className="text-base font-bold">{element.symbol}</div>
                        {isSelected && selectedElements[element.symbol] && (
                          <div className="text-[9px] font-semibold text-white">
                            {selectedElements[element.symbol].toFixed(1)}%
                          </div>
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-xs space-y-1">
                        <div className="font-semibold">{element.name}</div>
                        <div>Atomic #: {element.atomicNumber}</div>
                        <div>Mass: {element.atomicMass.toFixed(2)}</div>
                        {element.electronegativity && (
                          <div>Electronegativity: {element.electronegativity}</div>
                        )}
                        <div className="text-muted-foreground capitalize">
                          {element.category.replace('-', ' ')}
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                )
              })
            )}
          </div>
        </div>
      </TooltipProvider>

      <Card className="p-4">
        <div className="flex flex-wrap gap-2">
          {Object.entries(getCategoryLegend()).map(([category, label]) => (
            <div key={category} className="flex items-center gap-2 text-xs">
              <div
                className="w-4 h-4 rounded border-2"
                style={{ 
                  borderColor: getCategoryColor(category),
                  backgroundColor: getCategoryColor(category) + '40'
                }}
              />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

function getCategoryLegend(): Record<string, string> {
  return {
    'alkali-metal': 'Alkali Metal',
    'alkaline-earth-metal': 'Alkaline Earth',
    'transition-metal': 'Transition Metal',
    'post-transition-metal': 'Post-Transition',
    'metalloid': 'Metalloid',
    'nonmetal': 'Nonmetal',
    'halogen': 'Halogen',
    'noble-gas': 'Noble Gas',
  }
}
