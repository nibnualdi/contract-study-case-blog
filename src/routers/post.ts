import express from "express";
import {
  create,
  deleteData,
  getAll,
  getById,
  getBySlug,
  update,
} from "../controllers/postController";
import { creatorOnly } from "../middleware/authorization";

const router = express.Router();

router.post("/", [creatorOnly], create);
router.get("/", getAll);
router.get("/get-by-slug/:slug", getBySlug);
router.get("/:id", getById);
router.put("/:id", [creatorOnly], update);
router.delete("/:id", [creatorOnly], deleteData);

export default router;
