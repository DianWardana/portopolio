import { useState } from 'react'
import { pipeline, ui } from '../data/content'

export default function PipelineSection() {
  const [pilih, setPilih] = useState(0)
  const tahap = pipeline[pilih]

  /* Sebelas tahap dalam satu daftar datar akan terbaca sebagai
     deretan panjang tanpa arah. Dikelompokkan per fase, pembaca
     langsung menangkap alurnya: fondasi dulu, lalu perancangan,
     rilis, dan operasional. */
  let faseTerakhir = null

  return (
    <section className="band" id="pipeline">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <span className="eyebrow">alur kerja</span>
          <h2>{ui.pipelineJudul}</h2>
          <p>{ui.pipelineDeskripsi}</p>
        </div>

        <div className="pipe-grid" data-reveal>
          <div className="stages" role="tablist" aria-label="Tahap alur kerja">
            {pipeline.map((s, i) => {
              const faseBaru = s.fase && s.fase !== faseTerakhir
              faseTerakhir = s.fase
              return (
                <div key={s.id} className="stage-blok">
                  {faseBaru && (
                    <div className="fase" role="presentation">
                      <span className="fase-nama">{s.fase}</span>
                      <span className="fase-garis" />
                    </div>
                  )}
                  <button
                    role="tab"
                    aria-selected={i === pilih}
                    className="stage"
                    onClick={() => setPilih(i)}
                  >
                    <span className="num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="nm">{s.nama}</span>
                    <span className="dur">{s.durasi}</span>
                  </button>
                </div>
              )
            })}
          </div>

          <div className="inspector" role="tabpanel" aria-live="polite">
            <div className="top">
              {tahap.fase && <span className="inspector-fase">{tahap.fase}</span>}
              <h3>{tahap.nama}</h3>
              <p>{tahap.ringkas}</p>
              <div className="chips">
                {tahap.tools.map((x) => (
                  <span className="chip" key={x}>
                    {x}
                  </span>
                ))}
              </div>
            </div>

            <div className="logbox">
              {tahap.log.map((l, i) => (
                <div key={tahap.id + i} style={{ animationDelay: `${i * 55}ms` }}>
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
