import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen w-screen items-center justify-center bg-dark-black text-white">
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 border-2 border-logo w-[90%] h-[90%] rounded-bl-[120px] rounded-tr-[120px]"></div>
      <div className="space-y-6 text-center relative z-20 sm:px-0 px-10">
        <div className="space-x-4 sm:mt-0 mt-4">
          <Link
            href={"/"}
            className="bg-logo hover:bg-logo-hover cursor-pointer inline-flex h-10 items-center justify-center gap-2 rounded-xs px-6 text-base font-medium text-white capitalize transition-colors rounded-bl-[20px] rounded-tr-[20px]"
          >
            Home
          </Link>
          <Link
            href={"/auth/login"}
            className="inline-flex cursor-pointer h-10 items-center justify-center rounded-xs bg-white px-8 text-base font-medium text-black/80 capitalize transition-colors hover:bg-white/80 rounded-bl-[20px] rounded-tr-[20px]"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
