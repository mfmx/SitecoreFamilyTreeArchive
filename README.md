# Sitecore Family Tree Archive - Enterprise XM Cloud Style Starter

## Project structure

```text
src/
  app/
    [[...sitecorePath]]/page.tsx
    api/
      family/
      sitecore/
  components/
    renderings/
    sitecore/
  lib/
    family-tree/
    sitecore/
  temp/
```

## How this maps to a real Sitecore XM Cloud rendering host

This starter keeps the pieces you would expect in a headless Sitecore app:

- **Route resolution** through a layout service abstraction
- **Placeholders** that render registered components by name
- **Rendering definitions** that resemble Sitecore renderings
- **Route fields** that act like authored datasource content
- **Mock mode** for local development without XM Cloud

To connect this to a real Sitecore environment, replace the mock layout mode with your XM Cloud layout service endpoint and wire the route data to Sitecore item routes and renderings.

## Search behavior

- a person only appears in results if they have at least one family relationship in Wikidata
- supported relationship properties:
  - father (`P22`)
  - mother (`P25`)
  - spouse (`P26`)
  - child (`P40`)

This makes the archive more relevant because every result is explorable.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run start
npm run typecheck
```

## Environment setup

1. Copy `.env.example` to `.env.local`
2. Leave `SITECORE_MOCK_LAYOUT=true` for local demo mode
3. To connect to Sitecore, set `SITECORE_MOCK_LAYOUT=false` and provide the layout service values

## Real Sitecore connection notes

For a production XM Cloud connection, you would normally:

- point `SITECORE_LAYOUT_SERVICE_URL` to your layout service or edge endpoint
- pass site name / API key / route path
- map real Sitecore renderings to the component registry in `src/temp/componentFactory.ts`
- replace the mock route definitions in `src/lib/sitecore/mock-layout-service.ts`
- optionally move more editable text into Sitecore fields / datasource items

## Tradeoffs

- This project is **closer to real Sitecore architecture** but is not pretending to be a fully connected XM Cloud solution without credentials.
- It keeps family data external in Wikidata instead of importing people into Sitecore items.
- It prioritizes maintainable structure and realistic rendering patterns over full Sitecore infrastructure scaffolding.

## Enterprise-oriented additions

- added `.env.example` for cleaner environment onboarding
- added `docs/architecture.md` for architecture and runtime-mode documentation
- added `sitecore/serialization` starter YAML stubs to resemble a real Sitecore solution layout
- added `src/config/sitecore.ts` for centralized environment/config access
- added Sitecore-specific constants, definitions, services, and utility layers for cleaner separation
- added a `family-tree` query service to make the datasource boundary easier to evolve
- kept the project runnable in mock mode while making the folder structure more enterprise-friendly

## Notes on realism

This solution is still intentionally honest:

- it is **not** a fully connected XM Cloud repository because there is no live Sitecore tenant, API key, or generated JSS artifacts in this environment
- it **is** closer to how a real team would organize the rendering host, configuration, rendering manifest, and Sitecore serialization stubs
