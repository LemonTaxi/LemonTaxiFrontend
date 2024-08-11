import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useAtomValue } from 'jotai';
import { routesAtom } from '@/atoms';
import { Coordinates, noneSelectedRouteColor, selectedRouteColor } from '@/components/map/data';
import { drawRoute, fitBounds, getMarkerElements, highlightRoute, removeAllLayers } from '@/components/map/functions';
import { Overlay } from '@/components/map/Overlay';
import { useRouter } from 'next/router';

const token = 'pk.eyJ1Ijoic2Vod2FuZm9yZWFsIiwiYSI6ImNsem56M2s0ZTBxZ2syanM4ZGx4b210bHgifQ.c4OIRu9bEN1Vbt0UVrZSKA';

mapboxgl.accessToken = token;

const center = [129.362136, 36.025434] as Coordinates;

export default function Map() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const routes = useAtomValue(routesAtom);

  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [safeCoordinates, setSafeCoordinates] = useState<Coordinates[] | null>(null);
  const [dangerousCoordinates, setDangerousCoordinates] = useState<Coordinates[] | null>(null);
  const [hazard, setHazard] = useState<{ coordinate: Coordinates; coordinates: Coordinates[] } | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<string>('custom-safe');

  useEffect(() => {
    // Map 초기화
    if (!mapContainerRef.current) return;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center,
      zoom: 12.5,
    });
    mapRef.current = map;
    map.on('load', () => setIsMapLoaded(true));

    return () => map.remove();
  }, []);

  useEffect(() => {
    // 데이터 요청 및 상태 업데이트
    // route가 하나인 경우 안전 경로만 설정하므로 따로 서버 요청을 보내지 않음
    if (routes.length === 1) {
      setSafeCoordinates(routes[0].coordinates);
      return;
    }

    axios
      .post('https://lemontaxi.fly.dev/road-hazards', {
        routes: [
          { id: 'A', geometry: { coordinates: routes[0].coordinates } },
          { id: 'B', geometry: { coordinates: routes[1].coordinates } },
        ],
      })
      .then(({ data }) => {
        console.log({ fetched: data });
        const safe = data.routes.find(({ route_type }: any) => route_type === 0);
        setSafeCoordinates(safe.id === 'A' ? routes[0].coordinates : routes[1].coordinates);
        setDangerousCoordinates(safe.id === 'A' ? routes[1].coordinates : routes[0].coordinates);
        setHazard(data.routes.find(({ route_type }: any) => route_type === 1).hazards[0]);
      });
  }, []);

  useEffect(() => {
    // 상태에 따라 경로 그리기
    if (!isMapLoaded || !mapRef.current) return;
    const map = mapRef.current;
    removeAllLayers(map);

    const { dangerZoneSvgMarker, destinationSvgMarker, originSvgMarker } = getMarkerElements();

    if (dangerousCoordinates) {
      drawRoute(map, dangerousCoordinates!, noneSelectedRouteColor, 'custom-dangerous');
      drawRoute(map, hazard!.coordinates!, 'red', 'custom-hazard');
      new mapboxgl.Marker(dangerZoneSvgMarker).setLngLat(hazard!.coordinate ?? [0, 0]).addTo(map);
    }

    drawRoute(map, safeCoordinates!, selectedRouteColor, 'custom-safe');

    new mapboxgl.Marker(originSvgMarker).setLngLat(safeCoordinates?.[0] ?? [0, 0]).addTo(map);
    new mapboxgl.Marker(destinationSvgMarker)
      .setLngLat(safeCoordinates?.[safeCoordinates.length - 1] ?? [0, 0])
      .addTo(map);

    if (safeCoordinates) fitBounds(map, safeCoordinates);
  }, [safeCoordinates, dangerousCoordinates, hazard, isMapLoaded]);

  const onClickRouteBox = (safe = false) =>
    highlightRoute(mapRef.current!, safe ? 'custom-safe' : 'custom-dangerous', setSelectedRoute);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', height: 'calc(100vh - 244px)' }}>
        <div style={{ position: 'absolute', top: 0, width: '100%', height: '100%' }} ref={mapContainerRef} />
        <Overlay left={12} onClick={() => onClickRouteBox(true)} selected={selectedRoute === 'custom-safe'} />
        {dangerousCoordinates && (
          <Overlay
            left={200}
            onClick={() => onClickRouteBox(false)}
            selected={selectedRoute === 'custom-dangerous'}
            dangerous
          />
        )}
      </div>
      <StartNavigate />
    </>
  );
}

const StartNavigate = () => {
  const router = useRouter();
  return (
    <div
      style={{
        width: '100%',
        height: '68px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1890FF',
        color: 'white',
        fontWeight: 700,
        fontSize: '18px',
        cursor: 'pointer',
      }}
      onClick={() => router.push('naviload')}
    >
      Start Route Guidance
    </div>
  );
};
