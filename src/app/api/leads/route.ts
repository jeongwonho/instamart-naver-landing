import { NextResponse } from "next/server";
import { createLead, type LeadInput } from "@/server/leads";

export const runtime = "nodejs";

type LeadBody = Record<string, unknown>;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as LeadBody | null;

  if (!body) {
    return NextResponse.json(
      { ok: false, message: "요청 내용을 확인할 수 없습니다." },
      { status: 400 },
    );
  }

  const parsed = parseLead(body);

  if (!parsed.ok) {
    return NextResponse.json(
      { ok: false, message: parsed.message },
      { status: 400 },
    );
  }

  try {
    const { lead } = await createLead(parsed.data, request);

    return NextResponse.json({
      ok: true,
      leadId: lead.id,
      message: "상담 요청이 접수되었습니다.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "상담 요청 처리 중 문제가 발생했습니다.",
      },
      { status: 500 },
    );
  }
}

function parseLead(body: LeadBody):
  | { ok: true; data: LeadInput }
  | { ok: false; message: string } {
  const name = clean(body.name, 60);
  const phone = clean(body.phone, 40);
  const instagramId = clean(body.instagramId, 80);
  const businessType = clean(body.businessType, 80);
  const service = clean(body.service, 80);
  const budget = clean(body.budget, 80);
  const message = clean(body.message, 1200);
  const consent = body.consent === true || body.consent === "true";

  if (!name || !phone || !service || !budget || !message) {
    return { ok: false, message: "필수 항목을 모두 입력해 주세요." };
  }

  if (!/^[0-9+\-\s()]{8,20}$/.test(phone)) {
    return { ok: false, message: "연락처 형식을 확인해 주세요." };
  }

  if (!consent) {
    return { ok: false, message: "개인정보 수집 동의가 필요합니다." };
  }

  return {
    ok: true,
    data: {
      name,
      phone,
      instagramId,
      businessType,
      service,
      budget,
      message,
      consent,
    },
  };
}

function clean(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}
