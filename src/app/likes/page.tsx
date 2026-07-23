import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Heart,
  LockKeyhole,
  MessageCircle,
  MousePointerClick,
  Sparkles,
  Ticket,
  type LucideIcon,
} from "lucide-react";
import { TrackedLink } from "@/components/TrackedLink";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "인스타그램 게시물 반응 관리",
  description:
    "게시물 상태와 운영 목표를 바탕으로 좋아요를 포함한 반응 관리 범위와 진행 방식을 안내합니다.",
  alternates: { canonical: "/likes" },
  openGraph: {
    title: "인스타그램 게시물 반응 관리 | 인스타마트",
    description:
      "게시물 주소와 현재 상태를 확인하고 좋아요 관리와 콘텐츠별 진행 범위를 안내합니다.",
    url: "/likes",
  },
};

const navItems = [
  { label: "관리 항목", href: "#service" },
  { label: "진행 방식", href: "#process" },
  { label: "비용 안내", href: "#pricing" },
  { label: "자주 묻는 질문", href: "#faq" },
];

const trustMetrics = [
  {
    icon: Heart,
    value: "게시물별 안내",
    label: "반응 상태 확인",
    note: "콘텐츠와 목적에 맞춰 확인",
  },
  {
    icon: Clock3,
    value: "진행 전 안내",
    label: "예상 시간 확인",
    note: "관리 항목별 진행 기준을 사전 안내",
  },
  {
    icon: LockKeyhole,
    value: "비밀번호 불필요",
    label: "간편한 상담",
    note: "게시물 주소로 상담 가능",
  },
  {
    icon: MessageCircle,
    value: "카카오톡 상담",
    label: "빠른 확인",
    note: "관리 범위와 진행 방식을 한 번에 안내",
  },
];

const fitCards = [
  {
    icon: Sparkles,
    title: "새 게시물을 올린 계정",
    text: "업로드 직후 게시물의 첫 반응을 보완하고 싶은 경우",
  },
  {
    icon: Heart,
    title: "반응이 부족한 게시물",
    text: "콘텐츠에 비해 좋아요를 포함한 반응이 아쉬운 경우",
  },
  {
    icon: MousePointerClick,
    title: "광고 예정 콘텐츠",
    text: "광고를 시작하기 전 게시물의 기본 반응을 정리하고 싶은 경우",
  },
  {
    icon: MessageCircle,
    title: "여러 게시물을 운영하는 계정",
    text: "게시물마다 다른 반응 상태를 함께 점검하고 싶은 경우",
  },
];

const processSteps = [
  {
    step: "01",
    title: "게시물 주소 전달",
    text: "관리할 게시물 주소와 현재 반응 상태를 카카오톡으로 보내주세요.",
  },
  {
    step: "02",
    title: "관리 범위와 진행 시간 확인",
    text: "게시물 상태에 맞는 좋아요 관리 범위와 예상 진행 시간을 안내합니다.",
  },
  {
    step: "03",
    title: "상담 내용 확인 후 시작",
    text: "비밀번호를 공유하지 않고 안내된 관리 범위와 진행 방식을 확인한 뒤 시작합니다.",
  },
  {
    step: "04",
    title: "진행 상태 확인",
    text: "진행 중 궁금한 점은 카카오톡에서 이어서 확인할 수 있습니다.",
  },
];

const pricingPlans = [
  {
    name: "Start",
    price: "상담 후 안내",
    title: "게시물 반응 관리를 처음 시작하는 계정",
    features: ["게시물 상태 확인", "좋아요 관리 범위 안내", "예상 진행 시간 확인"],
  },
  {
    name: "Post",
    price: "추천",
    title: "특정 게시물의 반응을 보완하는 계정",
    features: ["게시물별 반응 상담", "관리 항목 확인", "카카오톡 진행 안내"],
    featured: true,
  },
  {
    name: "Contents",
    price: "맞춤 상담",
    title: "여러 콘텐츠를 함께 운영하는 계정",
    features: ["다수 게시물 상담", "반응 흐름 점검", "진행 순서 확인"],
  },
];

