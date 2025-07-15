import Cards from "@/components/site/cards";
import InfoCards from "@/components/site/infoCards";
import Hero from "@/components/site/hero";
import LogoCarousel from "@/components/site/logoCarousel";
import FAQ from "@/components/site/faq";
import { cookies } from "next/headers";
import Plans from "@/components/site/plans";
import MainPlans from "@/components/site/plans/mainPlans";

export const fetchPackages = async (token, locale) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const hash = process.env.NEXT_PUBLIC_GENERAl_HASH;
    const response = await fetch(`${baseUrl}/package-list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        language: locale,
        hash: hash,
        platform: "web"
      }),
    }, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.status === true) {
      return data;
    } else {
      console.error("Error loading packages:", data?.message || "Unknown error");
      return null;
    }
  } catch (error) {
    console.error("Error fetching packages:", error);
    return null;
  }
}


export default async function HomePage({ params }) {
  const { locale } = await params;
  const cookieStore = await cookies();
  const active_package = cookieStore.get('active_package')?.value;
  const token = cookieStore.get('WEEVPN_TOKEN')?.value;
  const packages = await fetchPackages(token, locale);

  return (
    <>
      <Hero />
      <LogoCarousel />
      <Cards />
      <InfoCards />
      {active_package !== 'PREMIUM' && packages && <Plans>
        <MainPlans packages={packages} />
      </Plans>}
      <FAQ />
    </>
  );
}
