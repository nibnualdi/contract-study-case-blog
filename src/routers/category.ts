import express from "express";
import { create, deleteData, getAll, getById, update } from "../controllers/categoryController";
import { creatorAndSuperAdminOnly } from "../middleware/authorization";

const router = express.Router();

router.post("/", [creatorAndSuperAdminOnly], create);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", [creatorAndSuperAdminOnly], update);
router.delete("/:id", [creatorAndSuperAdminOnly], deleteData);

export default router;
