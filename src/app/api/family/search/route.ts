import { NextRequest, NextResponse } from 'next/server';
import { searchPeopleWithRelationships } from '@/lib/family-tree/wikidata-client';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')?.trim() || '';

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  try {
    const results = await searchPeopleWithRelationships(query);
    return NextResponse.json({ results });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown search error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
