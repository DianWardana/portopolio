import { metrik } from '../data/content'
import { useCountUp } from '../lib/hooks'

/* Sparkline: grafik garis mini tanpa sumbu.
 * Dinormalisasi sendiri, jadi skala data tidak perlu seragam. */
function Sparkline({ data = [], aktif }) {
  if (data.length < 2) return null

  const L = 100
  const T = 30
  const min = Math.min(...data)
  const max = Math.max(...data)
  const rentang = max - min || 1

  const titik = data.map((v, i) => {
    const x = (i / (data.length - 1)) * L
    const y = T - ((v - min) / rentang) * (T - 6) - 3
    return [x, y]
  })

  const garis = titik.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(2)},${y.toFixed(2)}`).join(' ')
  const area = `${garis} L${L},${T} L0,${T} Z`
  const [ax, ay] = titik[titik.length - 1]

  return (
    <svg
      className={`spark${aktif ? ' aktif' : ''}`}
      viewBox={`0 0 ${L} ${T}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path className="spark-area" d={area} />
      <path className="spark-garis" d={garis} />
      <circle className="spark-titik" cx={ax} cy={ay} r="2.2" />
    </svg>
  )
}

function Kartu({ m }) {
  const [ref, nilai, selesai] = useCountUp(m.nilai, { desimal: m.desimal || 0 })

  return (
    <div className="metric" ref={ref}>
      <div className="val">
        {m.prefiks}
        {m.desimal
          ? nilai.toFixed(m.desimal).replace('.', ',')
          : Math.round(nilai).toLocaleString('id-ID')}
        {m.sufiks && <em>{m.sufiks}</em>}
      </div>

      <Sparkline data={m.tren} aktif={selesai} />

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
