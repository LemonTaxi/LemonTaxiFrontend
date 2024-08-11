import emotionStyled from '@emotion/styled';
import LeftArrowIcon from '@/public/icons/icon-left-arrow.svg';
import NavyFilledCircleIcon from '@/public/icons/icon-navy-filled-circle.svg';
import { Dropdown, Input, MenuProps } from 'antd';
import { useState } from 'react';
import { useDebounce } from 'react-use';
import HomeHeaderImage from '@/public/images/image-home-header.svg';
import axios from 'axios';
import { useSetAtom } from 'jotai';
import { destinationAtom, routesAtom } from '@/atoms';
import { useRouter } from 'next/router';
import SuggestionItem from '@/components/MapHomeHeader/SuggestionItem';

const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1Ijoic2Vod2FuZm9yZWFsIiwiYSI6ImNsem56M2s0ZTBxZ2syanM4ZGx4b210bHgifQ.c4OIRu9bEN1Vbt0UVrZSKA';

const ORIGIN_LONGITUDE = '129.285677254061';
const ORIGIN_LATITUDE = '35.84016225';

export default function MapHomeHeader() {
  const [destinationKeyword, setDestinationKeyword] = useState<string>('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const setRoutes = useSetAtom(routesAtom);
  const setDestination = useSetAtom(destinationAtom);
  const router = useRouter();

  useDebounce(
    async () => {
      if (!destinationKeyword) setSuggestions([]);
      const response = await axios.get(
        `https://api.mapbox.com/search/geocode/v6/forward?q=${destinationKeyword}&proximity=ip&access_token=${MAPBOX_ACCESS_TOKEN}`,
      );
      setSuggestions(response.data.features);
    },
    1000,
    [destinationKeyword],
  );

  async function handleMenuClick(id: string) {
    console.log('clicked');
    const selected = suggestions.find(suggestion => suggestion.id === id);
    if (!selected) {
      throw new Error('handleMeneClick > suggestions.find 실패ㅠㅠ');
    }
    const response = await axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${ORIGIN_LONGITUDE}%2C${ORIGIN_LATITUDE}%3B${selected.geometry.coordinates[0]}%2C${selected.geometry.coordinates[1]}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${MAPBOX_ACCESS_TOKEN}`,
    );
    setRoutes(response.data.routes.slice(0, 2).map((route: any) => route.geometry));
    setDestination(selected.properties.name);

    router.push('/map');
  }

  return (
    <StyledWrapper>
      <StyledInputWrapper>
        <StyledLeftArrowIcon />
        <StyledEndInput
          prefix={<NavyFilledCircleIcon style={{ marginRight: '5px' }} />}
          placeholder="Where to go?"
          value={destinationKeyword}
          onChange={e => setDestinationKeyword(e.target.value)}
        />
      </StyledInputWrapper>
      <div
        style={{
          boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.15)',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <HomeHeaderImage />
      </div>
      {!!suggestions.length && (
        <div style={{ height: '90vh', width: '100%', padding: '12px 0' }}>
          {suggestions.map(suggestion => (
            <SuggestionItem
              key={suggestion.id}
              onClick={() => handleMenuClick(suggestion.id)}
              name={suggestion.properties.name}
              fullAddress={suggestion.properties.full_address}
            />
          ))}
        </div>
      )}
    </StyledWrapper>
  );
}

const StyledWrapper = emotionStyled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background-color: #FFFFFF;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  position: relative;
`;

const StyledInputWrapper = emotionStyled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: 100%;
    padding: 0 20px 0 12px;
    box-sizing: border-box;
    gap: 4px;

  .ant-input-prefix {
  margin-inline-end: 6px !important;
  }
`;

const StyledLeftArrowIcon = emotionStyled(LeftArrowIcon)`


`;

const StyledEndInput = emotionStyled(Input)`
height: 44px;
    border: none !important;
    background-color: #F5F5F5 !important;
    font-size: 16px !important;
    border-radius: 12px !important;
`;
