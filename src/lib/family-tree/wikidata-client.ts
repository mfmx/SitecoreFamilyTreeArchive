import { FamilyConnection, FamilyRelation, PersonDetail, PersonSummary } from '@/lib/family-tree/types';

const USER_AGENT = 'FamilyTreeArchiveXMCloud/2.0 (Next.js solution)';
const ACTION_API_URL = 'https://www.wikidata.org/w/api.php';
const SPARQL_URL = 'https://query.wikidata.org/sparql';
const FAMILY_PROPERTIES = ['P22', 'P25', 'P26', 'P40'] as const;

type WikidataSearchResponse = {
  search?: Array<{
    id: string;
    label: string;
  }>;
};

type EntityResponse = {
  entities: Record<string, WikidataEntity | undefined>;
};

type WikidataEntity = {
  id: string;
  labels?: Record<string, { value: string }>;
  descriptions?: Record<string, { value: string }>;
  sitelinks?: Record<string, { title: string }>;
  claims?: Record<string, WikidataClaim[]>;
};

type WikidataClaim = {
  mainsnak?: {
    datavalue?: {
      value?: string | { id?: string; time?: string };
    };
  };
};

type SparqlBinding = {
  person: { value: string };
  personLabel?: { value: string };
  personDescription?: { value: string };
  relationLabel?: { value: string };
  dob?: { value: string };
  dod?: { value: string };
  image?: { value: string };
};

