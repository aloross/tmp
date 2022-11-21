import React, { FC, ReactNode } from 'react'
import * as HoverCard from '@radix-ui/react-hover-card'
import format from 'date-fns/format'

import styles from './card.module.css'

export interface CardProps {
  children?: ReactNode
  date: string
  guest: number
}

export const Card: FC<CardProps> = ({ children, date, guest }) => {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <div className={styles.card}>
          <div className={styles.card__container}>
            <p>date: {format(new Date(date), 'eeee dd MMMM yyyy')}</p>
            <p>guests: {guest}</p>
          </div>
        </div>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content sideOffset={5} className={styles.card__portalContainer}>
          {children}
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  )
}
