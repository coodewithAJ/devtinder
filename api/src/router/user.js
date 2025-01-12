const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");
const router = express.Router();

const SAFE_USER_DATA = "firstName lastName age gender skills";
router.get("/requests/received", userAuth, async (req, res) => {
  const loggedInUser = req.user;
  console.log(loggedInUser);
  try {
    const userRequests = await ConnectionRequestModel.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", SAFE_USER_DATA);

    res.status(200).send({ data: userRequests });
  } catch (err) {
    res.status(400).send({
      message: "ERROR: " + err.message,
    });
  }
});

router.get("/connection", userAuth, async (req, res) => {
  const loggedInUser = req.user;
  try {
    const connections = await ConnectionRequestModel.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", SAFE_USER_DATA)
      .populate("toUserId", SAFE_USER_DATA);

    const data = connections.map((row) => {
      if (row.toUserId._id.toString() === loggedInUser._id.toString()) {
        return row.fromUserId;
      }
      return row.toUserId;
    });

    res.status(200).send({
      data: data,
    });
  } catch (err) {
    res.status(400).send({
      message: "ERROR: " + err.message,
    });
  }
});

router.get("/feed", userAuth, async (req, res) => {
  const loggedInUser = req.user;
  const page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;
  limit = limit > 50 ? 50 : limit;

  try {
    const hideUsersInFeed = new Set();
    hideUsersInFeed.add(loggedInUser._id);
    const usersConnection = await ConnectionRequestModel.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    usersConnection.forEach((connection) => {
      hideUsersInFeed.add(connection.fromUserId.toString());
      hideUsersInFeed.add(connection.toUserId.toString());
    });

    const feedUsers = await User.find({
      _id: { $nin: Array.from(hideUsersInFeed) },
    })
      .select(SAFE_USER_DATA)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).send({
      data: feedUsers,
    });
  } catch (err) {
    res.status(400).send({
      message: "ERROR: " + err.message,
    });
  }
});

module.exports = router;
