import { useKV } from '@github/spark/hooks'
import { Language, getTranslation } from '@/lib/i18n'

export function useLanguage() {
  const [language, setLanguage] = useKV<Language>('app-language', 'en')
  const currentLanguage = language || 'en'
  const t = getTranslation(currentLanguage)

  return {
    language: currentLanguage,
    setLanguage,
    t,
    isRTL: currentLanguage === 'ar'
  }
}
