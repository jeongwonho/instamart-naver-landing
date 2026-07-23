import Link from "next/link";

export default function NotFound() {
  return (
    <main className="notFound">
      <p className="eyebrow">404</p>
      <h1>페이지를 찾을 수 없습니다</h1>
      <p>요청하신 주소가 변경되었거나 아직 공개되지 않았습니다.</p>
      <Link href="/" className="primaryButton">
        홈으로 이동
      </Link>
    </main>
  );
}
