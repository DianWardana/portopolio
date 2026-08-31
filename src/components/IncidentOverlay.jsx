export default function IncidentOverlay({ active, onClose }) {
  if (!active) return null
  return (
    <div className="incident-toast glitch" role="alert" aria-live="assertive">
      <div className="incident-toast-head">
        <strong>⚠ ALERT — Incident Active</strong>
        <button className="icon-btn" onClick={onClose} aria-label="Tutup alert" style={{ width: 28, height: 28 }}>✕</button>
      </div>
      <p>High latency detected on Cluster-01 — services degraded.</p>
      <small className="mono">[CRITICAL] Investigating — klik tombol incident lagi untuk pulihkan</small>
    </div>
  )
}
