import { FamilyNode } from '@/components/renderings/FamilyNode';
import { FamilyConnection, PersonDetail } from '@/lib/family-tree/types';

function EmptyGroup({ label }: { label: string }) {
  return <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-500">{label}</div>;
}

function Group({ title, family }: { title: string; family: FamilyConnection[] }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{title}</p>
        <div className="h-px flex-1 bg-slate-200" />
      </div>
      {family.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {family.map((member) => (
            <FamilyNode key={`${member.relation}-${member.id}`} person={member} />
          ))}
        </div>
      ) : (
        <EmptyGroup label={`No documented ${title.toLowerCase()}.`} />
      )}
    </section>
  );
}

export function FamilyTree({ person }: { person: PersonDetail }) {
  const fathers = person.family.filter((member) => member.relation === 'father');
  const mothers = person.family.filter((member) => member.relation === 'mother');
  const spouses = person.family.filter((member) => member.relation === 'spouse');
  const children = person.family.filter((member) => member.relation === 'child');

  return (
    <div className="space-y-6">
      <Group title="Parents" family={[...fathers, ...mothers]} />
      <div className="rounded-[1.75rem] border border-slate-900 bg-slate-900 p-5 shadow-soft">
        <FamilyNode
          emphasis
          person={{
            id: person.id,
            name: person.name,
            relation: 'record',
            description: person.description,
            birthYear: person.birthYear,
            deathYear: person.deathYear,
          }}
        />
      </div>
      <Group title="Spouses" family={spouses} />
      <Group title="Children" family={children} />
    </div>
  );
}
