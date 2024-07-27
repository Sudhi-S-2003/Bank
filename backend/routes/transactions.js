const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Transaction = require('../models/Transaction');
const Account = require('../models/Account');
const User = require('../models/User'); // Assuming you have a User model

// Execute transaction
router.post('/', auth, async (req, res) => {
  const { amount, recipient } = req.body;

  // Validate input
  if (!amount || !recipient || amount <= 0) {
    return res.status(400).json({ msg: 'Invalid amount or recipient' });
  }

  try {
    const senderAccount = await Account.findOne({ user: req.user.id });
    const recipientAccount = await Account.findOne({ user: recipient });

    if (!recipientAccount) {
      return res.status(400).json({ msg: 'Recipient not found' });
    }

    if (senderAccount.balance < amount) {
      return res.status(400).json({ msg: 'Insufficient balance' });
    }

    senderAccount.balance -= amount;
    recipientAccount.balance += amount;

    await senderAccount.save();
    await recipientAccount.save();

    const transaction = new Transaction({
      sender: req.user.id,
      recipient,
      amount,
    });

    await transaction.save();

    // Populate transaction details with user info
    const senderUser = await User.findById(req.user.id);
    const recipientUser = await User.findById(recipient);

    res.json({
      ...transaction.toObject(),
      senderName: senderUser.name,
      recipientName: recipientUser.name,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get transaction history
router.get('/', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ 
      $or: [{ sender: req.user.id }, { recipient: req.user.id }] 
    }).sort({ date: -1 });

    // Populate transaction details with user info
    const populatedTransactions = await Promise.all(transactions.map(async (transaction) => {
      const senderUser = await User.findById(transaction.sender);
      const recipientUser = await User.findById(transaction.recipient);
      return {
        ...transaction.toObject(),
        senderName: senderUser.name,
        recipientName: recipientUser.name,
      };
    }));

    res.json(populatedTransactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
