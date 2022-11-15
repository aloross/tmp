import { ComponentProps } from 'react'
import cx from 'classnames'
import * as LabelPrimitive from '@radix-ui/react-label'
import styles from './label.module.css'

export default function Label(
  props: ComponentProps<typeof LabelPrimitive.Root>,
) {
  return (
    <LabelPrimitive.Root
      className={cx(styles.defaultLabel, props.className)}
      {...props}
    />
  )
}
