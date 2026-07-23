"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { pushConversionEvent, sendCmxEvent } from "@/lib/analytics";

type FormState = "idle" | "submitting" | "success" | "error";

const serviceOptions = [
  "종합 관리",
  "콘텐츠 제작",
  "릴스 기획",
  "프로필 SEO",
  "계정 활성화",
  "아직 모르겠어요",
];

const budgetOptions = [
  "월 100만원 이하",
  "월 100-300만원",
  "월 300-500만원",
  "월 500만원 이상",
  "상담 후 결정",
];

export function LeadForm() {
  const [status, setStatus] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("submitting");
    setMessage("");
    pushConversionEvent("lead_form_submit", { form: "landing_consult" });

    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as {
        ok: boolean;
        leadId?: string;
        message?: string;
      };

      if (!response.ok || !result.ok) {
        throw new Error(result.message ?? "상담 요청을 접수하지 못했습니다.");
      }

      setStatus("success");
      setMessage("상담 요청이 접수되었습니다. 담당자가 빠르게 연락드릴게요.");
      pushConversionEvent("lead_form_success", {
        form: "landing_consult",
        leadId: result.leadId,
      });
      await sendCmxEvent("lead_form_success", {
        leadId: result.leadId,
        service: payload.service,
        budget: payload.budget,
      });
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "잠시 후 다시 시도해 주세요.",
      );
    }
  }

  return (
    <form className="leadForm" onSubmit={onSubmit}>
      <div className="formIntro">
        <p className="eyebrow">Free audit</p>
        <h3>계정 진단 신청</h3>
        <p>현재 상태를 남겨주시면 운영 우선순위를 정리해 연락드립니다.</p>
      </div>

      <div className="formRow">
        <label>
          이름
          <input name="name" autoComplete="name" required placeholder="홍길동" />
        </label>
        <label>
          연락처
          <input
            name="phone"
            autoComplete="tel"
            inputMode="tel"
            required
            placeholder="010-0000-0000"
          />
        </label>
      </div>

      <div className="formRow">
        <label>
          인스타그램 계정
          <input name="instagramId" placeholder="@growit.kr" />
        </label>
        <label>
          업종
          <input name="businessType" placeholder="예: 병원, 뷰티, F&B" />
        </label>
      </div>

      <div className="formRow">
        <label>
          필요한 서비스
          <select name="service" defaultValue={serviceOptions[0]}>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          예상 예산
          <select name="budget" defaultValue={budgetOptions[1]}>
            {budgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label>
        현재 고민
        <textarea
          name="message"
          rows={5}
          placeholder="현재 계정 상황, 원하는 목표, 참고 계정을 적어주세요."
          required
        />
      </label>

      <label className="consentLine">
        <input name="consent" type="checkbox" value="true" required />
        개인정보 수집 및 상담 연락에 동의합니다.
      </label>

      <button
        className="primaryButton formButton"
        type="submit"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "접수 중" : "무료 진단 신청"}
        <Send size={17} aria-hidden="true" />
      </button>

      {message ? (
        <p className={status === "error" ? "formMessage error" : "formMessage"}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
