import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

const token = 'pk.eyJ1Ijoic2Vod2FuZm9yZWFsIiwiYSI6ImNsem56M2s0ZTBxZ2syanM4ZGx4b210bHgifQ.c4OIRu9bEN1Vbt0UVrZSKA';

mapboxgl.accessToken = token;

type Coordinates = [number, number];

const origin = [129.36071, 36.05328] as Coordinates;
const destination = [129.3465, 36.149] as Coordinates;

const cordinates = {
  pohang: [129.3435, 36.019] as Coordinates,
  seoul: [126.978, 37.5665] as Coordinates,
};

// 마커 찍기
// 마커 연결하기

export default function MapPage() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: origin,
      zoom: 10,
    });

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
    });

    map.addControl(directions, 'top-left');

    // 코드에서 초기 경로 설정
    directions.setOrigin([129.3435, 36.019]); // 포항 좌표
    directions.setDestination([126.978, 37.5665]); // 서울 좌표

    directions.on('route', (event: any) => {
      console.log('Route found:', event.route);
    });

    directions.on('error', (event: any) => {
      console.error('Error occurred:', event.error);
    });
    return () => map.remove();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '500px', height: '100vh' }} ref={mapContainerRef} />
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
