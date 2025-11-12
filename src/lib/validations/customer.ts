import { z } from 'zod';

export const createCustomerSchema = z.object({
  name: z.string().min(1, 'Company name is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(1, 'Company address is required'),
  photo_url: z.string().optional(),
});

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
