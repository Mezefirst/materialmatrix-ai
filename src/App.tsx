import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Material, Composition, MaterialProperties, OptimizationResult, Monomer, ThermalProperties } from '@/lib/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Toaster } from '@/components/ui/sonner'
import { LandingPage } from '@/components/LandingPage'
import { Logo } from '@/components/Logo'
import { LanguageSelector } from '@/components/LanguageSelector'
import { PeriodicTable } from '@/components/PeriodicTable'
import { CompositionEditor } from '@/components/CompositionEditor'
import { PropertyDisplay } from '@/components/PropertyDisplay'
import { MaterialBrowser } from '@/components/MaterialBrowser'
import { SimulationControls } from '@/components/SimulationControls'
import { OptimizationDialog } from '@/components/OptimizationDialog'
import { MonomerSelector } from '@/components/MonomerSelector'
import { PolymerBuilder } from '@/components/PolymerBuilder'
import { ThermalPropertyDisplay } from '@/components/ThermalPropertyDisplay'
import { RecommendationPanel } from '@/components/RecommendationPanel'
import { PropertyTargetDialog } from '@/components/PropertyTargetDialog'
import { CompositionAnalysis } from '@/components/CompositionAnalysis'
import { SustainabilityCostSummary } from '@/components/SustainabilityCostSummary'
import { ResultsPage } from '@/components/ResultsPage'
import { useLanguage } from '@/hooks/use-language'
import { Database, Flask, Plus, Download, Drop, ChartLine, Atom } from '@phosphor-icons/react'
import { toast } from 'sonner'

