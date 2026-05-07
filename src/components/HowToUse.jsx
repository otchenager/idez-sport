import { motion } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Снимите обувь',
    desc: 'Снимите обувь после носки. Дайте ей немного остыть, чтобы активные компоненты лучше впитались.',
  },
  {
    num: '02',
    title: 'Нанесите спрей',
    desc: 'Распылите iDEZ SPORT внутрь обуви с расстояния 10–15 см. 2–3 нажатия на каждую туфлю или кроссовок.',
  },
  {
    num: '03',
    title: 'Оставьте на ночь',
    desc: 'Дайте обуви просохнуть ночь. Масла глубоко проникают в материал, уничтожая бактерии. Эффект накопительный.',
  },
]

const line = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function HowToUse() {
  return (
    <section id="how" className="how">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label em">ПРИМЕНЕНИЕ</p>
          <h2 className="section-title">
            <span className="em">ТРИ</span> ПРОСТЫХ ШАГА
          </h2>
        </motion.div>

        <div className="how__steps">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="how__step"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.18, duration: 0.55 }}
            >
              <div className="how__step-num em">{step.num}</div>
              <motion.div
                className="how__step-line"
                variants={line}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              />
              <h3 className="how__step-title">{step.title}</h3>
              <p className="how__step-desc">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="how__note"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Эффект накапливается — чем дольше используешь, тем сильнее результат.
        </motion.p>
      </div>

      <style>{`
        .how {
          padding: var(--section-pad);
          background: var(--blk2);
          border-bottom: 1px solid var(--blk5);
        }
        .how__steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 48px;
          margin-bottom: 48px;
        }
        .how__step { }
        .how__step-num {
          font-family: var(--font-head);
          font-size: 4rem;
          font-weight: 900;
          line-height: 1;
          margin-bottom: 16px;
        }
        .how__step-line {
          height: 2px;
          background: var(--em);
          width: 48px;
          margin-bottom: 20px;
          transform-origin: left;
        }
        .how__step-title {
          font-size: 1.4rem;
          margin-bottom: 12px;
          color: var(--txt);
        }
        .how__step-desc {
          color: var(--txt2);
          font-size: 0.9rem;
          line-height: 1.75;
          font-weight: 300;
        }
        .how__note {
          text-align: center;
          color: var(--em);
          font-family: var(--font-head);
          font-size: 1rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          opacity: 0.85;
        }
        @media (max-width: 768px) {
          .how__steps { grid-template-columns: 1fr; gap: 32px; }
          .how__step-num { font-size: 3rem; }
        }
      `}</style>
    </section>
  )
}
