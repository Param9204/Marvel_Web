"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLogout() {
  const router = useRouter();
  useEffect(() => {
    localStorage.removeItem("admin_token");
    router.replace("/admin/login");
  }, [router]);

  return <div className="min-h-screen flex items-center justify-center">Signing out…</div>;
}
