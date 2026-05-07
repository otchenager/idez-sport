import { motion } from 'framer-motion'

const reviews = [
  {
    name: 'Алексей М.',
    city: 'Москва',
    rating: 5,
    text: 'Пользуюсь уже 3 месяца. Беговые кроссовки наконец перестали пахнуть! Раньше пробовал разные спреи — всё маскировало, но не убивало запах. iDEZ работает по-другому.',
    product: 'iDEZ SPORT 100мл',
    date: 'апрель 2025',
  },
  {
    name: 'Екатерина В.',
    city: 'Санкт-Петербург',
    rating: 5,
    text: 'Купила для мужа — он занимается единоборствами, обувь страдала жутко. Через неделю результат заметен. Запах не просто перебивается, он исчезает. Натуральный состав — огромный плюс.',
    product: 'iDEZ SPORT 100мл',
    date: 'март 2025',
  },
  {
    name: 'Дмитрий К.',
    city: 'Екатеринбург',
    rating: 5,
    text: 'Скептически относился, но взял ради интереса. Эффект реально накопительный — первые пару дней не очень заметно, потом запах уходит полностью. Состав порадовал: всё натуральное.',
    product: 'iDEZ SPORT 100мл',
    date: 'февраль 2025',
  },
]

export default function Reviews() {
  return (
    <section id="reviews" className="reviews">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label em">ОТЗЫВЫ</p>
          <h2 className="section-title">
            <span className="em">2 400+</span> ПОКУПАТЕЛЕЙ
          </h2>
          <div className="reviews__stars">
            {'★★★★★'.split('').map((s, i) => (
              <span key={i} className="em" style={{ fontSize: '1.4rem' }}>{s}</span>
            ))}
            <span className="reviews__avg">4.9 / 5</span>
          </div>
        </motion.div>

        <div className="reviews__grid">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              className="review-card"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.55 }}
            >
              <div className="review-card__rating">
                {Array(r.rating).fill('★').map((s, j) => (
                  <span key={j} className="em">{s}</span>
                ))}
              </div>
              <p className="review-card__text">"{r.text}"</p>
              <div className="review-card__footer">
                <div>
                  <strong className="review-card__name">{r.name}</strong>
                  <span className="review-card__city">{r.city}</span>
                </div>
                <span className="review-card__date">{r.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .reviews {
          padding: var(--section-pad);
          background: var(--blk);
          border-bottom: 1px solid var(--blk5);
        }
        .reviews__stars {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          margin-top: 12px;
        }
        .reviews__avg {
          font-family: var(--font-head);
          font-size: 1.1rem;
          color: var(--txt2);
          margin-left: 8px;
        }
        .reviews__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 16px;
        }
        @media (max-width: 768px) {
          .reviews__grid { grid-template-columns: 1fr; }
          .review-card { padding: 24px; }
        }
        .review-card {
          background: var(--blk3);
          border: 1px solid var(--blk5);
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: border-color 0.25s;
        }
        .review-card:hover { border-color: var(--em); }
        .review-card__rating { font-size: 1.1rem; }
        .review-card__text {
          color: var(--txt);
          font-size: 0.92rem;
          line-height: 1.7;
          font-weight: 300;
          flex: 1;
        }
        .review-card__footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          border-top: 1px solid var(--blk5);
          padding-top: 16px;
          gap: 8px;
        }
        .review-card__name {
          display: block;
          font-size: 0.9rem;
          color: var(--txt);
          font-weight: 700;
        }
        .review-card__city {
          font-size: 0.8rem;
          color: var(--txt2);
          margin-left: 6px;
        }
        .review-card__date {
          font-size: 0.75rem;
          color: var(--txt2);
          white-space: nowrap;
        }
        @media (max-width: 768px) {
          .reviews__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
