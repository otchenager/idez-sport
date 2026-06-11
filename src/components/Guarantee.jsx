export default function Guarantee() {
  return (
    <section className="guarantee">
      <div className="container">
        <div className="guarantee__card">
          <div className="guarantee__badge">100%</div>
          <h2 className="guarantee__title">МЫ УВЕРЕНЫ В КАЧЕСТВЕ</h2>
          <p className="guarantee__text">
            Вы либо довольны продуктом — либо мы возвращаем деньги.<br/>
            Без вопросов. Без бюрократии.
          </p>
          <div className="guarantee__items">
            <div className="guarantee__item">
              <span className="guarantee__item-icon">↩</span>
              <span>Возврат в течение 30 дней</span>
            </div>
            <div className="guarantee__item">
              <span className="guarantee__item-icon">✓</span>
              <span>Без скрытых условий</span>
            </div>
            <div className="guarantee__item">
              <span className="guarantee__item-icon">🌿</span>
              <span>Натуральный состав проверен</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .guarantee {
          padding: var(--section-pad);
          background: var(--blk);
          border-top: 1px solid var(--blk5);
          border-bottom: 1px solid var(--blk5);
        }
        .guarantee__card {
          max-width: 760px;
          margin: 0 auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }
        .guarantee__badge {
          font-family: var(--font-head);
          font-size: clamp(5rem, 12vw, 9rem);
          font-weight: 900;
          line-height: 1;
          color: var(--em);
          letter-spacing: -2px;
          text-shadow: 0 0 80px rgba(0, 200, 120, 0.25);
        }
        .guarantee__title {
          font-family: var(--font-head);
          font-size: clamp(1.8rem, 4vw, 3rem);
          font-weight: 900;
          letter-spacing: 0.06em;
          color: var(--txt);
          text-transform: uppercase;
          line-height: 1.1;
        }
        .guarantee__text {
          font-size: 1.05rem;
          color: var(--txt2);
          line-height: 1.75;
          font-weight: 300;
          max-width: 520px;
        }
        .guarantee__items {
          display: flex;
          gap: 40px;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 8px;
          padding-top: 32px;
          border-top: 1px solid var(--blk5);
          width: 100%;
        }
        .guarantee__item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.9rem;
          color: var(--txt2);
          font-weight: 300;
        }
        .guarantee__item-icon {
          color: var(--em);
          font-size: 1.1rem;
        }
      `}</style>
    </section>
  )
}
