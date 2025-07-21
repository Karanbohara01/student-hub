const Order = require('../models/Order.js');
const Project = require('../models/Project.js');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

// @desc    Initiate a payment with eSewa
// @route   POST /api/payments/esewa/initiate
// @access  Private
const initiateEsewaPayment = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    const project = await Project.findById(productId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const transactionUuid = uuidv4();

    // Create a new order with a 'pending' status
    const order = new Order({
      user: user._id,
      project: project._id,
      price: project.price,
      paymentInfo: { id: transactionUuid, status: 'pending' },
    });
    await order.save();

    // Data to be sent to eSewa
    const esewaData = {
      amt: project.price,
      psc: 0,
      pdc: 0,
      txAmt: 0,
      tAmt: project.price,
      pid: transactionUuid,
      scd: process.env.ESEWA_MERCHANT_CODE,
      su: `http://localhost:5001/api/payments/esewa/success`,
      fu: `http://localhost:5001/api/payments/esewa/failure`,
    };

    res.status(200).json({
      message: 'Payment initiation successful',
      esewaUrl: process.env.ESEWA_URL,
      formData: esewaData,
    });

  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


const verifyEsewaPayment = async (req, res) => {
  try {
    const { amt, oid, refId } = req.query;

    // Verify with eSewa server
    const verificationRes = await axios.post(
      'https://rc-epay.esewa.com.np/api/epay/verify',
      new URLSearchParams({
        amt,
        rid: refId,
        pid: oid,
        scd: process.env.ESEWA_MERCHANT_CODE,
      }).toString(),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    );

    const xml = verificationRes.data;

    if (xml.includes('<response_code>Success</response_code>')) {
      // Success — update the order
      const order = await Order.findOne({ 'paymentInfo.id': oid });

      if (!order) {
        return res.status(404).send('Order not found');
      }

      order.isPaid = true;
      order.paidAt = new Date();
      order.paymentInfo.status = 'Success';
      order.paymentInfo.gateway = 'eSewa';
      order.paymentInfo.method = 'wallet';

      await order.save();

      return res.redirect(`http://localhost:5173/payment/success?orderId=${order._id}`);
    } else {
      return res.redirect(`http://localhost:5173/payment/fail`);
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Payment verification failed');
  }
};


module.exports = {
  initiateEsewaPayment,
  verifyEsewaPayment,
};