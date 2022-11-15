import { ComponentProps, ElementRef, forwardRef, ReactNode } from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import styles from './radio-group.module.css'
import Label from '../label'

const RadioGroup = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Root>,
  ComponentProps<typeof RadioGroupPrimitive.Root>
>((props, forwardedRef) => (
  <RadioGroupPrimitive.Root
    className={styles.root}
    ref={forwardedRef}
    {...props}
  />
))
RadioGroup.displayName = 'RadioGroup'

const RadioGroupIndicator = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Indicator>,
  ComponentProps<typeof RadioGroupPrimitive.Indicator>
>((props, forwardedRef) => (
  <RadioGroupPrimitive.Indicator
    className={styles.indicator}
    ref={forwardedRef}
    {...props}
  />
))
RadioGroupIndicator.displayName = 'RadioGroupIndicator'

const RadioGroupItem = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Item>,
  ComponentProps<typeof RadioGroupPrimitive.Item> & { label?: ReactNode }
>(({ label, ...props }, forwardedRef) => (
  <div className={styles.itemWrapper}>
    <RadioGroupPrimitive.Item
      className={styles.item}
      ref={forwardedRef}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className={styles.indicator} />
    </RadioGroupPrimitive.Item>
    {label && (
      <Label className={styles.label} htmlFor={props.id}>
        {label}
      </Label>
    )}
  </div>
))
RadioGroupItem.displayName = 'RadioGroupItem'

export { RadioGroup, RadioGroupItem }
