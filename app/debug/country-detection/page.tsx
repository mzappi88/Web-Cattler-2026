import { CountryDetectionTest } from "@/components/country-detection-test";

export default function CountryDetectionDebugPage() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Country Detection Debug</h1>
      <CountryDetectionTest />
    </main>
  );
}
