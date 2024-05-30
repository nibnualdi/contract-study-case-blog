import express from "express";
import { create } from "../controllers/postController";

const router = express.Router();

router.post("/", create);

export default router;
