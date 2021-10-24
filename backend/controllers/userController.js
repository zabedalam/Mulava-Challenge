const UserDb = require("../models/userModel");
const asyncHandler = require("express-async-handler");

/**
 * @description For Create User
 * @route /api/user
 */
exports.createUser = asyncHandler(async (req, res, next) => {
  const { name, email, gender, status } = req.body;
  const user = await UserDb.create({ name, email, gender, status });
  res.status(201).json({
    success: true,
    data: user,
    message: "User is created successfully",
  });
});

/**
 * @description For Get All Users
 * @route /api/users
 */
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const allUsers = await UserDb.find();
  if (allUsers) {
    res.status(200).json({
      success: true,
      data: allUsers,
      message: "Get all users successfully",
    });
  } else {
    res.status(401).json({
      success: false,
      data: null,
      message: "Users are Not Found",
    });
  }
});

/**
 * @description For Get Single User
 * @route /api/user/:id
 */
exports.getSingleUser = asyncHandler(async (req, res, next) => {
  const existUser = await UserDb.findOne({ _id: req.params.id });
  if (existUser) {
    res.status(200).json({
      success: true,
      data: existUser,
      message: "User is fetched successfully",
    });
  } else {
    res.status(401).json({
      success: false,
      data: null,
      message: "User is Not Found",
    });
  }
});

/**
 * @description For Update User
 * @route /api/user/:id
 */
exports.updateUser = asyncHandler(async (req, res, next) => {
  const { name, email, gender, status } = req.body;
  const existUser = await UserDb.findOne({ _id: req.params.id });
  if (existUser) {
    existUser.name = name;
    existUser.email = email;
    existUser.gender = gender;
    existUser.status = status;
    const updatedUser = await existUser.save();
    res.status(200).json({
      success: true,
      data: updatedUser,
      message: "User is updated successfully",
    });
  } else {
    res.status(401).json({
      success: false,
      data: null,
      message: "User is Not Found",
    });
  }
});

/**
 * @description For Delete User
 * @route /api/user/:id
 */
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const existUser = await UserDb.findOne({ _id: req.params.id });
  if (existUser) {
    await existUser.remove();
    res.status(200).json({
      success: true,
      message: "User is deleted successfully",
    });
  } else {
    res.status(401).json({
      success: false,
      data: null,
      message: "User is Not Found",
    });
  }
});