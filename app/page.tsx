import CattlerLanding from "@/components/cattler-landing";
import CattlerFeatures from "@/components/cattler-features";
import LogoCarousel from "@/components/logo-carousel";
import { CountryDetectionTest } from "@/components/country-detection-test";

export default function Home() {
  return (
    <main>
      <div className="p-4">
        <CountryDetectionTest />
      </div>
      <CattlerLanding />
      <LogoCarousel />
      <CattlerFeatures />
    </main>
  );
}
