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
  
`;

const StyledMapHeader = emotionStyled(MapHeader)`
 
`;
