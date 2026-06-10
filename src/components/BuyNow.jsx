import { useState } from 'react'
import { motion } from 'framer-motion'
import { PRODUCTS } from './ProductLine'

const PHONE_DISPLAY = '+7 775 142 66 74'
const PHONE_HREF    = 'tel:+77751426674'
const WA_NUMBER     = '77751426674'

const guarantees = [
  { icon: '↩', label: 'Возврат 30 дней' },
  { icon: '🚚', label: 'Бесплатно от 8 000 ₸' },
  { icon: '🌿', label: 'Натуральный состав' },
  { icon: '✓',  label: 'Без скрытых доплат' },
]

function OrderForm({ product }) {
  const [name, setName]   = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [done, setDone]   = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim())  { setError('Введите ваше имя'); return }
    if (!phone.trim()) { setError('Введите номер телефона'); return }
    setError('')
    const text = `Заказ ${product.name} 100мл\nЦена: ${product.price.toLocaleString('ru')} ₸\nИмя: ${name.trim()}\nТелефон: ${phone.trim()}`
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, '_blank')
    setDone(true)
  }

  if (done) {
    return (
      <motion.div
        className="order-success"
        style={{ borderColor: product.accent }}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <span className="order-success__icon" style={{ color: product.accent }}>✓</span>
        <p className="order-success__title">Заявка отправлена!</p>
        <p className="order-success__sub">
          Свяжемся в течение 15 минут. Или позвоните:&nbsp;
          <a href={PHONE_HREF} style={{ color: product.accent }}>{PHONE_DISPLAY}</a>
        </p>
      </motion.div>
    )
  }

  return (
    <form className="order-form" onSubmit={handleSubmit} noValidate>
      <div className="order-form__field">
        <label className="order-form__label" htmlFor="order-name">Ваше имя</label>
        <input id="order-name" className="order-form__input" type="text"
          placeholder="Иван" value={name} onChange={e => setName(e.target.value)}
          autoComplete="given-name" />
      </div>
      <div className="order-form__field">
        <label className="order-form__label" htmlFor="order-phone">Номер телефона</label>
        <input id="order-phone" className="order-form__input" type="tel"
          placeholder="+7 999 000 00 00" value={phone} onChange={e => setPhone(e.target.value)}
          autoComplete="tel" />
      </div>
      {error && <p className="order-form__error">{error}</p>}
      <button
        type="submit"
        className="order-form__submit"
        style={{ background: product.accent }}
      >
        Заказать сейчас
      </button>
      <p className="order-form__hint">
        Или позвоните:&nbsp;
        <a href={PHONE_HREF} style={{ color: product.accent, textDecoration: 'none' }}>
          {PHONE_DISPLAY}
        </a>
      </p>
    </form>
  )
}

