import { motion } from 'framer-motion'

const rows = [
  { feature: 'Убивает бактерии',         them: false, us: true  },
  { feature: 'Устраняет грибок',          them: false, us: true  },
  { feature: 'Без химии',                 them: false, us: true  },
  { feature: 'Без алюминия',              them: false, us: true  },
  { feature: 'Безопасно для детей',       them: false, us: true  },
  { feature: 'Накопительный эффект',      them: false, us: true  },
  { feature: 'Только маскирует запах',    them: true,  us: false },
  { feature: 'Агрессивные ароматизаторы', them: true,  us: false },
]

export default function Compare() {
  return (
    <section id="compare" className="compare">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label em">СРАВНЕНИЕ</p>
          <h2 className="section-title">
            <span className="em">iDEZ</span> VS ОБЫЧНЫЙ СПРЕЙ
          </h2>
        </motion.div>

        <motion.div
          className="compare__table-wrap"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <table className="compare__table">
            <thead>
              <tr>
                <th className="compare__col-feature">ХАРАКТЕРИСТИКА</th>
                <th className="compare__col-them">ОБЫЧНЫЙ СПРЕЙ</th>
                <th className="compare__col-us em">iDEZ SPORT</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="compare__row">
                  <td className="compare__feature">{row.feature}</td>
                  <td className="compare__cell">
                    {row.them
                      ? <span className="compare__check compare__check--yes">✓</span>
                      : <span className="compare__check compare__check--no">✗</span>
                    }
                  </td>
                  <td className="compare__cell compare__cell--us">
                    {row.us
                      ? <span className="compare__check compare__check--yes em">✓</span>
                      : <span className="compare__check compare__check--no">✗</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>

      <style>{`
        .compare {
          padding: var(--section-pad);
          background: var(--blk);
          border-bottom: 1px solid var(--blk5);
        }
        .compare__table-wrap {
          overflow-x: auto;
        }
        .compare__table {
          width: 100%;
          border-collapse: collapse;
          min-width: 560px;
        }
        .compare__table th {
          font-family: var(--font-head);
          font-size: 0.8rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 16px 24px;
          text-align: center;
          border-bottom: 1px solid var(--blk5);
          color: var(--txt2);
        }
        .compare__col-feature { text-align: left !important; }
        .compare__col-us { color: var(--em) !important; }
        .compare__row { border-bottom: 1px solid var(--blk5); }
        .compare__row:last-child { border-bottom: none; }
        .compare__feature {
          padding: 18px 24px;
          font-size: 0.95rem;
          font-weight: 300;
          color: var(--txt);
        }
        .compare__cell {
          padding: 18px 24px;
          text-align: center;
        }
        .compare__cell--us { background: rgba(0,200,120,0.04); }
        .compare__check {
          font-size: 1.2rem;
          font-weight: 700;
        }
        .compare__check--yes { color: var(--em); }
        .compare__check--no  { color: rgba(240,240,240,0.2); }
        .compare__row:hover { background: rgba(255,255,255,0.02); }
        @media (max-width: 768px) {
          .compare__table th { padding: 12px 12px; font-size: 0.7rem; letter-spacing: 0.08em; }
          .compare__feature  { padding: 14px 12px; font-size: 0.85rem; }
          .compare__cell     { padding: 14px 12px; }
        }
      `}</style>
    </section>
  )
}
