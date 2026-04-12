# 🚀 PANDUAN DEPLOY KE GOOGLE SHEETS
# Template Akreditasi RS

---

## 📋 LANGKAH 1: Buat Google Sheets Baru

1. Buka https://sheets.google.com
2. Klik **"+ Blank"** (Spreadsheet kosong)
3. Beri nama: **"Template Akreditasi RS"**
4. Copy **Spreadsheet ID** dari URL:
   ```
   https://docs.google.com/spreadsheets/d/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/edit
                                        ↑ Ini Spreadsheet ID
   ```

---

## 📋 LANGKAH 2: Buka Apps Script Editor

1. Di Google Sheets, klik menu **"Extensions"** > **"Apps Script"**
2. Akan terbuka tab baru dengan Apps Script Editor

---

## 📋 LANGKAH 3: Copy-Paste Code.gs

1. Di Apps Script Editor, hapus semua code di file `Code.gs` yang ada
2. Buka file `Code.gs` dari folder `akreditasi-rs` (pakai Notepad/VS Code)
3. **Copy semua code** dari `Code.gs`
4. **Paste** ke Apps Script Editor
5. Klik **💾 Save** (Ctrl+S)

---

## 📋 LANGKAH 4: Tambah File HTML

### Tambah WebApp.html
1. Di Apps Script Editor, klik **"+"** (Add a file) > **"HTML"**
2. Beri nama: **WebApp** (tanpa .html, otomatis)
3. Hapus semua code default
4. Buka file `WebApp.html` dari folder `akreditasi-rs`
5. **Copy semua code** dan **paste** ke Apps Script
6. Klik **💾 Save**

### Tambah Dashboard.html
1. Klik **"+"** > **"HTML"**
2. Beri nama: **Dashboard**
3. Hapus code default
4. Buka file `Dashboard.html` dari folder `akreditasi-rs`
5. **Copy semua code** dan **paste**
6. Klik **💾 Save**

### Tambah FormDokumen.html
1. Klik **"+"** > **"HTML"**
2. Beri nama: **FormDokumen**
3. Hapus code default
4. Buka file `FormDokumen.html` dari folder `akreditasi-rs`
5. **Copy semua code** dan **paste**
6. Klik **💾 Save**

---

## 📋 LANGKAH 5: Setup File Structure di Apps Script

Pastikan di Apps Script Editor ada file-file ini:

```
📁 akreditasi-rs (Apps Script Project)
├── 📄 Code.gs                    ✅
├── 📄 WebApp.html                ✅
├── 📄 Dashboard.html             ✅
├── 📄 FormDokumen.html           ✅
└── 📄 appsscript.json            ✅ (otomatis ada)
```

**Cek appsscript.json:**
1. Klik file `appsscript.json` di sidebar kiri Apps Script
2. Pastikan isinya:
```json
{
  "timeZone": "Asia/Jakarta",
  "dependencies": {},
  "webapp": {
    "access": "ANYONE",
    "executeAs": "ME"
  },
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8"
}
```

---

## 📋 LANGKAH 6: Test Run Setup

1. Kembali ke **Google Sheets** (tab spreadsheet)
2. **Refresh halaman** (F5)
3. Tunggu 3-5 detik
4. Lihat menu bar atas, harus muncul menu baru: **"🏥 Akreditasi RS"**

**Klik menu "🏥 Akreditasi RS"**, harus ada options:
- 📊 Buka Dashboard
- ➕ Tambah Dokumen
- 📤 Export Laporan
- 🔔 Cek Reminder
- ⚙️ Setup Awal

**Klik "⚙️ Setup Awal"**
- Akan muncul dialog konfirmasi
- Klik **"OK"**
- Tunggu sampai muncul: **"Setup selesai! 6 sheet berhasil dibuat."**

---

## 📋 LANGKAH 7: Verifikasi Sheets

Cek di Google Sheets, harus ada **6 tabs** di bawah:

1. ✅ **DASHBOARD**
2. ✅ **DATA DOKUMEN**
3. ✅ **STANDAR AKREDITASI**
4. ✅ **TIM AKREDITASI**
5. ✅ **TIMELINE & DEADLINE**
6. ✅ **SETTINGS**

**Cek DATA DOKUMEN:**
- Row 1 = Headers (warna hijau)
- Ada dropdown di kolom F (Status) dan G (Skor)

**Cek SETTINGS:**
- Sudah terisi default values

---

## 📋 LANGKAH 8: Test Web App

### Deploy sebagai Web App:
1. Di Apps Script Editor, klik tombol **"Deploy"** (kanan atas)
2. Klik **"New deployment"**
3. Klik gear icon ⚙️ > pilih **"Web app"**
4. Isi:
   - **Description**: `Akreditasi RS v1.0`
   - **Execute as**: `Me (your-email@gmail.com)`
   - **Who has access**: `Anyone with Google account`
