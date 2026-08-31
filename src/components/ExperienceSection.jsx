import { pengalaman, sertifikasi, ui } from '../data/content'
import { Arrow } from './Icons'

export default function ExperienceSection({ compact = false }) {

  return (
    <section className={compact ? 'section-column' : 'band'} id="pengalaman">
      <div className={compact ? undefined : 'wrap'}>
        <div className="section-head" data-reveal>
          <span className="eyebrow">karier</span>
          <h2>{ui.pengalamanJudul}</h2>
        </div>

        <div className={`exp-grid${sertifikasi.length ? '' : ' tanpa-cert'}`}>
          <div className="tl" data-reveal>
            {pengalaman.map((e) => (
              <div className="tl-item" key={e.posisi + e.perusahaan}>
                <div className="pd">{e.periode}</div>
                <h3>{e.posisi}</h3>
                <div className="co">{e.perusahaan}</div>
                <ul>
                  {e.poin.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {sertifikasi.length > 0 && (
          <aside className="cert" data-reveal>
            <h4>{ui.label.sertifikasi}</h4>
            {sertifikasi.map((s) => {
              const isi = (
                <>
                  <div className="nm">{s.nama}</div>
                  <div className="mt">
                    {s.penerbit}
                    {s.tahun ? ` · ${s.tahun}` : ''}
                    {s.url && (
                      <Arrow width="11" height="11" style={{ marginLeft: 6, opacity: 0.7 }} />
                    )}
                  </div>
                </>
              )
              return s.url ? (
                <a
                  className="cert-item"
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  key={s.nama}
                >
                  {isi}
                </a>
              ) : (
                <div className="cert-item" key={s.nama}>
                  {isi}
                </div>
              )
            })}
          </aside>
          )}
        </div>
      </div>
    </section>
  )
}
