import { trackCmxEvent } from "@/server/cmx";

export type LeadInput = {
  name: string;
  phone: string;
  instagramId?: string;
  businessType?: string;
  service: string;
  budget: string;
  message: string;
  consent: boolean;
};

export type LeadRecord = LeadInput & {
  id: string;
  createdAt: string;
  source: string;
  ip?: string;
  userAgent?: string;
};

const leadWebhookUrl = process.env.LEAD_WEBHOOK_URL;

export async function createLead(input: LeadInput, request: Request) {
  const lead: LeadRecord = {
    ...input,
    id: createLeadId(),
    createdAt: new Date().toISOString(),
    source: "landing_consult_form",
    ip: getClientIp(request),
    userAgent: request.headers.get("user-agent") ?? undefined,
  };

  const deliveries = await Promise.allSettled([
    deliverLeadWebhook(lead),
    trackCmxEvent({
      eventName: "lead_created",
      leadId: lead.id,
      payload: {
        service: lead.service,
        budget: lead.budget,
        businessType: lead.businessType,
      },
      source: "lead-api",
    }),
  ]);

  return {
    lead,
    deliveries,
  };
}

async function deliverLeadWebhook(lead: LeadRecord) {
  if (!leadWebhookUrl) {
    return { delivered: false, reason: "LEAD_WEBHOOK_URL is not configured" };
  }

  const response = await fetch(leadWebhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lead),
  });

  if (!response.ok) {
    throw new Error(`Lead webhook responded with ${response.status}`);
  }

  return { delivered: true };
}

function createLeadId() {
  const entropy =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2);

  return `lead_${Date.now()}_${entropy}`;
}

function getClientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    undefined
  );
}
