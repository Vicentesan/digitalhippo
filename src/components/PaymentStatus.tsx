'use client'

import { useCart } from '@/hooks/use-cart'
import { Product } from '@/payload-types'
import { trpc } from '@/trpc/client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface PaymentStatusProps {
  orderEmail: string
  orderId: string
  isPaid: boolean
  productsIds: string[]
}

export function PaymentStatus({
  orderEmail,
  orderId,
  isPaid,
  productsIds
}: PaymentStatusProps) {
  const router = useRouter()

  const { removeItem } = useCart()

  const { data } = trpc.payment.pollOrderStatus.useQuery(
    { orderId },
    {
      enabled: isPaid === false,
      refetchInterval: (data) => (data?.isPaid ? false : 1000),
    },
  )

  useEffect(() => {
    if (data?.isPaid) router.refresh()
  }, [data?.isPaid, router])

  if(isPaid) {
  productsIds.forEach(function(pId) {
    removeItem(pId)
  })
  }

  return (
    <div className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
      <div>
        <p className="font-medium text-gray-900">Shipping to</p>
        <p className="font-medium text-gray-900">{orderEmail}</p>
      </div>

      <div>
        <p className="font-medium text-gray-900">Order status</p>
        <p>{isPaid ? 'Payment successful' : 'Pending payment'}</p>
      </div>
    </div>
  )
}
