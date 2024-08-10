import { atom } from 'jotai';
import { req } from '@/components/map/data';

interface Geometry {
  type: string;
  coordinates: [number, number][];
}

export const routesAtom = atom<Geometry[]>([
  { type: 'LineString', coordinates: req.routes[0].geometry.coordinates as any },
  { type: 'LineString', coordinates: req.routes[1].geometry.coordinates },
]);
