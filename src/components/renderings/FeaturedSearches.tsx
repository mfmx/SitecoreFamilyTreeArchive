import Link from 'next/link';
import { RenderingComponentProps } from '@/lib/sitecore/rendering-props';

export function FeaturedSearches({ rendering }: RenderingComponentProps) {
  const title = String(rendering.fields?.title ?? 'Featured searches');
  const values = String(rendering.fields?.values ?? '')
    .split('|')
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <div className="mt-4 flex flex-wrap gap-3">
        {values.map((value) => (
          <Link
            key={value}
            href={`/?q=${encodeURIComponent(value)}`}
            className="rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-100"
          >
            {value}
          </Link>
        ))}
      </div>
    </section>
  );
}
