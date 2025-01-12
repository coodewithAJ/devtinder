const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const ConnectionRequestModel = require("../models/connectionRequest");
const router = express.Router();

router.post("/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ["interested", "ignore"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).send({
        message: "invalid status",
      });
    }
    const toUserIdExists = await User.findById(toUserId);
    if (!toUserIdExists) {
      return res.status(404).send({
        message: "User not found",
      });
    }
    const requestAlreadySent = await ConnectionRequest.findOne({
      $or: [
        { fromUserId: fromUserId, toUserId: toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    console.log(requestAlreadySent);
    if (requestAlreadySent) {
      return res.status(400).send({
        message: "Already sent the request",
      });
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status: req.params.status,
    });
    const data = await connectionRequest.save();

    res.status(200).send({
      message: "connection request sent",
      data,
    });
  } catch (err) {
    res.status(500).send("ERROR: " + err.message);
  }
});

router.post("/review/:status/:requestId", userAuth, async (req, res) => {
  const { status, requestId } = req.params;
  const allowedStatus = ["accepted", "rejected"];
  const loggedInUser = req.user;
  if (!allowedStatus.includes(status)) {
    return res.status(400).send({ message: status + " status not allowed" });
  }
  console.log(loggedInUser)

  try {
    const connectionRequest = await ConnectionRequestModel.findOne({
      _id: requestId,
      toUserId: loggedInUser?._id,
      status: "interested",
    });

    if (!connectionRequest) {
      return res.status(404).send({ messagae: "Conneciton request not found" });
    }
    connectionRequest.status = status;
    const data = await connectionRequest.save();
    res
      .status(200)
      .send({ message: "conection request " + status + " successfully",data });
  } catch (err) {
    res.status(500).send({ message: "ERROR " + err.message });
  }
});

module.exports = router;
