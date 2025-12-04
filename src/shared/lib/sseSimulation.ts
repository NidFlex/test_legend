import { SSEEvent, ThreatLevel } from '../types/yokai';
import { yokaiApi } from '../api/yokaiApi';
import { getRandomThreatLevel } from '../api/mockData';

type SSECallback = (event: SSEEvent) => void;

class SSESimulator {
  private callbacks: Set<SSECallback> = new Set();
  private intervalId: number | null = null;

  subscribe(callback: SSECallback): () => void {
    this.callbacks.add(callback);
    
    if (this.callbacks.size === 1) {
      this.startSimulation();
    }

    return () => {
      this.callbacks.delete(callback);
      if (this.callbacks.size === 0) {
        this.stopSimulation();
      }
    };
  }

  private startSimulation() {
    console.log('[SSE] Starting real-time threat simulation...');
    
    this.intervalId = window.setInterval(() => {
      const yokaiList = yokaiApi.getStore().filter(y => y.status === 'Active');
      
      if (yokaiList.length === 0) return;

      // Pick a random active yokai
      const randomYokai = yokaiList[Math.floor(Math.random() * yokaiList.length)];
      const newThreatLevel = getRandomThreatLevel();

      // Only emit if threat level actually changed
      if (randomYokai.threatLevel !== newThreatLevel) {
        yokaiApi.updateThreatLevel(randomYokai.id, newThreatLevel);

        const event: SSEEvent = {
          type: 'threat_update',
          yokaiId: randomYokai.id,
          newThreatLevel,
          timestamp: new Date().toISOString(),
        };

        console.log(`[SSE] Threat update: ${randomYokai.name} → ${newThreatLevel}`);
        
        this.callbacks.forEach(callback => callback(event));
      }
    }, 5000);
  }

  private stopSimulation() {
    if (this.intervalId) {
      console.log('[SSE] Stopping real-time threat simulation...');
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

export const sseSimulator = new SSESimulator();
