import { getPersonDetail, searchPeopleWithRelationships } from '@/lib/family-tree/wikidata-client';

export const familyTreeQueryService = {
  searchPeopleWithRelationships,
  getPersonDetail,
};
