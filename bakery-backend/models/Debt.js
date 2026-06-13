const mongoose = require('mongoose');

const paymentHistorySchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  note: { type: String }
});

const debtSchema = new mongoose.Schema({
  customer_name: { type: String, required: true, trim: true },
  phone: { type: String, required: true },
  order_details: { type: String, required: true },
  total_amount: { type: Number, required: true, min: 0 },
  paid_amount: { type: Number, default: 0, min: 0 },
  remaining_amount: { type: Number },
  status: {
    type: String,
    enum: ['pending', 'partial', 'paid'],
    default: 'pending'
  },
  date: { type: Date, default: Date.now },
  payment_history: [paymentHistorySchema],
  notes: { type: String }
}, { timestamps: true });

// Auto-calculate remaining_amount and status before save
debtSchema.pre('save', function(next) {
  this.remaining_amount = this.total_amount - this.paid_amount;
  if (this.paid_amount === 0) this.status = 'pending';
  else if (this.paid_amount >= this.total_amount) {
    this.status = 'paid';
    this.remaining_amount = 0;
  } else {
    this.status = 'partial';
  }
  next();
});

module.exports = mongoose.model('Debt', debtSchema);
