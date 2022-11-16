import { ComponentProps } from 'react'
import cx from 'classnames'
import * as LabelPrimitive from '@radix-ui/react-label'
import styles from './label.module.css'

export function Label({
  children,
  required,
  ...props
}: ComponentProps<typeof LabelPrimitive.Root> & { required?: boolean }) {
  return (
    <LabelPrimitive.Root
      className={cx(styles.defaultLabel, props.className)}
      {...props}
    >
      {children}
      {required && <span aria-label="required">*</span>}
    </LabelPrimitive.Root>
  )
}
