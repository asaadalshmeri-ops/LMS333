import cron from "node-cron";
import { runCurriculumCrawler } from "../utils/crawler";

export function initScheduler() {
  // 03:00 daily Asia/Aden
  cron.schedule(
    "0 3 * * *",
    async () => {
      console.log(`[SCHEDULER] Triggering daily curriculum check...`);
      try {
        const result = await runCurriculumCrawler();
        console.log(`[SCHEDULER] Curriculum crawl completed successfully: ${result}`);
      } catch (err: any) {
        console.error(`[SCHEDULER ERROR] Curriculum crawl failed:`, err.message);
      }
    },
    {
      timezone: "Asia/Aden"
    }
  );
  console.log(`[SCHEDULER] Registered daily curriculum check at 03:00 Asia/Aden timezone.`);
}
