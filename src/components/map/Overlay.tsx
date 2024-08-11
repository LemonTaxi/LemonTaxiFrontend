import { FC, useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import MoonIcon from '@/public/icons/moon.svg';
import LightIcon from '@/public/icons/light.svg';
import ProtectCheckIcon from '@/public/icons/icon-protect-check-solid.svg';
import ProtectCheckDisabledIcon from '@/public/icons/icon-protect-check-solid-disabled.svg';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useAtomValue } from 'jotai';
import { durationAtom } from '@/atoms';
import { getHoursAndMinutesFromSeconds } from '@/utils';
import dayjs from 'dayjs';

function addSecondsToCurrentTime(seconds: number) {
  const currentTime = dayjs(); // 현재 시간 가져오기
  const newTime = currentTime.add(seconds, 'second'); // 주어진 초를 더하기

  return newTime.format('h:mm A'); // 12시간제 HH:mm AM/PM 형식으로 반환
}

function getArrivalTimeMessage(seconds: number) {
  const arrivalTime = addSecondsToCurrentTime(seconds);

  return `Arrival at ${arrivalTime}`;
}

export const Overlay: FC<{ left: number; onClick: () => void; selected?: boolean; dangerous?: boolean }> = ({
  left,
  onClick,
  selected = false,
  dangerous = false,
}) => {
  const [isBrowser, setIsBrowser] = useState(false);

  const duration = useAtomValue(durationAtom);

  const { hours, minutes } = getHoursAndMinutesFromSeconds(dangerous ? duration[1] : duration[0]);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isBrowser) return null;

  return (
    <Tooltip
      placement={dangerous ? 'topRight' : 'topLeft'}
      title={
        <div style={{ padding: '3px 4px', display: 'flex', alignItems: 'center', gap: '9px' }}>
          {dangerous ? <MoonIcon /> : <LightIcon />}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: 'white', fontSize: '14px', fontWeight: 600 }}>
              {dangerous ? 'Dangerous areas at night' : 'Bright and safe paths'}
            </span>
            <span style={{ color: '#D9D9D9', fontSize: '11px' }}>
              {dangerous ? 'You may not be able to see the lane' : 'Road guidance with lane visibility'}
            </span>
          </div>
        </div>
      }
      overlayStyle={{ maxWidth: '240px' }}
      open={selected}
    >
      <div
        onClick={onClick}
        style={{
          position: 'absolute',
          bottom: 16,
          left: left,
          width: '142px',
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
          {dangerous ? (
            'Minimum time'
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {selected ? <ProtectCheckIcon /> : <ProtectCheckDisabledIcon />}Safety first
            </div>
          )}
          <InfoCircleOutlined style={{ color: '#BFBFBF' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'end', marginBottom: '4px' }}>
          {hours > 0 && (
            <>
              <span style={{ fontSize: '24px', fontWeight: 800 }}>{hours}</span>
              <span style={{ fontWeight: 700, margin: '0px 0px 2px 2px' }}>h</span>
            </>
          )}
          <span style={{ fontSize: '24px', fontWeight: 800 }}>{minutes}</span>
          <span style={{ fontWeight: 700, margin: '0px 0px 2px 2px' }}>m</span>
        </div>
        <div style={{ textAlign: 'left', fontSize: '13px', color: '#595959', marginBottom: '12px' }}>
          {getArrivalTimeMessage(dangerous ? duration[1] : duration[0])}
        </div>
        <div style={{ textAlign: 'left', fontSize: '14px', color: '#262626' }}>204km · 1,300 won</div>
      </div>
    </Tooltip>
  );
};
