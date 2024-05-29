import express from "express";

// routers
import uploadRouter from "./upload";
import categoryRouter from "./category";

const router = express.Router();

router.use("/upload", uploadRouter);
router.use("/category", categoryRouter);

export default router;
