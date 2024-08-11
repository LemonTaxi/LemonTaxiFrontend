import { atom } from 'jotai';
import { mockReq } from '@/components/map/data';

interface Geometry {
  type: string;
  coordinates: [number, number][];
}
export const routesAtom = atom<Geometry[]>([
  { type: 'LineString', coordinates: mockReq.routes[0].geometry.coordinates as any },
  { type: 'LineString', coordinates: mockReq.routes[1].geometry.coordinates },
]);

export const destinationAtom = atom<string>('');

export const durationAtom = atom<[number, number]>([0, 0]);

export const selectedRouteAtom = atom<'custom-safe' | 'custom-dangerous'>('custom-safe');
