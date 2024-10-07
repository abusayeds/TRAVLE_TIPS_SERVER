import { Router } from "express";
import { userRoutes } from "../modules/User/user-route";
import { postRouts } from "../modules/Post/Post-route";

const router = Router();
router.use("/api/v1", userRoutes);
router.use("/api/v1", postRouts);

export default router;
