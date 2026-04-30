"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <div className="dot-pattern min-h-screen flex flex-col items-center justify-center gap-[24px] px-[24px] text-center">
      <h1 className="text-[32px] font-medium text-[#0e0e16] leading-[1.2]">
        Something went wrong
      </h1>
      <p className="text-[16px] text-[#606060] max-w-[400px] leading-[1.6]">
        An unexpected error occurred. Please try again, or return to the homepage.
      </p>
      <div className="flex gap-[12px] flex-wrap justify-center">
        <button
          onClick={reset}
          className="h-[48px] px-[24px] rounded-[12px] text-white text-[16px] font-semibold"
          style={{ background: "#54b4e0", border: "1px solid #58a6ca" }}
        >
          Try again
        </button>
        <Link
          href="/"
          className="h-[48px] px-[24px] rounded-[12px] text-[#414651] text-[16px] font-semibold flex items-center"
          style={{ background: "#ffffff", border: "1px solid #cacaca" }}
        >
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