export default function BuyNow({ selectedId, onSelect }) {
  const product = PRODUCTS.find(p => p.id === selectedId) || PRODUCTS[0]

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
            <p className="section-label" style={{ color: product.accent }}>ОФОРМИТЬ ЗАКАЗ</p>
            <h2 className="section-title">ЗАКАЖИ <span style={{ color: product.accent }}>{product.name}</span></h2>
          </div>

          {/* Product tabs */}
          <div className="buy__tabs">
            {PRODUCTS.map(p => (
              <button
                key={p.id}
                className={`buy__tab ${p.id === product.id ? 'buy__tab--active' : ''}`}
                style={p.id === product.id ? { borderColor: p.accent, color: p.accent } : {}}
                onClick={() => onSelect(p.id)}
              >
                <span className="buy__tab-name">iDEZ {p.sub}</span>
                <span className="buy__tab-price">{p.price.toLocaleString('ru')} ₸</span>
              </button>
            ))}
          </div>

          {/* Price block */}
          <motion.div
            className="buy__price-block"
            key={product.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Product image */}
            <div className="buy__img-wrap">
              <img src={product.image} alt={product.name} className="buy__img" />
            </div>

            {/* Pricing + form */}
            <div className="buy__pricing">
              <p className="buy__volume">100 мл · 1 флакон</p>
              <p className="buy__tagline">{product.tagline}</p>
              <p className="buy__old-price">{product.oldPrice.toLocaleString('ru')} ₸</p>
              <p className="buy__new-price" style={{ color: product.accent }}>
                {product.price.toLocaleString('ru')} ₸
              </p>
              <p className="buy__saving" style={{ color: product.accent }}>
                Вы экономите {(product.oldPrice - product.price).toLocaleString('ru')} ₸
              </p>
              <OrderForm product={product} />
            </div>
          </motion.div>

          {/* Guarantees */}
          <div className="buy__guarantees">
            {guarantees.map((g, i) => (
              <div key={i} className="buy__guarantee">
                <span className="buy__guarantee-icon" style={{ color: product.accent }}>{g.icon}</span>
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
        .buy__header { text-align: center; margin-bottom: 32px; }

        /* Tabs */
        .buy__tabs {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }
        .buy__tab {
          background: var(--blk);
          border: 1px solid var(--blk5);
          color: var(--txt2);
          padding: 12px 24px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          transition: border-color 0.2s, color 0.2s;
          min-width: 140px;
        }
        .buy__tab:hover { border-color: var(--txt2); color: var(--txt); }
        .buy__tab--active { background: var(--blk2); }
        .buy__tab-name {
          font-family: var(--font-head);
          font-size: 0.85rem;
          font-weight: 900;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .buy__tab-price {
          font-size: 0.78rem;
          font-weight: 300;
        }

        /* Price block */
        .buy__price-block {
          display: flex;
          align-items: center;
          gap: 0;
          margin-bottom: 44px;
          border-top: 1px solid var(--blk5);
          border-bottom: 1px solid var(--blk5);
          padding: 24px 0;
        }

        /* Product image */
        .buy__img-wrap {
          flex: 0 0 280px;
          height: 380px;
          background: radial-gradient(ellipse at 50% 100%, color-mix(in srgb, var(--accent) 18%, transparent) 0%, transparent 70%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }
        .buy__img {
          height: 90%;
          width: auto;
          object-fit: contain;
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.6)) drop-shadow(0 0 60px color-mix(in srgb, var(--accent) 20%, transparent));
        }

        /* Pricing column */
        .buy__pricing {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-left: 40px;
        }
        .buy__volume {
          font-family: var(--font-head);
          font-size: 0.75rem;
          letter-spacing: 0.18em;
          color: var(--txt2);
          text-transform: uppercase;
        }
        .buy__tagline {
          font-family: var(--font-head);
          font-size: 0.7rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--txt2);
          margin-bottom: 4px;
        }
        .buy__old-price {
          font-size: 1.2rem;
          color: var(--txt2);
          text-decoration: line-through;
        }
        .buy__new-price {
          font-family: var(--font-head);
          font-size: 4rem;
          font-weight: 900;
          line-height: 1;
        }
        .buy__saving {
          font-size: 0.85rem;
          margin-bottom: 8px;
        }

        /* Order form */
        .order-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 4px;
        }
        .order-form__field { display: flex; flex-direction: column; gap: 6px; }
        .order-form__label {
          font-family: var(--font-head);
          font-size: 0.7rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--txt2);
        }
        .order-form__input {
          background: var(--blk);
          border: 1px solid var(--blk5);
          color: var(--txt);
          font-family: 'Barlow', sans-serif;
          font-size: 0.95rem;
          font-weight: 300;
          padding: 12px 16px;
          outline: none;
          transition: border-color 0.2s;
          width: 100%;
          box-sizing: border-box;
        }
        .order-form__input::placeholder { color: var(--txt2); }
        .order-form__input:focus { border-color: currentColor; }
        .order-form__error { font-size: 0.8rem; color: #ff5555; margin: 0; }
        .order-form__submit {
          font-family: var(--font-head);
          font-size: 1rem;
          font-weight: 900;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 16px 40px;
          margin-top: 4px;
          align-self: flex-start;
          cursor: pointer;
          border: none;
          color: #fff;
          transition: opacity 0.2s;
        }
        .order-form__submit:hover { opacity: 0.85; }
        .order-form__hint { font-size: 0.8rem; color: var(--txt2); margin: 0; }

        /* Success */
        .order-success {
          display: flex; flex-direction: column; gap: 10px;
          padding: 24px; border: 1px solid; margin-top: 4px;
          background: rgba(0,0,0,0.2);
        }
        .order-success__icon { font-size: 2rem; font-weight: 700; }
        .order-success__title {
          font-family: var(--font-head); font-size: 1.4rem;
          font-weight: 900; letter-spacing: 0.06em;
          text-transform: uppercase; color: var(--txt); margin: 0;
        }
        .order-success__sub { font-size: 0.88rem; color: var(--txt2); line-height: 1.6; margin: 0; }

        /* Guarantees */
        .buy__guarantees {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .buy__guarantee { display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center; }
        .buy__guarantee-icon { font-size: 1.4rem; }
        .buy__guarantee-label { font-size: 0.8rem; color: var(--txt2); font-weight: 300; }

        @media (max-width: 768px) {
          .buy__card { padding: 28px 16px; }
          .buy__price-block { flex-direction: column; padding: 16px 0; }
          .buy__img-wrap { flex: none; width: 100%; height: 240px; }
          .buy__pricing { padding-left: 0; padding-top: 20px; }
          .order-form__submit { width: 100%; text-align: center; align-self: stretch; padding: 16px; }
          .buy__new-price { font-size: 3rem; }
          .buy__guarantees { grid-template-columns: repeat(2, 1fr); }
          .buy__tab { min-width: 100px; padding: 10px 14px; }
        }
      `}</style>
    </section>
  )
}
