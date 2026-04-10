import { SitecoreLayoutData } from '@/lib/sitecore/types';

function heroRoute(routePath: string): SitecoreLayoutData {
  return {
    sitecore: {
      context: {
        pageEditing: false,
        routePath,
        site: { name: 'family-tree-archive' },
      },
      route: {
        path: '/',
        name: 'Home',
        displayName: 'Family Tree Archive Home',
        itemId: 'home-route',
        fields: {
          pageTitle: 'Family Tree Archive',
          pageIntro:
            'A Sitecore XM Cloud styled archive experience that surfaces notable people with documented family relationships from Wikidata.',
        },
        placeholders: {
          'jss-main': [
            {
              uid: 'hero-home',
              componentName: 'Hero',
              fields: {
                eyebrow: 'Sitecore XM Cloud oriented demo',
                title: 'Explore family records.',
                body:
                  'This application introduces layout-service route composition, placeholders, renderings, and a stricter archive search that only returns people who actually have family relationships to explore.',
                primaryCtaLabel: 'Search the archive',
                primaryCtaHref: '#archive-search',
              },
            },
            {
              uid: 'search-home',
              componentName: 'SearchExperience',
              fields: {
                sectionTitle: 'Search the archive',
                sectionBody:
                  'Search for a notable person.',
                inputLabel: 'Search notable people',
                inputPlaceholder: 'Try Queen Victoria, Genghis Khan, or Marie Curie',
              },
            },
            {
              uid: 'featured-home',
              componentName: 'FeaturedSearches',
              fields: {
                title: 'Quick archive starters',
                values: 'Queen Victoria|Genghis Khan|Marie Curie|Charles Darwin',
              },
            },
            {
              uid: 'value-props-home',
              componentName: 'ValueProps',
              fields: {
                title: 'About the structure',
                cardOneTitle: 'Route-driven layout',
                cardOneBody: 'The page is assembled from a route payload and placeholders instead of hard-coded page composition.',
                cardTwoTitle: 'Rendering registry',
                cardTwoBody: 'Each component is resolved through a registry similar to Sitecore rendering mapping.',
                cardThreeTitle: 'External datasource pattern',
                cardThreeBody: 'Family data still comes from Wikidata at render time, which is a common headless integration pattern.',
              },
            },
          ],
        },
      },
    },
  };
}

function personRoute(routePath: string): SitecoreLayoutData {
  return {
    sitecore: {
      context: {
        pageEditing: false,
        routePath,
        site: { name: 'family-tree-archive' },
      },
      route: {
        path: routePath,
        name: 'Person Detail',
        displayName: 'Family Tree Person Route',
        itemId: 'person-route',
        fields: {
          pageTitle: 'Family record',
          pageIntro: 'Profile, family relationships, and external references for a selected person.',
        },
        placeholders: {
          'jss-main': [
            {
              uid: 'person-profile',
              componentName: 'PersonProfile',
              fields: {
                title: 'Archive record',
                showBackLink: true,
                backLabel: 'Back to archive home',
                backHref: '/',
              },
            },
            {
              uid: 'family-tree-section',
              componentName: 'FamilyTreeSection',
              fields: {
                title: 'Family tree',
                body: 'Immediate family is grouped into parents, spouses, and children for a cleaner reading experience.',
              },
            },
          ],
        },
      },
    },
  };
}

export function getMockLayoutData(routePath: string): SitecoreLayoutData {
  if (routePath === '/') return heroRoute(routePath);
  if (/^\/archive\/person\/Q\d+$/i.test(routePath)) return personRoute(routePath);

  return {
    sitecore: {
      context: {
        pageEditing: false,
        routePath,
        site: { name: 'family-tree-archive' },
      },
      route: null,
    },
  };
}
