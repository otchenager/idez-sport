import { useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Oils from './components/Oils'
import Compare from './components/Compare'
import HowToUse from './components/HowToUse'
import ProductLine from './components/ProductLine'
import Reviews from './components/Reviews'
import Guarantee from './components/Guarantee'
import BuyNow from './components/BuyNow'

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState('sport')

  function handleSelectProduct(id) {
    setSelectedProduct(id)
    setTimeout(() => {
      document.querySelector('#buy')?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  return (
    <>
      <Nav />
      <Hero />
      <Oils />
      <Compare />
      <HowToUse />
      <ProductLine onSelect={handleSelectProduct} />
      <Reviews />
      <Guarantee />
      <BuyNow selectedId={selectedProduct} onSelect={setSelectedProduct} />
      <footer style={{
        background: '#0a0a0a',
        borderTop: '1px solid #2a2a2a',
        padding: '32px 24px',
        textAlign: 'center',
        color: 'rgba(240,240,240,0.3)',
        fontFamily: "'Barlow', sans-serif",
        fontSize: '0.8rem',
        letterSpacing: '0.05em',
      }}>
        © 2025 iDEZ. Все права защищены.
      </footer>
    </>
  )
}
