import { motion } from 'framer-motion'

const oils = [
  {
    num: '01',
    name: 'Чайное дерево',
    role: 'Антисептик',
    desc: 'Убивает грибки и бактерии, которые вызывают неприятный запах. Клинически доказанный антибактериальный эффект.',
    icon: '🌿',
  },
  {
    num: '02',
    name: 'Пихта',
    role: 'Нейтрализатор',
    desc: 'Нейтрализует запах и мягко подсушивает кожу стопы, создавая неблагоприятную среду для размножения бактерий.',
    icon: '🌲',
  },
  {
    num: '03',
    name: 'Эвкалипт',
    role: 'Проводник',
    desc: 'Освежает и помогает активным компонентам глубоко проникнуть в материал обуви для долгосрочного эффекта.',
    icon: '💧',
  },
]

const card = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.55 } }),
}

export default function Oils() {
  return (
    <section id="oils" className="oils">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label em">СОСТАВ</p>
          <h2 className="section-title">
            <span className="em">ТРИ</span> ПРИРОДНЫХ МАСЛА
          </h2>
          <p className="section-desc">
            Без синтетических ароматизаторов и химических консервантов. Только то, что работает.
          </p>
        </motion.div>

        <div className="oils__grid">
          {oils.map((oil, i) => (
            <motion.div
              key={oil.num}
              className="oil-card"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={card}
            >
              <span className="oil-card__num em">{oil.num}</span>
              <div className="oil-card__icon">{oil.icon}</div>
              <p className="oil-card__role">{oil.role}</p>
              <h3 className="oil-card__name">{oil.name}</h3>
              <p className="oil-card__desc">{oil.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .oils {
          padding: var(--section-pad);
          background: var(--blk2);
          border-top: 1px solid var(--blk5);
          border-bottom: 1px solid var(--blk5);
        }
        .section-header { text-align: center; margin-bottom: 60px; }
        .section-label {
          font-family: var(--font-head);
          font-size: 0.75rem;
          letter-spacing: 0.22em;
          margin-bottom: 12px;
          display: block;
        }
        .section-title {
          font-size: clamp(2.2rem, 4vw, 3.5rem);
          margin-bottom: 16px;
        }
        .section-desc {
          color: var(--txt2);
          font-size: 1rem;
          max-width: 480px;
          margin: 0 auto;
        }
        .oils__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .oil-card {
          background: var(--blk3);
          border: 1px solid var(--blk5);
          padding: 40px 32px;
          position: relative;
          transition: border-color 0.25s;
        }
        .oil-card:hover { border-color: var(--em); }
        .oil-card__num {
          font-family: var(--font-head);
          font-size: 3rem;
          font-weight: 900;
          line-height: 1;
          opacity: 0.25;
          display: block;
          margin-bottom: 12px;
        }
        .oil-card__icon { font-size: 2rem; margin-bottom: 20px; }
        .oil-card__role {
          font-family: var(--font-head);
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--em);
          margin-bottom: 8px;
        }
        .oil-card__name {
          font-size: 1.6rem;
          margin-bottom: 16px;
          color: var(--txt);
        }
        .oil-card__desc {
          color: var(--txt2);
          font-size: 0.9rem;
          line-height: 1.7;
          font-weight: 300;
        }
        @media (max-width: 768px) {
          .oils__grid { grid-template-columns: 1fr; gap: 16px; }
          .oil-card { padding: 28px 20px; }
          .oil-card__num { font-size: 2.2rem; }
        }
      `}</style>
    </section>
  )
}
