import { useEffect, useMemo, useState } from 'react'
import { projects, ui } from '../data/content'
import { aset } from '../lib/aset'
import { Chevron, Arrow, Close } from './Icons'

export default function ProjectsSection({ tagLuar, asalFilter, resetFilter }) {
  const [tag, setTag] = useState('Semua')
  const [buka, setBuka] = useState(0)

  /* Ketika pengunjung mengklik satu ikon di section Stack,
   * filter di sini ikut berubah otomatis. */
  useEffect(() => {
    if (tagLuar) {
      setTag(tagLuar)
      setBuka(null)
    }
  }, [tagLuar])

  const semuaTag = useMemo(
    () => ['Semua', ...Array.from(new Set(projects.flatMap((p) => p.tag)))],
    []
  )

  const daftar = tag === 'Semua' ? projects : projects.filter((p) => p.tag.includes(tag))

  const pilihTag = (nilai) => {
    setTag(nilai)
    setBuka(null)
    resetFilter?.()
  }

  return (
    <section className="band" id="projects">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <span className="eyebrow">arsip pekerjaan</span>
          <h2>{ui.projectsJudul}</h2>
          <p>{ui.projectsDeskripsi}</p>
        </div>

        {/* Penanda kalau filter datang dari klik di section Stack */}
        {asalFilter && (
          <div className="filter-asal" role="status">
            <span className="eyebrow">{ui.label.difilterDari}</span>
            <strong>{asalFilter}</strong>
            <button
              className="icon-btn"
              onClick={() => pilihTag('Semua')}
              aria-label={ui.label.resetFilter}
              title={ui.label.resetFilter}
            >
              <Close width="14" height="14" />
            </button>
          </div>
        )}

        <div className="filters" data-reveal>
          {semuaTag.map((x) => (
            <button
              key={x}
              className="filter"
              aria-pressed={tag === x}
              onClick={() => pilihTag(x)}
            >
              {x === 'Semua' ? ui.label.semua : x}
            </button>
          ))}
        </div>

        <div className="proj-list" data-reveal>
          {daftar.length === 0 && (
            <p style={{ color: 'var(--ink-dim)' }}>{ui.label.kosongProject}</p>
          )}

          {daftar.map((p, i) => {
            const terbuka = buka === i
            return (
              <article className={`proj${terbuka ? ' open' : ''}`} key={p.judul}>
                <button
                  className="proj-head"
                  onClick={() => setBuka(terbuka ? null : i)}
                  aria-expanded={terbuka}
                >
                  <span className="proj-year mono">{p.tahun}</span>

                  <span>
                    <span className="proj-title" style={{ display: 'block' }}>
                      {p.judul}
                    </span>
                    <span className="proj-sub" style={{ display: 'block' }}>
                      {p.subjudul}
                    </span>
                    <span className="proj-tags">
                      {p.tag.map((x) => (
                        <span className="chip" key={x}>
                          {x}
                        </span>
                      ))}
                    </span>
                  </span>

                  <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span className={`status ${p.status}`}>
                      <i />
                      {p.status}
                    </span>
                    <Chevron className="caret" width="18" height="18" />
                  </span>
                </button>

                <div className="proj-body">
                  <div>
                    <div className="proj-inner">
                      <p>{p.deskripsi}</p>

                      {p.gambar && (
                        <figure className="proj-shot">
                          <img
                            src={aset(p.gambar)}
                            alt={p.gambarAlt || p.judul}
                            loading="lazy"
                            decoding="async"
                          />
                          {p.gambarAlt && <figcaption>{p.gambarAlt}</figcaption>}
                        </figure>
                      )}

                      <div className="proj-cols">
                        <div>
                          <span className="eyebrow" style={{ marginBottom: 12 }}>
                            {ui.label.hasil}
                          </span>
                          <ul className="hasil" style={{ marginTop: 12 }}>
                            {p.hasil.map((h) => (
                              <li key={h}>
                                <span>→</span>
                                {h}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <span className="eyebrow" style={{ marginBottom: 12 }}>
                            {ui.label.stack}
                          </span>
                          <div className="chips" style={{ marginTop: 12 }}>
                            {p.stack.map((s) => (
                              <span className="chip" key={s}>
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {(p.repo || p.demo) && (
                        <div className="proj-links">
                          {p.repo && (
                            <a className="btn" href={p.repo} target="_blank" rel="noreferrer">
                              {ui.label.lihatKode} <Arrow width="13" height="13" />
                            </a>
                          )}
                          {p.demo && (
                            <a className="btn" href={p.demo} target="_blank" rel="noreferrer">
                              {ui.label.bukaDemo} <Arrow width="13" height="13" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