5. Klik **"Deploy"**
6. **Authorize access** (jika diminta):
   - Pilih account Google Anda
   - Klik **"Advanced"** > **"Go to (unsafe)"**
   - Klik **"Allow"**
7. Copy **Web App URL** yang muncul

**Test Web App:**
1. Buka **Web App URL** di browser
2. Harus muncul Dashboard dengan:
   - Header "Akreditasi RS"
   - Navigation tabs (Dashboard, Tambah, List Dokumen)
   - Stats cards (masih 0 karena belum ada data)
3. Klik tab **"Tambah"**
4. Isi form dengan data test:
   - Nama: `SOP Pengkajian Pasien (TEST)`
   - BAB: `BAB 2`
   - PIC: `Test User`
   - Deadline: `30 hari dari sekarang`
   - Status: `Draft`
5. Klik **"Simpan Dokumen"**
6. Harus muncul alert: **"✅ Dokumen berhasil ditambahkan! ID: DOC-001"**
7. Klik tab **"List Dokumen"**
8. Harus muncul data yang baru di-input

**Verifikasi di Google Sheets:**
1. Kembali ke Google Sheets
2. Buka tab **"DATA DOKUMEN"**
3. Harus ada 1 baris data dengan ID `DOC-001`

---

## 📋 LANGKAH 9: Test Dashboard

1. Kembali ke **Web App**, tab **"Dashboard"**
2. Harus muncul:
   - Total Dokumen: 1
   - Lengkap: 0
   - Draft/Review: 1
   - Persentase: 0%
   - Progress per BAB: BAB 2 = 0%
3. Klik **"Cek Reminder"**
4. Harus muncul alert: **"✅ Tidak ada reminder aktif. Semua dokumen aman!"**

---

## 📋 LANGKAH 10: Test Export Laporan

1. Di Web App, klik **"Export Laporan"**
2. Tunggu loading selesai
3. Harus muncul alert: **"✅ Laporan berhasil di-export!"**
4. Cek **Google Drive** Anda
5. Harus ada file PDF: `Laporan Akreditasi - [tanggal].pdf`

---

## 🎯 CHECKLIST VERIFIKASI

Centang semua yang sudah ditest:

- [ ] Menu "🏥 Akreditasi RS" muncul di Google Sheets
- [ ] Setup Awal berhasil (6 sheets terbuat)
- [ ] Sheet DATA DOKUMEN ada headers + dropdown
- [ ] Sheet SETTINGS ada default values
- [ ] Web App bisa dibuka
- [ ] Form Tambah Dokumen berfungsi
- [ ] Data masuk ke Google Sheets
- [ ] Dashboard menampilkan statistik benar
- [ ] List Dokumen menampilkan data
- [ ] Export Laporan berhasil (PDF di Drive)
- [ ] Cek Reminder berfungsi
- [ ] Dropdown Status berfungsi (Belum Mulai/Draft/Review/Lengkap)
- [ ] Dropdown Skor berfungsi (1/2/3/4)

---

## ⚠️ TROUBLESHOOTING

### Problem: Menu "🏥 Akreditasi RS" tidak muncul
**Solusi:**
1. Refresh Google Sheets (F5)
2. Tunggu 5-10 detik
3. Jika masih tidak muncul, buka Apps Script > Run `onOpen` function manually

### Problem: Error saat Setup Awal
**Solusi:**
1. Cek di Apps Script > Executions untuk lihat error detail
2. Pastikan semua sheet belum ada (jika sudah ada, skip setup)
3. Cek permissions (harus owner spreadsheet)

### Problem: Web App tidak bisa diakses
**Solusi:**
1. Cek deployment settings: Who has access = "Anyone with Google account"
2. Re-deploy: Deploy > Manage deployments > Edit > New version > Deploy
3. Clear browser cache

### Problem: Form submit error
**Solusi:**
1. Buka Apps Script > Executions > Cek error log
2. Pastikan sheet "DATA DOKUMEN" ada
3. Cek format tanggal (harus valid date)

### Problem: Dropdown tidak muncul
**Solusi:**
1. Buka sheet "DATA DOKUMEN"
2. Klik cell F2 atau G2
3. Data > Data validation > Cek rules
4. Jika tidak ada, jalankan ulang Setup Awal

---

## 📞 BUTUH BANTUAN?

Jika ada masalah saat deploy:
- WhatsApp: +62xxx
- Telegram: @yourtelegram
- Email: support@yourdomain.com

**Lampirkan:**
- Screenshot error
- Browser yang dipakai
- Langkah yang sudah dicoba

---

## ✅ DEPLOYMENT SUKSES!

Jika semua checklist di atas sudah oke:

**Selamat! Template Akreditasi RS sudah live dan siap dipakai!** 🎉

**Next steps:**
1. Test dengan input 10-20 dokumen sample
2. Test reminder WA (setup Fonnte dulu)
3. Test export laporan lengkap
4. Buat video tutorial untuk marketing
5. Launching jual template!

---

**Versi**: 1.0.0  
**Last Updated**: April 2026
