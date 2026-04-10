# Enterprise-oriented architecture notes

This version keeps the app runnable in mock mode while organizing it more like a real Sitecore XM Cloud rendering host.

## Layers

- `src/app`: Next.js App Router entrypoints, API routes, route shell
- `src/components/renderings`: Sitecore renderings mapped by component name
- `src/components/sitecore`: rendering host primitives such as placeholders and route rendering
- `src/lib/sitecore`: Sitecore-specific configuration, models, services, route resolution, rendering definitions
- `src/lib/family-tree`: external datasource integration and family tree domain models
- `sitecore/serialization`: starter YAML stubs that show how content/templates could be represented in a real XM Cloud solution

## Runtime modes

### Mock mode
The app uses a local layout payload from `mock-layout-service.ts`. This allows the rendering host to run without Sitecore credentials.

### Connected mode
Set `SITECORE_MOCK_LAYOUT=false` and point `SITECORE_LAYOUT_SERVICE_URL` to a real Sitecore layout service endpoint.

## Search constraint

Search results intentionally include only people with at least one immediate family relationship documented in Wikidata:
- father
- mother
- spouse
- child

This keeps the archive focused and ensures every result leads to a meaningful family-tree view.
