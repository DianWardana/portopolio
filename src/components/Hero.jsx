import { useState } from 'react'
import { profile, ui } from '../data/content'
import { aset } from '../lib/aset'
import { Copy, Arrow } from './Icons'

export default function Hero() {
  const [tersalin, setTersalin] = useState(false)

  const tagline = profile.tagline

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
            {profile.labelKetersediaan}
          </span>

          <h1>
            {profile.judulBaris1}
            <span className="thin">{profile.judulBaris2}</span>
          </h1>

          <div className="name">
            {profile.nama} — {profile.lokasi}
          </div>

          <p className="tagline">{tagline}</p>

          <div className="cta-row">
            <a className="btn solid" href="#projects">
              {ui.hero.ctaUtama} <Arrow width="14" height="14" />
            </a>

            <button className="btn" onClick={salinEmail}>
              <Copy width="14" height="14" />
              {tersalin ? ui.hero.tersalin : ui.hero.ctaKedua}
            </button>

            {profile.cv && (
              <a className="btn" href={aset(profile.cv)} target="_blank" rel="noreferrer">
                {ui.hero.unduhCv}
              </a>
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
