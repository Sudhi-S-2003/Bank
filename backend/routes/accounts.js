const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Account = require('../models/Account');
const User = require('../models/User');

// Create account
router.post('/create', auth, async (req, res) => {
  const { initialBalance } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const account = new Account({ user: user.id, balance: initialBalance });
    await account.save();
    res.json(account);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add money to account
router.post('/add-money', auth, async (req, res) => {
  const { amount } = req.body;

  try {
    const account = await Account.findOne({ user: req.user.id });
    if (!account) {
      return res.status(404).json({ msg: 'Account not found' });
    }

    account.balance += amount;
    await account.save();
    res.json(account);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get account details
router.get('/', auth, async (req, res) => {
  try {
    const account = await Account.findOne({ user: req.user.id });
    if (!account) {
      return res.status(404).json({ msg: 'Account not found' });
    }

    res.json(account);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
