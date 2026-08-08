/* ============================================================
 *  ISI PORTOFOLIO — EDIT FILE INI SAJA
 * ============================================================
 *  Semua teks, project, skill, dan pengalaman ada di sini.
 *  Kamu tidak perlu menyentuh file lain untuk mengganti konten.
 *  Setelah edit: simpan -> git commit -> git push -> otomatis ter-deploy.
 * ============================================================ */

/* ------------------------------------------------------------
 *  1. IDENTITAS
 * ---------------------------------------------------------- */
export const profile = {
  nama: 'Rafi Ardiansyah',
  inisial: 'RA',
  // Judul besar di hero. Dipecah 2 baris supaya rapi.
  judulBaris1: 'DevOps',
  judulBaris2: 'Engineer',
  // Satu kalimat yang menjelaskan kamu. Jangan lebih dari 2 baris.
  tagline:
    'Saya membangun jalur rilis yang membosankan — dalam artian bagus. Otomatisasi infrastruktur, pipeline yang bisa dipercaya, dan sistem yang tetap hidup saat jam 3 pagi.',
  lokasi: 'Jakarta, Indonesia',
  zonaWaktu: 'Asia/Jakarta',
  // Status ketersediaan kerja. Pilihan: 'open' | 'limited' | 'closed'
  ketersediaan: 'open',
  labelKetersediaan: 'Terbuka untuk peluang baru',
  email: 'halo@namakamu.dev',
  // Kosongkan string ('') kalau tidak mau ditampilkan.
  github: 'https://github.com/username',
  linkedin: 'https://linkedin.com/in/username',
  // Taruh file CV di folder /public, lalu tulis '/cv.pdf'
  cv: '',
}

/* ------------------------------------------------------------
 *  2. ANGKA RINGKAS (strip metrik di bawah hero)
 *     'nilai' harus angka. 'sufiks' & 'prefiks' opsional.
 * ---------------------------------------------------------- */
export const metrik = [
  { nilai: 99.98, sufiks: '%', desimal: 2, label: 'Uptime rata-rata', catatan: '12 bulan terakhir' },
  { nilai: 1240, sufiks: '+', label: 'Deploy ke produksi', catatan: 'lewat pipeline otomatis' },
  { nilai: 68, sufiks: '%', label: 'Waktu build turun', catatan: 'setelah caching layer' },
  { nilai: 9, sufiks: ' menit', label: 'Rata-rata MTTR', catatan: 'dari alert ke pulih' },
]

/* ------------------------------------------------------------
 *  3. PIPELINE — bagian interaktif utama
 *     Klik tiap tahap untuk melihat detail & log.
 *     'log' cuma teks biasa, tulis apa saja yang menggambarkan kerjamu.
 * ---------------------------------------------------------- */
export const pipeline = [
  {
    id: 'source',
    nama: 'Source',
    durasi: '3s',
    ringkas: 'Trunk-based, PR wajib review, commit ditandatangani.',
    tools: ['Git', 'GitHub', 'Conventional Commits'],
    log: [
      '$ git fetch --prune origin',
      'branch feat/rate-limiter -> origin/main',
      'commit signature: verified (GPG)',
      'checks required: 3 · reviewers: 2',
      'hasil: siap masuk pipeline',
    ],
  },
  {
    id: 'build',
    nama: 'Build',
    durasi: '48s',
    ringkas: 'Multi-stage Docker, layer caching, image kecil & reproducible.',
    tools: ['Docker', 'BuildKit', 'Kaniko'],
    log: [
      '$ docker buildx build --cache-from registry',
      'stage 1/3 deps      cached   0.4s',
      'stage 2/3 compile   ok      31.2s',
      'stage 3/3 runtime   ok      16.1s',
      'ukuran image: 812MB -> 94MB (distroless)',
    ],
  },
  {
    id: 'test',
    nama: 'Test',
    durasi: '1m 12s',
    ringkas: 'Unit, integrasi, dan smoke test paralel dengan gerbang coverage.',
    tools: ['Jest', 'Testcontainers', 'k6'],
    log: [
      '$ npm run test:ci -- --shard',
      'unit          812 lulus   18s',
      'integrasi      94 lulus   41s',
      'beban (k6)    p95 148ms   ok',
      'coverage 86.4% (minimum 80%)',
    ],
  },
  {
    id: 'scan',
    nama: 'Scan',
    durasi: '22s',
    ringkas: 'Gerbang keamanan: dependensi, image, dan konfigurasi IaC.',
    tools: ['Trivy', 'Semgrep', 'tfsec'],
    log: [
      '$ trivy image --severity HIGH,CRITICAL',
      'CVE kritis      0',
      'CVE tinggi      0',
      'secret bocor    0',
      'tfsec: 2 peringatan (sudah ada pengecualian)',
    ],
  },
  {
    id: 'deploy',
    nama: 'Deploy',
    durasi: '35s',
    ringkas: 'GitOps. Argo CD menyamakan state cluster dengan isi repo.',
    tools: ['Argo CD', 'Helm', 'Kubernetes'],
    log: [
      '$ argocd app sync payments-api',
      'strategi: canary 10% -> 50% -> 100%',
      'health   Healthy    sync   Synced',
      'rollback otomatis kalau error rate > 1%',
      'selesai dalam 35s tanpa downtime',
    ],
  },
  {
    id: 'observe',
    nama: 'Observe',
    durasi: 'terus jalan',
    ringkas: 'SLO, dashboard, dan alert yang benar-benar dibaca orang.',
    tools: ['Prometheus', 'Grafana', 'Loki', 'OpenTelemetry'],
    log: [
      '$ promtool check rules alerts.yaml',
      'SLO ketersediaan   99.9%   sisa budget 71%',
      'SLO latensi p95    200ms   sisa budget 88%',
      'alert aktif        0',
      'setiap alert punya runbook',
    ],
  },
]

