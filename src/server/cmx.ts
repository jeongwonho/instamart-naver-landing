export type CmxPayload = {
  eventName: string;
  payload?: Record<string, unknown>;
  page?: string;
  referrer?: string;
  leadId?: string;
  source?: string;
};

type CmxResult = {
  delivered: boolean;
  reason?: string;
};

const cmxWebhookUrl = process.env.CMX_WEBHOOK_URL;

function cleanTrackingId(value: unknown) {
  return String(value ?? "")
    .replace(/[^A-Za-z0-9_-]/g, "")
    .slice(0, 80);
}

function cleanEventName(value: string) {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 80) || "unknown"
  );
}

function stringValue(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export async function trackCmxEvent(input: CmxPayload): Promise<CmxResult> {
  const payload = input.payload ?? {};
  const occurredAt = new Date().toISOString();
  const attributionId = cleanTrackingId(payload.attribution_id);
  const leadId = cleanTrackingId(input.leadId ?? payload.leadId);
  const visitorId =
    attributionId || leadId || `landing_${Date.now().toString(36)}`;
  const sessionId = attributionId || leadId || visitorId;
  const page =
    input.page ?? stringValue(payload.page_path) ?? stringValue(payload.page_location);
  const referrer =
    input.referrer ?? stringValue(payload.page_referrer) ?? "";
  const event = {
    ...input,
    source: input.source ?? "growit-landing",
    occurredAt,
    visitorId,
    sessionId,
    route: `/instamart-landing/events/${cleanEventName(input.eventName)}`,
    pageLabel: `인스타마트 랜딩 이벤트: ${input.eventName}`,
    referrerUrl: referrer,
    previousRoute: page ?? "/",
  };

  if (!cmxWebhookUrl) {
    return { delivered: false, reason: "CMX_WEBHOOK_URL is not configured" };
  }

  const response = await fetch(cmxWebhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });

  if (!response.ok) {
    return { delivered: false, reason: `CMX responded with ${response.status}` };
  }

  const responseBody = (await response.json().catch(() => null)) as {
    tracked?: boolean;
  } | null;
  if (responseBody?.tracked === false) {
    return { delivered: false, reason: "CMX rejected the event payload" };
  }

  return { delivered: true };
}
