import { ComponentProps } from 'react'
import styles from './button.module.css'

export function Button(props: ComponentProps<'button'>) {
  return <button className={styles.button} {...props} />
}
