import { FamilyTree } from '@/components/renderings/FamilyTree';
import { RenderingComponentProps } from '@/lib/sitecore/rendering-props';

export function FamilyTreeSection({ rendering, person }: RenderingComponentProps) {
  if (!person) return null;

  const title = String(rendering.fields?.title ?? 'Family tree');
  const body = String(rendering.fields?.body ?? 'Immediate family grouped for readability.');

  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft">
      <h2 className="text-2xl font-semibold text-slate-950">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{body}</p>
      <div className="mt-6">
        <FamilyTree person={person} />
      </div>
    </section>
  );
}
