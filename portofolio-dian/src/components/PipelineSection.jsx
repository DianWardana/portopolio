import { useCallback, useEffect, useRef, useState } from 'react'
import { pipeline, ui } from '../data/content'
import { kurangGerak } from '../lib/hooks'
import { useT } from '../lib/i18n'
import { Play, Stop, Replay, Check } from './Icons'

const JEDA_BARIS = 260 // ms per baris log saat mode jalan
const JEDA_TAHAP = 700 // ms jeda sebelum lanjut ke tahap berikutnya

export default function PipelineSection() {
  const [t] = useT()
  const [pilih, setPilih] = useState(0)
  const [jalan, setJalan] = useState(false)
  const [barisTampil, setBarisTampil] = useState(null) // null = tampilkan semua
  const [tuntas, setTuntas] = useState([])
  const timerRef = useRef([])

  const tahap = pipeline[pilih]
  const logTampil = barisTampil === null ? tahap.log : tahap.log.slice(0, barisTampil)

  const bersihkanTimer = useCallback(() => {
    timerRef.current.forEach(clearTimeout)
    timerRef.current = []
  }, [])

  const hentikan = useCallback(() => {
    bersihkanTimer()
    setJalan(false)
    setBarisTampil(null)
  }, [bersihkanTimer])

  /* Menjalankan seluruh tahap berurutan:
   * log muncul baris demi baris, lalu lanjut ke tahap berikutnya. */
  const jalankan = useCallback(() => {
    bersihkanTimer()
    setTuntas([])
    setJalan(true)
    setPilih(0)

    // Kalau pengguna minta gerak minimal, langsung tandai semua selesai
    if (kurangGerak()) {
      setPilih(pipeline.length - 1)
      setTuntas(pipeline.map((s) => s.id))
      setJalan(false)
      setBarisTampil(null)
      return
    }

    let waktu = 0

    pipeline.forEach((s, iTahap) => {
      timerRef.current.push(
        setTimeout(() => {
          setPilih(iTahap)
          setBarisTampil(0)
        }, waktu)
      )

      s.log.forEach((_, iBaris) => {
        waktu += JEDA_BARIS
        timerRef.current.push(setTimeout(() => setBarisTampil(iBaris + 1), waktu))
      })

      waktu += JEDA_TAHAP
      timerRef.current.push(
        setTimeout(() => setTuntas((c) => [...c, s.id]), waktu - JEDA_TAHAP / 2)
      )
    })

    timerRef.current.push(
      setTimeout(() => {
        setJalan(false)
        setBarisTampil(null)
      }, waktu)
    )
  }, [bersihkanTimer])

  useEffect(() => bersihkanTimer, [bersihkanTimer])

  const pilihManual = (i) => {
    if (jalan) hentikan()
    setPilih(i)
    setBarisTampil(null)
  }

  const semuaTuntas = tuntas.length === pipeline.length
  const progres = jalan
    ? ((pilih + (barisTampil || 0) / Math.max(tahap.log.length, 1)) / pipeline.length) * 100
    : semuaTuntas
      ? 100
      : 0

  return (
    <section className="band" id="pipeline">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <span className="eyebrow">jalur rilis</span>
          <h2>{t(ui.pipelineJudul)}</h2>
          <p>{t(ui.pipelineDeskripsi)}</p>
        </div>

        {/* Panel kontrol auto-play */}
        <div className="pipe-bar" data-reveal>
          <button
            className={`btn${jalan ? '' : ' solid'} pipe-run`}
            onClick={jalan ? hentikan : jalankan}
          >
            {jalan ? (
              <>
                <Stop width="13" height="13" /> {t(ui.label.hentikan)}
              </>
            ) : semuaTuntas ? (
              <>
                <Replay width="14" height="14" /> {t(ui.label.ulangi)}
              </>
            ) : (
              <>
                <Play width="13" height="13" /> {t(ui.label.jalankan)}
              </>
            )}
          </button>

          <div className="pipe-progress" role="progressbar" aria-valuenow={Math.round(progres)}>
            <span style={{ width: `${progres}%` }} />
          </div>

          <span className="pipe-state mono">
            {jalan
              ? `${t(ui.label.berjalan)} · ${pilih + 1}/${pipeline.length}`
              : semuaTuntas
                ? t(ui.label.selesai)
                : 'idle'}
          </span>
        </div>

        <div className="pipe-grid" data-reveal>
          <div className="stages" role="tablist" aria-label="Tahap pipeline">
            {pipeline.map((s, i) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={i === pilih}
                className={`stage${tuntas.includes(s.id) ? ' tuntas' : ''}${
                  jalan && i === pilih ? ' aktif-jalan' : ''
                }`}
                onClick={() => pilihManual(i)}
              >
                <span className="num">
                  {tuntas.includes(s.id) ? (
                    <Check width="12" height="12" />
                  ) : (
                    String(i + 1).padStart(2, '0')
                  )}
                </span>
                <span className="nm">{s.nama}</span>
                <span className="dur">{s.durasi}</span>
              </button>
            ))}
          </div>

          <div className="inspector" role="tabpanel" aria-live="polite">
            <div className="top">
              <h3>{tahap.nama}</h3>
              <p>{t(tahap.ringkas)}</p>
              <div className="chips">
                {tahap.tools.map((x) => (
                  <span className="chip" key={x}>
                    {x}
                  </span>
                ))}
              </div>
            </div>

            <div className="logbox">
              {logTampil.map((l, i) => (
                <div key={tahap.id + i} style={{ animationDelay: `${i * 55}ms` }}>
                  {l}
                </div>
              ))}
              {jalan && <div className="log-kursor" aria-hidden="true" />}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
