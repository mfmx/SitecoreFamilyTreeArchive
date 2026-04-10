import { NextResponse } from 'next/server';
import { getPersonDetail } from '@/lib/family-tree/wikidata-client';

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  try {
    const person = await getPersonDetail(id);

    if (!person) {
      return NextResponse.json({ error: 'Person not found' }, { status: 404 });
    }

    return NextResponse.json(person);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown person detail error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
