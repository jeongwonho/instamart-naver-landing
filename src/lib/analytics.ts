export type ConversionEvent =
  | "landing_page_view"
  | "hero_cta_click"
  | "kakao_cta_click"
  | "lead_form_submit"
  | "lead_form_success"
  | "blog_cta_click";

const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "n_keyword",
  "n_query",
  "n_rank",
  "n_ad_group",
  "n_ad",
  "n_keyword_id",
  "n_media",
  "n_match",
  "nclid",
  "NaPm",
] as const;

type AttributionKey = (typeof ATTRIBUTION_KEYS)[number];

type StoredAttribution = {
  id: string;
  signature: string;
  capturedAt: string;
  expiresAt: number;
  values: Partial<Record<AttributionKey, string>>;
};

const ATTRIBUTION_STORAGE_KEY = "instamart_attribution_v1";
const NAVER_LEAD_STORAGE_PREFIX = "instamart_naver_lead_v1";
const ATTRIBUTION_TTL_MS = 15 * 24 * 60 * 60 * 1000;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    wcs?: {
      trans: (conversion: { type: string; id?: string }) => void;
    };
    wcs_add?: {
      wa?: string;
    };
  }
}

const NAVER_LEAD_EVENTS = new Set<ConversionEvent>([
  "hero_cta_click",
  "kakao_cta_click",
  "lead_form_success",
  "blog_cta_click",
]);

function createAttributionId() {
  if (typeof window.crypto?.randomUUID === "function") {
    return window.crypto.randomUUID();
  }

  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

function readStoredAttribution(): StoredAttribution | null {
  try {
    const raw = window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const stored = JSON.parse(raw) as StoredAttribution;
    if (
      !stored.id ||
      !stored.capturedAt ||
      !stored.expiresAt ||
      stored.expiresAt <= Date.now()
    ) {
      window.localStorage.removeItem(ATTRIBUTION_STORAGE_KEY);
      return null;
    }

    return stored;
  } catch {
    return null;
  }
}

function writeStoredAttribution(attribution: StoredAttribution) {
  try {
    window.localStorage.setItem(
      ATTRIBUTION_STORAGE_KEY,
      JSON.stringify(attribution),
    );
  } catch {
    // Tracking still continues with the in-memory attribution payload.
  }
}

function resolveAttribution() {
  const searchParams = new URLSearchParams(window.location.search);
  const values = Object.fromEntries(
    ATTRIBUTION_KEYS.flatMap((key) => {
      const value = searchParams.get(key);
      return value ? [[key, value]] : [];
    }),
  ) as Partial<Record<AttributionKey, string>>;
  const signature = ATTRIBUTION_KEYS.map(
    (key) => `${key}=${values[key] ?? ""}`,
  ).join("&");
  const hasCurrentAttribution = Object.keys(values).length > 0;
  const stored = readStoredAttribution();

  if (
    stored &&
    (!hasCurrentAttribution || stored.signature === signature)
  ) {
    return stored;
  }

  const capturedAt = new Date().toISOString();
  const attribution: StoredAttribution = {
    id: createAttributionId(),
    signature,
    capturedAt,
    expiresAt: Date.now() + ATTRIBUTION_TTL_MS,
    values,
  };

  writeStoredAttribution(attribution);
  return attribution;
}

function getAttributionContext(): Record<string, unknown> {
  if (typeof window === "undefined") {
    return {};
  }

  const attribution = resolveAttribution();

  return {
    ...attribution.values,
    attribution_id: attribution.id,
    attribution_captured_at: attribution.capturedAt,
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}`,
    page_title: document.title,
    page_referrer: document.referrer,
  };
}

function trackNaverLeadOnce(attributionId: string | undefined, attempt = 0) {
  if (!window.wcs || !window.wcs_add?.wa) {
    if (attempt < 10) {
      window.setTimeout(
        () => trackNaverLeadOnce(attributionId, attempt + 1),
        250,
      );
    }
    return;
  }

  const leadKey = `${NAVER_LEAD_STORAGE_PREFIX}:${attributionId ?? "unknown"}`;

  try {
    if (window.localStorage.getItem(leadKey)) {
      return;
    }
  } catch {
    // The conversion can still be sent when storage is unavailable.
  }

  window.wcs.trans({ type: "lead", id: attributionId });

  try {
    window.localStorage.setItem(leadKey, new Date().toISOString());
  } catch {
    // The Naver conversion has already been sent.
  }
}

export function pushConversionEvent(
  event: ConversionEvent,
  payload: Record<string, unknown> = {},
) {
  if (typeof window === "undefined") {
    return;
  }

  const eventPayload = {
    ...getAttributionContext(),
    ...payload,
  };

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event,
    ...eventPayload,
  });

  window.fbq?.("trackCustom", event, eventPayload);
  window.gtag?.("event", event, eventPayload);

  if (NAVER_LEAD_EVENTS.has(event)) {
    const leadId =
      typeof payload.leadId === "string"
        ? payload.leadId
        : typeof eventPayload.attribution_id === "string"
          ? eventPayload.attribution_id
          : undefined;

    trackNaverLeadOnce(leadId);
  }
}

export async function sendCmxEvent(
  eventName: ConversionEvent,
  payload: Record<string, unknown> = {},
) {
  if (typeof window === "undefined") {
    return;
  }

  await fetch("/api/cmx", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      eventName,
      payload: {
        ...getAttributionContext(),
        ...payload,
      },
      page: `${window.location.pathname}${window.location.search}`,
      referrer: document.referrer,
    }),
    keepalive: true,
  }).catch(() => undefined);
}
