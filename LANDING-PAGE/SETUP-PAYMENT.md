# 🚀 PANDUAN SETUP LANDING PAGE + PAYMENT

---

## 📋 OVERVIEW

Panduan ini menjelaskan cara:
1. Deploy landing page ke Netlify (FREE)
2. Setup payment gateway (Mayar.id)
3. Setup auto-delivery template
4. Setup email notification

---

## 1️⃣ DEPLOY LANDING PAGE KE NETLIFY

### Langkah 1: Buat Akun Netlify
1. Buka https://www.netlify.com
2. Klik **"Sign up"**
3. Sign up dengan GitHub/Email
4. Verifikasi email

### Langkah 2: Deploy Landing Page
**Opsi A - Drag & Drop (Paling Mudah):**
1. Login ke Netlify
2. Drag folder `LANDING-PAGE` ke area "Sites"
3. Tunggu deploy selesai (~30 detik)
4. Site sudah live! 🎉

**Opsi B - Via Git (Recommended):**
1. Push folder `LANDING-PAGE` ke GitHub
2. Di Netlify, klik "Add new site" > "Import an existing project"
3. Connect ke GitHub
4. Pilih repository
5. Deploy!

### Langkah 3: Custom Domain (Optional)
1. Di Netlify, klik "Domain settings"
2. Klik "Add custom domain"
3. Masukkan domain Anda (contoh: akreditasirs.com)
4. Setup DNS sesuai instruksi
5. SSL otomatis aktif

---

## 2️⃣ SETUP PAYMENT GATEWAY (MAYAR.ID)

### Langkah 1: Daftar Mayar.id
1. Buka https://mayar.id
2. Klik **"Daftar"**
3. Isi data lengkap
4. Verifikasi email & KTP
5. Tunggu approval (1-2 hari)

### Langkah 2: Buat Produk
1. Login ke Mayar Dashboard
2. Klik **"Products"** > **"Add Product"**
3. Isi detail produk:

**Produk Basic:**
- Nama: Template Akreditasi RS - Basic
- Harga: Rp 149.000
- Deskripsi: Template Google Sheets + Apps Script + Panduan
- Delivery: Digital (file download)

**Produk Pro:**
- Nama: Template Akreditasi RS - Pro
- Harga: Rp 299.000
- Deskripsi: Basic + 60 Template Dokumen + Video Tutorial
- Delivery: Digital (file download)

**Produk Premium:**
- Nama: Template Akreditasi RS - Premium
- Harga: Rp 499.000
- Deskripsi: Pro + Grup WA + Update 1 Tahun
- Delivery: Digital (file download)

### Langkah 3: Setup Delivery
1. Di produk, klik **"Delivery Settings"**
2. Pilih **"Digital Product"**
3. Upload file yang akan dikirim:
   - Basic: Template Sheets link + Panduan PDF
   - Pro: Template Sheets + Template Dokumen + Video
   - Premium: Semua file + Invite grup WA
4. Save

### Langkah 4: Get Checkout Link
1. Di produk, klik **"Share"**
2. Copy **"Checkout Link"**
3. Paste ke landing page (ganti `your-product-id-basic`, dll)

---

## 3️⃣ SETUP AUTO-DELIVERY

### Mayar.id Auto-Delivery:
1. Di produk, upload file yang akan dikirim
2. Set **"Delivery Method"** = Instant
3. Customer bayar → langsung dapat email + link download
4. Selesai! ✅

### Email Template Delivery:
Mayar otomatis kirim email ke customer:
- Subject: "Pembelian Berhasil - Template Akreditasi RS"
- Body: Link download template + panduan
- Attachment: File template (jika size kecil)

---

## 4️⃣ SETUP EMAIL NOTIFICATION

### Gunakan Resend (FREE 3000 email/bulan):
1. Daftar di https://resend.com
2. Verify domain email
3. Get API Key
4. Setup automation (via Zapier/Make):
   - Trigger: Mayar payment success
   - Action: Send email via Resend
   - Template: Welcome email + delivery link

---

## 5️⃣ INTEGRASI LANDING PAGE

### Update Checkout Links:
Di file `LANDING-PAGE/index.html`, ganti:

```html
<!-- Ganti ini -->
<a href="https://mayar.id/checkout/your-product-id-basic">

<!-- Dengan link dari Mayar -->
<a href="https://mayar.id/checkout/abc123-basic">
```

Lakukan untuk 3 paket (Basic, Pro, Premium).

---

## 6️⃣ TESTING

### Test Flow Lengkap:
1. ✅ Landing page live di Netlify
2. ✅ Checkout link berfungsi
3. ✅ Mayar payment processing
4. ✅ Auto-delivery terkirim
5. ✅ Email notifikasi masuk
6. ✅ Customer dapat template
7. ✅ Customer bisa install template

---

## 7️⃣ DEPLOYMENT CHECKLIST

- [ ] Landing page deploy ke Netlify
- [ ] Custom domain setup (optional)
- [ ] SSL aktif (HTTPS)
- [ ] Mayar account verified
- [ ] 3 produk dibuat di Mayar
- [ ] Checkout links updated di landing page
- [ ] Auto-delivery configured
- [ ] Email template customized
- [ ] Test purchase berhasil
- [ ] Monitoring setup

---

## 💰 ESTIMASI BIAYA

| Item | Biaya |
|------|-------|
| Netlify | FREE |
| Mayar.id | 2.9% + Rp 1.000/transaksi |
| Resend (Email) | FREE (3000/bulan) |
| Domain | Rp 150K/tahun (optional) |
| **Total** | **~Rp 10K-50K/transaksi** |

---

## 📞 SUPPORT

Jika ada masalah:
- WhatsApp: +62xxx
- Telegram: @yourtelegram
- Email: support@yourdomain.com

---

**Last Updated:** April 2026
