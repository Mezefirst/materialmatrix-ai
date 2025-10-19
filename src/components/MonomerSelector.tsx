import { useState } from 'react'
import { Monomer, MonomerCategory } from '@/lib/types'
import { COMMON_MONOMERS, getMonomersByCategory, searchMonomers } from '@/lib/monomersDatabase'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MagnifyingGlass, Flask, Warning, Drop } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface MonomerSelectorProps {
  selectedMonomers: Monomer[]
  onToggleMonomer: (monomer: Monomer) => void
}

const CATEGORY_INFO: Record<MonomerCategory, { label: string; color: string }> = {
  'vinyl': { label: 'Vinyl', color: 'bg-blue-500' },
  'diene': { label: 'Diene', color: 'bg-purple-500' },
  'styrenic': { label: 'Styrenic', color: 'bg-pink-500' },
  'acrylic': { label: 'Acrylic', color: 'bg-teal-500' },
  'methacrylate': { label: 'Methacrylate', color: 'bg-cyan-500' },
  'epoxy': { label: 'Epoxy', color: 'bg-amber-500' },
  'urethane': { label: 'Urethane', color: 'bg-orange-500' },
  'ester': { label: 'Ester', color: 'bg-green-500' },
  'amide': { label: 'Amide', color: 'bg-indigo-500' },
  'ether': { label: 'Ether', color: 'bg-violet-500' },
  'siloxane': { label: 'Siloxane', color: 'bg-slate-500' },
  'other': { label: 'Other', color: 'bg-gray-500' }
}

export function MonomerSelector({ selectedMonomers, onToggleMonomer }: MonomerSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<MonomerCategory | 'all'>('all')

  const filteredMonomers = searchQuery
    ? searchMonomers(searchQuery)
    : activeCategory === 'all'
    ? COMMON_MONOMERS
    : getMonomersByCategory(activeCategory)

  const isSelected = (monomer: Monomer) => 
    selectedMonomers.some(m => m.id === monomer.id)

  const getToxicityBadge = (toxicity?: string) => {
    if (!toxicity) return null
    const variants: Record<string, { variant: "default" | "secondary" | "destructive", label: string }> = {
      'low': { variant: 'secondary', label: 'Low Toxicity' },
      'moderate': { variant: 'default', label: 'Moderate Toxicity' },
      'high': { variant: 'destructive', label: 'High Toxicity' }
    }
    const config = variants[toxicity]
    return (
      <Badge variant={config.variant} className="text-xs">
        {toxicity === 'high' && <Warning size={12} className="mr-1" weight="fill" />}
        {config.label}
      </Badge>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <MagnifyingGlass 
            size={20} 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search monomers by name or structure..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        {selectedMonomers.length > 0 && (
          <Badge variant="secondary" className="px-3 py-2">
            {selectedMonomers.length} Selected
          </Badge>
        )}
      </div>

      <Tabs value={activeCategory} onValueChange={(v) => setActiveCategory(v as MonomerCategory | 'all')}>
        <TabsList className="w-full flex-wrap h-auto">
          <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
          <TabsTrigger value="vinyl" className="text-xs">Vinyl</TabsTrigger>
          <TabsTrigger value="styrenic" className="text-xs">Styrenic</TabsTrigger>
          <TabsTrigger value="acrylic" className="text-xs">Acrylic</TabsTrigger>
          <TabsTrigger value="methacrylate" className="text-xs">Methacrylate</TabsTrigger>
          <TabsTrigger value="diene" className="text-xs">Diene</TabsTrigger>
          <TabsTrigger value="epoxy" className="text-xs">Epoxy</TabsTrigger>
          <TabsTrigger value="urethane" className="text-xs">Urethane</TabsTrigger>
        </TabsList>

        <TabsContent value={activeCategory} className="mt-4">
          <ScrollArea className="h-[500px] pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMonomers.map((monomer) => {
                const selected = isSelected(monomer)
                const categoryInfo = CATEGORY_INFO[monomer.category]

                return (
                  <Card
                    key={monomer.id}
                    className={cn(
                      "p-4 cursor-pointer transition-all hover:shadow-md",
                      selected && "ring-2 ring-primary bg-primary/5"
                    )}
                    onClick={() => onToggleMonomer(monomer)}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Drop 
                              size={20} 
                              weight="fill" 
                              className={selected ? "text-primary" : "text-muted-foreground"}
                            />
                            <h3 className="font-semibold text-sm">{monomer.name}</h3>
                          </div>
                          <p className="text-lg font-mono text-muted-foreground">
                            {monomer.structure}
                          </p>
                        </div>
                        <div className={cn("w-2 h-2 rounded-full shrink-0", categoryInfo.color)} />
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">
                          {categoryInfo.label}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          MW: {monomer.molecularWeight.toFixed(2)}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Reactivity: {(monomer.reactivity * 100).toFixed(0)}%
                        </Badge>
                      </div>

                      {monomer.properties.toxicity && (
                        <div>
                          {getToxicityBadge(monomer.properties.toxicity)}
                        </div>
                      )}

                      <div className="text-xs text-muted-foreground">
                        <div className="flex flex-wrap gap-1">
                          {monomer.functionalGroups.map(group => (
                            <span key={group} className="bg-muted px-2 py-0.5 rounded">
                              {group}
                            </span>
                          ))}
                        </div>
                      </div>

                      {monomer.properties.glassTransitionTemp && (
                        <div className="text-xs text-muted-foreground">
                          Tg: {monomer.properties.glassTransitionTemp}°C
                        </div>
                      )}
                    </div>
                  </Card>
                )
              })}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      {filteredMonomers.length === 0 && (
        <Card className="p-8 text-center">
          <Flask size={48} className="mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">No monomers found matching your search</p>
        </Card>
      )}
    </div>
  )
}
