import { useEffect, useRef, useState } from 'react'

const DURASI_KERNEL = 3000
const DURASI_TERMINAL = 3000
const MEMUDAR = 500

const logList = [
  '[  OK  ] Started Apply Kernel Variables.',
  '[  OK  ] Mounted Kernel Debug File System.',
  '[  OK  ] Mounted Huge Pages File System.',
  '[  OK  ] Mounted POSIX Message Queue File System.',
  '[  OK  ] Started Read and set NIS domainname from /etc/sysconfig/network.',
  '[  OK  ] Activated swap /dev/mapper/cl-swap.',
  '[  OK  ] Reached target Swap.',
  '[  OK  ] Started Remount Root and Kernel File Systems.',
  '        Starting Flush Journal to Persistent Storage...',
  '        Starting Load/Save Random Seed...',
  '        Starting Create Static Device Nodes in /dev...',
  '[  OK  ] Started Load/Save Random Seed.',
  '[  OK  ] Started Flush Journal to Persistent Storage.',
  '[  OK  ] Started Setup Virtual Console.',
  '[  OK  ] Started Create Static Device Nodes in /dev.',
  '        Starting udev Kernel Device Manager...',
  '[  OK  ] Started udev Kernel Device Manager.',
  '[  OK  ] Created slice system-lvm2\\x2dpvslice.slice.',
  '        Starting LVM event activation on device 8:2...',
  '[  OK  ] Started Monitoring of LVM2 mirrors, snapshots etc. using dmeventd or progress polling',
  '[  OK  ] Reached target Local File Systems (Pre).',
  '        Starting File System Check on /dev/disk/by-uuid/0868ca58-6212-404b-91d8-b512c612c58a.',
  '[  OK  ] Started File System Check on /dev/disk/by-uuid/0868ca58-6212-404b-91d8-b512c612c58a.',
  '        Mounting /boot...',
  '[  OK  ] Mounted /boot.',
  '[  OK  ] Reached target Local File Systems.',
  '        Starting Import network configuration from initramfs...',
  '        Starting Tell Plymouth To Write Out Runtime Data...',
  '        Starting Restore /run/initramfs on shutdown...',
  '[  OK  ] Started Restore /run/initramfs on shutdown.',
  '[  OK  ] Started Tell Plymouth To Write Out Runtime Data.',
  '[  OK  ] Started Import network configuration from initramfs.',
  '        Starting Create Volatile Files and Directories...',
  '[  OK  ] Started Create Volatile Files and Directories.',
  '[  OK  ] Started Security Auditing Service...',
  '        System init complete. Starting portofolio services...'
]

export default function Pembuka() {
  const [tahap, setTahap] = useState('kernel')
  const [logsTampil, setLogsTampil] = useState([])
  const [teksKetik, setTeksKetik] = useState('')
  const termRef = useRef(null)
  const timers = useRef([])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, [])

  useEffect(() => {
    let currentIndex = 0
    const intervalTime = DURASI_KERNEL / logList.length
    const interval = setInterval(() => {
      if (currentIndex < logList.length) {
        setLogsTampil((prev) => [...prev, logList[currentIndex]])
        currentIndex++
        if (termRef.current) {
          termRef.current.scrollTop = termRef.current.scrollHeight
        }
      } else {
        clearInterval(interval)
      }
    }, intervalTime)
    timers.current.push(
      setTimeout(() => {
        clearInterval(interval)
        setTahap('terminal')
      }, DURASI_KERNEL)
    )
    return () => {
      clearInterval(interval)
      timers.current.forEach(clearTimeout)
    }
  }, [])

  useEffect(() => {
    if (tahap !== 'terminal') return
    const terminalText = 'selamat datang'
    setTeksKetik('')
    let i = 0
    const interval = setInterval(() => {
      if (i < terminalText.length) {
        setTeksKetik(terminalText.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, 100)
    timers.current.push(
      setTimeout(() => {
        clearInterval(interval)
        setTahap('memudar')
      }, DURASI_TERMINAL),
      setTimeout(() => {
        setTahap('selesai')
        document.body.style.overflow = ''
      }, DURASI_TERMINAL + MEMUDAR)
    )
    return () => {
      clearInterval(interval)
      timers.current.forEach(clearTimeout)
      document.body.style.overflow = ''
    }
  }, [tahap])

  if (tahap === 'selesai') return null

  return (
    <div
      className={`kernel-boot-screen${tahap === 'memudar' ? ' memudar' : ''}`}
      aria-hidden="true"
    >
      <div className="kernel-term" ref={termRef}>
        {tahap === 'kernel' &&
          logsTampil.map((log, index) => {
            const isOk = log.includes('[  OK  ]')
            return (
              <div key={index} className={`kernel-line ${isOk ? 'ok' : 'normal'}`}>
                {isOk ? (
                  <>
                    <span className="bracket">[</span>
                    <span className="ok-text">  OK  </span>
                    <span className="bracket">]</span>
                    <span className="msg">{log.replace('[  OK  ]', '')}</span>
                  </>
                ) : (
                  <span className="msg">{log}</span>
                )}
              </div>
            )
          })}
        {tahap === 'terminal' && (
          <div className="kernel-line welcome-line">
            <span className="welcome-text">{teksKetik}</span>
            <span className="kernel-cursor">_</span>
          </div>
        )}
        {tahap === 'kernel' && <span className="kernel-cursor" />}
      </div>
    </div>
  )
}