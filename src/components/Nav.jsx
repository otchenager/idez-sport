import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '#oils',    label: 'Состав' },
  { href: '#compare', label: 'Сравнение' },
  { href: '#how',     label: 'Применение' },
  { href: '#reviews', label: 'Отзывы' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <>
      <motion.nav
        className="nav"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ background: scrolled || open ? 'rgba(10,10,10,0.97)' : 'transparent' }}
      >
        <div className="container nav__inner">
          <a href="#hero" className="nav__logo" onClick={close}>
            <span className="em">iDEZ</span>&nbsp;SPORT
          </a>

          <ul className="nav__links">
            {links.map(l => (
              <li key={l.href}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>

          <div className="nav__right">
            <a href="#buy" className="btn-primary nav__cta">Купить</a>
            <button
              className="nav__burger"
              aria-label="Меню"
              onClick={() => setOpen(o => !o)}
            >
              <span className={open ? 'bar bar--top open' : 'bar bar--top'} />
              <span className={open ? 'bar bar--mid open' : 'bar bar--mid'} />
              <span className={open ? 'bar bar--bot open' : 'bar bar--bot'} />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav__mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {links.map(l => (
              <a key={l.href} href={l.href} className="nav__mobile-link" onClick={close}>
                {l.label}
              </a>
            ))}
            <a href="#buy" className="btn-primary nav__mobile-cta" onClick={close}>
              Купить сейчас
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          transition: background 0.3s;
          backdrop-filter: blur(8px);
          border-bottom: 1px solid transparent;
        }
        .nav__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
        }
        .nav__logo {
          font-family: var(--font-head);
          font-weight: 900;
          font-size: 1.4rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--txt);
        }
        .nav__links {
          display: flex;
          gap: 36px;
          list-style: none;
        }
        .nav__links a {
          font-family: var(--font-head);
          font-weight: 900;
          font-size: 0.9rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--txt2);
          text-decoration: none;
          transition: color 0.2s;
        }
        .nav__links a:hover { color: var(--txt); }
        .nav__right {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .nav__cta { font-size: 0.85rem; padding: 10px 24px; }

        /* Burger */
        .nav__burger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 32px;
          height: 32px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }
        .bar {
          display: block;
          height: 2px;
          background: var(--txt);
          transition: transform 0.25s, opacity 0.25s;
          transform-origin: center;
        }
        .bar--top.open  { transform: translateY(7px) rotate(45deg); }
        .bar--mid.open  { opacity: 0; }
        .bar--bot.open  { transform: translateY(-7px) rotate(-45deg); }

        /* Mobile dropdown */
        .nav__mobile-menu {
          position: fixed;
          top: 64px; left: 0; right: 0;
          z-index: 99;
          background: rgba(10,10,10,0.97);
          backdrop-filter: blur(8px);
          display: flex;
          flex-direction: column;
          padding: 20px 16px 28px;
          border-bottom: 1px solid var(--blk5);
          gap: 4px;
        }
        .nav__mobile-link {
          font-family: var(--font-head);
          font-weight: 900;
          font-size: 1.4rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--txt);
          text-decoration: none;
          padding: 12px 8px;
          border-bottom: 1px solid var(--blk5);
          transition: color 0.2s;
        }
        .nav__mobile-link:hover { color: var(--em); }
        .nav__mobile-cta {
          margin-top: 16px;
          text-align: center;
          font-size: 1rem;
          padding: 16px;
          width: 100%;
        }

        @media (max-width: 768px) {
          .nav__links { display: none; }
          .nav__cta   { display: none; }
          .nav__burger { display: flex; }
        }
      `}</style>
    </>
  )
}
