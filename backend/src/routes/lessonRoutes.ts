import { Router } from "express";
import { getLessonDetails } from "../controllers/lessonController";

const router = Router();

router.get("/:id", getLessonDetails);

export default router;
