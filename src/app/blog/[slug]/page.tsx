import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TrackedLink } from "@/components/TrackedLink";
import { getPostBySlug, getPostUrl, posts } from "@/content/posts";
import { articleSchema } from "@/lib/schema";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: getPostUrl(post),
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="blogShell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema(post)) }}
      />

      <article>
        <header className="articleHeader">
          <div className="container narrow">
            <Link href="/blog" className="backLink">
              블로그 목록
            </Link>
            <p className="eyebrow eyebrowOnDark">{post.category}</p>
            <h1>{post.title}</h1>
            <p className="pageLead">{post.description}</p>
            <div className="articleMeta">
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span>{post.readingMinutes}분 읽기</span>
            </div>
          </div>
        </header>

        <section className="articleBodySection">
          <div className="container articleGrid">
            <aside className="articleAside">
              <div className="articleBadge">{post.heroLabel}</div>
              <p>인스타그램 운영 구조와 전환 설계를 함께 고민하는 브랜드를 위한 글</p>
            </aside>

            <div className="articleBody">
              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="articleCta">
          <div className="container narrow">
            <p className="eyebrow eyebrowOnDark">Next step</p>
            <h2>우리 계정은 어디부터 바꿔야 할지 바로 확인해 보세요</h2>
            <p>
              프로필, 콘텐츠 운영 리듬, 전환 이벤트 중 어떤 순서로 정리해야 할지
              무료 진단으로 안내드립니다.
            </p>
            <TrackedLink
              href="/#consult"
              eventName="blog_cta_click"
              className="primaryButton"
            >
              무료 진단 신청
            </TrackedLink>
          </div>
        </section>
      </article>
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
