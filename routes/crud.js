const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth.js");

const {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/crudController.js");

router.route("/getBlogs").get(isAuthenticatedUser, getBlogs);
router.route("/getBlogById").get(isAuthenticatedUser, getBlogById);
router.route("/createBlog").post(isAuthenticatedUser, createBlog);
router.route("/updateBlog").put(isAuthenticatedUser, updateBlog);
router.route("/deleteBlog").delete(isAuthenticatedUser, deleteBlog);

module.exports = router;
