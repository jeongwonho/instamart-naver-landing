import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/content/posts";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "인스타그램 성장 칼럼",
  description:
    "인스타그램 계정 성장, 게시물 반응, 릴스 노출과 프로필 운영에 대한 인스타마트 실무 칼럼입니다.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "인스타그램 성장 칼럼",
    description:
      "검색 유입과 상담 전환을 함께 고려한 인스타그램 운영 실무 칼럼입니다.",
    url: absoluteUrl("/blog"),
  },
};

export default function BlogPage() {
  return (
    <main className="blogShell">
      <section className="blogHero">
        <div className="container narrow">
          <Link href="/" className="backLink">
            인스타마트 홈
          </Link>
          <p className="eyebrow eyebrowOnDark">Column</p>
          <h1>검색 유입까지 고려한 인스타그램 운영 칼럼</h1>
          <p className="pageLead">
            광고를 꺼도 남는 유입을 만들기 위해 고객 질문과 서비스 키워드를
            콘텐츠 자산으로 쌓습니다.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container blogArchiveGrid">
          {posts.map((post) => (
            <Link className="postCard archiveCard" href={`/blog/${post.slug}`} key={post.slug}>
              <span className="postMeta">{post.category}</span>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <small>
                {formatDate(post.publishedAt)} · {post.readingMinutes}분 읽기
              </small>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}
