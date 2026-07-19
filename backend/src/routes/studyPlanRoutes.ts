import { Router } from "express";
import { generateUserPlan, getUserPlan, togglePlanDay } from "../controllers/studyPlanController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.use(authenticateToken); // Protect all endpoints

router.post("/generate", generateUserPlan);
router.get("/me", getUserPlan);
router.patch("/day/:id/toggle", togglePlanDay);

export default router;
