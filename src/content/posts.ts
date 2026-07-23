import { absoluteUrl } from "@/lib/site";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  updatedAt?: string;
  readingMinutes: number;
  keywords: string[];
  heroLabel: string;
  sections: Array<{
    heading: string;
    body: string[];
  }>;
};

export const posts: BlogPost[] = [
  {
    slug: "instagram-profile-seo-checklist",
    title: "인스타그램 프로필 SEO 체크리스트",
    description:
      "검색되는 계정을 만들기 위해 이름 필드, 소개 문구, 하이라이트, 링크 구조를 점검하는 실무 체크리스트입니다.",
    category: "인스타 SEO",
    publishedAt: "2026-04-20",
    readingMinutes: 5,
    keywords: ["인스타그램 SEO", "프로필 최적화", "인스타 소개 문구"],
    heroLabel: "Profile SEO",
    sections: [
      {
        heading: "이름 필드는 검색어를 담는 자리입니다",
        body: [
          "인스타그램의 이름 필드는 브랜드명만 적기보다 고객이 검색할 업종과 지역 키워드를 함께 담는 것이 좋습니다. 예를 들어 뷰티숍이라면 지역명, 대표 시술, 브랜드명을 조합해 검색 노출 가능성을 높일 수 있습니다.",
          "다만 키워드를 과하게 나열하면 신뢰감이 떨어집니다. 한 줄 안에서 고객이 바로 이해할 수 있는 표현으로 정리하는 것이 전환에도 유리합니다.",
        ],
      },
      {
        heading: "소개 문구는 약속과 행동을 동시에 보여줘야 합니다",
        body: [
          "소개 문구는 누가, 무엇을, 어떤 결과로 제공하는지 빠르게 말해야 합니다. 구매 전환이 목표라면 마지막 줄에는 예약, 상담, 무료 진단처럼 명확한 행동을 배치합니다.",
          "고객이 이미 고민하고 있는 표현을 그대로 반영하면 광고 랜딩과 프로필 사이의 메시지 일관성도 좋아집니다.",
        ],
      },
      {
        heading: "하이라이트는 작은 랜딩페이지처럼 구성합니다",
        body: [
          "후기, 가격, 과정, 자주 묻는 질문, 포트폴리오를 하이라이트로 정리하면 방문자가 DM을 보내기 전에 필요한 정보를 빠르게 얻을 수 있습니다.",
          "커버 디자인보다 중요한 것은 구분입니다. 모바일에서 한눈에 읽히는 짧은 단어를 사용하세요.",
        ],
      },
    ],
  },
  {
    slug: "outsourcing-instagram-management",
    title: "인스타그램 운영대행을 맡기기 전 확인할 7가지",
    description:
      "운영대행 견적을 비교하기 전에 반드시 확인해야 할 업무 범위, 리포트 방식, 콘텐츠 검수 프로세스를 정리했습니다.",
    category: "운영대행",
    publishedAt: "2026-04-18",
    readingMinutes: 6,
    keywords: ["인스타그램 운영대행", "인스타 관리대행", "콘텐츠 대행"],
    heroLabel: "Agency Fit",
    sections: [
      {
        heading: "업무 범위가 숫자로 정의되어야 합니다",
        body: [
          "월 업로드 수, 릴스 제작 수, 카드뉴스 수, 스토리 운영, 댓글과 DM 대응 범위처럼 실제 실행량이 분명해야 합니다. 그래야 견적이 비싼지보다 필요한 운영 수준과 맞는지를 판단할 수 있습니다.",
          "계정 활성화나 팔로워 관리가 포함된 경우에는 방식과 안전 기준을 반드시 확인해야 합니다.",
        ],
      },
      {
        heading: "검수 프로세스가 없으면 속도와 완성도가 흔들립니다",
        body: [
          "콘텐츠는 기획안, 디자인 초안, 최종 업로드의 단계가 분리되어야 수정 비용과 일정이 예측됩니다. 피드백을 어떤 도구로 모으는지도 중요합니다.",
          "초기 한 달은 브랜드 자료를 구조화해 받는 기간입니다. 이때 자료를 얼마나 잘 정리하느냐가 이후 운영의 품질을 좌우합니다.",
        ],
      },
      {
        heading: "리포트는 결과보다 다음 액션이 중요합니다",
        body: [
          "좋은 리포트는 도달, 저장, 프로필 행동 같은 지표를 보여주는 데서 끝나지 않고 다음 주에 무엇을 바꿀지 제안합니다.",
          "광고를 함께 운영한다면 랜딩페이지 이벤트와 광고 전환 이벤트까지 맞물리도록 설계해야 합니다.",
        ],
      },
    ],
  },
  {
    slug: "reels-content-planning",
    title: "릴스 기획은 조회수보다 먼저 물어야 할 것",
    description:
      "릴스 조회수를 올리기 전에 구매 의도, 저장 가치, 반복 가능한 포맷을 먼저 설계해야 하는 이유를 설명합니다.",
    category: "콘텐츠 전략",
    publishedAt: "2026-04-12",
    readingMinutes: 4,
    keywords: ["릴스 기획", "인스타 콘텐츠", "릴스 마케팅"],
    heroLabel: "Reels Strategy",
    sections: [
      {
        heading: "조회수는 목표가 아니라 신호입니다",
        body: [
          "조회수가 높은 콘텐츠가 반드시 매출로 이어지지는 않습니다. 브랜드 계정에서는 누가 보는지, 왜 저장했는지, 다음 행동이 있었는지를 함께 봐야 합니다.",
          "릴스는 유입의 문입니다. 문을 열고 들어온 사람이 프로필, 하이라이트, 링크에서 설득되는 구조가 필요합니다.",
        ],
      },
      {
        heading: "반복 가능한 포맷이 성장을 만듭니다",
        body: [
          "한 번 터지는 콘텐츠보다 매주 반복할 수 있는 포맷을 갖는 편이 운영에 유리합니다. 고객 질문 답변, 전후 비교, 실패 사례, 체크리스트형 콘텐츠는 업종을 가리지 않고 테스트하기 좋습니다.",
          "포맷이 정해지면 촬영과 디자인 리소스를 예측할 수 있어 운영대행사와 내부 담당자의 작업도 쉬워집니다.",
        ],
      },
      {
        heading: "첫 3초는 고객의 고민으로 시작합니다",
        body: [
          "브랜드 자랑으로 시작하는 릴스는 이탈이 빠릅니다. 고객이 이미 겪는 불편, 질문, 오해를 먼저 말해야 시청 지속 시간이 늘어납니다.",
          "후킹 문구는 과장보다 정확성이 중요합니다. 실제 서비스를 구매할 고객이 반응하는 표현을 찾아야 합니다.",
        ],
      },
    ],
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getPostUrl(post: BlogPost) {
  return absoluteUrl(`/blog/${post.slug}`);
}
