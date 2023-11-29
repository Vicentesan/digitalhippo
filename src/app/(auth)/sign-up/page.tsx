'use client'

import { Icons } from '@/components/Icons'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import {
  TAuthCredentialSchema,
  authCredentialSchema,
} from '@/lib/validators/account-credentials'
import { trpc } from '@/trpc/client'

import { toast } from 'sonner'
import { ZodError } from 'zod'
import { useRouter } from 'next/navigation'

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialSchema>({
    resolver: zodResolver(authCredentialSchema),
  })

  const router = useRouter()

  const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
    onError: (err) => {
      if (err.data?.code === 'CONFLICT') {
        toast.error('This email is already in use. Sign in instead?')

        return
      }

      if (err instanceof ZodError) {
        toast.error(err.issues[0].message)

        return
      }

      return toast.error('There was a problem creating your account')
    },
    onSuccess: ({ sentToEmail }) => {
      toast.success(
        `A verification email has been sent to ${sentToEmail}. Please check your inbox.`,
      )
      router.push('/verify-email?email=' + sentToEmail)
    },
  })

  const onSubmit = ({ email, password }: TAuthCredentialSchema) => {
    mutate({ email, password })
  }

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="w-20 h-20" />
            <h1 className="text-2xl font-bold">Create an account</h1>

            <Link
              className={buttonVariants({
                variant: 'link',
                className: 'gap-1.5',
              })}
              href="/sign-in"
            >
              Already have an account? Sign in
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    {...register('email')}
                    type="email"
                    autoComplete="email"
                    className={cn({
                      'focus-visible:ring-red-500': errors.email,
                    })}
                    placeholder="you@example.com"
                  />
                  {errors?.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    {...register('password')}
                    type="password"
                    autoComplete="new-password"
                    className={cn({
                      'focus-visible:ring-red-500': errors.password,
                    })}
                    placeholder="Password"
                  />
                  {errors?.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button isLoading={isLoading}>Sign up</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
