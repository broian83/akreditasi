# 📖 PANDUAN LENGKAP
# Template Akreditasi RS - Google Apps Script

---

## 🎯 APA YANG ANDA DAPATKAN?

Template Google Sheets + Apps Script untuk tracking kelengkapan dokumen akreditasi Rumah Sakit/Puskesmas/Klinik.

### ✅ Fitur:
- Dashboard progress real-time
- Tracking dokumen per BAB/Standar/Kriteria
- Assignment PIC & deadline
- Reminder otomatis via WhatsApp
- Export laporan PDF
- Web App responsive
- Multi-user collaboration

---

## 🚀 CARA INSTALL (5 MENIT!)

### Step 1: Copy Template
1. Buka link Google Sheets yang sudah Anda beli
2. Klik tombol **"Make a copy"** di pojok kanan atas
3. Beri nama sesuai RS Anda (contoh: "Akreditasi - RS XYZ")
4. Klik **"Make a copy"**

### Step 2: Setup Awal
1. Buka Google Sheets yang sudah di-copy
2. Tunggu beberapa detik sampai menu muncul
3. Klik menu **"🏥 Akreditasi RS"** di toolbar atas
4. Klik **"⚙️ Setup Awal"**
5. Tunggu konfirmasi "Setup selesai!"

### Step 3: Isi Data Rumah Sakit
1. Pindah ke sheet **"SETTINGS"**
2. Isi data berikut:
   - **Nama Rumah Sakit**: Nama lengkap RS Anda
   - **Tipe Akreditasi**: SNARS / Paripurna / Dasar
   - **Target Akreditasi**: Tanggal rencana akreditasi
   - **Fonnte Token** (opsional): Token untuk reminder WA

### Step 4: Deploy sebagai Web App (Opsional)
1. Di Google Sheets, klik **"Extensions"** > **"Apps Script"**
2. Klik tombol **"Deploy"** > **"New deployment"**
3. Klik gear icon ⚙️ > pilih **"Web app"**
4. Isi:
   - **Description**: "Akreditasi RS v1.0"
   - **Execute as**: "Me"
   - **Who has access**: "Anyone with Google account"
5. Klik **"Deploy"**
6. Copy URL yang muncul → Ini link Web App Anda!

### Step 5: Selesai! 🎉
- Buka Web App untuk dashboard yang lebih user-friendly
- Atau tetap pakai Google Sheets untuk editing langsung

---

## 📋 CARA PAKAI

### ➕ Tambah Dokumen
**Via Web App:**
1. Klik tab **"Tambah"**
2. Isi form (nama, BAB, PIC, deadline, dll)
3. Klik **"Simpan Dokumen"**
4. Selesai!

**Via Google Sheets:**
1. Pindah ke sheet **"DATA DOKUMEN"**
2. Scroll ke baris paling bawah
3. Isi manual (ID otomatis generate)

### 📊 Lihat Dashboard
1. Buka Web App (tab "Dashboard")
2. Lihat statistik:
   - Total dokumen
   - Dokumen lengkap
   - Draft/Review
   - Persentase kelengkapan
   - Progress per BAB

### 📋 Lihat List Dokumen
1. Klik tab **"List Dokumen"** di Web App
2. Semua dokumen muncul dalam tabel
3. Status warna:
   - 🔴 Merah = Belum Mulai
   - 🟡 Kuning = Draft
   - 🔵 Biru = Review
   - 🟢 Hijau = Lengkap

### 🔔 Cek Reminder
1. Klik tombol **"Cek Reminder"** di dashboard
2. Sistem akan cek dokumen yang mendekati deadline
3. Jika ada, akan muncul list dengan detail

### 📤 Export Laporan
1. Klik **"Export Laporan"** di dashboard
2. Tunggu proses selesai
3. File PDF otomatis tersimpan di Google Drive Anda

---

## 👥 CARA TAMBAH TIM

1. Pindah ke sheet **"TIM AKREDITASI"**
2. Isi data:
   - **Nama**: Nama lengkap
   - **Jabatan**: Posisi (contoh: "Koordinator Akreditasi")
   - **Role**: Admin / PIC / Viewer
   - **Email**: Alamat email
   - **No. WhatsApp**: Format 08xxx (untuk reminder)
