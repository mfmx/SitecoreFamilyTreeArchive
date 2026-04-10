export default function Loading() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-24">
      <div className="rounded-3xl border border-slate-200 bg-white/80 px-8 py-10 text-center shadow-soft backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Loading archive</p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900">Preparing route data and family records…</h1>
      </div>
    </main>
  );
}
