import React, { ComponentProps, ElementRef, ReactNode } from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import classnames from 'classnames'
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons'
import styles from './select.module.css'
import { Label } from '../label'

export const SelectItem = React.forwardRef<
  ElementRef<typeof SelectPrimitive.Item>,
  ComponentProps<typeof SelectPrimitive.Item>
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <SelectPrimitive.Item
      className={classnames(styles.item, className)}
      {...props}
      ref={forwardedRef}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="SelectItemIndicator">
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
})
SelectItem.displayName = 'SelectItem'

export const Select = ({
  children,
  label,
  placeholder,
  error,
  ...props
}: ComponentProps<typeof SelectPrimitive.Root> &
  ComponentProps<typeof SelectPrimitive.Trigger> & {
    children: ReactNode
    label: string
    placeholder?: string
    error?: { message?: string; type: string }
  }) => (
  <div>
    {label && (
      <Label
        className={styles.label}
        htmlFor={props.id}
        required={props.required}
      >
        {label}
      </Label>
    )}
    <SelectPrimitive.Root
      disabled={props.disabled}
      required={props.required}
      onValueChange={props.onValueChange}
      name={props.name}
    >
      <SelectPrimitive.Trigger
        className={styles.trigger}
        aria-label={label}
        id={props.id}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon>
          <ChevronDownIcon />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal style={{ minWidth: '100%' }}>
        <SelectPrimitive.Content className={styles.content}>
          <SelectPrimitive.ScrollUpButton>
            <ChevronUpIcon />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className={styles.viewport}>
            {children}
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton>
            <ChevronDownIcon />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
    {error?.message && <p className={styles.errorMessage}>{error.message}</p>}
  </div>
)
