import { FC, useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import MoonIcon from '@/public/icons/moon.svg';
import LightIcon from '@/public/icons/light.svg';
import ProtectCheckIcon from '@/public/icons/icon-protect-check-solid.svg';
import ProtectCheckDisabledIcon from '@/public/icons/icon-protect-check-solid-disabled.svg';
import { InfoCircleOutlined } from '@ant-design/icons';

export const Overlay: FC<{ left: number; onClick: () => void; selected?: boolean; dangerous?: boolean }> = ({
  left,
  onClick,
  selected = false,
  dangerous = false,
}) => {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isBrowser) return null;

  return (
    <Tooltip
      placement="top"
      title={
        <div style={{ padding: '3px 5px', display: 'flex', alignItems: 'center', gap: '9px' }}>
          {dangerous ? <MoonIcon /> : <LightIcon />}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: 'white', fontSize: '14px', fontWeight: 600 }}>
              {dangerous ? '밤길 위험 구간' : '밝고 안전한 길'}
            </span>
            <span style={{ color: '#D9D9D9', fontSize: '11px' }}>
              {dangerous ? '차선이 안보일 수 있어요' : '차선이 잘 보이는 도로 안내'}
            </span>
          </div>
        </div>
      }
      overlayStyle={{ width: '174px' }}
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
            '최소시간'
          ) : (
            <div style={{ display: 'flex' }}>
              {selected ? <ProtectCheckIcon /> : <ProtectCheckDisabledIcon />}안전우선
            </div>
          )}
          <InfoCircleOutlined style={{ color: '#BFBFBF' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'end', marginBottom: '4px' }}>
          <span style={{ fontSize: '24px', fontWeight: 800 }}>{dangerous ? 32 : 41}</span>
          <span style={{ fontWeight: 700, margin: '0px 0px 2px 2px' }}>분</span>
        </div>
        <div style={{ textAlign: 'left', fontSize: '13px', color: '#595959', marginBottom: '12px' }}>
          오후 11:23 도착
        </div>
        <div style={{ textAlign: 'left', fontSize: '14px' }}>204km · 1,300원</div>
      </div>
    </Tooltip>
  );
};
