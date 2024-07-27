const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Account = require('../models/Account');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');

// Create account
router.post('/create', [auth, [
  check('initialBalance', 'Initial balance is required').isFloat({ gt: 0 }) // Validation for initial balance
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { initialBalance } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const account = new Account({ user: user.id, balance: parseFloat(initialBalance) });
    await account.save();
    res.json(account);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add money to account
router.post('/add-money', [auth, [
  check('id', 'Account ID is required').not().isEmpty(),
  check('amount', 'Amount must be a positive number').isFloat({ gt: 0 }) // Validation for amount
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id, amount } = req.body;

  try {
    const account = await Account.findOne({ user: req.user.id, _id: id });
    if (!account) {
      return res.status(404).json({ msg: 'Account not found' });
    }

    account.balance += parseFloat(amount);
    await account.save();
    res.json(account);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete account
router.delete('/delete/:id', auth, async (req, res) => {
  try {
    const account = await Account.findOne({ user: req.user.id, _id: req.params.id });
    if (!account) {
      return res.status(404).json({ msg: 'Account not found' });
    }

    await Account.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Account deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get account details
router.get('/', auth, async (req, res) => {
  try {
    const accounts = await Account.find({ user: req.user.id });
    if (accounts.length === 0) {
      return res.status(404).json({ msg: 'No accounts found' });
    }

    res.json(accounts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
