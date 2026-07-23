import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Headphones,
  Heart,
  LineChart,
  LockKeyhole,
  MessageCircle,
  ShoppingBag,
  Sparkles,
  Ticket,
  UsersRound,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { TrackedLink } from "@/components/TrackedLink";
import { siteConfig } from "@/lib/site";

const navItems = [
  { label: "관리 항목", href: "#service" },
  { label: "진행 방식", href: "#process" },
  { label: "상담 예시", href: "#cases" },
  { label: "비용 안내", href: "#pricing" },
  { label: "자주 묻는 질문", href: "#faq" },
];

const trustMetrics = [
  {
    icon: UsersRound,
    value: "계정별 안내",
    label: "맞춤 상담",
    note: "계정 목표와 현재 상태를 먼저 확인",
  },
  {
    icon: Zap,
    value: "진행 전 안내",
    label: "예상 시간 확인",
    note: "관리 항목별 진행 기준을 사전에 안내",
  },
  {
    icon: LockKeyhole,
    value: "비밀번호 불필요",
    label: "간편한 상담",
    note: "계정 비밀번호 요구 없음",
  },
  {
    icon: Headphones,
    value: "후속 관리 상담",
    label: "진행 후 상태 확인",
    note: "상황에 맞춘 후속 안내",
  },
];

const fitCards = [
  {
    icon: UsersRound,
    title: "계정 규모를 관리하고 싶은 계정",
    text: "현재 계정 상태에 맞는 성장 방향을 찾고 싶은 경우",
  },
  {
    icon: Heart,
    title: "초기 반응이 필요한 계정",
    text: "광고나 콘텐츠 운영 전에 반응 흐름을 점검하고 싶은 경우",
  },
  {
    icon: Sparkles,
    title: "브랜드 인지도가 필요한 계정",
    text: "더 많은 사람들에게 계정을 안정적으로 보여주고 싶은가요?",
  },
  {
    icon: ShoppingBag,
    title: "판매·문의 전환을 준비하는 계정",
    text: "콘텐츠 운영 전 계정과 팔로워 현황을 점검하고 싶은 경우",
  },
];

const processSteps = [
  {
    step: "01",
    title: "카카오톡 상담 진입",
    text: "계정 주소와 현재 상태, 운영 목표를 간단히 전달합니다.",
  },
  {
    step: "02",
    title: "관리 항목과 진행 범위 안내",
    text: "계정 상태에 맞춰 팔로워 관리, 게시물 반응, 예상 진행 범위를 안내합니다.",
  },
  {
    step: "03",
    title: "상담 내용 확인 후 시작",
    text: "비밀번호 공유 없이 안내된 관리 범위와 진행 방식을 확인한 뒤 시작합니다.",
  },
  {
    step: "04",
    title: "진행 상태 확인",
    text: "진행 후 변동이나 문의가 있으면 카카오톡으로 후속 상담을 이어갑니다.",
  },
];

const caseCards = [
  {
    title: "신규 브랜드 계정",
    metric: "초기 계정 성장 방향",
    text: "광고 집행 전 계정 상태와 팔로워 관리 범위를 함께 확인합니다.",
  },
  {
    title: "로컬 매장 계정",
    metric: "프로필 운영 목적 상담",
    text: "매장 계정의 운영 목적과 현재 팔로워 상태에 맞춰 진행 범위를 확인합니다.",
  },
  {
    title: "쇼핑몰 운영 계정",
    metric: "콘텐츠 반응 관리",
    text: "게시물 운영 일정과 계정 상태를 확인한 뒤 적합한 관리 범위를 안내합니다.",
  },
];

const pricingPlans = [
  {
    name: "Basic",
    price: "상담 후 안내",
    title: "계정 성장 관리를 처음 시작하는 계정",
    features: ["계정 상태 확인", "팔로워 관리 범위 안내", "카카오톡 진행 상담"],
  },
  {
    name: "Growth",
    price: "추천",
    title: "팔로워와 반응 흐름을 함께 관리하는 계정",
    features: ["팔로워 관리 상담", "진행 시간 안내", "진행 후 상태 확인"],
    featured: true,
  },
  {
    name: "Brand",
    price: "맞춤 상담",
    title: "브랜드 계정의 노출 흐름을 관리하는 계정",
    features: ["운영 목적 상담", "게시물 반응 점검", "릴스 노출 전략 안내"],
  },
];

