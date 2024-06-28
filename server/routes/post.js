import express from "express";
import auth from "../middleware/auth.js";
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  likePost,
  getPostsBySearch,
  getPostsById,
  commentPost,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostsById);

router.post("/search", getPostsBySearch);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.post("/:id/commentPost", auth, commentPost);

export default router;
