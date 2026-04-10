import { NextRequest, NextResponse } from 'next/server';
import { getLayoutData } from '@/lib/sitecore/layout-service';

export async function GET(request: NextRequest) {
  const route = request.nextUrl.searchParams.get('route') || '/';

  try {
    const data = await getLayoutData(route);

    if (!data.sitecore.route) {
      return NextResponse.json({ error: 'Route not found' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown layout service error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
