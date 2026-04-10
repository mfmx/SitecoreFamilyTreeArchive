export const sitecoreConfig = {
  siteName: process.env.SITECORE_SITE_NAME ?? 'family-tree-archive',
  defaultLanguage: process.env.SITECORE_DEFAULT_LANGUAGE ?? 'en',
  defaultRoute: process.env.SITECORE_DEFAULT_ROUTE ?? '/',
  layoutServiceUrl: process.env.SITECORE_LAYOUT_SERVICE_URL ?? '',
  apiKey: process.env.SITECORE_API_KEY ?? '',
  useMockLayout: process.env.SITECORE_MOCK_LAYOUT !== 'false',
  enableEditing: process.env.SITECORE_ENABLE_EDITING === 'true',
} as const;
