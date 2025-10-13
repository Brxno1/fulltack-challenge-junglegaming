import { z } from 'zod'

const envSchema = z.object({
  API_GATEWAY_URL: z.string().default('http://localhost:3001'),
})

export const env = envSchema.parse(process.env)
