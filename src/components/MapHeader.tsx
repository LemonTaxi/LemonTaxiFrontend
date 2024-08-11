import emotionStyled from '@emotion/styled';
import LeftArrowIcon from '@/public/icons/icon-left-arrow.svg';
import SwitchVerticalArrowIcon from '@/public/icons/icon-switch-vertical-arrow.svg';
import BlueBorderCircleIcon from '@/public/icons/icon-blue-border-circle.svg';
import NavyFilledCircleIcon from '@/public/icons/icon-navy-filled-circle.svg';
import CarIcon from '@/public/icons/icon-car.svg';
import SubwayIcon from '@/public/icons/icon-subway.svg';
import WalkIcon from '@/public/icons/icon-walk.svg';
import { Input } from 'antd';
import { useRouter } from 'next/router';
import { useAtomValue } from 'jotai';
import { destinationAtom, durationAtom, selectedRouteAtom } from '@/atoms';
import { formatSecondsToHoursAndMinutes } from '@/utils';

export default function MapHeader() {
  const router = useRouter();
  const destination = useAtomValue(destinationAtom);
  const duration = useAtomValue(durationAtom);
  const selectedRoute = useAtomValue(selectedRouteAtom);

  const durationText = formatSecondsToHoursAndMinutes(selectedRoute === 'custom-safe' ? duration[0] : duration[1]);

  return (
    <StyledWrapper>
      <StyledInputWrapper>
        <StyledLeftArrowIcon />
        <StyledStartInput
          size={'large'}
          prefix={<BlueBorderCircleIcon style={{ marginRight: '5px' }} />}
          placeholder="출발지 입력"
          value="My Location: Gyeongju Convention.."
        />
        <StyledEndInput
          size={'large'}
          prefix={<NavyFilledCircleIcon style={{ marginRight: '5px' }} />}
          placeholder="destination"
          value={destination}
          onClick={() => router.push('/')}
        />
        <StyledSwitchVerticalArrowIcon />
      </StyledInputWrapper>
      <div
        style={{
          display: 'flex',
          width: '100%',
          padding: '12px 20px',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            borderRadius: '999999px',
            backgroundColor: '#1890FF',
            display: 'flex',
            alignItems: 'center',
            color: '#FFF',
            fontSize: '15px',
            fontWeight: '500',
            lineHeight: '18px',
            padding: '6px 14px',
            gap: '4px',
          }}
        >
          <CarIcon />
          <div>{durationText}</div>
        </div>
        <div
          style={{
            borderRadius: '999999px',
            display: 'flex',
            alignItems: 'center',
            padding: '6px 14px',
            minWidth: '88px',
            justifyContent: 'center',
          }}
        >
          <SubwayIcon />
        </div>
        <div
          style={{
            borderRadius: '999999px',
            display: 'flex',
            alignItems: 'center',
            padding: '6px 14px',
            minWidth: '88px',
            justifyContent: 'center',
          }}
        >
          <WalkIcon />
        </div>
      </div>
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
`;

const StyledInputWrapper = emotionStyled.div`
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  grid-template-rows: 1fr 1fr;
  row-gap: 6px;
  margin-top: 20px;
  width: 100%;

  .ant-input-prefix {
  margin-inline-end: 6px !important;
  }
`;

const StyledLeftArrowIcon = emotionStyled(LeftArrowIcon)`
  align-self: center;
  grid-row: 1 / span 2;
  padding: 0 10px;
`;

const StyledSwitchVerticalArrowIcon = emotionStyled(SwitchVerticalArrowIcon)`
  align-self: center;
  grid-row: 1 / span 2;
  padding: 0 10px;
`;

const StyledStartInput = emotionStyled(Input)`
  grid-column-start: 2;
	grid-column-end: 2;
	grid-row-start: 1;
	grid-row-end: 1;
    height: 44px;
    border: none !important;
    background-color: #F5F5F5 !important;
    font-size: 16px !important;
    border-radius: 12px !important;
`;

const StyledEndInput = emotionStyled(Input)`
  grid-column-start: 2;
	grid-column-end: 2;
	grid-row-start: 2;
	grid-row-end: 2;
	height: 44px;
    border: none !important;
    background-color: #F5F5F5 !important;
    font-size: 16px !important;
    border-radius: 12px !important;
`;
