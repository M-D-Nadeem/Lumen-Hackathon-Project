import Subscription from "../models/subscriptionSchema.js";
import Plan from "../models/planSchema.js";
import User from "../models/userSchema.js";

export const createSubscription = async (req, res) => {
  try {
    const subscription = new Subscription(req.body);
    await subscription.save();
    res.status(201).json({
      success: true,
      message: "Subscription created successfully",
      data: subscription,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


export const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find()
      .populate("userId", "userName email")
      .populate("planId", "name price")
      .populate("discountCode", "code percentage");

    res.json({ success: true, data: subscriptions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSubscriptionsByUser = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ userId: req.params.userId })
      .populate("userId", "userName email")
      .populate("planId", "name price category billingCycle")
      .populate("discountCode", "code percentage");

    res.json({ success: true, data: subscriptions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getSubscriptionById = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id)
      .populate("userId", "userName email")
      .populate("planId", "name price")
      .populate("discountCode", "code percentage");

    if (!subscription) {
      return res.status(404).json({ success: false, message: "Subscription not found" });
    }

    res.json({ success: true, data: subscription });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const updateSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!subscription) {
      return res.status(404).json({ success: false, message: "Subscription not found" });
    }

    res.json({
      success: true,
      message: "Subscription updated successfully",
      data: subscription,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


export const deleteSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findByIdAndDelete(req.params.id);

    if (!subscription) {
      return res.status(404).json({ success: false, message: "Subscription not found" });
    }

    res.json({ success: true, message: "Subscription deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Upgrade subscription to a higher tier plan
export const upgradeSubscription = async (req, res) => {
  try {
    const { subscriptionId, newPlanId } = req.body;

    // Find the current subscription
    const currentSubscription = await Subscription.findById(subscriptionId)
      .populate("planId", "name price category");

    if (!currentSubscription) {
      return res.status(404).json({ success: false, message: "Subscription not found" });
    }

    if (currentSubscription.status !== 'active') {
      return res.status(400).json({ success: false, message: "Only active subscriptions can be upgraded" });
    }

    // Find the new plan
    const newPlan = await Plan.findById(newPlanId);
    if (!newPlan) {
      return res.status(404).json({ success: false, message: "New plan not found" });
    }

    // Check if it's actually an upgrade (higher category or price)
    const categoryOrder = { 'basic': 1, 'gold': 2, 'premium': 3 };
    const currentCategoryLevel = categoryOrder[currentSubscription.planId.category];
    const newCategoryLevel = categoryOrder[newPlan.category];

    if (newCategoryLevel <= currentCategoryLevel && newPlan.price <= currentSubscription.planId.price) {
      return res.status(400).json({ 
        success: false, 
        message: "This is not an upgrade. Please select a higher tier plan." 
      });
    }

    // Calculate prorated amount for upgrade
    const daysRemaining = Math.ceil((currentSubscription.endDate - new Date()) / (1000 * 60 * 60 * 24));
    const totalDays = Math.ceil((currentSubscription.endDate - currentSubscription.startDate) / (1000 * 60 * 60 * 24));
    const currentPlanValue = (currentSubscription.pricing.finalPrice * daysRemaining) / totalDays;
    const newPlanValue = (newPlan.price * daysRemaining) / totalDays;
    const upgradeCost = newPlanValue - currentPlanValue;

    // Update subscription
    const updatedSubscription = await Subscription.findByIdAndUpdate(
      subscriptionId,
      {
        planId: newPlanId,
        pricing: {
          originalPrice: newPlan.price,
          discountApplied: currentSubscription.pricing.discountApplied,
          finalPrice: newPlan.price - currentSubscription.pricing.discountApplied
        }
      },
      { new: true, runValidators: true }
    ).populate("planId", "name price category");

    res.json({
      success: true,
      message: "Subscription upgraded successfully",
      data: {
        subscription: updatedSubscription,
        upgradeCost: Math.max(0, upgradeCost),
        daysRemaining
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Downgrade subscription to a lower tier plan
export const downgradeSubscription = async (req, res) => {
  try {
    const { subscriptionId, newPlanId } = req.body;

    // Find the current subscription
    const currentSubscription = await Subscription.findById(subscriptionId)
      .populate("planId", "name price category");

    if (!currentSubscription) {
      return res.status(404).json({ success: false, message: "Subscription not found" });
    }

    if (currentSubscription.status !== 'active') {
      return res.status(400).json({ success: false, message: "Only active subscriptions can be downgraded" });
    }

    // Find the new plan
    const newPlan = await Plan.findById(newPlanId);
    if (!newPlan) {
      return res.status(404).json({ success: false, message: "New plan not found" });
    }

    // Check if it's actually a downgrade (lower category or price)
    const categoryOrder = { 'basic': 1, 'gold': 2, 'premium': 3 };
    const currentCategoryLevel = categoryOrder[currentSubscription.planId.category];
    const newCategoryLevel = categoryOrder[newPlan.category];

    if (newCategoryLevel >= currentCategoryLevel && newPlan.price >= currentSubscription.planId.price) {
      return res.status(400).json({ 
        success: false, 
        message: "This is not a downgrade. Please select a lower tier plan." 
      });
    }

    // Calculate refund amount for downgrade
    const daysRemaining = Math.ceil((currentSubscription.endDate - new Date()) / (1000 * 60 * 60 * 24));
    const totalDays = Math.ceil((currentSubscription.endDate - currentSubscription.startDate) / (1000 * 60 * 60 * 24));
    const currentPlanValue = (currentSubscription.pricing.finalPrice * daysRemaining) / totalDays;
    const newPlanValue = (newPlan.price * daysRemaining) / totalDays;
    const refundAmount = currentPlanValue - newPlanValue;

    // Update subscription
    const updatedSubscription = await Subscription.findByIdAndUpdate(
      subscriptionId,
      {
        planId: newPlanId,
        pricing: {
          originalPrice: newPlan.price,
          discountApplied: currentSubscription.pricing.discountApplied,
          finalPrice: newPlan.price - currentSubscription.pricing.discountApplied
        }
      },
      { new: true, runValidators: true }
    ).populate("planId", "name price category");

    res.json({
      success: true,
      message: "Subscription downgraded successfully",
      data: {
        subscription: updatedSubscription,
        refundAmount: Math.max(0, refundAmount),
        daysRemaining
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cancel subscription
export const cancelSubscription = async (req, res) => {
  try {
    const { subscriptionId, reason } = req.body;

    // Find the subscription
    const subscription = await Subscription.findById(subscriptionId)
      .populate("planId", "name price category");

    if (!subscription) {
      return res.status(404).json({ success: false, message: "Subscription not found" });
    }

    if (subscription.status === 'cancelled') {
      return res.status(400).json({ success: false, message: "Subscription is already cancelled" });
    }

    if (subscription.status !== 'active') {
      return res.status(400).json({ success: false, message: "Only active subscriptions can be cancelled" });
    }

    // Calculate refund amount based on remaining days
    const daysRemaining = Math.ceil((subscription.endDate - new Date()) / (1000 * 60 * 60 * 24));
    const totalDays = Math.ceil((subscription.endDate - subscription.startDate) / (1000 * 60 * 60 * 24));
    const refundAmount = (subscription.pricing.finalPrice * daysRemaining) / totalDays;

    // Update subscription status to cancelled
    const cancelledSubscription = await Subscription.findByIdAndUpdate(
      subscriptionId,
      {
        status: 'cancelled',
        endDate: new Date() // Set end date to current date
      },
      { new: true, runValidators: true }
    ).populate("planId", "name price category");

    res.json({
      success: true,
      message: "Subscription cancelled successfully",
      data: {
        subscription: cancelledSubscription,
        refundAmount: Math.max(0, refundAmount),
        daysRemaining,
        cancellationReason: reason || "No reason provided"
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
