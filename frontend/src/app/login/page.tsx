"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to homepage which now hosts the simplified login portal
    router.replace("/");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary/10">
      <span className="text-sm font-semibold text-muted-foreground">جاري تحويلك لبوابة الدخول الموحدة...</span>
    </div>
  );
}
