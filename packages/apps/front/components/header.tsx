import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const { data: session } = useSession()

  return (
    <header>
      <noscript>
        <style>{'.nojs-show { opacity: 1; top: 0; }'}</style>
      </noscript>
      <div>
        <p>
          {!session && (
            <>
              <span>You are not signed in</span>
              <a
                href={'/api/auth/signin'}
                onClick={(e) => {
                  e.preventDefault()
                  signIn('github')
                }}
              >
                Sign in
              </a>
            </>
          )}
          {session?.user && (
            <>
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url('${session.user.image}')` }}
                />
              )}
              <span>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email ?? session.user.name}</strong>
              </span>
              <a
                href={'/api/auth/signout'}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign out
              </a>
            </>
          )}
        </p>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/me">Me</Link>
          </li>
          <li>
            <Link href="/create-reservation">Create reservation</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
