import express from "express";
import { create, getAll, getBySlug } from "../controllers/postController";

const router = express.Router();

router.post("/", create);
router.get("/", getAll);
router.get("/get-by-slug/:slug", getBySlug);

export default router;
