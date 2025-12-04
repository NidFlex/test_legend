import { Yokai } from '@/shared/types/yokai';
import { YokaiCard } from '@/entities/yokai/ui/YokaiCard';
import { threatLevelOrder } from '@/shared/api/mockData';

interface YokaiGridProps {
  yokaiList: Yokai[];
  onCapture: (id: string) => void;
  capturingId: string | null;
}

export function YokaiGrid({ yokaiList, onCapture, capturingId }: YokaiGridProps) {
  // Sort: Active first, then by threat level (descending)
  const sortedYokai = [...yokaiList].sort((a, b) => {
    if (a.status !== b.status) {
      return a.status === 'Active' ? -1 : 1;
    }
    return threatLevelOrder[b.threatLevel] - threatLevelOrder[a.threatLevel];
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {sortedYokai.map((yokai) => (
        <YokaiCard
          key={yokai.id}
          yokai={yokai}
          onCapture={onCapture}
          isCapturing={capturingId === yokai.id}
        />
      ))}
    </div>
  );
}
