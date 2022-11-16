import { ComponentProps, ElementRef, forwardRef, ReactNode } from 'react'
import cx from 'classnames'
import styles from './input.module.css'
import { Label } from '../label'

type InputProps = ComponentProps<'input'> & {
  label?: ReactNode
  error?: { message?: string; type: string }
}

export const Input = forwardRef<ElementRef<'input'>, InputProps>(
  ({ label, required, error, ...props }, forwardedRef) => {
    return (
      <div>
        {label && (
          <Label
            className={styles.label}
            htmlFor={props.id}
            required={required}
          >
            {label}
          </Label>
        )}
        <input
          ref={forwardedRef}
          className={cx(styles.input, { [styles.inputError]: !!error })}
          aria-invalid={error ? 'true' : 'false'}
          {...props}
        />
        {error?.message && (
          <p className={styles.errorMessage}>{error.message}</p>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'
