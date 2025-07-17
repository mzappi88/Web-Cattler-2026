import { CountryDetectionTest } from "@/components/country-detection-test";

export default function CountryTestPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Country Detection Test
      </h1>
      <CountryDetectionTest />

      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Debugging Instructions:</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>Open browser console (F12) to see detailed logs</li>
          <li>Click "Log Cache Info" to see current localStorage values</li>
          <li>
            Click "Limpiar Cache y Redetectar País" to force fresh detection
          </li>
          <li>
            Check console for "🌍" prefixed logs showing detection process
          </li>
          <li>
            If you're in the US but getting OT-EN, check the API response logs
          </li>
        </ol>
      </div>
    </div>
  );
}
