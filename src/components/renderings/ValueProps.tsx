import { RenderingComponentProps } from '@/lib/sitecore/rendering-props';

export function ValueProps({ rendering }: RenderingComponentProps) {
  const title = String(rendering.fields?.title ?? 'Highlights');
  const cards = [
    {
      title: String(rendering.fields?.cardOneTitle ?? 'Card one'),
      body: String(rendering.fields?.cardOneBody ?? ''),
    },
    {
      title: String(rendering.fields?.cardTwoTitle ?? 'Card two'),
      body: String(rendering.fields?.cardTwoBody ?? ''),
    },
    {
      title: String(rendering.fields?.cardThreeTitle ?? 'Card three'),
      body: String(rendering.fields?.cardThreeBody ?? ''),
    },
  ];

  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft">
      <h2 className="text-2xl font-semibold text-slate-950">{title}</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <article key={card.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
