"use client";

import { useEffect } from "react";
import { pushConversionEvent, sendCmxEvent } from "@/lib/analytics";

export function AttributionTracker() {
  useEffect(() => {
    pushConversionEvent("landing_page_view");
    void sendCmxEvent("landing_page_view");
  }, []);

  return null;
}
