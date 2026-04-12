# 🏥 AkreditasiRS - Landing Page

Landing page untuk **Template Akreditasi RS** - Template Google Sheets + Apps Script untuk tracking kelengkapan dokumen akreditasi Rumah Sakit.

## 🚀 Quick Deploy

### Deploy ke Netlify (Drag & Drop)
1. Buka https://app.netlify.com/drop
2. Drag folder ini ke browser
3. Selesai! Landing page live

### Deploy via GitHub
1. Push repository ini ke GitHub
2. Connect GitHub ke Netlify
3. Auto-deploy setiap push ke `main` branch

## 📁 Structure

```
LANDING-PAGE/
├── index.html              # Landing page utama
├── netlify.toml            # Konfigurasi Netlify
├── webhook-handler.js      # Handler webhook Mayar.id
└── README.md               # Dokumentasi
```

## 🎨 Design

- **Color Scheme**: Teal (#008080) - matching dengan UI aplikasi
- **Font**: Inter (Google Fonts)
- **Icons**: SVG line icons (minimalis)
- **Responsive**: Mobile-first design

## 💳 Payment Integration

### Mayar.id Setup

1. **Daftar Mayar**: https://mayar.id
2. **Buat Produk**:
   - Basic (Rp 149K)
   - Pro (Rp 299K)
   - Premium (Rp 499K)
3. **Update Checkout Links** di `index.html`:
   ```html
   <!-- Ganti dengan link dari Mayar -->
   https://mayar.id/checkout/basic-akreditasirs
   https://mayar.id/checkout/pro-akreditasirs
   https://mayar.id/checkout/premium-akreditasirs
   ```

### Webhook Setup

**Endpoint**: `POST /webhook/mayar`

**Payload dari Mayar**:
```json
{
  "event": "payment.success",
  "order_id": "ORD-123456",
  "customer_email": "customer@example.com",
  "customer_name": "John Doe",
  "amount": 299000,
  "product_name": "Template Akreditasi RS - Pro",
  "status": "paid",
  "created_at": "2026-04-13T10:30:00Z"
}
```

**Setup di Mayar Dashboard**:
1. Login ke Mayar
2. Settings > Webhooks
3. Add webhook URL: `https://yourdomain.com/webhook/mayar`
4. Pilih events: `payment.success`, `payment.failed`, `payment.expired`
5. Save

**Handler**: Lihat `webhook-handler.js` untuk contoh implementasi.

## 🔧 Customization

### Update Contact Info
Ganti di `index.html`:
- WhatsApp: `https://wa.me/62xxx`
- Email: `support@akreditasirs.com`

### Update Pricing
Edit section `#harga` di `index.html`

### Update Features
Edit section `#fitur` di `index.html`

## 📊 Analytics (Optional)

Tambahkan Google Analytics di `<head>`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 📱 Preview

Buka `index.html` di browser untuk preview lokal.

## 📞 Support

- WhatsApp: +62xxx
- Email: support@akreditasirs.com

---

**© 2026 AkreditasiRS. All rights reserved.**
