import { componentFactory } from '@/temp/componentFactory';
import { RenderingComponentProps } from '@/lib/sitecore/rendering-props';
import { SitecoreRendering } from '@/lib/sitecore/types';

type PlaceholderProps = Omit<RenderingComponentProps, 'rendering'> & {
  name: string;
  renderings?: SitecoreRendering[];
};

export function Placeholder({ name, renderings, ...sharedProps }: PlaceholderProps) {
  if (!renderings || renderings.length === 0) {
    return null;
  }

  return (
    <>
      {renderings.map((rendering) => {
        const Component = componentFactory[rendering.componentName as keyof typeof componentFactory] as any;

        if (!Component) {
          return (
            <section key={rendering.uid} className="rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
              Unknown rendering: <strong>{rendering.componentName}</strong> in placeholder <strong>{name}</strong>
            </section>
          );
        }

        return <Component key={rendering.uid} rendering={rendering} {...sharedProps} />;
      })}
    </>
  );
}
