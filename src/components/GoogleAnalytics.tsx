"use client";

import Script from "next/script";
import { useEffect } from "react";

export default function GoogleAnalytics() {
  const GA_MEASUREMENT_ID = "G-Z2T70RXY6N";

  useEffect(() => {
    // Helper to declare gtag function if not already there
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = window.gtag || gtag;

    // Tracking for WhatsApp, Phone, and Google Maps clicks using delegation
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      
      if (!link) return;
      
      const href = link.getAttribute("href") || "";

      // A. WhatsApp Clicks
      if (href.includes("wa.me") || href.includes("whatsapp")) {
        window.gtag("event", "click_whatsapp", {
          event_category: "contact",
          event_label: "WhatsApp Click",
          value: 1,
        });
        console.log("WhatsApp click tracked:", href);
      }

      // B. Phone Clicks
      if (href.startsWith("tel:")) {
        window.gtag("event", "click_phone", {
          event_category: "contact",
          event_label: "Phone Click",
          value: 1,
        });
        console.log("Phone click tracked:", href);
      }

      // C. Google Maps Clicks
      if (href.includes("google.com/maps") || href.includes("maps/embed") || href.includes("google.com/maps/search")) {
        window.gtag("event", "click_directions", {
          event_category: "engagement",
          event_label: "Get Directions",
          value: 1,
        });
        console.log("Directions click tracked:", href);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    // D. Scroll Depth Tracking
    let scrollTracked = {
      "25": false,
      "50": false,
      "75": false,
      "100": false,
    };

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      
      const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);

      if (scrollPercent >= 25 && !scrollTracked["25"]) {
        window.gtag("event", "scroll_depth", {
          event_category: "engagement",
          event_label: "25%",
          value: 25,
        });
        scrollTracked["25"] = true;
      }

      if (scrollPercent >= 50 && !scrollTracked["50"]) {
        window.gtag("event", "scroll_depth", {
          event_category: "engagement",
          event_label: "50%",
          value: 50,
        });
        scrollTracked["50"] = true;
      }

      if (scrollPercent >= 75 && !scrollTracked["75"]) {
        window.gtag("event", "scroll_depth", {
          event_category: "engagement",
          event_label: "75%",
          value: 75,
        });
        scrollTracked["75"] = true;
      }

      if (scrollPercent >= 98 && !scrollTracked["100"]) {
        window.gtag("event", "scroll_depth", {
          event_category: "engagement",
          event_label: "100%",
          value: 100,
        });
        scrollTracked["100"] = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Load GA gtag Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      {/* Initialize GA config */}
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}

// Add TypeScript support for window.gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
