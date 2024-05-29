import express from "express";

// routers
import uploadRouter from "./upload";
import categoryRouter from "./category";
import userRouter from "./user";

const router = express.Router();

router.use("/upload", uploadRouter);
router.use("/category", categoryRouter);
router.use("/user", userRouter);

export default router;
