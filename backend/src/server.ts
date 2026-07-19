import app from "./app";
import { initScheduler } from "./config/scheduler";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`  🚀 Backend running on http://localhost:${PORT}`);
  console.log(`  🌍 Node Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`==================================================`);
  
  // Start cron scheduler
  initScheduler();
});
