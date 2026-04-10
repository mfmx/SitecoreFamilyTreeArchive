import { PersonDetail, PersonSummary } from '@/lib/family-tree/types';
import { getPersonDetail, searchPeopleWithRelationships } from '@/lib/family-tree/wikidata-client';

export type ResolvedPageData = {
  person: PersonDetail | null;
  results: PersonSummary[];
};

export async function resolvePageData(
  routePath: string,
  searchParams: Record<string, string | string[] | undefined>
): Promise<ResolvedPageData> {
  let person: PersonDetail | null = null;
  let results: PersonSummary[] = [];

  const personMatch = routePath.match(/^\/archive\/person\/(Q\d+)$/i);
  if (personMatch) {
    person = await getPersonDetail(personMatch[1]);
  }

  const rawQuery = searchParams.q;
  const query = Array.isArray(rawQuery) ? rawQuery[0] : rawQuery;
  if (routePath === '/' && query?.trim()) {
    results = await searchPeopleWithRelationships(query);
  }

  return { person, results };
}
