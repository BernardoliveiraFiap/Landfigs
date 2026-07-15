import { CartProvider } from './hooks/useCart'
import { CartBar } from './components/CartBar'
import { CartDrawer } from './components/CartDrawer'
import { Catalog } from './components/Catalog'
import { Faq } from './components/Faq'
import { FlagsMarquee } from './components/FlagsMarquee'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { Legends } from './components/Legends'
import { Semifinalists } from './components/Semifinalists'
import { Specials } from './components/Specials'
import { StickerFinder } from './components/StickerFinder'
import { Testimonials } from './components/Testimonials'
import { TrustBar } from './components/TrustBar'
import { WhatsAppFab } from './components/WhatsAppFab'

export default function App() {
  return (
    <CartProvider>
      <div id="top">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-paper focus:px-4 focus:py-2 focus:font-bold focus:shadow-pop"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo">
          <Hero />
          <FlagsMarquee />
          <TrustBar />
          <StickerFinder />
          <Semifinalists />
          <Legends />
          <Catalog />
          <Specials />
          <HowItWorks />
          <Testimonials />
          <Faq />
        </main>
        <Footer />
        <CartBar />
        <CartDrawer />
        <WhatsAppFab />
      </div>
    </CartProvider>
  )
}
