import { PersonCard } from '@/components/renderings/PersonCard';
import { SearchBox } from '@/components/renderings/SearchBox';
import { RenderingComponentProps } from '@/lib/sitecore/rendering-props';

export function SearchExperience({ rendering, results, searchParams }: RenderingComponentProps) {
  const sectionTitle = String(rendering.fields?.sectionTitle ?? 'Search the archive');
  const sectionBody = String(rendering.fields?.sectionBody ?? 'Search notable people with known family relationships.');
  const inputLabel = String(rendering.fields?.inputLabel ?? 'Search');
  const inputPlaceholder = String(rendering.fields?.inputPlaceholder ?? 'Search for a person');
  const rawQuery = searchParams.q;
  const query = typeof rawQuery === 'string' ? rawQuery : Array.isArray(rawQuery) ? rawQuery[0] : '';
  const hasQuery = Boolean(query?.trim());

  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
      <div className="flex flex-col gap-5">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-semibold text-slate-950">{sectionTitle}</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">{sectionBody}</p>
          <div className="mt-4 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4 text-sm leading-6 text-indigo-900">
            Results are filtered to records that have at least one father, mother, spouse, or child relationship in Wikidata.
          </div>
        </div>
        <SearchBox inputLabel={inputLabel} inputPlaceholder={inputPlaceholder} />
      </div>

      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Archive results</h3>
            <p className="mt-1 text-sm text-slate-500">
              {hasQuery ? `Showing relationship records for “${query}”` : 'Run a search or use a featured starter to begin.'}
            </p>
          </div>
          <div className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            {results?.length ?? 0} records
          </div>
        </div>

        {!hasQuery ? (
          <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-sm leading-6 text-slate-600">
            Search results appear here after you submit a person name. Every result is guaranteed to have at least one family relationship to explore.
          </div>
        ) : results && results.length > 0 ? (
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {results.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-sm leading-6 text-slate-600">
            No records matched that search with documented relationships. Try a different notable person.
          </div>
        )}
      </div>
    </section>
  );
}
