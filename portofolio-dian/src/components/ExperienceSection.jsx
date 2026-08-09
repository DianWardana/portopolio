import { pengalaman, sertifikasi, ui } from '../data/content'
import { useT } from '../lib/i18n'
import { Arrow } from './Icons'

export default function ExperienceSection() {
  const [t] = useT()

  return (
    <section className="band" id="pengalaman">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <span className="eyebrow">riwayat</span>
          <h2>{t(ui.pengalamanJudul)}</h2>
        </div>

        <div className="exp-grid">
          <div className="tl" data-reveal>
            {pengalaman.map((e) => (
              <div className="tl-item" key={t(e.posisi) + t(e.perusahaan)}>
                <div className="pd">{t(e.periode)}</div>
                <h3>{t(e.posisi)}</h3>
                <div className="co">{t(e.perusahaan)}</div>
                <ul>
                  {t(e.poin).map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <aside className="cert" data-reveal>
            <h4>{t(ui.label.sertifikasi)}</h4>
            {sertifikasi.map((s) => {
              const isi = (
                <>
                  <div className="nm">{t(s.nama)}</div>
                  <div className="mt">
                    {t(s.penerbit)}
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
                  key={t(s.nama)}
                >
                  {isi}
                </a>
              ) : (
                <div className="cert-item" key={t(s.nama)}>
                  {isi}
                </div>
              )
            })}
          </aside>
        </div>
      </div>
    </section>
  )
}
