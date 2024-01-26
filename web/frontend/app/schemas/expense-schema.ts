import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const schema = z.object({
  userId: z.string(),
  name: z.string().min(1),
  amount: z.string().min(1),
  type: z.string().min(1),
});

export type Inputs = z.infer<typeof schema>;
