import NotFoundRive from "@/components/notfoundRive";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-mint/10 via-mint/60 to-soft-turquoise/40 text-gray-800 overflow-hidden">
      <div className="relative z-10 flex flex-col items-center justify-center gap-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">

        <section className="relative w-full max-w-lg mx-auto -mt-10">
          <div className="relative h-[300px] sm:h-[400px] w-full">
            <NotFoundRive />
          </div>
        </section>

        <article className="space-y-6 max-w-2xl mx-auto">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-deep-teal leading-tight">
              Sayfa Bulunamadı
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed px-4">
              Aradığınız sayfa mevcut değil veya başka bir adrese taşınmış olabilir.
              Ana sayfaya dönebilir veya giriş yapabilirsiniz.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href={"/"}
              className="group relative w-full sm:w-auto bg-gradient-to-r from-aqua-green to-teal hover:from-teal hover:to-deep-teal transform hover:scale-105 transition-all duration-300 ease-out shadow-lg hover:shadow-xl inline-flex h-12 items-center justify-center gap-2 rounded-xl px-8 sm:px-10 text-sm sm:text-base font-semibold text-white capitalize"
            >
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Ana Sayfa
            </Link>

            <Link
              href={"/auth/login"}
              className="group relative w-full sm:w-auto border-2 border-aqua-green/30 hover:border-aqua-green bg-white/80 hover:bg-aqua-green hover:text-white transform hover:scale-105 transition-all duration-300 ease-out shadow-md hover:shadow-lg inline-flex h-12 items-center justify-center gap-2 rounded-xl px-8 sm:px-10 text-sm sm:text-base font-semibold text-deep-teal capitalize backdrop-blur-sm"
            >
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Giriş Yap
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
