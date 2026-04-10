import { sitecoreConfig } from '@/config/sitecore';

export function getSitecoreRequestContext(routePath: string) {
  return {
    routePath,
    siteName: sitecoreConfig.siteName,
    language: sitecoreConfig.defaultLanguage,
    editing: sitecoreConfig.enableEditing,
    useMockLayout: sitecoreConfig.useMockLayout,
  };
}