3. Simpan

---

## ⚙️ SETUP REMINDER WHATSAPP

### Step 1: Daftar di Fonnte
1. Buka https://fonnte.com
2. Daftar akun (FREE 1000 pesan/bulan)
3. Tambah device
4. Copy **API Token**

### Step 2: Masukkan Token
1. Di Google Sheets, buka sheet **"SETTINGS"**
2. Paste token di cell **B10** (Fonnte Token)
3. Pastikan **"Reminder Aktif?"** = "Ya"
4. Set **"H-berapa Reminder?"** (default: 7)

### Step 3: Setup Trigger
1. Di Google Sheets, klik **"Extensions"** > **"Apps Script"**
2. Di sidebar kiri, klik **"Triggers"** (icon jam)
3. Klik **"Add Trigger"**
4. Pilih:
   - Function: `checkReminders`
   - Event: `Time-driven`
   - Type: `Day timer`
   - Time: `8am to 9am`
5. Klik **"Save"**

### Step 4: Test
1. Kembali ke Web App
2. Klik **"Cek Reminder"**
3. Jika ada dokumen mendekati deadline, WA akan terkirim ke PIC

---

## 🎯 TIP & TRIK

### ✅ Best Practices
1. **Update rutin** - Minimal 1x seminggu update status dokumen
2. **Set deadline realistis** - Beri buffer 2-4 minggu
3. **Assign PIC jelas** - Satu dokumen = satu penanggung jawab
4. **Monitor dashboard** - Cek progress setiap meeting akreditasi
5. **Export berkala** - Export laporan PDF setiap bulan untuk arsip

### ⚡ Shortcut
- **Ctrl+F** di Sheets = Cari dokumen cepat
- **Filter view** = Filter per BAB/status
- **Sort by deadline** = Urutkan berdasarkan deadline terdekat
- **Conditional formatting** = Tambahkan warna otomatis (opsional)

---

## ❓ FAQ

### Q: Apakah bisa dipakai untuk multiple RS?
A: Tidak. Setiap RS harus punya copy template sendiri (make a copy).

### Q: Apakah ada batasan jumlah dokumen?
A: Tidak ada. Google Sheets bisa handle 10,000+ baris.

### Q: Apakah data aman?
A: Ya. Data tersimpan di Google Drive Anda sendiri (bukan server pihak ketiga).

### Q: Bisa akses dari HP?
A: Bisa! Google Sheets dan Web App bisa diakses dari browser HP.

### Q: Apakah perlu install aplikasi tambahan?
A: Tidak. Cukup Google Sheets + browser untuk Web App.

### Q: Bagaimana cara backup data?
A: Download Google Sheets sebagai Excel: File > Download > Microsoft Excel

### Q: Fonnte gratis?
A: Ya, FREE 1000 pesan/bulan. Cukup untuk RS rata-rata.

---

## 🆘 SUPPORT

Jika ada pertanyaan atau masalah:

- **Telegram**: @yourtelegram
- **WhatsApp**: +62xxx
- **Email**: support@yourdomain.com
- **YouTube Tutorial**: link_channel_anda

**Jam Support**: Senin-Jumat, 09:00-17:00 WIB

---

## 📜 LICENSE

✅ **BOLEH:**
- Pakai untuk 1 RS/klinik
- Modify sesuai kebutuhan
- Pakai selamanya (lifetime)

❌ **TIDAK BOLEH:**
- Resell/redistribute template
- Claim sebagai karya sendiri
- Share link template ke publik

---

## 🙏 TERIMA KASIH!

Semoga template ini membantu proses akreditasi RS Anda!

**Jangan lupa:**
- ⭐ Beri rating 5 bintang di halaman pembelian
- 📢 Share ke rekan seprofesi
- 💬 Testimoni WhatsApp ke kami

**Salam Akreditasi Sukses! 🏥✨**

---

**Versi**: 1.0.0  
**Last Updated**: April 2026  
**Created by**: Your Name/Brand
