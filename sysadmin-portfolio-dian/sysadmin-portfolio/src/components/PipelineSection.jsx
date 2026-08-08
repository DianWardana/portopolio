import { useState } from 'react'
import { pipeline, ui } from '../data/content'

export default function PipelineSection() {
  const [pilih, setPilih] = useState(0)
  const t = pipeline[pilih]

  return (
    <section className="band" id="pipeline">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <span className="eyebrow">jalur rilis</span>
          <h2>{ui.pipelineJudul}</h2>
          <p>{ui.pipelineDeskripsi}</p>
        </div>

        <div className="pipe-grid" data-reveal>
          <div className="stages" role="tablist" aria-label="Tahap pipeline">
            {pipeline.map((s, i) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={i === pilih}
                className="stage"
                onClick={() => setPilih(i)}
              >
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <span className="nm">{s.nama}</span>
                <span className="dur">{s.durasi}</span>
              </button>
            ))}
          </div>

          <div className="inspector" role="tabpanel" aria-live="polite">
            <div className="top">
              <h3>{t.nama}</h3>
              <p>{t.ringkas}</p>
              <div className="chips">
                {t.tools.map((x) => (
                  <span className="chip" key={x}>
                    {x}
                  </span>
                ))}
              </div>
            </div>
            <div className="logbox">
              {t.log.map((l, i) => (
                <div key={t.id + i} style={{ animationDelay: `${i * 55}ms` }}>
                  {l}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