const faqs = [
  {
    question: "게시물 좋아요 관리도 상담할 수 있나요?",
    answer:
      "네. 게시물 상태와 운영 목표를 확인한 뒤 좋아요를 포함한 반응 관리 범위와 진행 방식을 안내합니다.",
  },
  {
    question: "계정 비밀번호가 필요한가요?",
    answer:
      "아니요. 계정 비밀번호를 요구하지 않습니다. 상담에는 공개된 게시물 주소와 현재 반응 상태가 필요합니다.",
  },
  {
    question: "여러 게시물도 함께 상담할 수 있나요?",
    answer:
      "가능합니다. 게시물 주소와 각 콘텐츠의 운영 목표를 보내주시면 관리 범위와 진행 순서를 안내합니다.",
  },
  {
    question: "비용과 진행 시간은 어디서 확인하나요?",
    answer:
      "게시물 상태와 관리 범위에 따라 달라질 수 있어 카카오톡 상담 후 안내합니다. 신규 상담 혜택도 함께 확인할 수 있습니다.",
  },
];

function KakaoCta({
  className,
  children = "카카오톡 상담하기",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <TrackedLink
      className={className}
      href={siteConfig.kakaoUrl}
      eventName="kakao_cta_click"
    >
      <MessageCircle size={18} aria-hidden="true" />
      <span>{children}</span>
      <ArrowRight size={18} aria-hidden="true" />
    </TrackedLink>
  );
}

