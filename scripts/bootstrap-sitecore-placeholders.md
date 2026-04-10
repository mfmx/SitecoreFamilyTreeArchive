# Suggested Sitecore bootstrap steps

1. Create a site collection / site named `family-tree-archive`.
2. Create renderings for:
   - Hero
   - SearchExperience
   - FeaturedSearches
   - ValueProps
   - PersonProfile
   - FamilyTreeSection
3. Register placeholder settings for `jss-main`.
4. Create datasource templates for route intro, hero content, featured searches, and section body text.
5. Map rendering component names to the rendering host registry in `src/temp/componentFactory.ts`.
