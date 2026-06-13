const Debt = require('../models/Debt');

// @GET /api/debts
const getDebts = async (req, res) => {
  try {
    const { status, phone, search } = req.query;
    const filter = {};
    if (status && status !== 'all') filter.status = status;
    if (phone) filter.phone = { $regex: phone, $options: 'i' };
    if (search) {
      filter.$or = [
        { customer_name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }
    const debts = await Debt.find(filter).sort({ createdAt: -1 });
    res.json(debts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @GET /api/debts/summary
const getDebtSummary = async (req, res) => {
  try {
    const all = await Debt.find({});
    const totalOutstanding = all.reduce((sum, d) => sum + (d.remaining_amount || 0), 0);
    const customersWithDebt = all.filter(d => d.status !== 'paid').length;
    const recentUnpaid = await Debt.find({ status: { $ne: 'paid' } })
      .sort({ createdAt: -1 }).limit(5);
    const totalDebtors = all.filter(d => d.status === 'pending').length;
    const partialPaid = all.filter(d => d.status === 'partial').length;
    const fullyPaid = all.filter(d => d.status === 'paid').length;
    res.json({ totalOutstanding, customersWithDebt, recentUnpaid, totalDebtors, partialPaid, fullyPaid });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @POST /api/debts
const createDebt = async (req, res) => {
  try {
    const debt = await Debt.create(req.body);
    res.status(201).json(debt);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @PUT /api/debts/:id
const updateDebt = async (req, res) => {
  try {
    const debt = await Debt.findById(req.params.id);
    if (!debt) return res.status(404).json({ message: 'Debt record not found.' });
    Object.assign(debt, req.body);
    await debt.save();
    res.json(debt);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @POST /api/debts/:id/payment - Add payment
const addPayment = async (req, res) => {
  try {
    const { amount, note } = req.body;
    const debt = await Debt.findById(req.params.id);
    if (!debt) return res.status(404).json({ message: 'Debt not found.' });
    debt.paid_amount += Number(amount);
    debt.payment_history.push({ amount: Number(amount), note, date: new Date() });
    await debt.save();
    res.json(debt);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @PATCH /api/debts/:id/mark-paid
const markAsPaid = async (req, res) => {
  try {
    const debt = await Debt.findById(req.params.id);
    if (!debt) return res.status(404).json({ message: 'Debt not found.' });
    debt.paid_amount = debt.total_amount;
    await debt.save();
    res.json(debt);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @DELETE /api/debts/:id
const deleteDebt = async (req, res) => {
  try {
    const debt = await Debt.findByIdAndDelete(req.params.id);
    if (!debt) return res.status(404).json({ message: 'Debt not found.' });
    res.json({ message: 'Debt record deleted.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getDebts, getDebtSummary, createDebt, updateDebt, addPayment, markAsPaid, deleteDebt };
