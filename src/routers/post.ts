import express from "express";
import { create, getAll, getById, getBySlug, update } from "../controllers/postController";
import { deleteData } from "../controllers/userController";

const router = express.Router();

router.post("/", create);
router.get("/", getAll);
router.get("/get-by-slug/:slug", getBySlug);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", deleteData);

export default router;
