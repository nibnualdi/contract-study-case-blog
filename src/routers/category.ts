import express from "express";
import { create } from "../controllers/categoryController";

const router = express.Router();

router.post("/", create);

export default router;
