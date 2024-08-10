import { atom } from 'jotai';

interface Geometry {
  type: string;
  coordinates: [number, number][];
}

export const destinationAtom = atom<Geometry[]>([]);
