import { Atom } from '@phosphor-icons/react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
  onClick?: () => void
}

export function Logo({ size = 'md', showText = true, className = '', onClick }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  }

  const iconSizes = {
    sm: 20,
    md: 24,
    lg: 36
  }

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-3xl'
  }

  return (
    <div 
      className={`flex items-center gap-3 ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''} ${className}`}
      onClick={onClick}
    >
      <div className={`${sizeClasses[size]} rounded-lg bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-lg`}>
        <Atom size={iconSizes[size]} className="text-primary-foreground" weight="fill" />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizes[size]} font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent`}>
            MatTailor
          </span>
          {size === 'lg' && (
            <span className="text-sm text-muted-foreground font-medium">Material Intelligence</span>
          )}
        </div>
      )}
    </div>
  )
}
