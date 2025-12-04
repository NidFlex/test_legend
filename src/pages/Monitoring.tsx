import { useYokaiMonitoring } from '@/features/monitoring/hooks/useYokaiMonitoring';
import { MonitoringHeader } from '@/features/monitoring/ui/MonitoringHeader';
import { YokaiGrid } from '@/features/monitoring/ui/YokaiGrid';
import { Loader2 } from 'lucide-react';

export default function Monitoring() {
  const { yokaiList, isLoading, error, captureYokai, capturingId } = useYokaiMonitoring();

  const activeCount = yokaiList.filter(y => y.status === 'Active').length;
  const capturedCount = yokaiList.filter(y => y.status === 'Captured').length;
  const criticalCount = yokaiList.filter(y => y.status === 'Active' && y.threatLevel === 'Critical').length;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-accent animate-spin mx-auto mb-4" />
          <p className="font-display text-lg text-muted-foreground">
            Сканирование духовных аномалий...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-destructive/10 border border-destructive/30 rounded-lg p-8">
          <p className="font-display text-xl text-destructive mb-2">
            Ошибка соединения
          </p>
          <p className="text-muted-foreground">
            Не удалось подключиться к сети мониторинга
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <MonitoringHeader
          activeCount={activeCount}
          capturedCount={capturedCount}
          criticalCount={criticalCount}
        />
        
        <YokaiGrid
          yokaiList={yokaiList}
          onCapture={captureYokai}
          capturingId={capturingId}
        />

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p className="font-display tracking-wider">
            Токийский отряд по отлову ёкаев
          </p>
          <p className="mt-1 text-xs">
            Обновление в реальном времени каждые 5 сек • Симуляция 30% неудачных захватов активна
          </p>
        </footer>
      </div>
    </main>
  );
}
