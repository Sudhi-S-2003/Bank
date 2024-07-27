const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Transaction = require('../models/Transaction');
const Account = require('../models/Account');

// Execute transaction
router.post('/', auth, async (req, res) => {
  const { amount, recipient } = req.body;

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
    res.json(transaction);
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
    });
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
