import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';
import { geometry1, geometry2 } from '@/components/map/data';

const token = 'pk.eyJ1Ijoic2Vod2FuZm9yZWFsIiwiYSI6ImNsem56M2s0ZTBxZ2syanM4ZGx4b210bHgifQ.c4OIRu9bEN1Vbt0UVrZSKA';

mapboxgl.accessToken = token;

type Coordinates = [number, number];
const selectedRouteColor = '#1890FF';
const noneSelectedRouteColor = '#8C8C8C';

const origin = [129.36071, 36.05328] as Coordinates;
const destination = [129.3465, 36.149] as Coordinates;

const cordinates = {
  pohang: [129.3435, 36.019] as Coordinates,
  seoul: [126.978, 37.5665] as Coordinates,
};

export default function Map() {
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

    const features = () => {
      map.addSource('route1', { type: 'geojson', data: geometry1 });

      map.addLayer({
        id: 'route1',
        type: 'line',
        source: 'route1',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': noneSelectedRouteColor,
          'line-width': 6,
        },
      });

      map.addSource('route2', {
        type: 'geojson',
        data: geometry2,
      });

      map.addLayer({
        id: 'route2',
        type: 'line',
        source: 'route2',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': noneSelectedRouteColor,
          'line-width': 6,
        },
      });
    };

    map.on('load', features);

    return () => map.remove();
  }, []);

  const highlightRoute = (routeId: string) => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    const otherRouteId = routeId === 'route1' ? 'route2' : 'route1';

    map.setPaintProperty(routeId, 'line-color', selectedRouteColor);
    map.setPaintProperty(otherRouteId, 'line-color', noneSelectedRouteColor);

    map.moveLayer(routeId);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 'calc(100vh - 152px)' }} ref={mapContainerRef} />
      <button onClick={() => highlightRoute('route1')}>1번 루트</button>
      <button onClick={() => highlightRoute('route2')}>2번 루트</button>
    </div>
  );
}

// new mapboxgl.Marker({ color: 'green' })
//     .setLngLat(startCoordinates)
//     .setPopup(new mapboxgl.Popup().setText('출발지: 포항'))
//     .addTo(map);
//
// // 도착지 마커 추가
// new mapboxgl.Marker({ color: 'red' })
//     .setLngLat(endCoordinates)
//     .setPopup(new mapboxgl.Popup().setText('도착지: 서울'))
//     .addTo(map);
