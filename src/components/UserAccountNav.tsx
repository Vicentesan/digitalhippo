'use client'

import { useAuth } from '@/hooks/use-auth'
import { LogOut, UserIcon } from 'lucide-react'
import Link from 'next/link'
import { User } from '../payload-types'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function UserAccountNav({
  user,
  align,
}: {
  user: User
  align?: 'start' | 'center' | 'end'
}) {
  const { signOut } = useAuth()

  const contentAlign = align || 'end'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <Button
          variant="ghost"
          size="sm"
          className="relative gap-2 justify-center items-center"
        >
          <UserIcon className="w-4 h-4 text-base" /> My account
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white w-60" align={contentAlign}>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            <p className="font-medium text-sm text-black">{user.email}</p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/sell">Seller Dashboard</Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={signOut}
          className="cursor-pointer gap-2 focus:bg-destructive/50"
        >
          Log out <LogOut className="w-4 h-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
