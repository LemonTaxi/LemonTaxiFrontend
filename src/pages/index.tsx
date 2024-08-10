import HomeMap from '@/components/HomeMap';
import MapHomeHeader from '@/components/MapHomeHeader';
import emotionStyled from '@emotion/styled';

export default function Home() {
  return (
    <div style={{ position: 'relative' }}>
      <StyledMapHomeHeader />
      <HomeMap />
    </div>
  );
}

const StyledMapHomeHeader = emotionStyled(MapHomeHeader)`
  position: absolute;
  top: 0;
  left: 0;
`;
