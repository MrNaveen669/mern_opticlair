// // routes/payment.js
// const express = require('express');
// const router = express.Router();
// const Razorpay = require('razorpay');
// const crypto = require('crypto');
// const Order = require('../Models/order.model');
// const { isAuthenticated } = require('../middleware/auth');

// // Initialize Razorpay
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_SECRET
// });

// // Create a new order with Razorpay
// router.post('/create-order', isAuthenticated, async (req, res) => {
//   try {
//     const { amount, currency = 'INR', receipt, notes } = req.body;
    
//     const options = {
//       amount: amount * 100, // amount in smallest currency unit (paise)
//       currency,
//       receipt: receipt || `receipt_${Date.now()}`,
//       notes: notes || {
//         userId: req.user._id.toString()
//       }
//     };
    
//     const order = await razorpay.orders.create(options);
    
//     res.status(200).json({
//       success: true,
//       order
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: 'Error creating Razorpay order',
//       error: error.message
//     });
//   }
// });

// // Verify Razorpay payment
// router.post('/verify-payment', isAuthenticated, async (req, res) => {
//   try {
//     const { 
//       razorpay_order_id, 
//       razorpay_payment_id, 
//       razorpay_signature,
//       cart,
//       amount
//     } = req.body;
    
//     // Creating hmac object 
//     const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET);
    
//     // Passing the data to be hashed
//     hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    
//     // Creating the hmac in the required format
//     const generated_signature = hmac.digest('hex');
    
//     // Verifying the signature
//     if (generated_signature !== razorpay_signature) {
//       return res.status(400).json({
//         success: false,
//         message: 'Payment verification failed'
//       });
//     }
    
//     // Create an order in your database
//     const newOrder = new Order({
//       user: req.user._id,
//       items: cart.map(item => ({
//         product: item.id,
//         name: item.productRefLink || 'Product',
//         quantity: item.quantity,
//         price: item.price,
//         image: item.imageTsrc
//       })),
//       totalAmount: amount,
//       paymentInfo: {
//         id: razorpay_payment_id,
//         status: 'completed',
//         method: 'razorpay'
//       },
//       paidAt: Date.now()
//     });
    
//     await newOrder.save();
    
//     res.status(200).json({
//       success: true,
//       message: 'Payment has been verified successfully',
//       orderId: newOrder._id
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: 'Error verifying payment',
//       error: error.message
//     });
//   }
// });

// // Get key ID (public)
// router.get('/get-razorpay-key', (req, res) => {
//   res.status(200).json({
//     success: true,
//     key: process.env.RAZORPAY_KEY_ID
//   });
// });

// // Get order status
// router.get('/order/:id', isAuthenticated, async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
    
//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: 'Order not found'
//       });
//     }
    
//     if (order.user.toString() !== req.user._id.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: 'Unauthorized'
//       });
//     }
    
//     res.status(200).json({
//       success: true,
//       order
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching order',
//       error: error.message
//     });
//   }
// });

// module.exports = router;