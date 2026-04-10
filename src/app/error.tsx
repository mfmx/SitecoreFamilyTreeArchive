'use client';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-6 py-24">
      <div className="w-full rounded-3xl border border-rose-200 bg-white p-8 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-rose-500">Application error</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">We couldn’t render this archive route.</h1>
        <p className="mt-4 text-base text-slate-600">
          The layout service, family endpoint, or external data source may have failed. Try the route again.
        </p>
        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white"
          >
            Retry route
          </button>
          <a href="/" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700">
            Back to archive
          </a>
        </div>
      </div>
    </main>
  );
}
