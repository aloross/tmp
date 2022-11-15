import { Header } from './header'
import { Footer } from './footer'

interface Props {
  children: React.ReactNode
}

export function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
