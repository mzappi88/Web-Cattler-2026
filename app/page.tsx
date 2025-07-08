import CattlerLanding from "@/components/cattler-landing";
import CattlerFeatures from "@/components/cattler-features";
import LogoCarousel from "@/components/logo-carousel";

export default function Home() {
  return (
    <main>
      <CattlerLanding />
      <LogoCarousel />
      <CattlerFeatures />
    </main>
  );
}
