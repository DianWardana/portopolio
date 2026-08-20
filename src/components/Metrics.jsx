import { metrik } from '../data/content'
import { useCountUp } from '../lib/hooks'

function Kartu({ m }) {
  const [ref, nilai] = useCountUp(m.nilai, { desimal: m.desimal || 0 })

  return (
    <div className="metric" ref={ref}>
      <div className="val">
        {m.prefiks}
        {m.desimal
          ? nilai.toFixed(m.desimal).replace('.', ',')
          : Math.round(nilai).toLocaleString('id-ID')}
        {m.sufiks && <em>{m.sufiks}</em>}
      </div>

      <div className="lb">{m.label}</div>
      <div className="nt">{m.catatan}</div>
    </div>
  )
}

export default function Metrics() {
  return (
    <div className="wrap">
      <div className="metrics" data-reveal>
        {metrik.map((m) => (
          <Kartu key={m.label} m={m} />
        ))}
      </div>
    </div>
  )
}
