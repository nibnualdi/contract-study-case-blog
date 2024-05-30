import express from "express";
import { create, deleteData, getAll, getById, update } from "../controllers/categoryController";
import { creatorOnly } from "../middleware/authorization";

const router = express.Router();

router.post("/", [creatorOnly], create);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", [creatorOnly], update);
router.delete("/:id", [creatorOnly], deleteData);

export default router;
