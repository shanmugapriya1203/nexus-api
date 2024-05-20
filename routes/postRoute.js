import express from "express";
import {
  addReply,
  createThread,
  getThreadById,
  getThreadWithLikeCount,
  getThreads,
  likeThread,
} from "../controllers/postController.js";
import { verifyToken } from "../utils/authUtils.js";

const router = express.Router();

router.get("/", getThreads);
router.post("/", verifyToken, createThread);
router.get("/:id", getThreadById);
router.post("/:postId/like", verifyToken, likeThread);
router.post("/:id/reply", verifyToken, addReply);
router.get("/:postId", getThreadWithLikeCount);
export default router;
