export type FieldValue = string | number | boolean | null | undefined;

export type SitecoreRouteFields = Record<string, FieldValue>;
export type SitecoreRenderingFields = Record<string, FieldValue>;

export type SitecoreRendering = {
  uid: string;
  componentName: string;
  fields?: SitecoreRenderingFields;
  params?: Record<string, string>;
  placeholders?: Record<string, SitecoreRendering[]>;
};

export type SitecoreRoute = {
  path: string;
  name: string;
  displayName: string;
  itemId: string;
  fields?: SitecoreRouteFields;
  placeholders: Record<string, SitecoreRendering[]>;
};

export type SitecoreLayoutData = {
  sitecore: {
    context: {
      pageEditing: boolean;
      routePath: string;
      site: { name: string };
    };
    route: SitecoreRoute | null;
  };
};
