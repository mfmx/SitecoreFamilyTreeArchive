import Link from 'next/link';
import { RenderingComponentProps } from '@/lib/sitecore/rendering-props';

export function Hero({ rendering }: RenderingComponentProps) {
  const eyebrow = String(rendering.fields?.eyebrow ?? 'Family Tree Archive');
  const title = String(rendering.fields?.title ?? 'Explore the archive');
  const body = String(rendering.fields?.body ?? 'Discover family relationships.');
  const primaryCtaLabel = String(rendering.fields?.primaryCtaLabel ?? 'Search');
  const primaryCtaHref = String(rendering.fields?.primaryCtaHref ?? '#archive-search');

  return (
    <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft">
      <div className="bg-hero-grid bg-hero-grid px-6 py-16 md:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-indigo-600">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-slate-950 md:text-5xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600">{body}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={primaryCtaHref} className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white">
            {primaryCtaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
