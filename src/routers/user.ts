import express from "express";
import { create, deleteData, getAll, getById, update } from "../controllers/userController";
import { creatorAndSuperAdminOnly, superAdminOnly } from "../middleware/authorization";

const router = express.Router();

router.post("/", [superAdminOnly], create);
router.get("/", [superAdminOnly], getAll);
router.get("/:id", [creatorAndSuperAdminOnly], getById);
router.put("/:id", update);
router.delete("/:id", [superAdminOnly], deleteData);

export default router;
