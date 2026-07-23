"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  FileText,
  Gauge,
  LineChart,
  Megaphone,
  PenLine,
  Radar,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { LeadForm } from "@/components/LeadForm";
import { TrackedLink } from "@/components/TrackedLink";
import { posts } from "@/content/posts";
import { navigation, proofMetrics, siteConfig } from "@/lib/site";

const heroNews = [
  "브랜드 계정 진단 리포트 제공",
  "릴스·카드뉴스·프로필 흐름 통합 운영",
  "소상공인 인스타 운영 상담 오픈",
];

const brandRows = [
  ["CLINIC", "BEAUTY", "F&B", "LOCAL", "SHOP", "BRAND"],
  ["REELS", "PROFILE", "DM FLOW", "REPORT", "CONTENT", "SEO"],
];

const serviceCategories = ["전체", "프로필", "콘텐츠", "활성화", "전환", "리포트"] as const;

type ServiceCategory = (typeof serviceCategories)[number];
type ServiceVisualType = "rank" | "feed" | "mission" | "report" | "story" | "landing";

const services: Array<{
  category: Exclude<ServiceCategory, "전체">;
  icon: LucideIcon;
  title: string;
  description: string;
  visual: ServiceVisualType;
}> = [
  {
    category: "프로필",
    icon: SearchCheck,
    title: "프로필 검색 최적화",
    description: "이름 필드, 소개 문구, 하이라이트, 링크 동선을 고객 검색 의도에 맞춰 정리합니다.",
    visual: "rank",
  },
  {
    category: "콘텐츠",
    icon: PenLine,
    title: "카드뉴스 제작",
    description: "브랜드 톤을 유지하면서 저장, 공유, 상담을 유도하는 피드 콘텐츠를 제작합니다.",
    visual: "feed",
  },
  {
    category: "콘텐츠",
    icon: Sparkles,
    title: "릴스 포맷 기획",
    description: "조회수만 노리는 영상이 아니라 문의로 이어질 반복 포맷과 후킹 문장을 설계합니다.",
    visual: "story",
  },
  {
    category: "활성화",
    icon: ShieldCheck,
    title: "계정 활성화 운영",
    description: "계정 상태와 업종에 맞춰 안전한 속도로 고객 접점을 늘리고 반응 신호를 관리합니다.",
    visual: "mission",
  },
  {
    category: "전환",
    icon: Target,
    title: "문의 동선 설계",
    description: "프로필, 하이라이트, 링크, 상담 폼을 하나의 흐름으로 묶어 이탈 구간을 줄입니다.",
    visual: "landing",
  },
  {
    category: "리포트",
    icon: BarChart3,
    title: "주간 성과 리포트",
    description: "도달, 저장, 프로필 행동, 문의 흐름을 보고 다음 주 운영 액션까지 정리합니다.",
    visual: "report",
  },
];

const aiKeywords = [
  "강남 피부관리",
  "청담 속눈썹",
  "성수 브런치",
  "광교 PT",
  "송도 네일",
  "분당 와인바",
  "제주 숙소",
  "부산 플라워",
];

const toolCards = [
  { icon: Radar, title: "계정 진단", text: "프로필, 콘텐츠, 링크 흐름을 빠르게 점검합니다." },
  { icon: Gauge, title: "운영 속도 체크", text: "계정 상태에 맞는 업로드와 활성화 속도를 잡습니다." },
  { icon: ClipboardCheck, title: "콘텐츠 캘린더", text: "주간 제작 일정과 검수 흐름을 한눈에 관리합니다." },
  { icon: CircleDollarSign, title: "문의 흐름 분석", text: "CTA와 상담 진입 구간의 손실을 찾아냅니다." },
  { icon: UsersRound, title: "고객군 정리", text: "관심 고객의 질문, 저장 이유, 구매 신호를 분류합니다." },
  { icon: FileText, title: "액션 리포트", text: "숫자 나열이 아니라 다음 실행 항목까지 제공합니다." },
];

const consultants = [
  {
    name: "계정 전략 매니저",
    role: "프로필·전환 동선 설계",
    text: "업종별 검색어와 고객 질문을 바탕으로 프로필, 하이라이트, 상담 동선을 재정리합니다.",
  },
  {
    name: "콘텐츠 디렉터",
    role: "릴스·카드뉴스 제작",
    text: "브랜드 톤을 유지하면서 저장과 문의를 끌어내는 반복 가능한 콘텐츠 포맷을 만듭니다.",
  },
  {
    name: "운영 리포터",
    role: "성과 추적·다음 액션 제안",
    text: "도달, 반응, 프로필 행동, 문의 데이터를 묶어 다음 주 운영 우선순위를 제안합니다.",
  },
];

