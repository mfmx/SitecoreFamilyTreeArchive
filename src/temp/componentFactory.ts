import { Hero } from '@/components/renderings/Hero';
import { SearchExperience } from '@/components/renderings/SearchExperience';
import { FeaturedSearches } from '@/components/renderings/FeaturedSearches';
import { ValueProps } from '@/components/renderings/ValueProps';
import { PersonProfile } from '@/components/renderings/PersonProfile';
import { FamilyTreeSection } from '@/components/renderings/FamilyTreeSection';

export const componentFactory = {
  Hero,
  SearchExperience,
  FeaturedSearches,
  ValueProps,
  PersonProfile,
  FamilyTreeSection,
};

export type RegisteredComponentName = keyof typeof componentFactory;
