import { Suspense } from 'react';

async function HealthData() {
  let data = null;
  let status = "Unknown";
  let error = null;

  try {
    // Fetches dummy data on the server side from a reliable public API
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
      cache: "no-store", 
    });
    if (res.ok) {
      data = await res.json();
      status = "Healthy";
    } else {
      status = `Error (HTTP ${res.status})`;
    }
  } catch (err: any) {
    status = "Unhealthy";
    error = err.message || String(err);
  }

  return (
    <>
      <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          System Health Check
        </h2>
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
            status === "Healthy"
              ? "bg-green-150 text-green-800 dark:bg-green-950/40 dark:text-green-400 border border-green-200 dark:border-green-900/50"
              : "bg-red-150 text-red-800 dark:bg-red-950/40 dark:text-red-400 border border-red-200 dark:border-red-900/50"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="mt-6 space-y-5">
        <div>
          <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            API Connection Status
          </h4>
          <p className="mt-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
            {status === "Healthy" ? "Successful connection to JSONPlaceholder API." : "Failed to establish a network handshake."}
          </p>
        </div>

          {data && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Fetched Data Payload
              </h4>
              <pre className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl text-xs font-mono overflow-auto max-h-48 border border-slate-150 dark:border-slate-900 text-slate-800 dark:text-slate-300">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}

        {error && (
          <div>
            <h4 className="text-xs font-bold text-red-450 uppercase tracking-wider">
              Error Details
            </h4>
            <p className="mt-1.5 text-sm font-medium text-red-500">{error}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default function HealthPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-xl mx-auto py-8">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-md">
        <Suspense fallback={<div className="animate-pulse flex space-x-4"><div className="flex-1 space-y-6 py-1"><div className="h-4 bg-slate-200 rounded"></div><div className="space-y-3"><div className="grid grid-cols-3 gap-4"><div className="h-2 bg-slate-200 rounded col-span-2"></div></div></div></div></div>}>
          <HealthData />
        </Suspense>
      </div>
    </div>
  );
}
