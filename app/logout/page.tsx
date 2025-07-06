"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // In a real application, this would include logic to clear authentication tokens
    // For now, we'll just redirect to the home page after a brief delay
    const timer = setTimeout(() => {
      router.push("/");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex-1 p-8">
      <h1 className="text-3xl font-bold mb-6">Logging Out</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-lg text-muted-foreground">
          Signing you out of your account... You will be redirected to the home
          page shortly.
        </p>
      </div>
    </div>
  );
}
