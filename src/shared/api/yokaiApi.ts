import { Yokai, YokaiListSchema, CaptureResponse, CaptureResponseSchema } from '../types/yokai';
import { mockYokaiData } from './mockData';

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory store for yokai data (simulates database)
let yokaiStore = [...mockYokaiData];

export const yokaiApi = {
  // Fetch all yokai
  async getYokaiList(): Promise<Yokai[]> {
    await delay(500);
    const validated = YokaiListSchema.parse(yokaiStore);
    return validated;
  },

  // Capture a yokai (30% failure rate)
  async captureYokai(yokaiId: string): Promise<CaptureResponse> {
    await delay(800);
    
    // 30% chance of failure
    const shouldFail = Math.random() < 0.3;
    
    if (shouldFail) {
      const response: CaptureResponse = {
        success: false,
        message: 'Capture failed! The yokai escaped using supernatural abilities.',
        yokaiId,
      };
      CaptureResponseSchema.parse(response);
      throw new Error(response.message);
    }

    // Update the store
    yokaiStore = yokaiStore.map(y => 
      y.id === yokaiId ? { ...y, status: 'Captured' as const } : y
    );

    const response: CaptureResponse = {
      success: true,
      message: 'Yokai successfully captured and contained!',
      yokaiId,
    };
    
    return CaptureResponseSchema.parse(response);
  },

  // Update threat level (called by SSE simulation)
  updateThreatLevel(yokaiId: string, newLevel: Yokai['threatLevel']): Yokai | null {
    const yokai = yokaiStore.find(y => y.id === yokaiId);
    if (yokai && yokai.status === 'Active') {
      yokai.threatLevel = newLevel;
      return yokai;
    }
    return null;
  },

  // Get current store (for SSE simulation)
  getStore(): Yokai[] {
    return yokaiStore;
  },
};
