import { PRODUCT_CATEGORIES } from '@/config'
import { useCart } from '@/hooks/use-cart'
import { Product } from '@/payload-types'
import { ImageIcon, Trash } from 'lucide-react'
import Image from 'next/image'
import { Button } from './ui/button'
import { formatPrice } from '@/lib/utils'

export function CartItem({ product }: { product: Product }) {
  const { image } = product.product_images[0]

  const { removeItem } = useCart()

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category,
  )?.label

  return (
    <div className="space-y-3 py-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
            {typeof image !== 'string' && image.url ? (
              <Image
                src={image.url}
                alt={product.name}
                fill
                className="absolute object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-secondary">
                <ImageIcon
                  className="h-4 w-4 text-muted-foreground"
                  aria-hidden
                />
              </div>
            )}
          </div>

          <div className="flex flex-col self-start">
            <span className="line-clamp-1 text-sm font-medium mb-1">
              {product.name}
            </span>

            <span className="line-clam-1 text-xs capitalize text-muted-foreground">
              {label}
            </span>

            <div className="mt-4 text-xs text-muted-foreground">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeItem(product.id)}
                className="flex items-center gap-2"
                aria-label="remove product"
              >
                <Trash className="w-3 h-3" aria-hidden />
                Remove
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-1 font-medium">
          <span className="ml-auto line-clamp-1 text-sm">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </div>
  )
}
