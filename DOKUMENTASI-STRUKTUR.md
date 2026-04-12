# 📋 Struktur Google Sheets - Template Akreditasi RS

## Sheet 1: DASHBOARD
**Fungsi:** Overview progress akreditasi

| Cell | Content | Formula/Notes |
|------|---------|---------------|
| A1 | "DASHBOARD AKREDITASI RS" | Title |
| B3 | "Total Dokumen" | `=COUNTA('DATA DOKUMEN'!A2:A)` |
| B4 | "Dokumen Lengkap" | `=COUNTIF('DATA DOKUMEN'!F2:F, "Lengkap")` |
| B5 | "Dokumen Belum Lengkap" | `=COUNTIF('DATA DOKUMEN'!F2:F, "Belum Lengkap")` |
| B6 | "% Kelengkapan" | `=B4/B3*100` |
| B8 | "Progress per BAB" | Section header |
| A10:C20 | Chart BAB progress | Pivot table / manual |
| E8 | "Deadline Terdekat" | Section header |
| E10:G15 | List dokumen approaching deadline | FILTER formula |

---

## Sheet 2: DATA DOKUMEN
**Fungsi:** Database utama semua dokumen

| Kolom | Header | Type | Notes |
|-------|--------|------|-------|
| A | ID Dokumen | TEXT | DOC-001, DOC-002, auto-increment |
| B | Nama Dokumen | TEXT | Nama lengkap dokumen |
| C | BAB | NUMBER | 1-9 (SNARS) |
| D | Standar | TEXT | Nama standar |
| E | Kriteria | TEXT | Kriteria terkait |
| F | Status Kelengkapan | DROPDOWN | "Belum Mulai", "Draft", "Review", "Lengkap" |
| G | Skor Self-Assessment | DROPDOWN | 1-4 |
| H | PIC (Penanggung Jawab) | TEXT | Nama petugas |
| I | Deadline | DATE | Target penyelesaian |
| J | Link File | URL | Link Google Drive |
| K | Tanggal Upload | DATE | Auto-filled |
| L | Last Updated | DATE | Auto-updated |
| M | Catatan | TEXTAREA | Notes tambahan |

---

## Sheet 3: STANDAR AKREDITASI
**Fungsi:** Reference data bab/standar/kriteria (SNARS)

| Kolom | Header | Type | Notes |
|-------|--------|------|-------|
| A | BAB | NUMBER | 1-9 |
| B | Nama BAB | TEXT | Nama bab akreditasi |
| C | Kode Standar | TEXT | STK-01, STK-02 |
| D | Nama Standar | TEXT | Deskripsi standar |
| E | Kode Kriteria | TEXT | KRT-01, KRT-02 |
| F | Nama Kriteria | TEXT | Deskripsi kriteria |
| G | Bobot | NUMBER | Weight/pentingnya |
| H | Status | DROPDOWN | "Belum", "Proses", "Selesai" |

---

## Sheet 4: TIM AKREDITASI
**Fungsi:** Data petugas & assignment

| Kolom | Header | Type | Notes |
|-------|--------|------|-------|
| A | Nama | TEXT | Nama lengkap |
| B | Jabatan | TEXT | Posisi di tim |
| C | Role | DROPDOWN | "Admin", "PIC", "Viewer" |
| D | Email | EMAIL | Untuk notifikasi |
| E | No. WhatsApp | PHONE | Untuk reminder |
| F | Dokumen Ditugaskan | TEXT | List ID dokumen (comma-separated) |
| G | Total Dokumen | NUMBER | `=COUNTIF()` |
| H | Selesai | NUMBER | `=COUNTIF()` dengan status "Lengkap" |
| I | Progress | PERCENT | `=H/G*100` |

---

## Sheet 5: TIMELINE & DEADLINE
**Fungsi:** Tracking milestone & deadline

| Kolom | Header | Type | Notes |
|-------|--------|------|-------|
| A | Milestone | TEXT | Nama kegiatan |
| B | Tanggal Mulai | DATE | Start date |
| C | Deadline | DATE | End date |
| D | PIC | TEXT | Penanggung jawab |
| E | Status | DROPDOWN | "Belum", "Proses", "Selesai", "Overdue" |
| F | Progress | PERCENT | 0-100% |
| G | Catatan | TEXT | Updates |

---

## Sheet 6: SETTINGS
**Fungsi:** Konfigurasi aplikasi

| Cell | Header | Value | Notes |
|------|--------|-------|-------|
| A1 | "PENGATURAN" | | |
| A3 | "Nama Rumah Sakit" | TEXT | Input manual |
| B3 | | TEXT | Value |
| A4 | "Tipe Akreditasi" | DROPDOWN | "SNARS", "Paripurna", "Dasar" |
| B4 | | TEXT | Value |
| A5 | "Target Akreditasi" | DATE | Tanggal rencana akreditasi |
| B5 | | DATE | Value |
| A7 | "Reminder Aktif?" | DROPDOWN | "Ya", "Tidak" |
| B7 | | TEXT | Value |
| A8 | "H-berapa Reminder?" | NUMBER | Default: 7 |
| B8 | | NUMBER | Value |
| A9 | "Link Fonnte API" | TEXT | Untuk WA notification |
| B9 | | TEXT | Value |
| A10 | "Fonnte Token" | TEXT | API Token |
| B10 | | TEXT | Value |

---

## Formula Penting

### Auto-ID Dokumen (Apps Script trigger)
```javascript
// On form submit, generate ID: DOC-001, DOC-002, dst
```

### Reminder Logic (Apps Script time-driven trigger)
```javascript
// Check if today >= (deadline - H-reminder)
// Send WA/Email jika ada dokumen approaching deadline
```

### Export Laporan (Apps Script)
```javascript
// Generate PDF dari sheet DATA DOKUMEN + DASHBOARD
// Save ke Drive + email ke user
```