function App() {
  const [showLanding, setShowLanding] = useKV<boolean>('show-landing', true)
  const [savedMaterials, setSavedMaterials] = useKV<Material[]>('saved-materials', [])
  const [currentMaterial, setCurrentMaterial] = useState<Material | null>(null)
  const [composition, setComposition] = useState<Composition>({})
  const [properties, setProperties] = useState<MaterialProperties | null>(null)
  const [thermalProperties, setThermalProperties] = useState<ThermalProperties | null>(null)
  const [materialName, setMaterialName] = useState('')
  const [materialMode, setMaterialMode] = useState<'element' | 'polymer'>('element')
  const [selectedMonomers, setSelectedMonomers] = useState<Monomer[]>([])
  const [viewMode, setViewMode] = useState<'builder' | 'results'>('builder')
  const { language, setLanguage, t } = useLanguage()

  const handleElementToggle = (symbol: string) => {
    if (symbol in composition) {
      const newComposition = { ...composition }
      delete newComposition[symbol]
      setComposition(newComposition)
    } else {
      const elementCount = Object.keys(composition).length
      if (elementCount >= 10) {
        toast.error('Maximum 10 elements allowed')
        return
      }
      const equalPercent = 100 / (elementCount + 1)
      const newComposition: Composition = {}
      
      for (const existingSymbol of Object.keys(composition)) {
        newComposition[existingSymbol] = equalPercent
      }
      newComposition[symbol] = equalPercent
      
      setComposition(newComposition)
    }
  }

  const handleSelectMaterial = (material: Material) => {
    setCurrentMaterial(material)
    setComposition(material.composition)
    setProperties(material.properties)
    setMaterialName(material.name)
    setViewMode('builder')
    toast.success(`Loaded ${material.name}`)
  }

  const handleOptimizationResult = (result: OptimizationResult) => {
    const material = result.material
    setCurrentMaterial(material)
    setComposition(material.composition)
    setProperties(material.properties)
    setMaterialName(material.name)
  }

  const handleSaveMaterial = () => {
    if (!properties) {
      toast.error('Simulate properties before saving')
      return
    }

    const material: Material = {
      id: `custom-${Date.now()}`,
      name: materialName || `Material ${Date.now()}`,
      composition,
      category: 'other',
      properties,
      createdAt: Date.now(),
      modifiedAt: Date.now(),
    }

    setSavedMaterials((current) => {
      const existing = current || []
      return [...existing, material]
    })
    setCurrentMaterial(material)
    toast.success('Material saved!')
  }

  const handleNewMaterial = () => {
    setCurrentMaterial(null)
    setComposition({})
    setProperties(null)
    setThermalProperties(null)
    setMaterialName('')
    setSelectedMonomers([])
    setViewMode('builder')
    toast.info('Started new material')
  }

  const handleToggleMonomer = (monomer: Monomer) => {
    setSelectedMonomers(current => {
      const exists = current.find(m => m.id === monomer.id)
      if (exists) {
        return current.filter(m => m.id !== monomer.id)
      } else {
        if (current.length >= 5) {
          toast.error('Maximum 5 monomers allowed')
          return current
        }
        return [...current, monomer]
      }
    })
  }

  const handlePolymerPropertiesPredict = (props: MaterialProperties & { thermal: ThermalProperties }) => {
    const { thermal, ...materialProps } = props
    setProperties(materialProps)
    setThermalProperties(thermal)
  }

  const handleApplyRecommendation = (newComposition: Composition) => {
    setComposition(newComposition)
    setProperties(null)
    setThermalProperties(null)
  }

  const handleExport = () => {
    if (!currentMaterial && !properties) {
      toast.error('No material to export')
      return
    }

    const exportData = currentMaterial || {
      name: materialName || 'Unnamed Material',
      composition,
      properties,
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${exportData.name}.json`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Material exported!')
  }

  const handleViewResults = () => {
    if (!properties) {
      toast.error('Run simulation first to view results')
      return
    }
    setViewMode('results')
  }

  if (showLanding) {
    return (
      <>
        <Toaster />
        <LandingPage onEnter={() => setShowLanding(false)} />
      </>
    )
  }

  if (viewMode === 'results') {
    return (
      <>
        <Toaster />
        <ResultsPage
          material={currentMaterial}
          composition={composition}
          properties={properties}
          thermalProperties={thermalProperties}
          materialName={materialName}
          onBack={() => setViewMode('builder')}
        />
      </>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      
      <header className="border-b bg-card/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Logo size="md" showText={false} />
              <div>
                <h1 className="text-xl font-bold tracking-tight">{t.app.materialTailoringPlatform}</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  {t.app.aiPoweredMaterialDesign}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSelector 
                currentLanguage={language} 
                onLanguageChange={setLanguage}
                variant="ghost"
              />
              <PropertyTargetDialog onApplyComposition={setComposition} />
              {properties && (
                <Button variant="default" size="sm" onClick={handleViewResults}>
                  <ChartLine size={16} />
                  <span className="hidden sm:inline ml-2">{t.app.viewResults}</span>
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={handleNewMaterial}>
                <Plus size={16} />
                <span className="hidden sm:inline ml-2">{t.app.newMaterial}</span>
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download size={16} />
                <span className="hidden sm:inline ml-2">{t.app.export}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="p-2">
              <Tabs value={materialMode} onValueChange={(v) => setMaterialMode(v as 'element' | 'polymer')}>
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="element" className="gap-2">
                    <Atom size={18} />
                    {t.app.elementsAlloys}
                  </TabsTrigger>
                  <TabsTrigger value="polymer" className="gap-2">
                    <Drop size={18} />
                    {t.app.polymers}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="element" className="space-y-6">
                  <Tabs defaultValue="periodic" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="periodic" className="gap-2">
                        <Atom size={18} />
                        {t.app.periodicTable}
                      </TabsTrigger>
                      <TabsTrigger value="database" className="gap-2">
                        <Database size={18} />
                        {t.app.materialDatabase}
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="periodic" className="space-y-6 mt-6">
                      <PeriodicTable
                        selectedElements={composition}
                        onElementToggle={handleElementToggle}
                      />
                    </TabsContent>

                    <TabsContent value="database" className="space-y-6 mt-6">
                      <MaterialBrowser onSelectMaterial={handleSelectMaterial} />
                    </TabsContent>
                  </Tabs>

                  {Object.keys(composition).length > 0 && (
                    <div className="space-y-6">
                      <CompositionEditor
                        composition={composition}
                        onChange={setComposition}
                      />
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="polymer" className="space-y-6">
                  <MonomerSelector
                    selectedMonomers={selectedMonomers}
                    onToggleMonomer={handleToggleMonomer}
                  />
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Flask size={24} className="text-primary" />
                <h2 className="text-lg font-semibold">{t.app.materialBuilder}</h2>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.app.materialName}</label>
                <Input
                  placeholder={t.app.enterMaterialName}
                  value={materialName}
                  onChange={(e) => setMaterialName(e.target.value)}
                />
              </div>

              {currentMaterial && (
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{currentMaterial.category}</Badge>
                  {currentMaterial.properties.confidence && (
                    <Badge variant="outline">
                      {(currentMaterial.properties.confidence * 100).toFixed(0)}% {t.app.confidence}
                    </Badge>
                  )}
                </div>
              )}

              <div className="pt-4 border-t space-y-3">
                {materialMode === 'element' && (
                  <>
                    <OptimizationDialog
                      targetProperties={properties || undefined}
                      onSelectResult={handleOptimizationResult}
                    />
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full"
                      onClick={handleSaveMaterial}
                      disabled={!properties}
                    >
                      {t.app.saveMaterial}
                    </Button>
                  </>
                )}
                {materialMode === 'polymer' && (
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={handleSaveMaterial}
                    disabled={!properties}
                  >
                    {t.app.savePolymer}
                  </Button>
                )}
              </div>
            </Card>

            {materialMode === 'element' && Object.keys(composition).length > 0 && (
              <SimulationControls
                composition={composition}
                onPropertiesPredict={setProperties}
              />
            )}

            {materialMode === 'polymer' && selectedMonomers.length > 0 && (
              <PolymerBuilder
                selectedMonomers={selectedMonomers}
                onPropertiesPredict={handlePolymerPropertiesPredict}
                onCompositionChange={setComposition}
              />
            )}
          </div>
        </div>

        {properties && (
          <div className="mt-8 space-y-6">
            <SustainabilityCostSummary properties={properties} />
            <PropertyDisplay properties={properties} />
            {thermalProperties && materialMode === 'polymer' && (
              <ThermalPropertyDisplay properties={thermalProperties} />
            )}
            
            {materialMode === 'element' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CompositionAnalysis
                  composition={composition}
                  properties={properties}
                  onApplyModification={handleApplyRecommendation}
                />
                <RecommendationPanel
                  targetProperties={properties}
                  currentComposition={composition}
                  onApplyRecommendation={handleApplyRecommendation}
                />
              </div>
            )}
          </div>
        )}

        {savedMaterials && savedMaterials.length > 0 && (
          <div className="mt-12">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">{t.app.savedMaterials} ({savedMaterials.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedMaterials.map((material) => (
                  <Card
                    key={material.id}
                    className="p-4 hover:shadow-lg transition-all cursor-pointer group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-sm">{material.name}</h3>
                        <Badge variant="secondary" className="text-xs shrink-0">
                          {material.category}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(material.composition).slice(0, 4).map(([symbol, percent]) => (
                          <Badge key={symbol} variant="outline" className="text-xs">
                            {symbol} {percent.toFixed(1)}%
                          </Badge>
                        ))}
                        {Object.keys(material.composition).length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{Object.keys(material.composition).length - 4}
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleSelectMaterial(material)
                          }}
                        >
                          {t.app.edit}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="default" 
                          className="flex-1 gap-1"
                          onClick={(e) => {
                            e.stopPropagation()
                            setCurrentMaterial(material)
                            setComposition(material.composition)
                            setProperties(material.properties)
                            setMaterialName(material.name)
                            setViewMode('results')
                          }}
                        >
                          <ChartLine size={14} />
                          {t.app.results}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}

export default App