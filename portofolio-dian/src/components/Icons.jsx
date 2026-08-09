const base = {
  width: 16,
  height: 16,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const Check = (p) => (
  <svg {...base} {...p}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

export const Dot = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="3" />
  </svg>
)

export const Loader = (p) => (
  <svg {...base} {...p} className="spin">
    <path d="M21 12a9 9 0 1 1-6.2-8.6" />
  </svg>
)

export const Chevron = (p) => (
  <svg {...base} {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
)

export const Arrow = (p) => (
  <svg {...base} {...p}>
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
)

export const Sun = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
)

export const Moon = (p) => (
  <svg {...base} {...p}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
  </svg>
)

export const Terminal = (p) => (
  <svg {...base} {...p}>
    <path d="m4 17 6-5-6-5M12 19h8" />
  </svg>
)

export const Copy = (p) => (
  <svg {...base} {...p}>
    <rect x="9" y="9" width="12" height="12" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
)

/* ---------- Ikon tambahan ---------- */

export const Menu = (p) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

export const Close = (p) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

export const Search = (p) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
)

export const Play = (p) => (
  <svg {...base} {...p} fill="currentColor" stroke="none">
    <path d="M8 5.5v13l11-6.5-11-6.5Z" />
  </svg>
)

export const Stop = (p) => (
  <svg {...base} {...p} fill="currentColor" stroke="none">
    <rect x="7" y="7" width="10" height="10" rx="2" />
  </svg>
)

export const Replay = (p) => (
  <svg {...base} {...p}>
    <path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" />
  </svg>
)

export const Globe = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 3 2.5 15 0 18-2.5-3-2.5-15 0-18Z" />
  </svg>
)

export const Printer = (p) => (
  <svg {...base} {...p}>
    <path d="M7 9V3h10v6M7 19H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
    <rect x="7" y="15" width="10" height="6" rx="1" />
  </svg>
)

export const Command = (p) => (
  <svg {...base} {...p}>
    <path d="M9 6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6Z" />
  </svg>
)

export const Alert = (p) => (
  <svg {...base} {...p}>
    <path d="M12 8v5M12 17h.01" />
    <path d="M10.3 3.9 2.4 17.5A2 2 0 0 0 4.1 20.5h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
  </svg>
)

/* ---------- Ikon node topologi ---------- */

export const NodeWan = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8" />
    <path d="M4 12h16M12 4c2.2 2.6 2.2 13.4 0 16-2.2-2.6-2.2-13.4 0-16Z" />
  </svg>
)

export const NodeRouter = (p) => (
  <svg {...base} {...p}>
    <rect x="2.5" y="13" width="19" height="7" rx="2" />
    <path d="M6.5 16.5h.01M10 16.5h.01M12 10V7M12 7l-3.5-3M12 7l3.5-3" />
  </svg>
)

export const NodeSwitch = (p) => (
  <svg {...base} {...p}>
    <rect x="2.5" y="8" width="19" height="8" rx="2" />
    <path d="M6 11.5v1M9 11.5v1M12 11.5v1M15 11.5v1M18 11.5v1" />
  </svg>
)

export const NodeAp = (p) => (
  <svg {...base} {...p}>
    <path d="M5 12.5a9 9 0 0 1 14 0M8 15.5a5 5 0 0 1 8 0" />
    <circle cx="12" cy="19" r="1.4" />
  </svg>
)

export const NodeServer = (p) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="4" width="17" height="7" rx="2" />
    <rect x="3.5" y="13" width="17" height="7" rx="2" />
    <path d="M7 7.5h.01M7 16.5h.01" />
  </svg>
)

export const NodeVm = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="6" width="12" height="12" rx="2" />
    <path d="M9 6V4.5A1.5 1.5 0 0 1 10.5 3H19.5A1.5 1.5 0 0 1 21 4.5v9A1.5 1.5 0 0 1 19.5 15H18" />
  </svg>
)

export const NodeStorage = (p) => (
  <svg {...base} {...p}>
    <ellipse cx="12" cy="6" rx="8" ry="3" />
    <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
  </svg>
)

export const NodeField = (p) => (
  <svg {...base} {...p}>
    <path d="m3 9 14-4 3 6-14 4L3 9Z" />
    <path d="M7 12v6M6 21h4" />
  </svg>
)

export const IKON_NODE = {
  wan: NodeWan,
  router: NodeRouter,
  switch: NodeSwitch,
  ap: NodeAp,
  server: NodeServer,
  vm: NodeVm,
  storage: NodeStorage,
  field: NodeField,
}
