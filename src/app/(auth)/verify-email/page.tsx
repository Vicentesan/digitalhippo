import { VerifyEmail } from '@/components/VerifyEmail'
import Image from 'next/image'

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function Page({ searchParams }: PageProps) {
  const token = searchParams.token
  const email = searchParams.email

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        {token && typeof token === 'string' ? (
          <div className="grid gap-6">
            <VerifyEmail token={token} />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div className="relative mb-4 h-60 w-60 text-muted-foreground 2xl:flex">
              <Image
                src="/hippo-email-sent.png"
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                alt="hippo email sent image"
              />
            </div>

            <h3 className="font-semibold text-2xl">Check your email inbox</h3>

            {email ? (
              <p className="text-muted-foreground text-center">
                We&apos;ve sent a verification link to{' '}
                <span className="font-semibold">{email}</span>.
              </p>
            ) : (
              <p className="text-muted-foreground text-center">
                We&apos;ve sent a verification link to your email.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