/* ------------------------------------------------------------
 *  4. TOOLS & SKILL
 *     'level' = 1 sampai 5. 'kategori' dipakai untuk filter.
 * ---------------------------------------------------------- */
export const kategoriStack = ['Semua', 'Cloud', 'Container', 'IaC', 'CI/CD', 'Observability', 'Bahasa']

export const stack = [
  { nama: 'AWS', kategori: 'Cloud', level: 5, catatan: 'EKS, ECS, RDS, Lambda, VPC' },
  { nama: 'Google Cloud', kategori: 'Cloud', level: 3, catatan: 'GKE, Cloud Run' },
  { nama: 'Kubernetes', kategori: 'Container', level: 5, catatan: 'CKA · operator & HPA' },
  { nama: 'Docker', kategori: 'Container', level: 5, catatan: 'multi-stage, distroless' },
  { nama: 'Helm', kategori: 'Container', level: 4, catatan: 'chart internal, umbrella' },
  { nama: 'Terraform', kategori: 'IaC', level: 5, catatan: 'modul reusable, remote state' },
  { nama: 'Ansible', kategori: 'IaC', level: 4, catatan: 'baseline & patching server' },
  { nama: 'GitHub Actions', kategori: 'CI/CD', level: 5, catatan: 'reusable workflow, OIDC' },
  { nama: 'GitLab CI', kategori: 'CI/CD', level: 4, catatan: 'runner otomatis di K8s' },
  { nama: 'Argo CD', kategori: 'CI/CD', level: 4, catatan: 'GitOps, app-of-apps' },
  { nama: 'Prometheus', kategori: 'Observability', level: 5, catatan: 'recording rule, SLO' },
  { nama: 'Grafana', kategori: 'Observability', level: 4, catatan: 'dashboard as code' },
  { nama: 'OpenTelemetry', kategori: 'Observability', level: 3, catatan: 'trace lintas service' },
  { nama: 'Go', kategori: 'Bahasa', level: 4, catatan: 'CLI internal & exporter' },
  { nama: 'Python', kategori: 'Bahasa', level: 4, catatan: 'automation & tooling' },
  { nama: 'Bash', kategori: 'Bahasa', level: 5, catatan: 'glue yang tetap dibaca orang' },
]

/* ------------------------------------------------------------
 *  5. PROJECT  <-- INI YANG PALING SERING KAMU TAMBAH
 *
 *  Cara menambah project: copy satu blok { ... } di bawah,
 *  tempel di paling atas array, lalu ganti isinya.
 *
 *  status : 'produksi' | 'aktif' | 'arsip'
 *  tag    : bebas, otomatis jadi tombol filter
 *  hasil  : poin-poin dampak nyata (angka lebih meyakinkan)
 *  repo / demo : isi '' kalau tidak ada, tombolnya hilang sendiri
 * ---------------------------------------------------------- */
