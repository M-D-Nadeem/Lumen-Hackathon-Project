import  mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  billingCycle: {
    type: String,
    enum: ['monthly', 'yearly', 'lifetime'],
    required: true
  },
  category: {
    type: String,
    enum: ['basic', 'gold', 'premium'],
    required: true,
    lowercase: true
  },
  features: [{
    name: String,
    description: String,
    included: { type: Boolean, default: true }
  }],
  
  isActive: {
    type: Boolean,
    default: true
  },
  
}, {
  timestamps: true
});


const Plan = mongoose.model('Plan', planSchema);

export default Plan;