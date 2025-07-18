import CattlerHome from "@/components/cattler-home";
import CattlerFeatures from "@/components/cattler-features";
import LogoCarousel from "@/components/logo-carousel";

export default function Home() {
  return (
    <main>
      <CattlerHome />
      <LogoCarousel />
      <CattlerFeatures />
    </main>
  );
}
