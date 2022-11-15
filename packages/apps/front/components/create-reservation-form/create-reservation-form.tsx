import { Input } from '@tfm4/ui/dist/atoms/input'
import { Button } from '@tfm4/ui/dist/atoms/button'
import { Fieldset } from '@tfm4/ui/dist/atoms/fieldset'
import { RadioGroup, RadioGroupItem } from '@tfm4/ui/dist/atoms/radio-group'
import { SubmitHandler, useForm } from 'react-hook-form'
import styles from './create-reservation-form.module.css'

export type CreateBookingInputs = {
  pax: number
  date: string
  timeslot: string
}

export type OnSubmit = SubmitHandler<CreateBookingInputs>

export function CreateReservationForm({
  onSubmit,
  loading,
}: {
  onSubmit: OnSubmit
  loading: boolean
}) {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBookingInputs>()
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Create a reservation</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset>
          <Input
            disabled={loading}
            id="date"
            type="date"
            error={errors.date}
            defaultValue={new Date().toISOString().split('T')[0]}
            label={
              <>
                Date<span aria-label="required">*</span>
              </>
            }
            {...register('date', {
              required: 'This field is required',
            })}
          />
        </Fieldset>
        <Fieldset
          legend={
            <>
              Time<span aria-label="required">*</span>
            </>
          }
        >
          <RadioGroup onValueChange={(value) => setValue('timeslot', value)}>
            <RadioGroupItem
              id="1200"
              value="1200"
              label="12:00"
              {...register('timeslot', { required: true })}
            />
            <RadioGroupItem
              id="1230"
              value="1230"
              label="12:30"
              {...register('timeslot', { required: true })}
            />
            <RadioGroupItem
              id="1300"
              value="1300"
              label="13:00"
              {...register('timeslot', { required: true })}
            />
            <RadioGroupItem
              id="1330"
              value="1330"
              label="13:30"
              {...register('timeslot', { required: true })}
            />
            <RadioGroupItem
              id="1400"
              value="1400"
              label="14:00"
              {...register('timeslot', { required: true })}
            />
            <RadioGroupItem
              id="1430"
              value="1430"
              label="14:30"
              {...register('timeslot', { required: true })}
            />
          </RadioGroup>
        </Fieldset>
        <Fieldset>
          <Input
            disabled={loading}
            id="pax"
            type="number"
            error={errors.pax}
            label={
              <>
                Guests<span aria-label="required">*</span>
              </>
            }
            {...register('pax', { required: 'This field is required' })}
          />
        </Fieldset>
        <div className={styles.submitWrapper}>
          <Button disabled={loading} type="submit">
            {loading ? '...' : 'Create'}
          </Button>
        </div>
      </form>
      <i className={styles.requiredHelper}>
        Required fields are followed by <span aria-label="required">*</span>.
      </i>
    </section>
  )
}
