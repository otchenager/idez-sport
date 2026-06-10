import { motion } from 'framer-motion'

export const PRODUCTS = [
  {
    id: 'sport',
    name: 'iDEZ SPORT',
    sub: 'SPORT',
    tagline: 'Для активного спорта',
    desc: 'Три масла — чайное дерево, пихта, эвкалипт. Накопительный эффект, нейтрализует запах после тренировок.',
    price: 2690,
    oldPrice: 3490,
    image: '/images/idez-sport.jpg',
    badge: null,
    accent: '#00c878',
    strength: 2,
  },
  {
    id: 'fight',
    name: 'iDEZ FIGHT',
    sub: 'FIGHT',
    tagline: 'Для самых "потных" видов спорта',
    desc: 'Максимальная концентрация. Убивает самые мощные запахи от единоборств, бокса и борьбы.',
    price: 3990,
    oldPrice: 4990,
    image: '/images/idez-fight.jpg',
    badge: 'НОВИНКА',
    accent: '#e03a1a',
    strength: 3,
  },
  {
    id: 'shoes',
    name: 'iDEZ SHOES',
    sub: 'SHOES',
    tagline: 'Для повседневной обуви',
    desc: 'Лёгкая формула для ежедневного применения. Также - пероклассая свежесть.',
    price: 2290,
    oldPrice: 2990,
    image: '/images/idez-shoes.jpg',
    badge: 'НОВИНКА',
    accent: '#e07820',
    strength: 1,
  },
]

const card = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.55 } }),
}

export default function ProductLine({ onSelect }) {
  return (
    <section id="products" className="pl">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label em">ЛИНЕЙКА</p>
          <h2 className="section-title">
            ТРИ <span className="em">РЕШЕНИЯ</span> — ОДИН ВЫБОР
          </h2>
          <p className="section-desc">
            Подберите формулу под вид активности
          </p>
        </motion.div>

        <div className="pl__grid">
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={p.id}
              className="pl__card"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={card}
              style={{ '--accent': p.accent }}
            >
              {p.badge && (
                <span className="pl__badge" style={{ background: p.accent }}>
                  {p.badge}
                </span>
              )}

              <div className="pl__img-wrap">
                <img src={p.image} alt={p.name} className="pl__img" />
              </div>

              <div className="pl__body">
                <p className="pl__name">
                  <span className="em" style={{ color: p.accent }}>iDEZ</span>
                  &nbsp;{p.sub}
                </p>
                <p className="pl__tagline">{p.tagline}</p>
                <p className="pl__desc">{p.desc}</p>

                {/* Strength indicator */}
                <div className="pl__strength">
                  <span className="pl__strength-label">Мощность</span>
                  <div className="pl__bars">
                    {[1, 2, 3].map(n => (
                      <span
                        key={n}
                        className="pl__bar"
                        style={{ background: n <= p.strength ? p.accent : 'var(--blk5)' }}
                      />
                    ))}
                  </div>
                </div>

                <div className="pl__footer">
                  <div className="pl__price-wrap">
                    <span className="pl__old">{p.oldPrice.toLocaleString('ru')} ₸</span>
                    <span className="pl__price" style={{ color: p.accent }}>
                      {p.price.toLocaleString('ru')} ₸
                    </span>
                  </div>
                  <button
                    className="pl__btn"
                    style={{ background: p.accent }}
                    onClick={() => onSelect(p.id)}
                  >
                    Заказать
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .pl {
          padding: var(--section-pad);
          background: var(--blk);
          border-top: 1px solid var(--blk5);
          border-bottom: 1px solid var(--blk5);
        }
        .pl__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .pl__card {
          background: var(--blk3);
          border: 1px solid var(--blk5);
          position: relative;
          display: flex;
          flex-direction: column;
          transition: border-color 0.25s;
        }
        .pl__card:hover { border-color: var(--accent); }

        .pl__badge {
          position: absolute;
          top: 14px;
          right: 14px;
          font-family: var(--font-head);
          font-size: 0.65rem;
          font-weight: 900;
          letter-spacing: 0.14em;
          padding: 4px 10px;
          color: #fff;
          z-index: 1;
        }

        .pl__img-wrap {
          background: radial-gradient(ellipse at 50% 100%, color-mix(in srgb, var(--accent) 18%, transparent) 0%, transparent 70%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          height: 320px;
        }
        .pl__img {
          height: 90%;
          width: auto;
          object-fit: contain;
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.6)) drop-shadow(0 0 60px color-mix(in srgb, var(--accent) 20%, transparent));
          transition: transform 0.4s ease;
        }
        .pl__card:hover .pl__img { transform: scale(1.04) translateY(-4px); }

        .pl__body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }
        .pl__name {
          font-family: var(--font-head);
          font-size: 1.5rem;
          font-weight: 900;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--txt);
        }
        .pl__tagline {
          font-family: var(--font-head);
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--txt2);
        }
        .pl__desc {
          font-size: 0.88rem;
          color: var(--txt2);
          line-height: 1.65;
          font-weight: 300;
          flex: 1;
        }

        .pl__strength {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 4px;
        }
        .pl__strength-label {
          font-family: var(--font-head);
          font-size: 0.65rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--txt2);
        }
        .pl__bars {
          display: flex;
          gap: 4px;
        }
        .pl__bar {
          display: block;
          width: 28px;
          height: 5px;
          border-radius: 2px;
          transition: background 0.2s;
        }

        .pl__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--blk5);
          padding-top: 16px;
          margin-top: 4px;
        }
        .pl__price-wrap {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .pl__old {
          font-size: 0.82rem;
          color: var(--txt2);
          text-decoration: line-through;
        }
        .pl__price {
          font-family: var(--font-head);
          font-size: 1.6rem;
          font-weight: 900;
          line-height: 1;
        }
        .pl__btn {
          font-family: var(--font-head);
          font-size: 0.82rem;
          font-weight: 900;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 12px 22px;
          border: none;
          color: #fff;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
        }
        .pl__btn:hover { opacity: 0.85; transform: translateY(-1px); }
        .pl__btn:active { transform: translateY(0); }

        @media (max-width: 900px) {
          .pl__grid { grid-template-columns: 1fr; max-width: 420px; margin: 0 auto; }
          .pl__img-wrap { height: 220px; }
        }
      `}</style>
    </section>
  )
}
