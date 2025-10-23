import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    planName: {
      type: String,
      enum: ["Mobile", "Basic", "Standard", "Premium"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["active", "expired", "canceled", "paused"],
      default: "active",
    },
    renewalDate: {
      type: Date,
    },
    durationInMonths: {
      type: Number,
      default: 1, // default 1 month plan
    },
    deviceLimit: {
      type: Number,
    },
    quality: {
      type: String,
      enum: ["480p", "720p", "1080p", "4K + HDR"],
    },
  },
  { timestamps: true }
);


//middleware for start and End date
subscriptionSchema.pre("save", function (next) {
  if (!this.endDate && this.durationInMonths) {
    const start = this.startDate || new Date();
    this.startDate = start;

    // ✅ clone date before modifying
    const end = new Date(start);
    end.setMonth(end.getMonth() + (this.durationInMonths || 1));
    this.endDate = end;
  }
  next();
});


export const subscription = mongoose.model("Subscription", subscriptionSchema);