export function InteractiveLanding() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("전체");
  const [activeKeyword, setActiveKeyword] = useState(0);

  const filteredServices = useMemo(() => {
    if (activeCategory === "전체") {
      return services;
    }

    return services.filter((service) => service.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="auraPage">
      <header className="auraHeader">
        <Link href="/" className="auraBrand" aria-label="GROW-IT 홈">
          <span>G</span>
          <strong>GROW-IT</strong>
        </Link>

        <nav className="auraNav" aria-label="주요 메뉴">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <TrackedLink
          href={siteConfig.kakaoUrl}
          eventName="kakao_cta_click"
          className="auraHeaderCta"
        >
          무료 진단
          <ArrowRight size={16} aria-hidden="true" />
        </TrackedLink>
      </header>

      <main>
        <section className="auraHero">
          <div className="heroVideoLayer" aria-hidden="true">
            <div className="scanLine" />
            <div className="heroNoise" />
          </div>

          <div className="container heroCenter">
            <div className="newsRail" aria-label="그로우잇 업데이트">
              {heroNews.map((item) => (
                <span key={item}>[업데이트] {item}</span>
              ))}
            </div>

            <p className="heroKicker">Instagram Growth Operation 2.0</p>
            <h1>
              사장님이 직접 하던 인스타그램,
              <br />
              이제 운영 시스템으로 바꾸세요
            </h1>
            <p className="heroLead">
              그로우잇은 콘텐츠 제작, 프로필 최적화, 계정 활성화, 주간 리포트를 하나로 연결해
              문의가 생기는 인스타그램 운영 흐름을 만듭니다.
            </p>

            <div className="heroActions">
              <TrackedLink
                href="#consult"
                eventName="hero_cta_click"
                className="redButton"
              >
                무료 계정 진단
                <ArrowRight size={18} aria-hidden="true" />
              </TrackedLink>
              <Link href="#service" className="ghostButton">
                서비스 보기
              </Link>
            </div>

            <HeroProduct />
          </div>
        </section>

        <section className="brandOrbit" aria-label="운영 가능 업종과 기능">
          {brandRows.map((row, rowIndex) => (
            <div className="brandTrack" key={row.join("-")}>
              {[...row, ...row, ...row].map((item, index) => (
                <span key={`${rowIndex}-${item}-${index}`}>{item}</span>
              ))}
            </div>
          ))}
        </section>

        <section className="metricSection" id="proof">
          <div className="metricBg" aria-hidden="true" />
          <div className="container metricGrid">
            {proofMetrics.map((metric) => (
              <article key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section serviceCatalog" id="service">
          <div className="container sectionTitle center">
            <p className="auraEyebrow">All services</p>
            <h2>필요한 인스타 운영을 한 화면에서 고르세요</h2>
            <p>
              단순 제작물이 아니라 프로필, 콘텐츠, 활성화, 전환, 리포트가 연결되는 운영 패키지로
              계정 성장을 설계합니다.
            </p>
          </div>

          <div className="categoryPills" role="tablist" aria-label="서비스 카테고리">
            {serviceCategories.map((category) => (
              <button
                type="button"
                key={category}
                className={activeCategory === category ? "active" : ""}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="container serviceGrid">
            {filteredServices.map((service) => {
              const Icon = service.icon;
              return (
                <article className="auraServiceCard" key={service.title}>
                  <div>
                    <span>{service.category}</span>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                  <ServiceVisual type={service.visual} />
                  <Icon size={22} aria-hidden="true" />
                </article>
              );
            })}
          </div>
        </section>

        <section className="section aiSection" id="system">
          <div className="container aiGrid">
            <div className="aiPanel">
              <div className="aiPanelTop">
                <span>GROW-IT AI ASSIST</span>
                <strong>키워드 분석 진행중</strong>
              </div>
              <div className="keywordCloud">
                {aiKeywords.map((keyword, index) => (
                  <button
                    type="button"
                    key={keyword}
                    className={activeKeyword === index ? "active" : ""}
                    onClick={() => setActiveKeyword(index)}
                  >
                    {keyword}
                  </button>
                ))}
              </div>
              <div className="aiResult">
                <div>
                  <strong>{aiKeywords[activeKeyword]}</strong>
                  <span>콘텐츠 주제 12개, 프로필 키워드 4개, 상담 CTA 2개 추천</span>
                </div>
                <Bot size={34} aria-hidden="true" />
              </div>
              <div className="auditStrip" aria-hidden="true">
                <i style={{ width: "74%" }} />
                <i style={{ width: "52%" }} />
                <i style={{ width: "88%" }} />
              </div>
            </div>

            <div className="aiCopy">
              <p className="auraEyebrow">Operation AI</p>
              <h2>
                고객이 검색하는 말에서
                <br />
                이번 주 운영 계획을 뽑아냅니다
              </h2>
              <p>
                업종 키워드와 고객 질문을 바탕으로 프로필 문구, 릴스 주제, 카드뉴스 흐름, 상담
                문장을 함께 정리합니다. 그래서 콘텐츠가 따로 놀지 않고 문의 흐름으로 연결됩니다.
              </p>
              <ul>
                <li>
                  <CheckCircle2 size={18} aria-hidden="true" />
                  업종별 검색어와 고객 질문 기반 콘텐츠 추천
                </li>
                <li>
                  <CheckCircle2 size={18} aria-hidden="true" />
                  릴스·카드뉴스·스토리 제작 순서 자동 분류
                </li>
                <li>
                  <CheckCircle2 size={18} aria-hidden="true" />
                  주간 리포트에서 다음 실행 항목까지 연결
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section freeTools">
          <div className="container sectionTitle center">
            <p className="auraEyebrow">Free audit kit</p>
            <h2>무료 진단에 포함되는 운영 체크 도구</h2>
          </div>

          <div className="container toolGrid">
            {toolCards.map((tool) => {
              const Icon = tool.icon;
              return (
                <article key={tool.title}>
                  <Icon size={23} aria-hidden="true" />
                  <h3>{tool.title}</h3>
                  <p>{tool.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section consultantSection">
          <div className="container consultantGrid">
            <div className="sectionTitle">
              <p className="auraEyebrow">Consulting</p>
              <h2>실제 운영자가 계정 상태를 보고 개선 순서를 정합니다</h2>
              <p>
                자동화 도구만 던져두지 않습니다. 계정의 현재 상태와 업종 특성을 보고 어디부터
                바꿔야 문의가 생기는지 정리합니다.
              </p>
            </div>

            <div className="consultantCards">
              {consultants.map((consultant) => (
                <article key={consultant.name}>
                  <div className="avatarStack">
                    <span />
                    <span />
                    <span />
                  </div>
                  <h3>{consultant.name}</h3>
                  <strong>{consultant.role}</strong>
                  <p>{consultant.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section journalSection" id="blog">
          <div className="container sectionTitle center">
            <p className="auraEyebrow">Journal</p>
            <h2>광고를 켜기 전 먼저 정리할 운영 기준</h2>
          </div>

          <div className="container journalCards">
            {posts.slice(0, 3).map((post) => (
              <Link className="journalCard" href={`/blog/${post.slug}`} key={post.slug}>
                <span>{post.category}</span>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <small>{post.readingMinutes}분 읽기</small>
              </Link>
            ))}
          </div>
        </section>

        <section className="section finalCta" id="consult">
          <div className="container finalGrid">
            <div className="finalCopy">
              <p className="auraEyebrow">Free consulting</p>
              <h2>
                30초만 남겨주세요.
                <br />
                계정의 첫 개선안을 보내드립니다.
              </h2>
              <p>
                계정 주소와 현재 고민을 남겨주시면 프로필, 콘텐츠, 활성화, 리포트 중 어디부터
                바꿔야 할지 정리해서 연락드립니다.
              </p>
              <div className="finalBadges">
                <span>프로필 진단</span>
                <span>콘텐츠 방향</span>
                <span>운영 범위 제안</span>
              </div>
            </div>

            <LeadForm />
          </div>
        </section>
      </main>
    </div>
  );
}

function HeroProduct() {
  return (
    <div className="heroProduct" aria-label="그로우잇 운영 대시보드 예시">
      <div className="productChrome">
        <span />
        <span />
        <span />
      </div>
      <div className="productGrid">
        <section className="productMain">
          <div className="productTitle">
            <span>GROW-IT DASHBOARD</span>
            <strong>Week 18</strong>
          </div>
          <div className="rankChart">
            {[44, 68, 52, 78, 63, 92, 74].map((height, index) => (
              <i key={index} style={{ height: `${height}%` }} />
            ))}
          </div>
        </section>
        <section className="phonePreview">
          {["릴스", "후기", "FAQ", "전후", "예약", "DM"].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </section>
        <section className="photoPreview">
          <img src="/images/instagram-growth-command-center.png" alt="인스타그램 운영 자료와 분석 화면" />
        </section>
        <section className="missionPreview">
          <div>
            <strong>오늘의 운영</strong>
            <p>릴스 편집, 댓글 응대, 프로필 링크 점검, 주간 리포트 작성</p>
          </div>
          <LineChart size={28} aria-hidden="true" />
        </section>
      </div>
    </div>
  );
}

function ServiceVisual({ type }: { type: ServiceVisualType }) {
  if (type === "rank") {
    return (
      <div className="serviceVisual rank">
        <span>SEO</span>
        <strong>지역 + 업종</strong>
      </div>
    );
  }

  if (type === "feed") {
    return (
      <div className="serviceVisual feed">
        <i />
        <i />
        <i />
        <i />
      </div>
    );
  }

  if (type === "mission") {
    return (
      <div className="serviceVisual mission">
        <CheckCircle2 size={18} aria-hidden="true" />
        <span>안전 운영</span>
      </div>
    );
  }

  if (type === "report") {
    return (
      <div className="serviceVisual report">
        <i style={{ height: "42%" }} />
        <i style={{ height: "72%" }} />
        <i style={{ height: "58%" }} />
        <i style={{ height: "88%" }} />
      </div>
    );
  }

  if (type === "landing") {
    return (
      <div className="serviceVisual landing">
        <span>CTA</span>
        <ChevronRight size={18} aria-hidden="true" />
        <span>FORM</span>
      </div>
    );
  }

  return (
    <div className="serviceVisual story">
      <Megaphone size={18} aria-hidden="true" />
      <span>릴스 포맷</span>
    </div>
  );
}
