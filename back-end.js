const express = require('express');
const cors = require('cors');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
    try {
        const { priceId } = req.body;

        if (!priceId) {
            return res.status(400).json({ error: "Missing priceId" });
        }

        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [{ price: priceId, quantity: 1 }],
            success_url: "http://192.168.68.107:5000/success?session_id={CHECKOUT_SESSION_ID}",
            cancel_url: "http://192.168.68.107:5000/cancel",
        });

        res.json({ url: session.url, sessionId: session.id });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// sucess route result message
app.get("/success", async (req, res) => {
    const { session_id } = req.query; // Retrieve the session_id from the URL

    if (!session_id) {
        return res.status(400).json({ error: "Missing session_id" });
    }

    try {
        // Retrieve the session from Stripe using the session_id
        const session = await stripe.checkout.sessions.retrieve(session_id);

        // Check if the payment status is 'paid'
        if (session.payment_status === 'paid') {
            // If paid, display a success message
            res.send('<h1>Payment successful! Thank you for your subscription.</h1>');
        } else {
            // If the payment failed or was not completed
            res.send('<h1>Payment failed or was not completed.</h1>');
        }
    } catch (error) {
        console.error('Error retrieving session:', error);
        res.status(500).json({ error: 'Failed to retrieve session' });
    }
});
  

app.get("/", (req, res) => {
    res.json({ message: "Stripe backend" });
});

app.listen(port, '192.168.68.107', () => {
    console.log(`Server running at http://localhost:${port}`);
});

