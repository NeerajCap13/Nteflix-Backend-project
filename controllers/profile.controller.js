// controllers/profile.controller.js
import { User } from "../Model/User.js";
import { subscription } from "../Model/Subscription.js";

export const getProfile = async (req, res) => {
  try {
    // ✅ Extract user info from token
    const userId = req.user._id;

    // 1️⃣ Find user by ID
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2️⃣ Find subscription
    const userSubscription = await subscription.findOne({ user: user._id });

    // 3️⃣ Send combined response
    return res.status(201).json({
      success: true,
      message: "Profile fetched successfully",
      user,
      subscription: userSubscription || null,
    });
  } catch (error) {
    console.error("getProfile error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
