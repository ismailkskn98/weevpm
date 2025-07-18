import Image from "next/image";
import React from "react";
import AdvancedSphereAnimation from "./heroAnimate";

export default function HeroImage() {
  return (
    <article className="relative w-[250px] h-[280px] sm:h-[350px] lg:h-[450px] 2xl:h-[500px] 3xl:h-[550px] flex items-center justify-center perspective-1000 rounded-2xl">
      <AdvancedSphereAnimation />

      <div className="absolute inset-0 w-fit h-full hero-layer-1 rounded-2xl shadow-md">
        <Image
          src="/images/hero-image-bottom.webp"
          alt="weevpn mobile"
          width={750}
          height={600}
          className="w-full h-full object-fill object-center rounded-2xl"
        />
      </div>

      <div className="absolute inset-0 w-fit h-full hero-layer-2 rounded-2xl shadow-md">
        <div className="w-[142px] sm:w-[179px] lg:w-[230px] 3xl:w-[257px] h-full border-2 border-white/50 rounded-2xl backdrop-blur-md bg-gradient-to-br from-teal/20 via-transparent to-teal/30 flex items-center justify-center"></div>
      </div>

      <div className="relative w-fit h-full z-30 hero-layer-3 rounded-2xl shadow-md">
        <Image
          src="/images/hero-image-top.webp"
          alt="weevpn mobile"
          width={550}
          height={400}
          className="object-fill object-center w-full h-full rounded-2xl"
        />
      </div>
    </article>
  );
}
