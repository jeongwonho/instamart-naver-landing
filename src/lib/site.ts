export const siteConfig = {
  name: "인스타마트",
  domain: process.env.NEXT_PUBLIC_SITE_URL ?? "https://insta-mart.co.kr",
  headline: "브랜드 SNS 성장 관리",
  description:
    "인스타마트는 브랜드 SNS 채널의 상태와 목표를 바탕으로 팔로워 관리, 게시물 반응 최적화, 릴스 노출 전략을 상담하는 성장 관리 서비스입니다.",
  kakaoUrl: process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL ?? "https://pf.kakao.com/_xnLYDn",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@insta-mart.co.kr",
  keywords: [
    "브랜드 SNS 성장 관리",
    "인스타그램 팔로워 관리",
    "인스타그램 게시물 반응 관리",
    "인스타그램 좋아요 관리",
    "인스타그램 릴스 노출 전략",
    "인스타그램 계정 활성화 관리",
    "메타 전문 마케팅",
    "카카오톡 상담",
    "인스타마트",
    "SNS 성장 플랫폼",
  ],
};

export const navigation = [
  { label: "관리 항목", href: "#service" },
  { label: "진행 방식", href: "#process" },
  { label: "상담 사례", href: "#cases" },
  { label: "요금 안내", href: "#pricing" },
  { label: "상담", href: "#consult" },
];

export const proofMetrics = [
  { value: "8,500+", label: "누적 상담 건수" },
  { value: "24-72h", label: "빠른 진행 안내" },
  { value: "비밀번호 불필요", label: "간편한 상담" },
  { value: "후속 관리", label: "진행 후 상태 확인" },
];

export function absoluteUrl(path = "/") {
  const base = siteConfig.domain.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${base}${normalizedPath}`;
}
