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
router.route("/user/:email").put(updateUser);
router.route("/user/:email").delete(deleteUser);
router.route("/user/:email").get(getSingleUser);
router.route("/users").get(getAllUsers);

module.exports = router;
