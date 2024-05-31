import express from "express";
import {
  create,
  deleteData,
  getAll,
  getById,
  getBySlug,
  update,
} from "../controllers/postController";
import { creatorAndSuperAdminOnly } from "../middleware/authorization";

const router = express.Router();

router.post("/", [creatorAndSuperAdminOnly], create);
router.get("/", getAll);
router.get("/get-by-slug/:slug", getBySlug);
router.get("/:id", getById);
router.put("/:id", [creatorAndSuperAdminOnly], update);
router.delete("/:id", [creatorAndSuperAdminOnly], deleteData);

export default router;
