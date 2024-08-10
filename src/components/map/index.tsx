import mapboxgl from 'mapbox-gl';
import { FC, useEffect, useRef, useState } from 'react';
import { geometry1, geometry2, req, res } from '@/components/map/data';
import { AlertOutlined, InfoCircleOutlined, InfoOutlined } from '@ant-design/icons';
import axios from 'axios';
import ProtectCheckIcon from '@/public/icons/icon-protect-check-solid.svg';
import ProtectCheckDisabledIcon from '@/public/icons/icon-protect-check-solid-disabled.svg';
import LightIcon from '@/public/icons/light.svg';
import MoonIcon from '@/public/icons/moon.svg';
import { Tooltip } from 'antd';

const token = 'pk.eyJ1Ijoic2Vod2FuZm9yZWFsIiwiYSI6ImNsem56M2s0ZTBxZ2syanM4ZGx4b210bHgifQ.c4OIRu9bEN1Vbt0UVrZSKA';

mapboxgl.accessToken = token;

async function getData() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return res;
}

const center = [129.362136, 36.025434] as Coordinates;

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
    axios.post('http://lemontaxi.fly.dev/road-hazards', req).then(console.log);
    axios.get('http://lemontaxi.fly.dev/hello').then(console.log);
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center,
      zoom: 12.5,
    });

    mapRef.current = map;

    const features = () => {
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
          'line-color': selectedRouteColor,
          'line-width': 6,
        },
      });
    };

    map.on('load', features);

    return () => map.remove();
  }, []);

  const [selectedRoute, setSelectedRoute] = useState<string>('route1');

  const highlightRoute = (routeId: string) => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    const otherRouteId = routeId === 'route1' ? 'route2' : 'route1';

    map.setPaintProperty(routeId, 'line-color', selectedRouteColor);
    map.setPaintProperty(otherRouteId, 'line-color', noneSelectedRouteColor);

    map.moveLayer(routeId);
    setSelectedRoute(routeId);
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', height: 'calc(100vh - 244px)' }}>
        <div style={{ position: 'absolute', top: 0, width: '100%', height: '100%' }} ref={mapContainerRef} />
        <Overlay left={15} onClick={() => highlightRoute('route1')} selected={selectedRoute === 'route1'} />
        <Overlay left={240} onClick={() => highlightRoute('route2')} selected={selectedRoute === 'route2'} short />
      </div>
      <div
        style={{
          width: '100%',
          height: '68px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#1890FF',
          color: 'white',
          fontWeight: 600,
          fontSize: '18px',
          cursor: 'pointer',
        }}
      >
        경로 안내 시작
      </div>
    </>
  );
}

const Overlay: FC<{ left: number; onClick: () => void; selected?: boolean; short?: boolean }> = ({
  left,
  onClick,
  selected = false,
  short = false,
}) => {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isBrowser) return null;

  return (
    <Tooltip
      title={
        <div style={{ padding: '3px 8px', display: 'flex', alignItems: 'center', gap: '9px' }}>
          {short ? <MoonIcon /> : <LightIcon />}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: 'white', fontSize: '14px', fontWeight: 600 }}>
              {short ? '밤길 위험 구간' : '밝고 안전한 길'}
            </span>
            <span style={{ color: '#D9D9D9', fontSize: '11px' }}>
              {short ? '차선이 안보일 수 있어요' : '차선이 잘 보이는 도로 안내'}
            </span>
          </div>
        </div>
      }
      overlayStyle={{ width: '180px' }}
      open={selected}
    >
      <div
        onClick={onClick}
        style={{
          position: 'absolute',
          bottom: 16,
          left: left,
          width: '180px',
          backgroundColor: 'white',
          padding: '16px',
          textAlign: 'center',
          borderRadius: '12px',
          border: `2px solid ${selected ? '#1890FF' : '#BFBFBF'}`,
        }}
      >
        <div
          style={{
            color: selected ? '#1890FF' : '#BFBFBF',
            fontWeight: 700,
            textAlign: 'left',
            lineHeight: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '5px',
          }}
        >
          {short ? (
            '최소시간'
          ) : (
            <div style={{ display: 'flex' }}>
              {selected ? <ProtectCheckIcon /> : <ProtectCheckDisabledIcon />}안전우선
            </div>
          )}
          <InfoCircleOutlined style={{ color: '#BFBFBF' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'end', marginBottom: '4px' }}>
          <span style={{ fontSize: '24px', fontWeight: 800 }}>{short ? 32 : 41}</span>
          <span style={{ fontWeight: 700, margin: '0px 0px 2px 2px' }}>분</span>
        </div>
        <div style={{ textAlign: 'left', fontSize: '13px', color: '#595959', marginBottom: '12px' }}>
          오후 11:23 도착
        </div>
        <div style={{ textAlign: 'left', fontSize: '14px' }}>204km · 1,300원</div>
      </div>
    </Tooltip>
  );
};

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
