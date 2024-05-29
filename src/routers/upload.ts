import express from "express";
import { upload } from "../controllers/uploadController";

const router = express.Router();

router.post("/", upload);

export default router;
