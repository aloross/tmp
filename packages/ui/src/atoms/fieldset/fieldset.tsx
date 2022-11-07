import { ComponentProps, ReactNode } from 'react'
import styles from './fieldset.module.css'

type FieldsetProps = ComponentProps<'fieldset'> & { legend?: ReactNode }

export default function Fieldset({ legend, ...props }: FieldsetProps) {
  return (
    <fieldset className={styles.fieldset} {...props}>
      {legend && <legend className={styles.legend}>{legend}</legend>}
      {props.children}
    </fieldset>
  )
}
