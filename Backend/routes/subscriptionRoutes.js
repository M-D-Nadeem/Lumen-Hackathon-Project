import express from "express";
import {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  getSubscriptionsByUser,
  updateSubscription,
  deleteSubscription,
  upgradeSubscription,
  downgradeSubscription,
  cancelSubscription,
} from "../contollers/subscriptionController.js";

const router = express.Router();

router.post("/create", createSubscription);
router.get("/all", getAllSubscriptions);
router.get("/user/:userId", getSubscriptionsByUser);
router.get("/:id", getSubscriptionById);
router.post("/update/:id", updateSubscription);
router.post("/delete/:id", deleteSubscription);
router.post("/upgrade", upgradeSubscription);
router.post("/downgrade", downgradeSubscription);
router.post("/cancel", cancelSubscription);

export default router; 