function InfoCard({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <article>
      <Icon size={28} aria-hidden="true" />
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

export default function LikesPage() {
  return (
    <main className="channelPage">
      <div className="channelTopBanner">
        <Ticket size={18} aria-hidden="true" />
        <span>첫 상담 고객</span>
        <strong>상담 혜택 안내</strong>
        <TrackedLink href={siteConfig.kakaoUrl} eventName="kakao_cta_click">
          상담하기
        </TrackedLink>
      </div>

      <header className="channelHeader">
        <div className="channelContainer channelHeaderInner">
          <Link href="/" className="channelBrand" aria-label="인스타마트">
            <img src="/images/instamart-logo.png" alt="인스타마트" />
          </Link>
          <nav className="channelNav" aria-label="주요 메뉴">
            {navItems.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <KakaoCta className="channelHeaderCta" />
        </div>
      </header>

      <section className="channelHero" id="service">
        <div className="channelContainer channelHeroCenter">
          <p className="channelKicker">게시물 상태에 맞춰 안내하는</p>
          <h1>
            인스타그램 게시물
            <br />
            <mark>반응 관리</mark>
          </h1>
          <p className="channelHeroLead">
            게시물 주소와 현재 반응 상태를 확인하고 좋아요 관리와 콘텐츠별 진행 범위를 안내합니다.
          </p>
          <div className="channelQuantityPicker" aria-label="상담 유형 선택">
            {[
              ["게시물 진단", "상태 확인"],
              ["좋아요 관리", "반응 확인"],
              ["여러 게시물", "운영 상담"],
              ["콘텐츠 점검", "맞춤 안내"],
            ].map(([label, note]) => (
              <TrackedLink href={siteConfig.kakaoUrl} eventName="hero_cta_click" key={label}>
                <strong>{label}</strong>
                <span>{note}</span>
              </TrackedLink>
            ))}
          </div>
          <div className="channelHeroActions">
            <KakaoCta className="channelPrimaryCta">게시물 반응 상담하기</KakaoCta>
          </div>
        </div>

        <div className="channelContainer channelTrustBand">
          {trustMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <article key={metric.value}>
                <Icon size={34} aria-hidden="true" />
                <div>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                  <p>{metric.note}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="channelFitSection">
        <div className="channelContainer">
          <div className="channelSectionTitle center">
            <p>이런 게시물에 적합해요</p>
            <h2>콘텐츠마다 다른 반응 상태를 먼저 확인하세요</h2>
          </div>
          <div className="channelFitGrid">
            {fitCards.map((card) => (
              <InfoCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section className="channelProcess" id="process">
        <div className="channelContainer channelProcessGrid">
          <div className="channelSectionTitle">
            <p>진행 방식</p>
            <h2>게시물 확인부터 진행 상태 안내까지 카카오톡으로</h2>
            <span>복잡한 회원가입 없이 게시물 주소와 운영 목표를 기준으로 상담합니다.</span>
          </div>
          <div className="channelStepList">
            {processSteps.map((step) => (
              <article key={step.step}>
                <strong>{step.step}</strong>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="channelPricing" id="pricing">
        <div className="channelContainer">
          <div className="channelSectionTitle center">
            <p>비용 안내</p>
            <h2>게시물 상태와 관리 범위에 맞춰 안내합니다</h2>
          </div>
          <div className="channelPricingGrid">
            {pricingPlans.map((plan) => (
              <article className={plan.featured ? "featured" : ""} key={plan.name}>
                <span>{plan.name}</span>
                <h3>{plan.title}</h3>
                <strong>{plan.price}</strong>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <CheckCircle2 size={17} aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="channelFaq" id="faq">
        <div className="channelContainer channelFaqGrid">
          <div className="channelSectionTitle">
            <p>자주 묻는 질문</p>
            <h2>상담 전에 필요한 내용을 확인하세요</h2>
          </div>
          <div className="channelFaqList">
            {faqs.map((faq, index) => (
              <details key={faq.question} open={index === 0}>
                <summary>
                  <span>{faq.question}</span>
                  <ChevronDown size={20} aria-hidden="true" />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="channelFinalCta" id="consult">
        <div className="channelContainer channelFinalBox">
          <div>
            <p>신규 고객 상담 혜택 안내</p>
            <h2>게시물 반응 관리, 주소만 보내주세요</h2>
            <span>게시물 주소와 운영 목표를 확인한 뒤 관리 범위를 안내해드릴게요.</span>
          </div>
          <KakaoCta className="channelFinalButton">카카오톡으로 반응 관리 상담하기</KakaoCta>
        </div>
      </section>

      <footer className="channelBusinessFooter">
        <div className="channelContainer channelBusinessFooterInner">
          <div className="channelBusinessHeading">
            <strong>인스타마트</strong>
            <span>SNS 성장 관리 서비스</span>
          </div>
          <div className="channelBusinessInfo" aria-label="사업자 정보">
            <span>상호 테크버스</span>
            <span>대표자 박재형</span>
            <span>사업자등록번호 317-19-02266</span>
            <span>통신판매업신고 2026-고양덕양구-1423</span>
            <span>경기도 고양시 덕양구 향동로 218, B동 1542호</span>
            <a href="tel:01039696531">010-3969-6531</a>
            <a href="mailto:info@grow-it.co.kr">info@grow-it.co.kr</a>
          </div>
          <nav className="channelPolicyLinks" aria-label="서비스 정책">
            <a href="https://insta-mart.co.kr/member/agreement.html">이용약관</a>
            <a href="https://insta-mart.co.kr/member/privacy.html">개인정보처리방침</a>
            <TrackedLink href={siteConfig.kakaoUrl} eventName="kakao_cta_click">
              고객 상담
            </TrackedLink>
          </nav>
          <p className="channelCouponNotice">
            신규 상담 혜택의 제공 및 사용 조건은 상담 시 안내합니다.
          </p>
        </div>
      </footer>

      <div className="channelMobileStickyCta">
        <KakaoCta className="channelMobileStickyButton">상담 혜택 확인하기</KakaoCta>
      </div>
    </main>
  );
}
