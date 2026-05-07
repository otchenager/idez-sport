import { Suspense } from 'react'
import { motion } from 'framer-motion'
import SprayBottle3D from './SprayBottle3D'


const guarantees = [
  { icon: '↩', label: 'Возврат 30 дней' },
  { icon: '🚚', label: 'Бесплатно от 1500₽' },
  { icon: '🌿', label: 'Натуральный состав' },
  { icon: '✓', label: 'Без скрытых доплат' },
]

export default function BuyNow() {

  return (
    <section id="buy" className="buy">
      <div className="container">
        <motion.div
          className="buy__card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="buy__header">
            <p className="section-label em">СПЕЦИАЛЬНОЕ ПРЕДЛОЖЕНИЕ</p>
            <h2 className="section-title">
              ЗАКАЖИ <span className="em">iDEZ SPORT</span> СЕЙЧАС
            </h2>
          </div>


          {/* Price block — 3D bottle + pricing side by side */}
          <div className="buy__price-block">

            {/* 3D bottle */}
            <div className="buy__bottle-3d">
              <Suspense fallback={null}>
                <SprayBottle3D />
              </Suspense>
            </div>

            {/* Pricing */}
            <div className="buy__pricing">
              <p className="buy__volume">100 мл · 1 флакон</p>
              <p className="buy__old-price">990 ₽</p>
              <p className="buy__new-price em">690 ₽</p>
              <p className="buy__saving">Вы экономите 300 ₽ (-30%)</p>
              <a href="tel:+78001234567" className="btn-primary buy__cta">
                Заказать сейчас
              </a>
              <p className="buy__sub">
                Или позвоните:&nbsp;
                <a href="tel:+78001234567" className="em">8 800 123-45-67</a>
              </p>
            </div>
          </div>

          {/* Guarantees */}
          <div className="buy__guarantees">
            {guarantees.map((g, i) => (
              <div key={i} className="buy__guarantee">
                <span className="buy__guarantee-icon em">{g.icon}</span>
                <span className="buy__guarantee-label">{g.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .buy {
          padding: var(--section-pad);
          background: var(--blk2);
          border-top: 1px solid var(--blk5);
        }
        .buy__card {
          background: var(--blk3);
          border: 1px solid var(--blk5);
          padding: 60px;
          max-width: 1060px;
          margin: 0 auto;
        }
        .buy__header { text-align: center; margin-bottom: 40px; }


        /* Price block */
        .buy__price-block {
          display: flex;
          align-items: center;
          gap: 0;
          margin-bottom: 44px;
          border-top: 1px solid var(--blk5);
          border-bottom: 1px solid var(--blk5);
          padding: 8px 0 24px;
        }

        /* 3D bottle canvas */
        .buy__bottle-3d {
          flex: 0 0 300px;
          height: 400px;
        }

        /* Pricing column */
        .buy__pricing {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-left: 32px;
        }
        .buy__volume {
          font-family: var(--font-head);
          font-size: 0.75rem;
          letter-spacing: 0.18em;
          color: var(--txt2);
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        .buy__old-price {
          font-size: 1.3rem;
          color: var(--txt2);
          text-decoration: line-through;
        }
        .buy__new-price {
          font-family: var(--font-head);
          font-size: 4.5rem;
          font-weight: 900;
          line-height: 1;
        }
        .buy__saving {
          font-size: 0.85rem;
          color: var(--em);
          margin-bottom: 4px;
        }
        .buy__cta {
          font-size: 1.05rem;
          padding: 18px 40px;
          display: inline-block;
          margin-top: 8px;
          align-self: flex-start;
        }
        .buy__sub {
          font-size: 0.8rem;
          color: var(--txt2);
          margin-top: 4px;
        }
        .buy__sub a { text-decoration: none; }

        /* Guarantees */
        .buy__guarantees {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .buy__guarantee {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          text-align: center;
        }
        .buy__guarantee-icon { font-size: 1.4rem; }
        .buy__guarantee-label {
          font-size: 0.8rem;
          color: var(--txt2);
          font-weight: 300;
        }

        /* Mobile */
        @media (max-width: 768px) {
          .buy__card { padding: 28px 16px; }
          .buy__price-block {
            flex-direction: column;
            padding: 0 0 24px;
          }
          .buy__bottle-3d {
            flex: none;
            width: 100%;
            height: 280px;
          }
          .buy__pricing {
            padding-left: 0;
            align-items: center;
            text-align: center;
          }
          .buy__cta {
            width: 100%;
            text-align: center;
            align-self: stretch;
            padding: 16px;
          }
          .buy__new-price { font-size: 3.5rem; }
          .buy__guarantees { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </section>
  )
}
