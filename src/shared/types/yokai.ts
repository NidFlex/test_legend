import { z } from 'zod';

export const ThreatLevelSchema = z.enum(['Critical', 'High', 'Medium', 'Low']);
export type ThreatLevel = z.infer<typeof ThreatLevelSchema>;

export const YokaiStatusSchema = z.enum(['Active', 'Captured']);
export type YokaiStatus = z.infer<typeof YokaiStatusSchema>;

export const YokaiSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  threatLevel: ThreatLevelSchema,
  location: z.string(),
  status: YokaiStatusSchema,
  lastSeen: z.string(),
  description: z.string(),
});

export type Yokai = z.infer<typeof YokaiSchema>;

export const YokaiListSchema = z.array(YokaiSchema);

export const CaptureResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  yokaiId: z.string(),
});

export type CaptureResponse = z.infer<typeof CaptureResponseSchema>;

export const SSEEventSchema = z.object({
  type: z.literal('threat_update'),
  yokaiId: z.string(),
  newThreatLevel: ThreatLevelSchema,
  timestamp: z.string(),
});

export type SSEEvent = z.infer<typeof SSEEventSchema>;
