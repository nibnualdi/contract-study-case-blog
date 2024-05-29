import express from "express";

// routers
import uploadRouter from "./upload";

const router = express.Router();

router.use("/upload", uploadRouter);

export default router;
