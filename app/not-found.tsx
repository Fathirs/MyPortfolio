import Link from "next/link";

export default function NotFound() {
  return (
    <div className="dot-pattern min-h-screen flex flex-col items-center justify-center gap-[24px] px-[24px] text-center">
      <span className="font-mono text-[14px] text-[#9a9a9a] tracking-widest">404</span>
      <h1 className="text-[32px] font-medium text-[#0e0e16] leading-[1.2]">
        Page not found
      </h1>
      <p className="text-[16px] text-[#606060] max-w-[360px] leading-[1.6]">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="h-[48px] px-[24px] rounded-[12px] text-white text-[16px] font-semibold flex items-center"
        style={{ background: "#54b4e0", border: "1px solid #58a6ca" }}
      >
        Back to homepage
      </Link>
    </div>
  );
}
