const User = require("../models/User.js");
const { redisClient } = require("../config/redis.js");

// CREATE
const createUser = async (req, res) => {
  const user = await User.create(req.body);
  await redisClient.del("users");
  res.json(user);
};

// GET USERS
const getUsers = async (req, res) => {
  const users = await User.find();
  await redisClient.setEx("users", 60, JSON.stringify(users));
  res.json(users);
};

// UPDATE
const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  await redisClient.del("users");
  res.json(user);
};

// DELETE
const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  await redisClient.del("users");
  res.json({ message: "Deleted" });
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
};