const quantityOptions = [
  { label: "계정 진단", note: "상태 확인" },
  { label: "팔로워 관리", note: "목표 상담" },
  { label: "게시물 반응", note: "콘텐츠 확인" },
  { label: "릴스 노출", note: "전략 상담" },
];

const faqs = [
  {
    question: "어떤 관리 항목을 상담할 수 있나요?",
    answer:
      "브랜드 SNS 성장 관리 상담입니다. 팔로워 관리, 게시물 반응 최적화, 릴스 노출 전략을 계정 상태에 맞춰 안내합니다.",
  },
  {
    question: "비밀번호를 알려줘야 하나요?",
    answer:
      "아니요. 계정 비밀번호를 요구하지 않습니다. 상담에는 공개된 계정 주소와 현재 상태, 운영 목표가 필요합니다.",
  },
  {
    question: "광고 클릭 후 바로 상담할 수 있나요?",
    answer:
      "가능합니다. 상단과 하단의 카카오톡 상담 버튼을 누르면 바로 상담 흐름으로 이동하도록 구성했습니다.",
  },
  {
    question: "비용은 어디서 확인하나요?",
    answer:
      "관리 항목과 진행 범위에 따라 달라질 수 있어 카카오톡 상담 후 안내합니다. 신규 상담 혜택도 함께 확인할 수 있습니다.",
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

export default function HomePage() {
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
          <p className="channelKicker">메타 채널 성장을 위한</p>
          <h1>
            브랜드 SNS
            <br />
            <mark>성장 관리</mark>
          </h1>
          <p className="channelHeroLead">
            현재 계정 상태와 목표를 확인하고 팔로워 관리, 게시물 반응, 노출 전략의 진행 범위를 안내합니다.
          </p>

          <div className="channelQuantityPicker" aria-label="관리 항목 선택">
            {quantityOptions.map((option) => (
              <TrackedLink
                href={siteConfig.kakaoUrl}
                eventName="hero_cta_click"
                key={option.label}
              >
                <strong>{option.label}</strong>
                <span>{option.note}</span>
              </TrackedLink>
            ))}
          </div>

          <div className="channelHeroActions">
            <KakaoCta className="channelPrimaryCta">카카오톡 상담하기</KakaoCta>
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
            <p>이런 계정에 적합해요</p>
            <h2>계정 상태에 맞는 성장 방향이 필요한 인스타그램 계정</h2>
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
            <h2>계정 확인부터 진행 후 관리까지 카카오톡으로 안내합니다</h2>
            <span>복잡한 회원가입 없이 계정 주소와 운영 목표를 기준으로 상담합니다.</span>
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

      <section className="channelCases" id="cases">
        <div className="channelContainer">
          <div className="channelSectionTitle center">
            <p>상담 예시</p>
            <h2>계정 목적에 따라 확인하는 상담 항목을 안내합니다</h2>
          </div>

          <div className="channelCaseGrid">
            {caseCards.map((card) => (
              <article key={card.title}>
                <LineChart size={28} aria-hidden="true" />
                <h3>{card.title}</h3>
                <strong>{card.metric}</strong>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="channelPricing" id="pricing">
        <div className="channelContainer">
          <div className="channelSectionTitle center">
            <p>비용 안내</p>
            <h2>계정 상태와 관리 범위에 맞춰 상담 후 안내합니다</h2>
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
            <h2>상담 전 궁금한 점을 먼저 확인하세요</h2>
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
            <h2>브랜드 SNS 성장 관리, 지금 카카오톡으로 확인하세요</h2>
            <span>
              계정 주소와 운영 목표를 보내주시면 관리 항목과 진행 범위를 바로 안내드릴게요.
            </span>
          </div>
          <KakaoCta className="channelFinalButton">카카오톡으로 성장 관리 상담하기</KakaoCta>
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
