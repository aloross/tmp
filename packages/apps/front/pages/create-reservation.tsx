import { useState } from 'react'
import CreateReservationForm, {
  CreateBookingInputs,
  OnSubmit,
} from '../components/create-reservation-form'
import styles from './create-reservation.module.css'

export default function CreateBooking() {
  const [loading, setLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState<CreateBookingInputs>()
  const onSubmit: OnSubmit = (data) => {
    setLoading(true)

    setTimeout(() => {
      setFormData(data)
      setLoading(false)
    }, 2000)
    setFormData(data)
  }

  return (
    <div className={styles.container}>
      <section className={styles.form}>
        <CreateReservationForm onSubmit={onSubmit} loading={loading} />
      </section>
      <aside className={styles.list}>
        <pre>{JSON.stringify(formData)}</pre>
      </aside>
    </div>
  )
}
