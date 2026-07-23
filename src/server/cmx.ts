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

export async function trackCmxEvent(input: CmxPayload): Promise<CmxResult> {
  const event = {
    ...input,
    source: input.source ?? "growit-landing",
    occurredAt: new Date().toISOString(),
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

  return { delivered: true };
}
