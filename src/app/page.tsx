import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Main from '@/components/Main'

export default function Home () {
  return (
    <main className="px-4  grid min-h-screen m-auto max-w-screen-lg grid-rows-[60px,1fr,60px] gap-4">
      <Header />
      <Main />
      <Footer />
    </main>
  )
}
