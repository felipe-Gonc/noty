import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostByID,
  updatePost,
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPostByID);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;