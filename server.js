// server.js
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // serve index.html if you place it in public/

const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID;
const CASHFREE_SECRET = process.env.CASHFREE_SECRET;
const CASHFREE_API = process.env.CASHFREE_ENV === 'production'
  ? 'https://api.cashfree.com'
  : 'https://sandbox.cashfree.com';

app.post('/api/payment/create', async (req, res) => {
  try {
    const { amount, name, email, phone } = req.body;
    const orderId = `NOVA_${Date.now()}`;

    // Cashfree Orders API body (simple example - follow Cashfree docs)
    const payload = {
      order_id: orderId,
      order_amount: String(amount),
      order_currency: "INR",
      customer_details: {
        customer_id: `CUST_${Date.now()}`,
        customer_name: name || "Customer",
        customer_email: email,
        customer_phone: phone
      },
      order_meta: {
        return_url: `${process.env.BASE_URL || 'http://localhost:3000'}/payment/success`
      }
    };

    const headers = {
      'x-client-id': CASHFREE_APP_ID,
      'x-client-secret': CASHFREE_SECRET,
      'Content-Type': 'application/json'
    };

    const response = await axios.post(`${CASHFREE_API}/pg/orders`, payload, { headers });
    // response contains payment session/order info - adapt per Cashfree response shape
    return res.json(response.data);
  } catch (err) {
    console.error('Cashfree error:', err.response?.data || err.message);
    return res.status(500).json({ error: 'Payment initialization failed', details: err.response?.data || err.message });
  }
});

// simple demo endpoint for products (replace with DB in production)
app.get('/api/products', (req, res) => {
  res.json([
    { id:1, name:"Men's Jacket", price:2499, img:"/assets/jacket.jpg" },
    { id:2, name:"Women's Sneakers", price:1999, img:"/assets/shoes.jpg" }
  ]);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));