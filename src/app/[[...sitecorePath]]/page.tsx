import { notFound } from 'next/navigation';
import { RouteRenderer } from '@/components/sitecore/RouteRenderer';
import { resolveRoutePath } from '@/lib/sitecore/route-path';
import { getLayoutData } from '@/lib/sitecore/layout-service';

type PageProps = {
  params: Promise<{ sitecorePath?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SitecoreRoutePage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;
  const routePath = resolveRoutePath(resolvedParams.sitecorePath);
  const layoutData = await getLayoutData(routePath);

  if (!layoutData?.sitecore?.route) {
    notFound();
  }

  return <RouteRenderer layoutData={layoutData} routePath={routePath} searchParams={resolvedSearch} />;
}
