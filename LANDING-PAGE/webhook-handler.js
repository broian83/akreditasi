// Webhook Handler untuk Mayar.id
// Simpan file ini di server kamu (Node.js/PHP/dll)
// Endpoint: POST /webhook/mayar

/**
 * MAYAR WEBHOOK PAYLOAD STRUCTURE
 * 
 * Mayar akan mengirim POST request ke webhook URL kamu
 * saat payment berhasil/gagal/expired
 */

const MAYAR_WEBHOOK_SECRET = 'your-webhook-secret-from-mayar'; // Ambil dari Mayar Dashboard

function handleMayarWebhook(req, res) {
  // 1. Verify signature (jika Mayar support signature verification)
  const signature = req.headers['x-mayar-signature'];
  const payload = req.body;
  
  // 2. Parse payload
  const {
    event,           // 'payment.success', 'payment.failed', 'payment.expired'
    order_id,        // ID order dari Mayar
    customer_email,  // Email customer
    customer_name,   // Nama customer
    amount,          // Jumlah pembayaran
    product_name,    // Nama produk
    status,          // Status payment
    created_at       // Timestamp
  } = payload;

  // 3. Handle different events
  switch(event) {
    case 'payment.success':
      handlePaymentSuccess(payload);
      break;
    case 'payment.failed':
      handlePaymentFailed(payload);
      break;
    case 'payment.expired':
      handlePaymentExpired(payload);
      break;
    default:
      console.log('Unknown event:', event);
  }

  // 4. Respond to Mayar (wajib return 200)
  res.status(200).json({ received: true });
}

/**
 * HANDLE PAYMENT SUCCESS
 * Kirim email delivery ke customer
 */
function handlePaymentSuccess(data) {
  console.log('Payment success:', data.order_id);
  
  // TODO: Kirim email delivery ke customer
  // - Link download template
  // - Panduan install
  // - Invoice
  
  // Contoh payload yang diterima:
  /*
  {
    event: 'payment.success',
    order_id: 'ORD-123456',
    customer_email: 'customer@example.com',
    customer_name: 'John Doe',
    amount: 299000,
    product_name: 'Template Akreditasi RS - Pro',
    status: 'paid',
    created_at: '2026-04-13T10:30:00Z',
    payment_method: 'qris',
    mayar_id: 'MAYAR-789'
  }
  */
}

/**
 * HANDLE PAYMENT FAILED
 */
function handlePaymentFailed(data) {
  console.log('Payment failed:', data.order_id);
  // TODO: Kirim email ke customer (opsional)
}

/**
 * HANDLE PAYMENT EXPIRED
 */
function handlePaymentExpired(data) {
  console.log('Payment expired:', data.order_id);
  // TODO: Cleanup order expired
}

module.exports = { handleMayarWebhook };