export const projects = [
  {
    judul: 'Platform Kubernetes Multi-Tenant',
    subjudul: 'Satu cluster, 14 tim, tanpa saling ganggu',
    tahun: '2025',
    status: 'produksi',
    tag: ['Kubernetes', 'Terraform', 'AWS'],
    deskripsi:
      'Merancang cluster EKS bersama untuk 14 tim produk. Tiap tim dapat namespace terisolasi, kuota, dan pipeline sendiri tanpa perlu tahu isi dalamnya.',
    hasil: [
      'Waktu onboarding service baru turun dari 3 hari jadi 25 menit',
      'Biaya infrastruktur turun 31% lewat Karpenter dan spot instance',
      'Network policy default-deny di semua namespace',
    ],
    stack: ['EKS', 'Terraform', 'Karpenter', 'Argo CD', 'Istio'],
    repo: 'https://github.com/username/k8s-platform',
    demo: '',
  },
  {
    judul: 'Pipeline Rilis Nol-Downtime',
    subjudul: 'Dari 40 menit jadi 4 menit',
    tahun: '2024',
    status: 'produksi',
    tag: ['CI/CD', 'GitHub Actions', 'Docker'],
    deskripsi:
      'Menulis ulang pipeline monolit yang lambat jadi reusable workflow dengan cache berlapis, test paralel, dan canary deployment yang bisa rollback sendiri.',
    hasil: [
      'Durasi pipeline 40 menit -> 4 menit 10 detik',
      'Frekuensi deploy naik dari 2x seminggu jadi 11x sehari',
      'Change failure rate turun ke 1,8%',
    ],
    stack: ['GitHub Actions', 'BuildKit', 'Argo Rollouts', 'OIDC'],
    repo: 'https://github.com/username/release-pipeline',
    demo: '',
  },
  {
    judul: 'Observability Stack Swakelola',
    subjudul: 'Ganti vendor, hemat 4.000 dolar per bulan',
    tahun: '2024',
    status: 'aktif',
    tag: ['Observability', 'Prometheus', 'Grafana'],
    deskripsi:
      'Memindahkan logging dan metrik dari SaaS ke stack sendiri: Prometheus, Loki, Tempo, Grafana. Semua dashboard dan alert disimpan sebagai kode.',
    hasil: [
      'Biaya observability turun 4.000 dolar/bulan',
      'MTTR turun dari 34 menit jadi 9 menit',
      'Setiap alert wajib punya runbook — alert tanpa runbook ditolak CI',
    ],
    stack: ['Prometheus', 'Loki', 'Tempo', 'Grafana', 'Alertmanager'],
    repo: 'https://github.com/username/observability-stack',
    demo: '',
  },
  {
    judul: 'Modul Terraform Internal',
    subjudul: 'Infrastruktur yang tidak perlu ditulis dua kali',
    tahun: '2023',
    status: 'aktif',
    tag: ['IaC', 'Terraform', 'AWS'],
    deskripsi:
      'Kumpulan modul Terraform berversi untuk pola yang berulang: VPC, RDS, service ECS, dan bucket S3 dengan enkripsi wajib.',
    hasil: [
      'Dipakai 60+ workspace di 3 lingkungan',
      'Rata-rata kode infrastruktur per service turun 74%',
      'Pengujian modul otomatis pakai Terratest sebelum rilis',
    ],
    stack: ['Terraform', 'Terragrunt', 'Terratest', 'Atlantis'],
    repo: 'https://github.com/username/tf-modules',
    demo: '',
  },
  {
    judul: 'Latihan Chaos Engineering',
    subjudul: 'Mematikan hal-hal sebelum mereka mati sendiri',
    tahun: '2023',
    status: 'arsip',
    tag: ['Reliability', 'Kubernetes'],
    deskripsi:
      'Program eksperimen kegagalan terjadwal di staging dan produksi: pod dimatikan, latensi jaringan disuntik, zona dijatuhkan.',
    hasil: [
      'Menemukan 7 single point of failure sebelum terjadi insiden nyata',
      'Menyusun 12 runbook dari temuan latihan',
      'Failover lintas zona terbukti pulih di bawah 90 detik',
    ],
    stack: ['LitmusChaos', 'Kubernetes', 'Grafana'],
    repo: '',
    demo: '',
  },
]

/* ------------------------------------------------------------
 *  6. PENGALAMAN KERJA
 * ---------------------------------------------------------- */
