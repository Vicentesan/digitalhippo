'use client'

import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { CheckIcon, X } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import { Product } from '@/payload-types'

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem, items } = useCart()
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const filteredItems = items.filter(Boolean)

  const item = filteredItems.find((i) => i.product.id === product.id)

  const isPurchased = !!item

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [isSuccess])

  return (
    <div className="transation">
      <Button
        onClick={() => {
          addItem(product)
          setIsSuccess(true)
        }}
        size="lg"
        disabled={
          (isMounted && isSuccess) || (isMounted && isPurchased) || !isMounted
        }
        className={cn('w-full gap-2', {
          'bg-green-500 hover:bg-green-300 duration-300':
            (isMounted && isSuccess) || (isMounted && isPurchased),
        })}
      >
        {(isMounted && isSuccess) || (isMounted && isPurchased) ? (
          <CheckIcon className="w-4 h-4" />
        ) : null}
        {(isMounted && isSuccess) || (isMounted && isPurchased)
          ? 'Added to cart!'
          : 'Add to cart'}
      </Button>
      {(isMounted && isSuccess) || (isMounted && isPurchased) ? (
        <p className="flex w-fit mx-auto mt-1 gap-2 items-center text-xs text-muted-foreground font-medium hover:text-red-500 duration-300">
          <X className="w-5 h-5" />
          You cannot add this product to your cart multiple times
        </p>
      ) : null}
    </div>
  )
}
