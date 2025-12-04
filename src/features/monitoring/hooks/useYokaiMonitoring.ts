import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useCallback } from 'react';
import { yokaiApi } from '@/shared/api/yokaiApi';
import { sseSimulator } from '@/shared/lib/sseSimulation';
import { Yokai, SSEEvent } from '@/shared/types/yokai';
import { toast } from '@/hooks/use-toast';

const threatLabels = {
  Critical: 'Критический',
  High: 'Высокий',
  Medium: 'Средний',
  Low: 'Низкий',
};

export function useYokaiMonitoring() {
  const queryClient = useQueryClient();

  // Fetch yokai list
  const {
    data: yokaiList = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['yokai'],
    queryFn: yokaiApi.getYokaiList,
    refetchOnWindowFocus: false,
  });

  // Capture mutation with optimistic update
  const captureMutation = useMutation({
    mutationFn: yokaiApi.captureYokai,
    onMutate: async (yokaiId: string) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['yokai'] });

      // Snapshot previous value
      const previousYokai = queryClient.getQueryData<Yokai[]>(['yokai']);

      // Optimistically update
      queryClient.setQueryData<Yokai[]>(['yokai'], (old) =>
        old?.map((y) =>
          y.id === yokaiId ? { ...y, status: 'Captured' as const } : y
        )
      );

      const yokai = previousYokai?.find(y => y.id === yokaiId);
      
      toast({
        title: '🎯 Начинаем отлов',
        description: `Пытаемся поймать ${yokai?.name}...`,
      });

      return { previousYokai };
    },
    onError: (err, yokaiId, context) => {
      // Rollback on error
      queryClient.setQueryData(['yokai'], context?.previousYokai);
      
      const yokai = context?.previousYokai?.find(y => y.id === yokaiId);
      
      toast({
        variant: 'destructive',
        title: '❌ Неудача!',
        description: `${yokai?.name} сбежал! Дух применил сверхъестественные способности.`,
      });
    },
    onSuccess: (data) => {
      const yokai = yokaiList.find(y => y.id === data.yokaiId);
      
      toast({
        title: '✨ Успешно поймали!',
        description: `${yokai?.name} успешно схвачен и изолирован.`,
      });
    },
  });

  // SSE subscription for real-time updates
  useEffect(() => {
    const unsubscribe = sseSimulator.subscribe((event: SSEEvent) => {
      if (event.type === 'threat_update') {
        queryClient.setQueryData<Yokai[]>(['yokai'], (old) =>
          old?.map((y) =>
            y.id === event.yokaiId
              ? { ...y, threatLevel: event.newThreatLevel }
              : y
          )
        );

        const yokai = yokaiList.find(y => y.id === event.yokaiId);
        if (yokai) {
          toast({
            title: '⚠️ Изменение уровня угрозы',
            description: `${yokai.name}: новый уровень — ${threatLabels[event.newThreatLevel]}`,
          });
        }
      }
    });

    return unsubscribe;
  }, [queryClient, yokaiList]);

  const captureYokai = useCallback(
    (yokaiId: string) => {
      captureMutation.mutate(yokaiId);
    },
    [captureMutation]
  );

  return {
    yokaiList,
    isLoading,
    error,
    captureYokai,
    capturingId: captureMutation.isPending ? captureMutation.variables : null,
  };
}
