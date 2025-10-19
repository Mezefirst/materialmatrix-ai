import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Logo } from '@/components/Logo'
import { LanguageSelector } from '@/components/LanguageSelector'
import { useLanguage } from '@/hooks/use-language'
import { Atom, ChartLine, Leaf, Drop, ArrowRight, Flask, Database, Sparkle } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface LandingPageProps {
  onEnter: () => void
}

export function LandingPage({ onEnter }: LandingPageProps) {
  const { language, setLanguage, t, isRTL } = useLanguage()

  const features = [
    {
      icon: Sparkle,
      title: t.landing.features.aiPrediction.title,
      description: t.landing.features.aiPrediction.description,
      color: 'from-accent to-primary'
    },
    {
      icon: ChartLine,
      title: t.landing.features.optimization.title,
      description: t.landing.features.optimization.description,
      color: 'from-primary to-accent'
    },
    {
      icon: Leaf,
      title: t.landing.features.sustainability.title,
      description: t.landing.features.sustainability.description,
      color: 'from-success to-primary'
    },
    {
      icon: Drop,
      title: t.landing.features.polymer.title,
      description: t.landing.features.polymer.description,
      color: 'from-accent to-success'
    }
  ]

  const stats = [
    { value: '500+', label: t.landing.stats.materials },
    { value: '118', label: t.landing.stats.elements },
    { value: '100K+', label: t.landing.stats.predictions },
    { value: '95%', label: t.landing.stats.accuracy }
  ]

  return (
    <div className={`min-h-screen bg-gradient-to-br from-background via-muted/20 to-background ${isRTL ? 'rtl' : 'ltr'}`}>
      <header className="border-b bg-background/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Logo size="md" />
            <div className="flex items-center gap-3">
              <LanguageSelector 
                currentLanguage={language} 
                onLanguageChange={setLanguage}
                variant="ghost"
              />
              <Button onClick={onEnter} className="gap-2">
                {t.landing.cta.getStarted}
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden py-20 sm:py-32">
          <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:20px_20px]" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent" />
          
          <div className="container mx-auto px-4 sm:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Sparkle size={16} className="text-primary" weight="fill" />
                <span className="text-sm font-medium text-primary">{t.landing.subtitle}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  {t.landing.title}
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {t.landing.description}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button size="lg" onClick={onEnter} className="gap-2 text-base px-8">
                  {t.landing.cta.getStarted}
                  <ArrowRight size={20} />
                </Button>
                <Button size="lg" variant="outline" className="gap-2 text-base px-8">
                  <Flask size={20} />
                  {t.landing.cta.learnMore}
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  >
                    <Card className="p-6 text-center border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                      <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 sm:py-32 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                {t.landing.features.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t.landing.description}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-8 h-full hover:shadow-xl transition-all border-2 hover:border-primary/30 group">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <feature.icon size={28} className="text-white" weight="fill" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-transparent" />
          
          <div className="container mx-auto px-4 sm:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <Card className="p-12 text-center border-2 bg-gradient-to-br from-card via-card to-muted/20">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-2xl">
                    <Atom size={40} className="text-primary-foreground" weight="fill" />
                  </div>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  {t.landing.cta.getStarted}
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  {t.landing.description}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button size="lg" onClick={onEnter} className="gap-2 text-base px-8">
                    <Flask size={20} />
                    {t.landing.cta.getStarted}
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2 text-base px-8">
                    <Database size={20} />
                    {t.nav.features}
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Logo size="sm" />
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>© 2024 MatTailor</span>
              <span>•</span>
              <span>{t.landing.subtitle}</span>
            </div>
            <LanguageSelector 
              currentLanguage={language} 
              onLanguageChange={setLanguage}
              variant="outline"
            />
          </div>
        </div>
      </footer>
    </div>
  )
}
