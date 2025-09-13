import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'cancelled', 'expired'],
    default: 'pending'
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: true
  },
  pricing: {
    originalPrice: { type: Number, required: true },
    discountApplied: { type: Number, default: 0 },
    finalPrice: { type: Number, required: true },
  },
  discountCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Discount',
    required: false
  },
}, {
  timestamps: true
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;

