import { Material, MaterialCategory } from '@/lib/types'
import { materialsDatabase } from '@/lib/materialsDatabase'
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MagnifyingGlass, Atom, Copy } from '@phosphor-icons/react'

interface MaterialBrowserProps {
  onSelectMaterial: (material: Material) => void
}

export function MaterialBrowser({ onSelectMaterial }: MaterialBrowserProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<MaterialCategory | 'all'>('all')

  const filteredMaterials = materialsDatabase.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.description?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || material.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Material Database</h3>
        <p className="text-sm text-muted-foreground">
          Browse and select from existing materials
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Search materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v as MaterialCategory | 'all')}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="metal">Metal</SelectItem>
            <SelectItem value="alloy">Alloy</SelectItem>
            <SelectItem value="ceramic">Ceramic</SelectItem>
            <SelectItem value="polymer">Polymer</SelectItem>
            <SelectItem value="composite">Composite</SelectItem>
            <SelectItem value="semiconductor">Semiconductor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredMaterials.map(material => (
          <Card key={material.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Atom size={20} className="text-primary" />
                    <h4 className="font-semibold">{material.name}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{material.description}</p>
                </div>
                <Badge variant="secondary" className="shrink-0">
                  {material.category}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-medium text-muted-foreground">Composition</div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(material.composition).map(([symbol, percent]) => (
                    <Badge key={symbol} variant="outline">
                      {symbol} {percent.toFixed(1)}%
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-2 border-t text-center">
                <div>
                  <div className="text-xs text-muted-foreground">Strength</div>
                  <div className="font-semibold text-sm">
                    {material.properties.mechanical.tensileStrength?.toFixed(0) || 'N/A'}
                    <span className="text-xs text-muted-foreground ml-1">MPa</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Density</div>
                  <div className="font-semibold text-sm">
                    {material.properties.mechanical.density?.toFixed(2) || 'N/A'}
                    <span className="text-xs text-muted-foreground ml-1">g/cm³</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Corrosion</div>
                  <div className="font-semibold text-sm">
                    {material.properties.chemical.corrosionResistance?.toFixed(0) || 'N/A'}
                    <span className="text-xs text-muted-foreground ml-1">/100</span>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => onSelectMaterial(material)}
              >
                <Copy size={16} className="mr-2" />
                Use This Material
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredMaterials.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">No materials found matching your criteria</p>
        </Card>
      )}
    </div>
  )
}
