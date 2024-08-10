import emotionStyled from '@emotion/styled';
import MapHeader from '@/components/MapHeader';
import Map from '@/components/map';

export default function MapPage() {
  return (
    <StyledWrapper>
      <StyledMapHeader />
      <Map />
    </StyledWrapper>
  );
}

const StyledWrapper = emotionStyled.div`
  position: relative;
`;

const StyledMapHeader = emotionStyled(MapHeader)`
  position: absolute;
  top: 0;
  left: 0;
`;
