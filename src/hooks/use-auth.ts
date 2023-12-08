import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const useAuth = () => {
  const router = useRouter()

  const signOut = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (!res.ok) throw new Error()

      toast.success('Singed out successfully.')

      router.push('/sign-in')
      router.refresh()
    } catch (err) {
      toast.error("Couldn't Sign out, please try again.")
    }
  }

  return { signOut }
}
