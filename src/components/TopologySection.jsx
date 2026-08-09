import { useMemo, useState } from 'react'
import { topologi, ui } from '../data/content'
import { IKON_NODE } from './Icons'

const W = 1000
const H = 560
const NODE_W = 148
const NODE_H = 58

/* Diagram arsitektur interaktif.
 * Ini bagian yang paling sulit ditiru daftar chip biasa — pengunjung
 * bisa melihat bentuk sistemnya, bukan cuma nama-nama toolnya. */
export default function TopologySection() {
  const [aktif, setAktif] = useState('mikrotik')

  const petaNode = useMemo(
    () => Object.fromEntries(topologi.node.map((n) => [n.id, n])),
    []
  )

  const nodeAktif = petaNode[aktif]

  /* Jalur siku-siku antar node — lebih terbaca daripada garis lurus miring */
  const jalur = (a, b) => {
    const x1 = a.x
    const y1 = a.y + NODE_H / 2
    const x2 = b.x
    const y2 = b.y - NODE_H / 2
    if (Math.abs(x1 - x2) < 2) return `M${x1},${y1} L${x2},${y2}`
    const tengah = y1 + (y2 - y1) / 2
    return `M${x1},${y1} L${x1},${tengah} L${x2},${tengah} L${x2},${y2}`
  }

  const terhubung = (id) =>
    topologi.koneksi.some(([a, b]) => (a === aktif && b === id) || (b === aktif && a === id))

  return (
    <section className="band" id="arsitektur">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <span className="eyebrow">arsitektur</span>
          <h2>{topologi.judul}</h2>
          <p>{topologi.deskripsi}</p>
        </div>

        <div className="topo-grid" data-reveal>
          <div className="topo-kanvas">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="topo-svg"
              role="img"
              aria-label={topologi.judul}
            >
              {/* Grid latar */}
              <defs>
                <pattern id="topo-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M40 0H0V40" fill="none" stroke="var(--line)" strokeWidth="1" opacity="0.5" />
                </pattern>
              </defs>
              <rect width={W} height={H} fill="url(#topo-grid)" />

              {/* Garis koneksi */}
              <g className="topo-garis">
                {topologi.koneksi.map(([a, b]) => {
                  const na = petaNode[a]
                  const nb = petaNode[b]
                  if (!na || !nb) return null
                  const sorot = a === aktif || b === aktif
                  return (
                    <path
                      key={`${a}-${b}`}
                      d={jalur(na, nb)}
                      className={`topo-link${sorot ? ' sorot' : ''}`}
                    />
                  )
                })}
              </g>

              {/* Node */}
              <g>
                {topologi.node.map((n) => {
                  const Ikon = IKON_NODE[n.jenis] || IKON_NODE.server
                  const isAktif = n.id === aktif
                  const isDekat = terhubung(n.id)
                  return (
                    <g
                      key={n.id}
                      className={`topo-node ${n.jenis}${isAktif ? ' aktif' : ''}${
                        isDekat ? ' dekat' : ''
                      }`}
                      transform={`translate(${n.x - NODE_W / 2}, ${n.y - NODE_H / 2})`}
                      onClick={() => setAktif(n.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          setAktif(n.id)
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-pressed={isAktif}
                      aria-label={n.nama}
                    >
                      <rect width={NODE_W} height={NODE_H} rx="10" className="topo-kotak" />
                      <g transform="translate(14, 18)" className="topo-ikon">
                        <Ikon width="22" height="22" />
                      </g>
                      <text x="46" y="27" className="topo-nama">
                        {n.nama}
                      </text>
                      <text x="46" y="43" className="topo-jenis">
                        {n.jenis}
                      </text>
                    </g>
                  )
                })}
              </g>
            </svg>

            <p className="topo-hint mono">
              {'geser untuk melihat seluruh diagram · klik node untuk detail'}
            </p>
          </div>

          {/* Panel detail */}
          <aside className="topo-detail" aria-live="polite">
            {nodeAktif ? (
              <>
                <span className={`topo-badge mono ${nodeAktif.jenis}`}>{nodeAktif.jenis}</span>
                <h3>{nodeAktif.nama}</h3>

                <div className="topo-blok">
                  <span className="eyebrow">{ui.label.peran}</span>
                  <p>{nodeAktif.detail.peran}</p>
                </div>

                <div className="topo-blok">
                  <span className="eyebrow">{ui.label.spesifikasi}</span>
                  <ul className="hasil">
                    {nodeAktif.detail.spek.map((s) => (
                      <li key={s}>
                        <span>→</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="topo-blok catatan">
                  <span className="eyebrow">{ui.label.kenapa}</span>
                  <p>{nodeAktif.detail.catatan}</p>
                </div>
              </>
            ) : (
              <p className="topo-kosong">{ui.label.pilihNode}</p>
            )}
          </aside>
        </div>
      </div>
    </section>
  )
}
