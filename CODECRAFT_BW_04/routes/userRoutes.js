const express = require("express");
const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController.js");

const cache = require("../middleware/cache.js");

const router = express.Router();

router.post("/", createUser);
router.get("/", cache("users"), getUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
