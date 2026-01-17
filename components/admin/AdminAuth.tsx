"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    try {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        router.replace("/admin/login");
        return;
      }
      setChecking(false);
    } catch (e) {
      router.replace("/admin/login");
    }
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">Checking admin credentials…</div>
    );
  }

  return <>{children}</>;
}
