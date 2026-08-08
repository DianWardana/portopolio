import { useState } from 'react'
import { stack, kategoriStack, ui } from '../data/content'

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
 */
const ICON_MAP = {
  // Linux/Server
  'linux (ubuntu)':      'https://cdn.simpleicons.org/ubuntu/E95420',
  'apache2':             'https://cdn.simpleicons.org/apache/D22128',
  'bash scripting':      'https://cdn.simpleicons.org/gnubash/4EAA25',
  'ssh hardening':       'https://cdn.simpleicons.org/openssh/000000',
  'dns & ssl':           'https://cdn.simpleicons.org/letsencrypt/003A70',
  // Network
  'mikrotik':            'https://cdn.simpleicons.org/mikrotik/293239',
  'vlan / switch':       'https://cdn.simpleicons.org/cisco/1BA0D7',
  'network design':      'https://cdn.simpleicons.org/wireshark/1679A7',
  'ruijie':              '/icons/ruijie.svg',

  // Virtualisasi
  'docker':              'https://cdn.simpleicons.org/docker/2496ED',
  'vmware esxi':         'https://cdn.simpleicons.org/vmware/607078',
  'proxmox':             'https://cdn.simpleicons.org/proxmox/E57000',
  // Database
  'mysql / mariadb':     'https://cdn.simpleicons.org/mysql/4479A1',
  'phpmyadmin':          'https://cdn.simpleicons.org/phpmyadmin/6C78AF',
  // Security
  'ufw firewall':        'https://cdn.simpleicons.org/linux/FCC624',
  'fail2ban':            'https://cdn.simpleicons.org/hackthebox/9FEF00',
  'server hardening':    'https://cdn.simpleicons.org/keepassxc/6CAC4D',
  // Monitoring
  'grafana':             'https://cdn.simpleicons.org/grafana/F46800',
  'prometheus':          'https://cdn.simpleicons.org/prometheus/E6522C',
  'netdata':             'https://cdn.simpleicons.org/netdata/00AB44',
  // Field
  'cctv (hikvision)':   'https://cdn.simpleicons.org/icloud/555555',
  'jaringan alarm bank': 'https://cdn.simpleicons.org/amazonroute53/8C4FFF',
  'access control':      'https://cdn.simpleicons.org/adguard/66B574',
}

function getIcon(nama) {
  return ICON_MAP[nama.toLowerCase()] || null
}

export default function StackSection() {
  const [aktif, setAktif] = useState('Semua')
  const daftar = aktif === 'Semua' ? stack : stack.filter((s) => s.kategori === aktif)

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
              {k}
              {k !== 'Semua' && (
                <span style={{ opacity: 0.5 }}>
                  {' '}
                  {stack.filter((s) => s.kategori === k).length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="tech-icon-grid" data-reveal>
          {daftar.map((s, i) => {
            const iconUrl = getIcon(s.nama)
            return (
              <div
                className="tech-icon-card"
                key={s.nama}
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {/* Tooltip muncul di atas saat hover */}
                <div className="tech-tooltip">
                  <span className="tech-tooltip-nama">{s.nama}</span>
                  <span className="tech-tooltip-kat">{s.kategori}</span>
                </div>

                <div className="tech-icon-box">
                  {iconUrl ? (
                    <img
                      src={iconUrl}
                      alt={s.nama}
                      className="tech-icon-img"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'flex'
                      }}
                    />
                  ) : null}
                  <span
                    className="tech-icon-fallback"
                    style={{ display: iconUrl ? 'none' : 'flex' }}
                  >
                    {s.nama.slice(0, 2).toUpperCase()}
                  </span>
                </div>

                <span className="tech-icon-label">{s.nama}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
