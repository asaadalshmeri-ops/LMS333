import { Router } from "express";
import { getLessonQuiz, submitQuizAttempt } from "../controllers/quizController";

const router = Router();

router.get("/lesson/:lessonId", getLessonQuiz);
router.post("/:quizId/attempt", submitQuizAttempt);

export default router;
