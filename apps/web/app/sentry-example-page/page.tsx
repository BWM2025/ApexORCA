"use client";

export default function SentryExamplePage() {
  const triggerError = () => {
    throw new Error("Sentry test error — if you see this in Sentry Issues, setup is done.");
  };
  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Sentry test</h1>
      <button onClick={triggerError} className="px-4 py-2 bg-red-600 text-white rounded">
        Trigger test error
      </button>
    </div>
  );
}
