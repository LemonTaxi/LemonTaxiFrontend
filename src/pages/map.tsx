import emotionStyled from '@emotion/styled';
import MapHeader from '@/components/MapHeader';
import Map from '@/components/map';
import { useAtomValue } from 'jotai';
import { destinationAtom } from '@/atoms';

export default function MapPage() {
  const destination = useAtomValue(destinationAtom);
  console.log({ destination });
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
