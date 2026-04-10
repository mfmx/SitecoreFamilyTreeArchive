import { renderingNames } from '@/lib/sitecore/constants/renderings';

export const renderingManifest = [
  {
    name: renderingNames.hero,
    datasourceTemplate: 'FamilyTreeArchive/Hero',
    placeholders: [],
  },
  {
    name: renderingNames.searchExperience,
    datasourceTemplate: 'FamilyTreeArchive/Search Experience',
    placeholders: [],
  },
  {
    name: renderingNames.featuredSearches,
    datasourceTemplate: 'FamilyTreeArchive/Featured Searches',
    placeholders: [],
  },
  {
    name: renderingNames.valueProps,
    datasourceTemplate: 'FamilyTreeArchive/Value Props',
    placeholders: [],
  },
  {
    name: renderingNames.personProfile,
    datasourceTemplate: 'FamilyTreeArchive/Person Profile Section',
    placeholders: [],
  },
  {
    name: renderingNames.familyTreeSection,
    datasourceTemplate: 'FamilyTreeArchive/Family Tree Section',
    placeholders: [],
  },
] as const;
