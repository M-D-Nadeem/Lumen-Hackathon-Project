import  mongoose from 'mongoose';

const discountSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  
  value: {
    type: Number,
    required: true,
    min: 0
  },
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan',
    required: false 
  },
  
  isActive: {
    type: Boolean,
    default: true
  },
  
  usedBy: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    usedAt: { type: Date, default: Date.now },
    subscriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' }
  }]
}, {
  timestamps: true
});


const Discount = mongoose.model('Discount', discountSchema);

export default Discount;