import Image from 'next/image';
import Link from 'next/link';
import { PersonSummary } from '@/lib/family-tree/types';
import { getLifeSpanLabel } from '@/lib/family-tree/wikidata-client';

export function PersonCard({ person }: { person: PersonSummary }) {
  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-soft">
      <div className="relative h-56 w-full bg-slate-100">
        {person.imageUrl ? (
          <Image src={person.imageUrl} alt={person.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-medium text-slate-500">Portrait unavailable</div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Relationship record</p>
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
            {person.relationshipCount} 
          </span>
        </div>
        <h3 className="mt-3 text-xl font-semibold text-slate-900">{person.name}</h3>
        <p className="mt-1 text-sm text-slate-500">{getLifeSpanLabel(person)}</p>
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">
          {person.description ?? 'No description is available for this record.'}
        </p>
        <Link
          href={`/archive/person/${person.id}`}
          className="mt-5 inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800"
        >
          Open family record
        </Link>
      </div>
    </article>
  );
}
