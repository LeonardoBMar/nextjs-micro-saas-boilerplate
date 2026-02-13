import { z } from "zod"

/**
 * Shared Zod schemas for forms and server actions.
 * Use the same schema on both client (React Hook Form) and server (actions) to stay DRY.
 */

export const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
})

export const feedbackSchema = z.object({
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be under 1000 characters"),
  rating: z.coerce.number().min(1).max(5).optional(),
})

// Add more domain-specific schemas here as you build features.
