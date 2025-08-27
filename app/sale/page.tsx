"use client";

import CattlerFeatures from "@/components/cattler-features";
import Component from "@/components/pricing/feeder-pricing";
import CattlerLandingSale from "@/components/cattler-landing-sale";

export default function SalePage() {
  return (
    <div className="min-h-screen">
      <CattlerLandingSale />
      {/* Cattler Features Section */}

      <CattlerFeatures />

      {/* Feeder Pricing Section */}
      <Component />
    </div>
  );
}
