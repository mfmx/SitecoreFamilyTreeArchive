import { notFound } from 'next/navigation';
import { Placeholder } from '@/components/sitecore/Placeholder';
import { resolvePageData } from '@/lib/sitecore/page-data';
import { SitecoreLayoutData } from '@/lib/sitecore/types';

type RouteRendererProps = {
  layoutData: SitecoreLayoutData;
  routePath: string;
  searchParams: Record<string, string | string[] | undefined>;
};

export async function RouteRenderer({ layoutData, routePath, searchParams }: RouteRendererProps) {
  const route = layoutData.sitecore.route;
  if (!route) notFound();
  const resolvedRoute = route;

  const pageData = await resolvePageData(routePath, searchParams);

  if (routePath.startsWith('/archive/person/') && !pageData.person) {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-6 md:px-6 md:py-8">
      <header className="rounded-3xl border border-slate-200 bg-white/85 px-6 py-5 shadow-soft backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{layoutData.sitecore.context.site.name}</p>
      </header>

      <Placeholder
        name="jss-main"
        renderings={resolvedRoute.placeholders['jss-main']}
        layoutData={layoutData}
        routeFields={resolvedRoute.fields}
        routePath={routePath}
        searchParams={searchParams}
        person={pageData.person}
        results={pageData.results}
      />
    </main>
  );
}
