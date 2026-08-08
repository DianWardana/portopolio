import { useMemo, useState } from 'react'
import { projects, ui } from '../data/content'
import { Chevron, Arrow } from './Icons'

export default function ProjectsSection() {
  const [tag, setTag] = useState('Semua')
  const [buka, setBuka] = useState(0)

  const semuaTag = useMemo(
    () => ['Semua', ...Array.from(new Set(projects.flatMap((p) => p.tag)))],
    []
  )
  const daftar = tag === 'Semua' ? projects : projects.filter((p) => p.tag.includes(tag))

  return (
    <section className="band" id="projects">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <span className="eyebrow">arsip pekerjaan</span>
          <h2>{ui.projectsJudul}</h2>
          <p>{ui.projectsDeskripsi}</p>
        </div>

        <div className="filters" data-reveal>
          {semuaTag.map((t) => (
            <button
              key={t}
              className="filter"
              aria-pressed={tag === t}
              onClick={() => {
                setTag(t)
                setBuka(null)
              }}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="proj-list" data-reveal>
          {daftar.length === 0 && (
            <p style={{ color: 'var(--ink-dim)' }}>
              Belum ada project dengan tag ini. Pilih tag lain.
            </p>
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
                      {p.tag.map((t) => (
                        <span className="chip" key={t}>
                          {t}
                        </span>
                      ))}
                    </span>
                  </span>
                  <span
                    style={{ display: 'flex', alignItems: 'center', gap: 12 }}
                  >
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
                      <div className="proj-cols">
                        <div>
                          <span className="eyebrow" style={{ marginBottom: 12 }}>
                            hasil
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
                            stack
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
                              Lihat kode <Arrow width="13" height="13" />
                            </a>
                          )}
                          {p.demo && (
                            <a className="btn" href={p.demo} target="_blank" rel="noreferrer">
                              Buka demo <Arrow width="13" height="13" />
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
