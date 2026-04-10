export function resolveRoutePath(segments?: string[]): string {
  if (!segments || segments.length === 0) return '/';
  return `/${segments.join('/')}`;
}
