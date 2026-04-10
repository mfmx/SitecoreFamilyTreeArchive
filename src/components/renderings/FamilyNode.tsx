import Link from 'next/link';
import { FamilyConnection } from '@/lib/family-tree/types';
import { getLifeSpanLabel } from '@/lib/family-tree/wikidata-client';

type FamilyNodePerson = Pick<FamilyConnection, 'id' | 'name' | 'description' | 'birthYear' | 'deathYear'> & { relation: string };

export function FamilyNode({ person, emphasis = false }: { person: FamilyNodePerson; emphasis?: boolean; }) {
  return (
    <article className={`rounded-3xl border p-4 ${emphasis ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-900'}`}>
      <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${emphasis ? 'text-slate-300' : 'text-slate-500'}`}>{person.relation}</p>
      <h3 className="mt-2 text-lg font-semibold">{person.name}</h3>
      <p className={`mt-1 text-sm ${emphasis ? 'text-slate-300' : 'text-slate-500'}`}>{getLifeSpanLabel(person)}</p>
      <p className={`mt-3 line-clamp-2 text-sm leading-6 ${emphasis ? 'text-slate-200' : 'text-slate-600'}`}>
        {person.description ?? 'No description is available for this relationship.'}
      </p>
      {!emphasis ? (
        <Link href={`/archive/person/${person.id}`} className="mt-4 inline-flex text-sm font-semibold underline-offset-4 hover:underline">
          View related record
        </Link>
      ) : null}
    </article>
  );
}
