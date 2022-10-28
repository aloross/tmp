import { useRouter } from 'next/router'
import { createRef } from 'react'

export default function Login() {
  const router = useRouter()
  const jwtInput = createRef<HTMLTextAreaElement>()
  const restaurantUuidInput = createRef<HTMLInputElement>()

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const jwt = jwtInput.current?.value
        const restaurantUuid = restaurantUuidInput.current?.value
        if (jwt && restaurantUuid) {
          localStorage.setItem('jwt', jwt)
          localStorage.setItem('restaurantUuid', restaurantUuid)
          router.push('/')
        }
      }}
    >
      <div>
        <label htmlFor="jwt">JWT</label>
        <textarea id="jwt" ref={jwtInput} />
      </div>
      <div>
        <label htmlFor="restaurantUuid">Restaurant Uuid</label>
        <input id="restaurantUuid" ref={restaurantUuidInput} />
      </div>
      <button type="submit">Go</button>
    </form>
  )
}