export const pengalaman = [
  {
    posisi: 'Senior DevOps Engineer',
    perusahaan: 'Nusantara Fintech',
    periode: '2023 — sekarang',
    poin: [
      'Memimpin migrasi 40+ service dari VM ke Kubernetes tanpa downtime terjadwal',
      'Menetapkan SLO untuk 12 layanan inti dan proses review error budget bulanan',
      'Menjadi mentor untuk 4 engineer dalam praktik IaC dan on-call',
    ],
  },
  {
    posisi: 'DevOps Engineer',
    perusahaan: 'Cendana Commerce',
    periode: '2021 — 2023',
    poin: [
      'Membangun CI/CD pertama perusahaan, menggantikan proses deploy manual',
      'Mengotomatiskan penyediaan lingkungan staging on-demand per pull request',
      'Menurunkan tagihan cloud 28% lewat rightsizing dan penjadwalan mati otomatis',
    ],
  },
  {
    posisi: 'System Administrator',
    perusahaan: 'PT Sinar Data',
    periode: '2019 — 2021',
    poin: [
      'Mengelola 120 server Linux, patching, dan backup lintas dua data center',
      'Menulis playbook Ansible yang memangkas waktu setup server dari 6 jam ke 20 menit',
    ],
  },
]

/* ------------------------------------------------------------
 *  7. SERTIFIKASI
 * ---------------------------------------------------------- */
export const sertifikasi = [
  { nama: 'Certified Kubernetes Administrator (CKA)', penerbit: 'CNCF', tahun: '2024', url: '' },
  { nama: 'AWS Solutions Architect — Associate', penerbit: 'Amazon Web Services', tahun: '2023', url: '' },
  { nama: 'HashiCorp Certified: Terraform Associate', penerbit: 'HashiCorp', tahun: '2023', url: '' },
]

/* ------------------------------------------------------------
 *  8. TERMINAL INTERAKTIF
 *     Tambah perintah baru cukup dengan menambah entri di sini.
 *     'keluaran' bisa array teks, atau string 'PROJECTS' / 'STACK'
 *     untuk memakai data dinamis dari atas.
 * ---------------------------------------------------------- */
export const perintahTerminal = {
  whoami: [
    'nama    : lihat profile.nama di content.js',
    'peran   : DevOps / Platform Engineer',
    'fokus   : Kubernetes, IaC, CI/CD, observability',
    'prinsip : kalau dikerjakan dua kali, otomatiskan',
  ],
  about: [
    'Saya senang membuat rilis jadi peristiwa yang tidak menegangkan.',
    'Sebagian besar kerja saya tidak terlihat: pipeline yang cepat,',
    'alert yang jujur, dan dokumentasi yang benar-benar dipakai.',
    '',
    'Di luar pekerjaan: kopi manual brew dan homelab dengan 3 node kecil.',
  ],
  uptime: [
    'sistem aktif 5 tahun 2 bulan',
    'beban rata-rata: 0.72, 0.65, 0.60',
    'insiden bulan ini: 0',
  ],
  contact: 'CONTACT',
  projects: 'PROJECTS',
  skills: 'STACK',
  sudo: ['Maaf, kamu tidak ada di daftar sudoers. Kejadian ini dilaporkan.'],
}

/* ------------------------------------------------------------
 *  9. TEKS ANTARMUKA
 *     Ganti di sini kalau mau versi bahasa Inggris.
 * ---------------------------------------------------------- */
export const ui = {
  nav: [
    { id: 'pipeline', label: 'Pipeline' },
    { id: 'stack', label: 'Stack' },
    { id: 'projects', label: 'Project' },
    { id: 'pengalaman', label: 'Pengalaman' },
    { id: 'kontak', label: 'Kontak' },
  ],
  hero: { ctaUtama: 'Lihat project', ctaKedua: 'Salin email' },
  pipelineJudul: 'Cara saya mengirim perubahan ke produksi',
  pipelineDeskripsi: 'Klik tiap tahap untuk melihat apa yang sebenarnya terjadi di dalamnya.',
  stackJudul: 'Alat yang saya pakai sehari-hari',
  stackDeskripsi: 'Disaring per kategori. Batang di bawah nama menunjukkan seberapa sering saya memakainya.',
  projectsJudul: 'Yang sudah saya kerjakan',
  projectsDeskripsi: 'Pilih satu untuk membuka detail dan hasilnya.',
  pengalamanJudul: 'Jejak pekerjaan',
  kontakJudul: 'Mari bicara',
  kontakDeskripsi: 'Balasan biasanya di bawah 24 jam. Atau coba terminal di samping — ketik "help".',
  footer: 'Dibangun dengan React dan Vite. Di-deploy otomatis lewat GitHub Actions.',
}
