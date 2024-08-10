import emotionStyled from '@emotion/styled';
import LeftArrowIcon from '@/public/icons/icon-left-arrow.svg';
import SwitchVerticalArrowIcon from '@/public/icons/icon-switch-vertical-arrow.svg';
import BlueBorderCircleIcon from '@/public/icons/icon-blue-border-circle.svg';
import NavyFilledCircleIcon from '@/public/icons/icon-navy-filled-circle.svg';
import PathOptionTapsImage from '@/public/images/image-path-option-taps.svg';
import { Input } from 'antd';

export default function MapHeader() {
  return (
    <StyledWrapper>
      <StyledInputWrapper>
        <StyledLeftArrowIcon />
        <StyledStartInput prefix={<BlueBorderCircleIcon />} placeholder="출발지 입력" value="포스코홀딩스 본사" />
        <StyledEndInput
          prefix={<NavyFilledCircleIcon />}
          placeholder="도착지 입력"
          value="경북 포항시 북구 장량중앙로 99"
        />
        <StyledSwitchVerticalArrowIcon />
      </StyledInputWrapper>
      <PathOptionTapsImage style={{ marginTop: '2px' }} />
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
  padding: 0 4px;
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
`;
const StyledEndInput = emotionStyled(Input)`
  grid-column-start: 2;
	grid-column-end: 2;
	grid-row-start: 2;
	grid-row-end: 2;
`;
