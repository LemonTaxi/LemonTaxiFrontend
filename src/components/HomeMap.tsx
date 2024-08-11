import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';

const token = 'pk.eyJ1Ijoic2Vod2FuZm9yZWFsIiwiYSI6ImNsem56M2s0ZTBxZ2syanM4ZGx4b210bHgifQ.c4OIRu9bEN1Vbt0UVrZSKA';

mapboxgl.accessToken = token;

type Coordinates = [number, number];

const origin = [129.342649, 36.018692] as Coordinates;

export default function HomeMap() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: origin,
      zoom: 12.5,
    });

    mapRef.current = map;

    return () => map.remove();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', height: '100vh' }} ref={mapContainerRef} />
    </div>
  );
}
