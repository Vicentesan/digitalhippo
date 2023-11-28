import { z } from 'zod'

export const authCredentialSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' }),
})

export type TAuthCredentialSchema = z.infer<typeof authCredentialSchema>
