import { z } from 'zod';

export const createBusinessSchema = z.object({
  name: z.string().min(1, 'Business name is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(1, 'Address is required'),
  phone_number: z.string().min(1, 'Phone number is required'),
  photo_url: z.string().optional(),
});

export type CreateBusinessInput = z.infer<typeof createBusinessSchema>;
