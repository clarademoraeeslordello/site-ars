import { z } from "zod";

export const demoRequestSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  company: z.string().trim().min(2).max(160),
  role: z.string().trim().min(2).max(120),
  employees: z.string().min(1).max(40),
  country: z.string().trim().min(2).max(80),
  frameworks: z.array(z.string().max(40)).min(1).max(20),
  message: z.string().max(2000).optional(),
  // Honeypot: hidden field that people never fill.
  website: z.string().max(0).optional(),
});

export type DemoRequestData = z.infer<typeof demoRequestSchema>;
