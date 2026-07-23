"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { pushConversionEvent, sendCmxEvent } from "@/lib/analytics";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  eventName: "hero_cta_click" | "kakao_cta_click" | "blog_cta_click";
  children: ReactNode;
};

export function TrackedLink({
  href,
  eventName,
  children,
  onClick,
  ...props
}: TrackedLinkProps) {
  const isExternal = href.startsWith("http");

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const payload = {
      href,
      link_text: event.currentTarget.textContent?.trim().slice(0, 100) ?? "",
    };

    pushConversionEvent(eventName, payload);
    void sendCmxEvent(eventName, payload);
    onClick?.(event);
  }

  if (isExternal) {
    return (
      <a
        href={href}
        onClick={handleClick}
        target="_blank"
        rel="noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
