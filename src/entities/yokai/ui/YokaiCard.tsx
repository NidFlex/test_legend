import { Yokai, ThreatLevel } from '@/shared/types/yokai';
import { MapPin, Clock, Skull, Ghost } from 'lucide-react';
import { cn } from '@/lib/utils';

interface YokaiCardProps {
  yokai: Yokai;
  onCapture: (id: string) => void;
  isCapturing: boolean;
}

const threatConfig: Record<ThreatLevel, { class: string; glowClass: string; icon: string; label: string }> = {
  Critical: { class: 'threat-critical', glowClass: 'card-glow-critical', icon: '🔥', label: 'Критический' },
  High: { class: 'threat-high', glowClass: 'card-glow-high', icon: '⚠️', label: 'Высокий' },
  Medium: { class: 'threat-medium', glowClass: 'card-glow-medium', icon: '⚡', label: 'Средний' },
  Low: { class: 'threat-low', glowClass: 'card-glow-low', icon: '✧', label: 'Низкий' },
};

export function YokaiCard({ yokai, onCapture, isCapturing }: YokaiCardProps) {
  const config = threatConfig[yokai.threatLevel];
  const isCaptured = yokai.status === 'Captured';
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg border border-border bg-card p-5 transition-all duration-500',
        'hover:border-accent/50 hover:scale-[1.02]',
        !isCaptured && config.glowClass,
        isCaptured && 'opacity-60 grayscale-[30%]',
        'border-glow'
      )}
    >
      {/* Status indicator */}
      <div className="absolute top-3 right-3">
        {isCaptured ? (
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
            <Ghost className="w-3 h-3" />
            Пойман
          </span>
        ) : (
          <span className="flex items-center gap-1.5 animate-pulse-glow">
            <span className="w-2 h-2 rounded-full bg-threat-critical animate-ping absolute" />
            <span className="w-2 h-2 rounded-full bg-threat-critical" />
          </span>
        )}
      </div>

      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl animate-float">{config.icon}</span>
          <div>
            <h3 className="font-display text-xl font-bold text-foreground tracking-wide">
              {yokai.name}
            </h3>
            <span className="text-sm text-muted-foreground font-body">
              {yokai.type}
            </span>
          </div>
        </div>
        
        <span className={cn('threat-badge', config.class)}>
          {config.label}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {yokai.description}
      </p>

      {/* Info */}
      <div className="space-y-2 mb-5">
        <div className="flex items-center gap-2 text-sm text-foreground/80">
          <MapPin className="w-4 h-4 text-accent" />
          <span>{yokai.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>Последний раз: {formatTime(yokai.lastSeen)}</span>
        </div>
      </div>

      {/* Capture Button */}
      {!isCaptured && (
        <button
          onClick={() => onCapture(yokai.id)}
          disabled={isCapturing}
          className={cn(
            'w-full py-3 px-4 rounded-md font-display font-bold uppercase tracking-wider text-sm',
            'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground',
            'border border-primary/50 shadow-lg shadow-primary/20',
            'hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98]',
            'transition-all duration-200',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
            'flex items-center justify-center gap-2'
          )}
        >
          {isCapturing ? (
            <>
              <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Ловим...
            </>
          ) : (
            <>
              <Skull className="w-4 h-4" />
              Поймать
            </>
          )}
        </button>
      )}
    </div>
  );
}
