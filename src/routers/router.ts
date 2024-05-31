import express from "express";

// routers
import uploadRouter from "./upload";
import categoryRouter from "./category";
import userRouter from "./user";
import authRouter from "./auth";
import postRouter from "./post";
import { getById } from "../controllers/userController";

// middlewares
import { creatorAndSuperAdminOnly } from "../middleware/authorization";

const router = express.Router();

router.use("/upload", [creatorAndSuperAdminOnly], uploadRouter);
router.use("/category", categoryRouter);
router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/post", postRouter);

// custom endpoint
// example http://localhost:3000/v1/startfromhere
router.get("/profile/:id", [creatorAndSuperAdminOnly], getById);

export default router;
