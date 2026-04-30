export default function Loading() {
  return (
    <div className="dot-pattern min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-[16px]">
        <div
          className="w-[40px] h-[40px] rounded-full border-[3px] border-[#e0e0e0] border-t-[#54b4e0] animate-spin"
        />
        <span className="font-mono text-[13px] text-[#9a9a9a] tracking-widest">
          LOADING
        </span>
      </div>
    </div>
  );
}
