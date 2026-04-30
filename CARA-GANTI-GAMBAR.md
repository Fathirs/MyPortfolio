# Cara Ganti Gambar Project

## Langkah 1 — Siapkan gambar
- Format: `.png` atau `.jpg`
- Taruh di folder: `public/images/`
- Bebas kasih nama apapun, contoh: `brees-homepage.png`

---

## Langkah 2 — Buka file ini
```
data/projects.ts
```

---

## Langkah 3 — Cari project yang mau diganti

Tiap project punya bagian `images: [...]` seperti ini:

```ts
{
  num: "01.",
  name: "BREES VISIBILITY — BRAND WEBSITE REDESIGN",
  ...
  images: [
    "/images/proj1-a.png",   // foto pertama
    "/images/proj1-b.png",   // foto kedua
    "/images/proj1-c.png",   // foto ketiga
  ],
},
```

---

## Langkah 4 — Ganti path-nya

Tinggal ganti nama file-nya dengan nama gambar baru kamu:

```ts
images: [
  "/images/brees-homepage.png",
  "/images/brees-mobile.png",
  "/images/brees-dashboard.png",
],
```

> **Catatan:**
> - Minimal **1 gambar**, maksimal **3 gambar**
> - Kalau cuma 1 gambar → tidak ada dot indicator, tidak ada slideshow
> - Kalau 2–3 gambar → otomatis bergantian tiap 1.5 detik

---

## Contoh lengkap — ganti semua project sekaligus

```ts
export const projects: Project[] = [
  {
    num: "01.",
    name: "BREES VISIBILITY — BRAND WEBSITE REDESIGN",
    images: [
      "/images/brees-1.png",
      "/images/brees-2.png",
    ],
    // ... sisanya tidak perlu diubah
  },
  {
    num: "02.",
    name: "WELLCARE CLINIC",
    images: [
      "/images/wellcare-1.png",
      "/images/wellcare-2.png",
      "/images/wellcare-3.png",
    ],
  },
  {
    num: "03.",
    name: "AUTOFABS COMPONENTS",
    images: [
      "/images/autofabs-1.png",
    ],
  },
];
```

---

## Bonus — Ganti teks, tags, atau kategori

Semua konten project juga ada di file yang sama:

| Field | Fungsi |
|---|---|
| `name` | Judul project |
| `description` | Deskripsi singkat |
| `tags` | Label-label di bawah deskripsi |
| `category` | Filter tab (SAAS / Company Profile / Mobile App / Web3 App) |
| `images` | Foto slideshow |

**Itu saja. Tidak perlu sentuh file lain.**
