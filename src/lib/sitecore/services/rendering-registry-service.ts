import { componentFactory } from '@/temp/componentFactory';

export function getRegisteredRenderingNames() {
  return Object.keys(componentFactory).sort();
}
