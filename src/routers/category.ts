import express from "express";
import { create, getAll, getById, update } from "../controllers/categoryController";

const router = express.Router();

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", update);

export default router;
