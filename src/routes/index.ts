import { Router } from "express";
import { userRoutes } from "../modules/User/user-route";
import { postRouts } from "../modules/Post/Post-route";
import { flowRouts } from "../modules/flow&flowers/flow-route";

const router = Router();
router.use("/api/v1", userRoutes);
router.use("/api/v1", postRouts);
router.use("/api/v1", flowRouts);

export default router;
