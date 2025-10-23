import { User } from "../Model/User.js";
import { subscription } from "../Model/Subscription.js";

export const Subscription = async (req, res) => {
  try {
    const { verifiedEmail, selectedPlan } = req.body;
      console.log(req.body)
    if (!verifiedEmail || !selectedPlan) {
      return res
        .status(400)
        .json({ message: "Email and plan details are required" });
    }

    // 1️⃣ Find user by email
    const user = await User.findOne({ email: verifiedEmail });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Please register first." });
    }

    // 3️⃣ Check if subscription exists
    let userSubscription = await subscription.findOne({ user: user._id });

    if (userSubscription) {
      // Update existing subscription
      subscription.planName = selectedPlan.name;
      subscription.price = selectedPlan.price;
      subscription.deviceLimit = selectedPlan.household,
      subscription.quality = selectedPlan.resolution;
      await userSubscription.save();
    } else {
      // Create new subscription
      userSubscription = await subscription.create({
        user: user._id,
        planName: selectedPlan.name,
        price: selectedPlan.price,
        deviceLimit: selectedPlan.household,
        quality: selectedPlan.resolution,
      });
    }

    const accessToken = user.generateAccessToken()
    res.cookie('Token' , accessToken ,{
      httpOnly : true,
      maxAge : 1000*60*60
    });

    return res.status(201).json({
      message: "Subscription successfully updated/created",
      email: user.email,
      subscription: userSubscription,
    });
  } catch (error) {
    console.error("createOrUpdateSubscription error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
