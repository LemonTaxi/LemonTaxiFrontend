import emotionStyled from '@emotion/styled';
import LeftArrowIcon from '@/public/icons/icon-left-arrow.svg';
import NavyFilledCircleIcon from '@/public/icons/icon-navy-filled-circle.svg';
import { Dropdown, Input, MenuProps } from 'antd';
import { useState } from 'react';
import { useDebounce } from 'react-use';
import HomeHeaderImage from '@/public/images/image-home-header.svg';
import axios from 'axios';
import { useSetAtom } from 'jotai';
import { routesAtom } from '@/atoms';
import { useRouter } from 'next/router';
import SuggestionItem from '@/components/MapHomeHeader/SuggestionItem';

const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1Ijoic2Vod2FuZm9yZWFsIiwiYSI6ImNsem56M2s0ZTBxZ2syanM4ZGx4b210bHgifQ.c4OIRu9bEN1Vbt0UVrZSKA';

const ORIGIN_LONGITUDE = '127.01415';
const ORIGIN_LATITUDE = '37.590937';

export default function MapHomeHeader() {
  const [destinationKeyword, setDestinationKeyword] = useState<string>('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const setDestination = useSetAtom(routesAtom);
  const router = useRouter();

  useDebounce(
    async () => {
      const response = await axios.get(
        `https://api.mapbox.com/search/geocode/v6/forward?q=${destinationKeyword}&proximity=ip&access_token=${MAPBOX_ACCESS_TOKEN}`,
      );
      setSuggestions(response.data.features);
    },
    1000,
    [destinationKeyword],
  );

  const items: MenuProps['items'] = suggestions.map(suggestion => ({
    label: (
      <SuggestionItem
        onClick={() => handleMeneClick(suggestion.id)}
        name={suggestion.properties.name}
        fullAddress={suggestion.properties.full_address}
      />
    ),
    key: suggestion.id,
  }));

  async function handleMeneClick(id: string) {
    const selected = suggestions.find(suggestion => suggestion.id === id);
    if (!selected) {
      throw new Error('handleMeneClick > suggestions.find 실패ㅠㅠ');
    }
    const response = await axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${ORIGIN_LONGITUDE}%2C${ORIGIN_LATITUDE}%3B${selected.geometry.coordinates[0]}%2C${selected.geometry.coordinates[1]}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${MAPBOX_ACCESS_TOKEN}`,
    );
    setDestination(response.data.routes.slice(0, 2).map((route: any) => route.geometry));
    router.push('/map');
  }

  return (
    <StyledWrapper>
      <StyledDropdown menu={{ items }} open={items.length > 0} overlayClassName="custom-antd-dropdown">
        <StyledInputWrapper>
          <StyledLeftArrowIcon />
          <StyledEndInput
            prefix={<NavyFilledCircleIcon />}
            placeholder="도착지 입력"
            value={destinationKeyword}
            onChange={e => setDestinationKeyword(e.target.value)}
          />
        </StyledInputWrapper>
      </StyledDropdown>
      <HomeHeaderImage />
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

`;

const StyledDropdown = emotionStyled(Dropdown)`
  & > ul > li {
    padding: 0;
    }
  
`;
