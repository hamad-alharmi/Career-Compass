import { z } from 'zod';
import { insertSearchSchema } from './schema';

export const api = {
  guidance: {
    search: {
      method: 'POST' as const,
      path: '/api/guidance/search',
      input: z.object({
        query: z.string().min(1, "Please enter a major or job title"),
        type: z.enum(['job_apps', 'related_careers', 'suggest_major'])
      }),
      responses: {
        200: z.object({
          results: z.array(z.object({
            title: z.string(),
            description: z.string(),
            link: z.string().optional()
          }))
        }),
        400: z.object({
            message: z.string(),
            field: z.string().optional()
        })
      }
    }
  }
};
