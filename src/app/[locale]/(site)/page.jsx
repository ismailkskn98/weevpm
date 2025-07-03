import Cards from "@/components/site/cards";
import InfoCards from "@/components/site/infoCards";
import Hero from "@/components/site/hero";
import LogoCarousel from "@/components/site/logoCarousel";
import FAQ from "@/components/site/faq";

export default async function Home() {

  return (
    <>
      <Hero />
      <LogoCarousel />
      <Cards />
      <InfoCards />
      <FAQ />
    </>
  );
}