type SparqlResponse = {
  results?: { bindings?: SparqlBinding[] };
};

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'User-Agent': USER_AGENT,
    },
    next: { revalidate: 60 * 60 * 6 },
  } as RequestInit & { next?: { revalidate: number } });

  if (!response.ok) {
    throw new Error(`Wikidata request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function extractStringClaim(entity: WikidataEntity, property: string): string | null {
  const claim = entity.claims?.[property]?.[0]?.mainsnak?.datavalue?.value;

  if (!claim) return null;
  if (typeof claim === 'string') return claim;
  if ('time' in claim && typeof claim.time === 'string') return claim.time;
  return null;
}

function extractEntityIds(entity: WikidataEntity, property: string): string[] {
  const claims = entity.claims?.[property] ?? [];

  return claims
    .map((claim) => claim.mainsnak?.datavalue?.value)
    .filter((value): value is { id?: string } => Boolean(value) && typeof value !== 'string')
    .map((value) => value.id)
    .filter((value): value is string => Boolean(value));
}

function buildCommonsImageUrl(fileName?: string | null): string | null {
  if (!fileName) return null;
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=720`;
}

function parseYear(value?: string | null): string | null {
  if (!value) return null;
  const normalized = value.replace(/^\+/, '');
  const match = normalized.match(/(\d{1,4})/);
  return match?.[1] ?? null;
}

function getBestLabel(entity: WikidataEntity): string {
  return entity.labels?.en?.value ?? entity.labels?.mul?.value ?? entity.id;
}

function getBestDescription(entity: WikidataEntity): string | undefined {
  return entity.descriptions?.en?.value ?? entity.descriptions?.mul?.value;
}

function getWikipediaUrl(entity: WikidataEntity): string | null {
  const title = entity.sitelinks?.enwiki?.title;
  if (!title) return null;
  return `https://en.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, '_'))}`;
}

async function getEntities(ids: string[]): Promise<Record<string, WikidataEntity | undefined>> {
  if (ids.length === 0) return {};
  const url = `${ACTION_API_URL}?action=wbgetentities&ids=${ids.join('|')}&languages=en&format=json&origin=*`;
  const data = await fetchJson<EntityResponse>(url);
  return data.entities;
}

function getRelationshipCount(entity: WikidataEntity): number {
  return FAMILY_PROPERTIES.reduce((count, property) => count + extractEntityIds(entity, property).length, 0);
}

function hasRelationships(entity: WikidataEntity): boolean {
  return getRelationshipCount(entity) > 0;
}

export async function searchPeopleWithRelationships(query: string): Promise<PersonSummary[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const searchUrl = `${ACTION_API_URL}?action=wbsearchentities&search=${encodeURIComponent(trimmed)}&language=en&limit=18&format=json&type=item&origin=*`;
  const searchData = await fetchJson<WikidataSearchResponse>(searchUrl);
  const ids = (searchData.search ?? []).map((item) => item.id);
  const entities = await getEntities(ids);

  return ids
    .map((id) => entities[id])
    .filter((entity): entity is WikidataEntity => Boolean(entity))
    .filter(hasRelationships)
    .map((entity) => ({
      id: entity.id,
      name: getBestLabel(entity),
      description: getBestDescription(entity),
      imageUrl: buildCommonsImageUrl(extractStringClaim(entity, 'P18')),
      birthYear: parseYear(extractStringClaim(entity, 'P569')),
      deathYear: parseYear(extractStringClaim(entity, 'P570')),
      relationshipCount: getRelationshipCount(entity),
    }))
    .slice(0, 12);
}

async function getFamilyBindings(id: string): Promise<SparqlBinding[]> {
  const query = `
    SELECT ?person ?personLabel ?personDescription ?relationLabel ?dob ?dod ?image WHERE {
      { wd:${id} wdt:P22 ?person . BIND("father" AS ?relationLabel) }
      UNION
      { wd:${id} wdt:P25 ?person . BIND("mother" AS ?relationLabel) }
      UNION
      { wd:${id} wdt:P26 ?person . BIND("spouse" AS ?relationLabel) }
      UNION
      { wd:${id} wdt:P40 ?person . BIND("child" AS ?relationLabel) }
      OPTIONAL { ?person wdt:P569 ?dob. }
      OPTIONAL { ?person wdt:P570 ?dod. }
      OPTIONAL { ?person wdt:P18 ?image. }
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
    }
    LIMIT 50
  `;

  const url = `${SPARQL_URL}?format=json&query=${encodeURIComponent(query)}`;
  const data = await fetchJson<SparqlResponse>(url);
  return data.results?.bindings ?? [];
}

function relationPriority(relation: FamilyRelation): number {
  switch (relation) {
    case 'father': return 0;
    case 'mother': return 1;
    case 'spouse': return 2;
    case 'child': return 3;
    default: return 99;
  }
}

function normalizeRelation(value?: string): FamilyRelation | null {
  if (value === 'father' || value === 'mother' || value === 'spouse' || value === 'child') return value;
  return null;
}

export async function getPersonDetail(id: string): Promise<PersonDetail | null> {
  const entities = await getEntities([id]);
  const entity = entities[id];
  if (!entity || !hasRelationships(entity)) return null;

  const relationIds = FAMILY_PROPERTIES.flatMap((property) => extractEntityIds(entity, property));
  const linkedEntities = await getEntities(Array.from(new Set(relationIds)));
  const bindings = await getFamilyBindings(id).catch(() => []);
  const familyMap = new Map<string, FamilyConnection>();

  const pushEntity = (targetId: string, relation: FamilyRelation) => {
    const target = linkedEntities[targetId];
    if (!target) return;

    familyMap.set(targetId, {
      id: targetId,
      name: getBestLabel(target),
      relation,
      description: getBestDescription(target),
      imageUrl: buildCommonsImageUrl(extractStringClaim(target, 'P18')),
      birthYear: parseYear(extractStringClaim(target, 'P569')),
      deathYear: parseYear(extractStringClaim(target, 'P570')),
    });
  };

  extractEntityIds(entity, 'P22').forEach((targetId) => pushEntity(targetId, 'father'));
  extractEntityIds(entity, 'P25').forEach((targetId) => pushEntity(targetId, 'mother'));
  extractEntityIds(entity, 'P26').forEach((targetId) => pushEntity(targetId, 'spouse'));
  extractEntityIds(entity, 'P40').forEach((targetId) => pushEntity(targetId, 'child'));

  for (const binding of bindings) {
    const bindingId = binding.person.value.split('/').pop();
    const relation = normalizeRelation(binding.relationLabel?.value);
    if (!bindingId || !relation || familyMap.has(bindingId)) continue;

    familyMap.set(bindingId, {
      id: bindingId,
      name: binding.personLabel?.value ?? bindingId,
      relation,
      description: binding.personDescription?.value,
      imageUrl: binding.image?.value ?? null,
      birthYear: parseYear(binding.dob?.value),
      deathYear: parseYear(binding.dod?.value),
    });
  }

  const family = Array.from(familyMap.values()).sort((a, b) => {
    const relationDiff = relationPriority(a.relation) - relationPriority(b.relation);
    return relationDiff !== 0 ? relationDiff : a.name.localeCompare(b.name);
  });

  return {
    id,
    name: getBestLabel(entity),
    description: getBestDescription(entity),
    fullBio: getBestDescription(entity),
    imageUrl: buildCommonsImageUrl(extractStringClaim(entity, 'P18')),
    birthYear: parseYear(extractStringClaim(entity, 'P569')),
    deathYear: parseYear(extractStringClaim(entity, 'P570')),
    wikipediaUrl: getWikipediaUrl(entity),
    family,
    relationshipCount: family.length,
  };
}

export function getLifeSpanLabel(person: Pick<PersonSummary, 'birthYear' | 'deathYear'>): string {
  if (!person.birthYear && !person.deathYear) return 'Dates unavailable';
  return `${person.birthYear ?? 'Unknown'} – ${person.deathYear ?? 'Present'}`;
}
