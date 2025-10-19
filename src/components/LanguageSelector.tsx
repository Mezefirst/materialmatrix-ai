import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Globe } from '@phosphor-icons/react'
import { Language } from '@/lib/i18n'

interface LanguageSelectorProps {
  currentLanguage: Language
  onLanguageChange: (language: Language) => void
  variant?: 'default' | 'ghost' | 'outline'
}

const languages = [
  { code: 'en' as Language, name: 'English', nativeName: 'English' },
  { code: 'sv' as Language, name: 'Swedish', nativeName: 'Svenska' },
  { code: 'fr' as Language, name: 'French', nativeName: 'Français' },
  { code: 'ar' as Language, name: 'Arabic', nativeName: 'العربية' },
  { code: 'am' as Language, name: 'Amharic', nativeName: 'አማርኛ' },
]

export function LanguageSelector({ currentLanguage, onLanguageChange, variant = 'outline' }: LanguageSelectorProps) {
  const currentLang = languages.find(lang => lang.code === currentLanguage)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size="sm" className="gap-2">
          <Globe size={16} />
          <span className="hidden sm:inline">{currentLang?.nativeName || 'English'}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => onLanguageChange(language.code)}
            className={currentLanguage === language.code ? 'bg-accent' : ''}
          >
            <div className="flex items-center justify-between w-full gap-3">
              <span>{language.nativeName}</span>
              <span className="text-xs text-muted-foreground">{language.name}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
