export type FamilyRelation = 'father' | 'mother' | 'spouse' | 'child';

export type PersonSummary = {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string | null;
  birthYear?: string | null;
  deathYear?: string | null;
  relationshipCount: number;
};

export type FamilyConnection = {
  id: string;
  name: string;
  relation: FamilyRelation;
  description?: string;
  imageUrl?: string | null;
  birthYear?: string | null;
  deathYear?: string | null;
};

export type PersonDetail = PersonSummary & {
  fullBio?: string;
  wikipediaUrl?: string | null;
  family: FamilyConnection[];
};
