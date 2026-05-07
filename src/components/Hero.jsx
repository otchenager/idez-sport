import { useRef, Suspense } from 'react'
import { motion, useScroll } from 'framer-motion'
import SprayBottle3D from './SprayBottle3D'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  return (
    <section id="hero" ref={ref} className="hero">
      <div className="container hero__inner">

        {/* ── Left — text ── */}
        <motion.div
          className="hero__text"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <p className="hero__label">НАТУРАЛЬНЫЙ АНТИСЕПТИК ДЛЯ ОБУВИ</p>
          <h1 className="hero__heading">
            <span className="em">УБИВАЕТ</span><br />
            ЗАПАХ<br />
            НАВСЕГДА
          </h1>
          <p className="hero__sub">
            Масло чайного дерева, пихты и эвкалипта — без химии, без алюминия, без парабенов.
          </p>

          <div className="hero__trust">
            <span className="hero__stars">★★★★★</span>
            <strong>4.9 / 5</strong>
            <span className="hero__sep">·</span>
            <span style={{ color: 'var(--txt2)' }}>2 400+ отзывов</span>
          </div>

          <div className="hero__ctas">
            <a href="#buy" className="btn-primary">Купить сейчас</a>
            <a href="#how" className="btn-outline">Как работает?</a>
          </div>
        </motion.div>

        {/* ── Right — 3D model ── */}
        <motion.div
          className="hero__canvas-wrap"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          <Suspense fallback={null}>
            <SprayBottle3D scrollProgress={scrollYProgress} />
          </Suspense>
        </motion.div>

      </div>

      <style>{`
        .hero {
          min-height: 100vh;
          background: var(--blk);
          display: flex;
          align-items: center;
          padding-top: 80px;
          padding-bottom: 48px;
        }
        .hero__inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }
        .hero__label {
          font-family: var(--font-head);
          font-size: 0.75rem;
          letter-spacing: 0.22em;
          color: var(--em);
          margin-bottom: 20px;
        }
        .hero__heading {
          font-size: clamp(2.8rem, 6.5vw, 6rem);
          line-height: 0.94;
          margin-bottom: 24px;
        }
        .hero__sub {
          font-size: 1.05rem;
          color: var(--txt2);
          margin-bottom: 28px;
          font-weight: 300;
          line-height: 1.65;
        }
        .hero__trust {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 36px;
          font-size: 0.9rem;
          flex-wrap: wrap;
        }
        .hero__stars { color: var(--em); font-size: 1rem; }
        .hero__trust strong { color: var(--txt); }
        .hero__sep { color: var(--blk5); }
        .hero__ctas {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        /* Canvas wrapper — must have explicit height */
        .hero__canvas-wrap {
          height: 540px;
          width: 100%;
          position: relative;
        }

        @media (max-width: 768px) {
          .hero {
            min-height: auto;
            padding-top: 96px;
            padding-bottom: 64px;
          }
          .hero__inner {
            grid-template-columns: 1fr;
            gap: 0;
          }
          .hero__canvas-wrap {
            height: 300px;
            order: -1;
            margin-bottom: 8px;
          }
          .hero__ctas {
            flex-direction: column;
          }
          .hero__ctas a { text-align: center; }
        }
      `}</style>
    </section>
  )
}
