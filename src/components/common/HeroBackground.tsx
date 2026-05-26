import Image from "next/image";
import { ReactNode } from "react";

type HeroBackgroundProps = {
  children: ReactNode;
  className?: string;
};

const HeroBackground = ({ children, className = "" }: HeroBackgroundProps) => {
  return (
    <div
      className={`relative w-full h-full  rounded-[8px] bg-primary text-white overflow-hidden ${className}`}
      style={{ width: "100%" }}
    >
      <div
        className="absolute rotate-90 opacity-100 -right-10 -top-10 transform rotate-90"
        style={{ width: 350, height: 330 }}
      >
        <Image
          src="/assets/images/radial2.png"
          alt="Radial texture top right"
          fill
          className="object-cover"
          sizes="350px"
          priority
        />
      </div>

      <div
        className="absolute -rotate-90 opacity-100 -left-10 bottom-0 transform -rotate-90"
        style={{ width: 350, height: 330 }}
      >
        <Image
          src="/assets/images/radial2.png"
          alt="Radial texture bottom left"
          fill
          className="object-cover"
          sizes="350px"
          priority
        />
      </div>

      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
};

export default HeroBackground;
