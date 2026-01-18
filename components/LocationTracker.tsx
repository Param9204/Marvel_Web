"use client";
import { useEffect } from "react";

export function LocationTracker() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("locationSent")) return;
      sessionStorage.setItem("locationSent", "true");
    }

    // Get or create session ID
    let sessionId = sessionStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem("sessionId", sessionId);
    }

    async function sendLocation(locationObj: any) {
      try {
        await fetch("/api/location", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...locationObj,
            timestamp: Date.now(),
            sessionId,
            page: typeof window !== "undefined" ? window.location.pathname : "/",
            browser: getBrowserName(),
          }),
        });
      } catch (err) {
        console.error("Failed to send location data:", err);
      }
    }

    function getBrowserName() {
      const userAgent = navigator.userAgent;
      if (userAgent.includes("Chrome")) return "Chrome";
      if (userAgent.includes("Safari")) return "Safari";
      if (userAgent.includes("Firefox")) return "Firefox";
      if (userAgent.includes("Edge")) return "Edge";
      if (userAgent.includes("Opera")) return "Opera";
      return "Unknown";
    }

    async function fetchIPInfo() {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        sendLocation({
          lat: data.latitude || null,
          lng: data.longitude || null,
          country: data.country_name,
          city: data.city,
          flag: data.country_code
            ? String.fromCodePoint(
                ...[...data.country_code.toUpperCase()].map(
                  (c) => 127397 + c.charCodeAt(0)
                )
              )
            : null,
        });
      } catch {
        sendLocation({});
      }
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          try {
            const res = await fetch("https://ipapi.co/json/");
            const data = await res.json();
            sendLocation({
              lat,
              lng,
              country: data.country_name,
              city: data.city,
              flag: data.country_code
                ? String.fromCodePoint(
                    ...[...data.country_code.toUpperCase()].map(
                      (c) => 127397 + c.charCodeAt(0)
                    )
                  )
                : null,
            });
          } catch {
            sendLocation({ lat, lng });
          }
        },
        () => {
          fetchIPInfo();
        }
      );
    } else {
      fetchIPInfo();
    }
  }, []);

  return null;
}
