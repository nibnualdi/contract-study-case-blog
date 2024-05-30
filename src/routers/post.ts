import express from "express";
import { create, getAll, getById, getBySlug, update } from "../controllers/postController";

const router = express.Router();

router.post("/", create);
router.get("/", getAll);
router.get("/get-by-slug/:slug", getBySlug);
router.get("/:id", getById);
router.put("/:id", update);

export default router;
