import type { BlogPost } from "@/content/posts";
import { absoluteUrl, siteConfig } from "@/lib/site";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    alternateName: "인스타마트.shop",
    url: siteConfig.domain,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/apple-touch-icon.png"),
      width: 180,
      height: 180,
    },
    email: siteConfig.contactEmail,
    sameAs: [siteConfig.kakaoUrl].filter((url) => url.startsWith("https://")),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    alternateName: "인스타마트.shop",
    url: siteConfig.domain,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/apple-touch-icon.png"),
        width: 180,
        height: 180,
      },
    },
  };
}

export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "브랜드 SNS 성장 관리",
    serviceType: "Instagram account growth management",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.domain,
    },
    areaServed: {
      "@type": "Country",
      name: "KR",
    },
    description: siteConfig.description,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/#consult"),
    },
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "어떤 관리 항목을 상담할 수 있나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "계정 상태와 운영 목표를 확인한 뒤 팔로워 관리, 게시물 반응 최적화, 릴스 노출 전략의 진행 범위를 안내합니다.",
        },
      },
      {
        "@type": "Question",
        name: "계정 비밀번호가 필요한가요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "계정 비밀번호를 요구하지 않습니다. 상담에는 공개된 계정 또는 게시물 주소와 현재 상태, 운영 목표가 필요합니다.",
        },
      },
      {
        "@type": "Question",
        name: "상담 후에는 어떻게 진행되나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "관리 항목과 예상 진행 시간, 후속 관리 범위를 확인한 뒤 동의한 내용에 따라 진행합니다.",
        },
      },
    ],
  };
}

export function articleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    keywords: post.keywords,
  };
}
