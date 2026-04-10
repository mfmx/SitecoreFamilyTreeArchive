import { PersonDetail, PersonSummary } from '@/lib/family-tree/types';
import { SitecoreLayoutData, SitecoreRendering } from '@/lib/sitecore/types';

export type RenderingComponentProps = {
  rendering: SitecoreRendering;
  routeFields?: Record<string, unknown>;
  routePath: string;
  searchParams: Record<string, string | string[] | undefined>;
  layoutData: SitecoreLayoutData;
  person?: PersonDetail | null;
  results?: PersonSummary[];
};
