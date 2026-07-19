import { Router } from "express";
import {
  upload,
  uploadCurriculumFile,
  triggerCrawl,
  getJobs,
  getPendingUpdates,
  approveVersion,
  rejectVersion,
  getSubjects
} from "../controllers/curriculumController";

const router = Router();

router.get("/subjects", getSubjects);
router.post("/upload", upload.single("file"), uploadCurriculumFile);
router.post("/crawl", triggerCrawl);
router.get("/jobs", getJobs);
router.get("/updates", getPendingUpdates);
router.post("/updates/approve", approveVersion);
router.post("/updates/reject", rejectVersion);

export default router;
