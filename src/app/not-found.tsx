export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-6 py-24">
      <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Route not found</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">This Sitecore route could not be resolved.</h1>
        <p className="mt-4 text-slate-600">The route path may not exist in the mock layout service or your connected Sitecore environment.</p>
        <a href="/" className="mt-8 inline-flex rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white">
          Go to archive home
        </a>
      </div>
    </main>
  );
}
