import express from "express";

// routers
import uploadRouter from "./upload";
import categoryRouter from "./category";
import userRouter from "./user";
import authRouter from "./auth";

const router = express.Router();

router.use("/upload", uploadRouter);
router.use("/category", categoryRouter);
router.use("/user", userRouter);
router.use("/auth", authRouter);

export default router;
