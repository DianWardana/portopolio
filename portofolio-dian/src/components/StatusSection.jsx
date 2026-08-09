import { useEffect, useMemo, useState } from 'react'
import { layananStatus, ui } from '../data/content'
import { useKunciScroll } from '../lib/hooks'
import { useT } from '../lib/i18n'
import { Alert, Close } from './Icons'

const HARI = 90

/* Halaman status ala status page beneran.
 * 90 batang = 90 hari terakhir. Hijau = normal, kuning = gangguan,
 * merah = down. Yang berwarna bisa diklik untuk membaca ceritanya. */
export default function StatusSection() {
  const [t] = useT()
  const [terpilih, setTerpilih] = useState(null)

  useKunciScroll(!!terpilih)

  useEffect(() => {
    if (!terpilih) return
    const onKey = (e) => e.key === 'Escape' && setTerpilih(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [terpilih])

  const data = useMemo(
    () =>
      layananStatus.map((layanan) => {
        const hari = Array.from({ length: HARI }, (_, i) => ({
          // index 0 = paling kiri (paling lama), HARI-1 = hari ini
          hariLalu: HARI - 1 - i,
          insiden: null,
        }))
        layanan.insiden.forEach((ins) => {
          const idx = HARI - 1 - ins.hariLalu
          if (idx >= 0 && idx < HARI) hari[idx].insiden = ins
        })
        return { ...layanan, hari }
      }),
    []
  )

  const labelHari = (n) => {
    if (n === 0) return t(ui.label.hariIni)
    return t({ id: `${n} hari lalu`, en: `${n} days ago` })
  }

  return (
    <section className="band" id="status">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <span className="eyebrow">uptime</span>
          <h2>{t(ui.statusJudul)}</h2>
          <p>{t(ui.statusDeskripsi)}</p>
        </div>

        <div className="status-card" data-reveal>
          {data.map((layanan) => (
            <div className="status-baris" key={t(layanan.nama)}>
              <div className="status-meta">
                <span className="status-nama">{t(layanan.nama)}</span>
                <span className="status-angka mono">{layanan.uptime}%</span>
              </div>

              <div className="status-bars">
                {layanan.hari.map((h) => {
                  const tingkat = h.insiden?.tingkat || 'ok'
                  const judul = h.insiden
                    ? `${labelHari(h.hariLalu)} — ${t(h.insiden.judul)}`
                    : `${labelHari(h.hariLalu)} — ${t({ id: 'normal', en: 'operational' })}`

                  return h.insiden ? (
                    <button
                      key={h.hariLalu}
                      className={`sbar ${tingkat}`}
                      title={judul}
                      aria-label={judul}
                      onClick={() =>
                        setTerpilih({ ...h.insiden, layanan: t(layanan.nama), hariLalu: h.hariLalu })
                      }
                    />
                  ) : (
                    <span key={h.hariLalu} className="sbar ok" title={judul} />
                  )
                })}
              </div>

              <div className="status-kaki mono">
                <span>{t(ui.label.hariTerakhir)}</span>
                <span className="status-garis" />
                <span>{t(ui.label.hariIni)}</span>
              </div>
            </div>
          ))}

          <div className="status-legenda mono">
            <span><i className="lg ok" /> {t({ id: 'normal', en: 'operational' })}</span>
            <span><i className="lg gangguan" /> {t({ id: 'gangguan', en: 'degraded' })}</span>
            <span><i className="lg down" /> {t({ id: 'down', en: 'down' })}</span>
          </div>
        </div>

        {/* Panel detail insiden */}
        {terpilih && (
          <div className="insiden-modal" role="dialog" aria-modal="true">
            <div className="insiden-tirai" onClick={() => setTerpilih(null)} />

            <article className={`insiden-panel ${terpilih.tingkat}`}>
              <header>
                <span className={`insiden-tag mono ${terpilih.tingkat}`}>
                  <Alert width="12" height="12" />
                  {terpilih.tingkat === 'down'
                    ? t({ id: 'DOWN', en: 'DOWN' })
                    : t({ id: 'GANGGUAN', en: 'DEGRADED' })}
                </span>
                <button
                  className="icon-btn"
                  onClick={() => setTerpilih(null)}
                  aria-label={t(ui.label.tutup)}
                >
                  <Close width="15" height="15" />
                </button>
              </header>

              <h3>{t(terpilih.judul)}</h3>

              <div className="insiden-meta mono">
                <span>{terpilih.layanan}</span>
                <span>·</span>
                <span>{labelHari(terpilih.hariLalu)}</span>
                <span>·</span>
                <span>{terpilih.durasi}</span>
              </div>

              <div className="insiden-blok">
                <span className="eyebrow">{t({ id: 'akar masalah', en: 'root cause' })}</span>
                <p>{t(terpilih.sebab)}</p>
              </div>

              <div className="insiden-blok">
                <span className="eyebrow">{t({ id: 'penanganan & pencegahan', en: 'response & prevention' })}</span>
                <p>{t(terpilih.solusi)}</p>
              </div>
            </article>
          </div>
        )}
      </div>
    </section>
  )
}
