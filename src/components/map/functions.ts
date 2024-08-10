import mapboxgl from 'mapbox-gl';
import { Coordinates, noneSelectedRouteColor, selectedRouteColor } from '@/components/map/data';

export const highlightRoute = (
  map: mapboxgl.Map,
  routeId: 'custom-safe' | 'custom-dangerous',
  setSelectedRoute: (arg: string) => any,
) => {
  const otherRouteId = routeId === 'custom-safe' ? 'custom-dangerous' : 'custom-safe';

  map.setPaintProperty(routeId, 'line-color', selectedRouteColor);
  map.setPaintProperty(otherRouteId, 'line-color', noneSelectedRouteColor);

  map.moveLayer(routeId);

  if (routeId === 'custom-dangerous') {
    map.moveLayer('custom-hazard');
  }
  setSelectedRoute(routeId);
};

export function removeAllLayers(map: mapboxgl.Map) {
  // 모든 레이어를 가져옵니다.
  const layers = map.getStyle()?.layers;

  if (layers) {
    layers.forEach(layer => {
      // 특정 패턴에 맞는 레이어만 제거
      if (layer.id.startsWith('custom')) {
        map.removeLayer(layer.id);

        if (layer.source) {
          const source = map.getSource(layer.source);
          if (source) {
            map.removeSource(layer.source);
          }
        }
      }
    });
  }
}

export const drawRoute = (map: mapboxgl.Map, coordinates: Coordinates[], color: string, id: `custom-${string}`) => {
  map.addSource(id, {
    type: 'geojson',
    data: { type: 'LineString', coordinates },
  });

  map.addLayer({
    id,
    type: 'line',
    source: id,
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-color': color,
      'line-width': 6,
    },
  });
};
