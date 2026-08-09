import { useMemo, useState } from 'react'
import { stack, kategoriStack, projects, ui } from '../data/content'
import { aset } from '../lib/aset'
import { useTema } from '../lib/hooks'

/*
 * Mapping nama tool → URL icon (SimpleIcons CDN)
 * Format: 'nama tool (huruf kecil)': 'https://cdn.simpleicons.org/SLUG/WARNA_HEX'
 * Cari slug di: https://simpleicons.org
 *
 * CARA MENAMBAH ICON BARU:
 * 1. Tambah tool baru di src/data/content.js (di array `stack`)
 * 2. Tambah entri baru di ICON_MAP di bawah ini:
 *    'nama tool': 'https://cdn.simpleicons.org/slug/warna',
 * 3. Simpan → npm run build → deploy
 *
 * ICON CUSTOM (file sendiri di folder /public):
 * Bungkus dengan aset(), JANGAN tulis '/icons/nama.svg' langsung.
 * Path absolut akan 404 di GitHub Pages karena situs ini berada
 * di sub-folder /portopolio/, bukan di root domain.
 *   BENAR : aset('icons/ruijie.svg')
 *   SALAH : '/icons/ruijie.svg'
 */
const si = (slug, warna) => `https://cdn.simpleicons.org/${slug}/${warna}`

/*
 * Mapping nama tool → ikon.
 *
 * Nilainya boleh dua bentuk:
 *   'https://...'                        → dipakai di kedua tema
 *   { gelap: '...', terang: '...' }      → beda ikon per tema
 *
 * Bentuk kedua diperlukan karena sebagian logo resmi berwarna sangat
 * gelap — MikroTik (#293239), OpenSSH (hitam pekat), Let's Encrypt
 * (#003A70). Di atas latar tema gelap warna aslinya nyaris tidak
 * terlihat, jadi versi tema gelap diberi warna terang.
 *
 * CARA MENAMBAH ICON BARU:
 * 1. Tambah tool baru di src/data/content.js (di array `stack`)
 * 2. Tambah entri baru di ICON_MAP di bawah ini
 * 3. Cari slug-nya di https://simpleicons.org
 *
 * ICON CUSTOM (file sendiri di folder /public):
 * Bungkus dengan aset(), JANGAN tulis '/icons/nama.svg' langsung.
 * Path absolut akan 404 di GitHub Pages karena situs ini berada
 * di sub-folder /portopolio/, bukan di root domain.
 *   BENAR : aset('icons/ruijie.svg')
 *   SALAH : '/icons/ruijie.svg'
 */
const ICON_MAP = {
  // Linux/Server
  'linux (ubuntu)': si('ubuntu', 'E95420'),
  apache2: si('apache', 'D22128'),
  'bash scripting': si('gnubash', '4EAA25'),
  'ssh hardening': { gelap: si('openssh', 'C6D3E0'), terang: si('openssh', '1B2733') },
  'dns & ssl': { gelap: si('letsencrypt', '5C93C7'), terang: si('letsencrypt', '003A70') },
  // Network
  mikrotik: { gelap: si('mikrotik', 'BCCBDA'), terang: si('mikrotik', '293239') },
  'vlan / switch': { gelap: si('mikrotik', 'BCCBDA'), terang: si('mikrotik', '293239') },
  'network design': si('wireshark', '1679A7'),
  ruijie: aset('icons/ruijie.svg'), // ← icon custom milikmu sendiri
  // Virtualisasi
  docker: si('docker', '2496ED'),
  'vmware esxi': { gelap: si('vmware', '9AA9B4'), terang: si('vmware', '607078') },
  proxmox: si('proxmox', 'E57000'),
  // Database
  'mysql / mariadb': si('mysql', '4479A1'),
  phpmyadmin: si('phpmyadmin', '8A94C8'),
  // Security
  'ufw firewall': si('linux', 'FCC624'),
  fail2ban: si('hackthebox', '9FEF00'),
  'server hardening': si('keepassxc', '6CAC4D'),
  // Monitoring
  grafana: si('grafana', 'F46800'),
  prometheus: si('prometheus', 'E6522C'),
  netdata: si('netdata', '00AB44'),
  // Field
  'nvr & cctv': { gelap: si('icloud', 'A3B2C0'), terang: si('icloud', '4A5A69') },
  'jaringan alarm bank': si('amazonroute53', '8C4FFF'),
  'access control': si('adguard', '66B574'),
  pabx: { gelap: si('panasonic', 'D9E3ED'), terang: si('panasonic', '0050A0') },
}

