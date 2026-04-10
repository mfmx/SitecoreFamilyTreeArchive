import { SitecoreLayoutData } from '@/lib/sitecore/types';

export function hasResolvedRoute(layoutData: SitecoreLayoutData): boolean {
  return Boolean(layoutData.sitecore.route);
}

export function isEditingMode(layoutData: SitecoreLayoutData): boolean {
  return layoutData.sitecore.context.pageEditing;
}
