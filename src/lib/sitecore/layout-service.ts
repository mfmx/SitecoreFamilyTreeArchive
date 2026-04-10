import { getMockLayoutData } from '@/lib/sitecore/mock-layout-service';
import { SitecoreLayoutData } from '@/lib/sitecore/types';

function isMockMode() {
  return process.env.SITECORE_MOCK_LAYOUT !== 'false';
}

export async function getLayoutData(routePath: string): Promise<SitecoreLayoutData> {
  if (isMockMode()) {
    return getMockLayoutData(routePath);
  }

  const endpoint = process.env.SITECORE_LAYOUT_SERVICE_URL;
  const siteName = process.env.SITECORE_SITE_NAME;

  if (!endpoint || !siteName) {
    throw new Error('Missing Sitecore layout service configuration.');
  }

  const url = new URL(endpoint);
  url.searchParams.set('item', routePath);
  url.searchParams.set('sc_site', siteName);
  url.searchParams.set('sc_lang', 'en');

  const apiKey = process.env.SITECORE_API_KEY;
  const response = await fetch(url.toString(), {
    headers: {
      Accept: 'application/json',
      ...(apiKey ? { 'sc_apikey': apiKey } : {}),
    },
    next: { revalidate: 60 },
  } as RequestInit & { next?: { revalidate: number } });

  if (!response.ok) {
    throw new Error(`Layout service request failed: ${response.status}`);
  }

  return response.json() as Promise<SitecoreLayoutData>;
}
