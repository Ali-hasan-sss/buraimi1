"use client";

import { useEffect, useState } from "react";

interface SessionData {
  authenticated: boolean;
  isAdmin: boolean;
  email?: string;
}

export function useCustomSession() {
  const [session, setSession] = useState<SessionData | null>(null);
  const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading");

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.ok && data.authenticated) {
          setSession({
            authenticated: true,
            isAdmin: data.isAdmin,
            email: data.email,
          });
          setStatus("authenticated");
        } else {
          setSession(null);
          setStatus("unauthenticated");
        }
      } catch (error) {
        setSession(null);
        setStatus("unauthenticated");
      }
    };

    fetchSession();
  }, []);

  return { data: session, status };
}
