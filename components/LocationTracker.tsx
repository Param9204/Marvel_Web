"use client";
import { useEffect } from "react";

export function LocationTracker() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("locationSent")) return;
      sessionStorage.setItem("locationSent", "true");
    }

    async function sendLocation(locationObj: any) {
      try {
        await fetch("/api/location", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...locationObj, timestamp: Date.now() }),
        });
      } catch {}
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
