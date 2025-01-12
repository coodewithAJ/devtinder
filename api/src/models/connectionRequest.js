const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:"User"
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:"User"
    },
    status: {
      type: String,
      enum: {
        values: ["ignore", "interested", "accepted", "rejected"],
        message: "{VALUE} is incorrect status type",
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


connectionRequestSchema.pre("save", function (next) {
    const user = this;
    if (user.fromUserId.equals(user.toUserId)) {
      throw new Error("can not sent request to yourself")
    }
    next()
  });
const ConnectionRequestModel = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);


module.exports = ConnectionRequestModel;
