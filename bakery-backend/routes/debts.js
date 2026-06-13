const express = require('express');
const router = express.Router();
const { getDebts, getDebtSummary, createDebt, updateDebt, addPayment, markAsPaid, deleteDebt } = require('../controllers/debtController');
const { protect, adminOnly } = require('../middleware/auth');

router.use(protect, adminOnly);

router.get('/', getDebts);
router.get('/summary', getDebtSummary);
router.post('/', createDebt);
router.put('/:id', updateDebt);
router.post('/:id/payment', addPayment);
router.patch('/:id/mark-paid', markAsPaid);
router.delete('/:id', deleteDebt);

module.exports = router;
