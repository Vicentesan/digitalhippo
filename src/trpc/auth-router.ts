import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { getPayloadClient } from '../get-payload'
import { authCredentialSchema } from '../lib/validators/account-credentials'
import { publicProcedure, router } from './trpc'

export const authRouter = router({
  createPayloadUser: publicProcedure
    .input(authCredentialSchema)
    .mutation(async ({ input }) => {
      const { email, password } = input
      const payload = await getPayloadClient()

      // check if user already exists
      const { docs: users } = await payload.find({
        collection: 'users',
        where: {
          email: {
            equals: email.toLocaleLowerCase(),
          },
        },
      })

      if (users.length !== 0)
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'User already exists',
        })

      await payload.create({
        collection: 'users',
        data: {
          email: email.toLocaleLowerCase(),
          password,
          role: 'user',
        },
      })

      return { success: true, sentToEmail: email }
    }),
  verifyEmail: publicProcedure
    .input(
      z.object({
        token: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { token } = input
      const payload = getPayloadClient()

      const isVerified = (await payload).verifyEmail({
        collection: 'users',
        token,
      })

      if (!isVerified)
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid token',
        })

      return { success: true }
    }),
  signIn: publicProcedure
    .input(authCredentialSchema)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input
      const { res } = ctx
      const payload = await getPayloadClient()

      try {
        payload.login({
          collection: 'users',
          data: {
            email: email.toLocaleLowerCase(),
            password,
          },
          res,
        })

        return { success: true }
      } catch (err) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }
    }),
})