function getIcon(nama, tema) {
  const entri = ICON_MAP[nama.toLowerCase()]
  if (!entri) return null
  if (typeof entri === 'string') return entri
  return tema === 'light' ? entri.terang : entri.gelap
}

export default function StackSection({ onPilihTag }) {
  const [aktif, setAktif] = useState('Semua')
  const [tema] = useTema()

  const daftar = aktif === 'Semua' ? stack : stack.filter((s) => s.kategori === aktif)

  /* Berapa project yang memakai tool ini — dipakai untuk badge angka */
  const jumlahProject = useMemo(() => {
    const peta = {}
    stack.forEach((s) => {
      peta[s.nama] = s.proyek ? projects.filter((p) => p.tag.includes(s.proyek)).length : 0
    })
    return peta
  }, [])

  return (
    <section className="band" id="stack">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <span className="eyebrow">stacks</span>
          <h2>{ui.stackJudul}</h2>
          <p>{ui.stackDeskripsi}</p>
        </div>

        <div className="filters" data-reveal>
          {kategoriStack.map((k) => (
            <button
              key={k}
              className="filter"
              aria-pressed={aktif === k}
              onClick={() => setAktif(k)}
            >
              {k === 'Semua' ? ui.label.semua : k}
              {k !== 'Semua' && (
                <span style={{ opacity: 0.5 }}> {stack.filter((s) => s.kategori === k).length}</span>
              )}
            </button>
          ))}
        </div>

        <div className="tech-icon-grid" data-reveal>
          {daftar.map((s, i) => {
            const iconUrl = getIcon(s.nama, tema)
            const n = jumlahProject[s.nama] || 0
            const bisaKlik = n > 0

            return (
              <button
                type="button"
                className={`tech-icon-card${bisaKlik ? ' bisa-klik' : ''}`}
                key={s.nama}
                style={{ animationDelay: `${i * 40}ms` }}
                disabled={!bisaKlik}
                onClick={() => bisaKlik && onPilihTag?.(s.proyek, s.nama)}
                aria-label={
                  bisaKlik
                    ? `${s.nama} — ${ui.label.dipakaiDi} ${n} ${ui.label.project}`
                    : s.nama
                }
              >
                {/* Tooltip muncul di atas saat hover */}
                <div className="tech-tooltip">
                  <span className="tech-tooltip-nama">{s.nama}</span>
                  <span className="tech-tooltip-kat">{s.kategori}</span>
                  {s.catatan && <span className="tech-tooltip-cat">{s.catatan}</span>}
                  {bisaKlik && (
                    <span className="tech-tooltip-aksi">
                      {ui.label.dipakaiDi} {n} {ui.label.project} →
                    </span>
                  )}
                </div>

                <div className="tech-icon-box">
                  {iconUrl ? (
                    <img
                      src={iconUrl}
                      alt=""
                      className="tech-icon-img"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        const fb = e.currentTarget.nextElementSibling
                        if (fb) fb.style.display = 'flex'
                      }}
                    />
                  ) : null}
                  <span
                    className="tech-icon-fallback"
                    style={{ display: iconUrl ? 'none' : 'flex' }}
                  >
                    {s.nama.slice(0, 2).toUpperCase()}
                  </span>

                  {bisaKlik && <span className="tech-badge mono">{n}</span>}
                </div>

                <span className="tech-icon-label">{s.nama}</span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
