import express from "express";
import { create, getAll, getById } from "../controllers/categoryController";

const router = express.Router();

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getById);

export default router;
