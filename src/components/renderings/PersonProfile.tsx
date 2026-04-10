import Image from 'next/image';
import Link from 'next/link';
import { RenderingComponentProps } from '@/lib/sitecore/rendering-props';
import { getLifeSpanLabel } from '@/lib/family-tree/wikidata-client';

export function PersonProfile({ rendering, person }: RenderingComponentProps) {
  if (!person) {
    return null;
  }

  const showBackLink = Boolean(rendering.fields?.showBackLink);
  const backLabel = String(rendering.fields?.backLabel ?? 'Back');
  const backHref = String(rendering.fields?.backHref ?? '/');
  const title = String(rendering.fields?.title ?? 'Profile');

  const parentsCount = person.family.filter((item) => item.relation === 'father' || item.relation === 'mother').length;
  const spouseCount = person.family.filter((item) => item.relation === 'spouse').length;
  const childrenCount = person.family.filter((item) => item.relation === 'child').length;

  return (
    <section className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
      <aside className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft">
        {showBackLink ? (
          <Link href={backHref} className="text-sm font-semibold text-slate-600 underline-offset-4 hover:underline">
            ← {backLabel}
          </Link>
        ) : null}

        <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-100">
          {person.imageUrl ? (
            <div className="relative aspect-[4/5]">
              <Image src={person.imageUrl} alt={person.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 360px" />
            </div>
          ) : (
            <div className="flex aspect-[4/5] items-center justify-center text-sm font-medium text-slate-500">Portrait unavailable</div>
          )}
        </div>

        <p className="mt-5 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">{title}</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-950">{person.name}</h2>
        <p className="mt-2 text-sm text-slate-500">{getLifeSpanLabel(person)}</p>
        <p className="mt-4 text-sm leading-6 text-slate-600">{person.description ?? 'No summary description is available.'}</p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-slate-200 p-4 text-center">
            <div className="text-2xl font-semibold text-slate-950">{parentsCount}</div>
            <div className="text-xs  tracking-[0.18em] text-slate-500">Parents</div>
          </div>
          <div className="rounded-2xl border border-slate-200 p-4 text-center">
            <div className="text-2xl font-semibold text-slate-950">{spouseCount}</div>
            <div className="text-xs  tracking-[0.18em] text-slate-500">Spouses</div>
          </div>
          <div className="rounded-2xl border border-slate-200 p-4 text-center">
            <div className="text-2xl font-semibold text-slate-950">{childrenCount}</div>
            <div className="text-xs  tracking-[0.18em] text-slate-500">Children</div>
          </div>
        </div>
      </aside>

      <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Archive overview</p>
        <h3 className="mt-2 text-2xl font-semibold text-slate-950">A relationship-led record built for exploration.</h3>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
          This page focuses on immediate family so the tree remains readable. The person record is only shown when Wikidata contains at least one parent, spouse, or child relationship.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Record ID</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{person.id}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Relationship count</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{person.relationshipCount}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">External reference</p>
            {person.wikipediaUrl ? (
              <a href={person.wikipediaUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex text-lg font-semibold text-slate-900 underline-offset-4 hover:underline">
                Wikipedia
              </a>
            ) : (
              <p className="mt-2 text-lg font-semibold text-slate-400">Unavailable</p>
            )}
          </div>
        </div>
      </section>
    </section>
  );
}
