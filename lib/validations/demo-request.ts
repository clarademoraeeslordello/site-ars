import { z } from "zod";

export const demoRequestSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  role: z.string().min(2),
  employees: z.string().min(1),
  country: z.string().min(2),
  frameworks: z.array(z.string()).min(1),
  message: z.string().optional(),
});

export type DemoRequestData = z.infer<typeof demoRequestSchema>;
