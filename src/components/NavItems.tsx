'use client'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

import { PRODUCT_CATEGORIES } from '@/config'
import Image from 'next/image'
import Link from 'next/link'

export function NavItems() {
  return (
    <div className="flex gap-4 h-full">
      <NavigationMenu>
        <NavigationMenuList>
          {PRODUCT_CATEGORIES.map((category, index) => (
            <NavigationMenuItem key={index}>
              <NavigationMenuTrigger>{category.label}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 w-full lg:grid-cols-[1fr_1fr_1fr]">
                  {category.featured.map((item, index) => (
                    <NavigationMenuItem key={index}>
                      <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle({
                            className: 'flex-col h-60 w-[25vw] max-w-xs',
                          })}
                        >
                          <div className="relative aspect-video overflow-hidden w-full h-full rounded-md">
                            <Image
                              src={item.image}
                              alt="Category Image Example"
                              fill
                              sizes="20vw"
                              className="object-cover object-center h-full"
                            />
                          </div>

                          <div className="self-start">
                            <p className="mt-2">{item.name}</p>
                            <span className="text-sm text-muted-foreground">
                              Buy now
                            </span>
                          </div>
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
