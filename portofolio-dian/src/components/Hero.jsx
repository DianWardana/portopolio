import { useState } from 'react'
import { profile, ui } from '../data/content'
import { useTypewriter } from '../lib/hooks'
import { useT } from '../lib/i18n'
import { aset } from '../lib/aset'
import { Copy, Arrow, Printer } from './Icons'

export default function Hero() {
  const [t] = useT()
  const [tersalin, setTersalin] = useState(false)

  const tagline = t(profile.tagline)
  const [ketikan, selesaiKetik] = useTypewriter(tagline, { kecepatan: 18, jeda: 500 })

  const salinEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setTersalin(true)
      setTimeout(() => setTersalin(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <header className="hero" id="atas">
      {/* Latar grid blueprint — murni dekoratif */}
      <div className="hero-grid-bg" aria-hidden="true" />

      <div className="wrap hero-grid">
        {/* Kolom kiri: teks */}
        <div className="hero-left">
          <span className="avail">
            <span className="pulse" aria-hidden="true" />
            {t(profile.labelKetersediaan)}
          </span>

          <h1>
            {profile.judulBaris1}
            <span className="thin">{profile.judulBaris2}</span>
          </h1>

          <div className="name">
            {profile.nama} — {t(profile.lokasi)}
          </div>

          {/* Tagline diketik seperti di terminal.
              Teks lengkap tetap ada di DOM untuk pembaca layar & SEO. */}
          <p className="tagline">
            <span aria-hidden="true">
              {ketikan}
              {!selesaiKetik && <span className="kursor-ketik" />}
            </span>
            <span className="sr-only">{tagline}</span>
          </p>

          <div className="cta-row">
            <a className="btn solid" href="#projects">
              {t(ui.hero.ctaUtama)} <Arrow width="14" height="14" />
            </a>

            <button className="btn" onClick={salinEmail}>
              <Copy width="14" height="14" />
              {tersalin ? t(ui.hero.tersalin) : t(ui.hero.ctaKedua)}
            </button>

            {profile.cv ? (
              <a className="btn" href={aset(profile.cv)} target="_blank" rel="noreferrer">
                {t(ui.hero.unduhCv)}
              </a>
            ) : (
              <button className="btn" onClick={() => window.print()}>
                <Printer width="14" height="14" />
                {t(ui.label.cetakCv)}
              </button>
            )}
          </div>
        </div>

        {/* Kolom kanan: foto */}
        <div className="hero-kanan">
          {profile.foto && (
            <img
              src={aset(profile.foto)}
              alt={profile.nama}
              className="hero-foto"
              width="420"
              height="420"
              loading="eager"
              decoding="async"
            />
          )}
        </div>
      </div>
    </header>
  )
}
