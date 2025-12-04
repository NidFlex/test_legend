import { Shield, Radio, AlertTriangle } from 'lucide-react';

interface MonitoringHeaderProps {
  activeCount: number;
  capturedCount: number;
  criticalCount: number;
}

export function MonitoringHeader({ activeCount, capturedCount, criticalCount }: MonitoringHeaderProps) {
  return (
    <header className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Title Section */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Shield className="w-12 h-12 text-primary" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full" />
          </div>
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold tracking-wider text-foreground text-glow">
              МОНИТОР ЁКАЕВ
            </h1>
            <p className="text-muted-foreground flex items-center gap-2 mt-1">
              <Radio className="w-4 h-4 text-accent animate-pulse" />
              <span>Отряд быстрого реагирования • Мониторинг в реальном времени</span>
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex gap-4">
          <div className="bg-secondary/50 backdrop-blur-sm rounded-lg px-4 py-3 border border-border">
            <div className="text-2xl font-display font-bold text-foreground">{activeCount}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Активных</div>
          </div>
          <div className="bg-secondary/50 backdrop-blur-sm rounded-lg px-4 py-3 border border-border">
            <div className="text-2xl font-display font-bold text-accent">{capturedCount}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Поймано</div>
          </div>
          {criticalCount > 0 && (
            <div className="bg-threat-critical/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-threat-critical/30 animate-pulse-glow">
              <div className="text-2xl font-display font-bold text-threat-critical flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                {criticalCount}
              </div>
              <div className="text-xs text-threat-critical uppercase tracking-wider">Критических</div>
            </div>
          )}
        </div>
      </div>

      {/* Scan Line Effect */}
      <div className="relative mt-6 h-px bg-border overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50 animate-shimmer" 
             style={{ backgroundSize: '200% 100%' }} />
      </div>
    </header>
  );
}
