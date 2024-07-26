import React, { useState } from 'react';
import { TextField, Button, Grid, Box, Typography } from '@mui/material';

const Donation: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Load PayHere script dynamically
    const script = document.createElement('script');
    script.src = 'https://www.payhere.lk/lib/payhere.js';
    script.async = true;
    script.onload = () => {
      // Initialize PayHere payment request
      const payment = {
        sandbox: true, // Use sandbox mode for testing
        merchant_id: 'YOUR_MERCHANT_ID', // Replace with your PayHere Merchant ID
        return_url: 'http://localhost:3000/donation-success', // Replace with your return URL
        cancel_url: 'http://localhost:3000/donation-cancel', // Replace with your cancel URL
        notify_url: 'http://localhost:3000/donation-notify', // Replace with your notify URL
        order_id: Date.now().toString(),
        items: 'Online Donation',
        amount: amount,
        currency: 'LKR',
        first_name: name,
        last_name: '',
        email: email,
        phone: phone,
        address: '',
        city: '',
        country: 'Sri Lanka',
      };

      // Call PayHere to open the payment gateway
      // @ts-ignore
      payhere.startPayment(payment);
    };

    document.body.appendChild(script);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Online Donation
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Amount (LKR)"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Donate
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Donation;
