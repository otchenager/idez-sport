import Nav from './components/Nav'
import Hero from './components/Hero'
import Oils from './components/Oils'
import Compare from './components/Compare'
import HowToUse from './components/HowToUse'
import Reviews from './components/Reviews'
import BuyNow from './components/BuyNow'

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Oils />
      <Compare />
      <HowToUse />
      <Reviews />
      <BuyNow />
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
        © 2025 iDEZ SPORT. Все права защищены.
      </footer>
    </>
  )
}
