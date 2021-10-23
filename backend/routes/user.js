const express = require("express");
const router = express.Router();

const {
  createUser,
  updateUser,
  deleteUser,
  getSingleUser,
  getAllUsers,
} = require("../controllers/userController");

router.route("/user").post(createUser);
router.route("/user/:id").put(updateUser);
router.route("/user/:id").delete(deleteUser);
router.route("/user/:id").get(getSingleUser);
router.route("/users").get(getAllUsers);

module.exports = router;
