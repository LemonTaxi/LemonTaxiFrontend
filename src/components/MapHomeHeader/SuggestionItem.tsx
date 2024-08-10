import LocationIcon from '@/public/icons/icon-location.svg';
import UpRightArrowIcon from '@/public/icons/icon-up-right-arrow.svg';

interface Props {
  name: string;
  fullAddress: string;
  onClick: () => void;
}

export default function SuggestionItem({ name, fullAddress, onClick }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        width: '100%',
        // padding: '10px 20px',
        boxSizing: 'border-box',
      }}
      onClick={onClick}
    >
      <LocationIcon />
      <div style={{ flexGrow: '1', minWidth: '282px' }}>
        <div style={{ color: '#1F1F1F', fontSize: '15px', fontWeight: '600', lineHeight: '24px' }}>{name}</div>
        <div
          style={{
            color: '#8C8C8C',
            fontSize: '12px',
            fontWeight: '400',
            lineHeight: '18px',
            wordBreak: 'break-word',
          }}
        >
          {fullAddress}
        </div>
      </div>
      <UpRightArrowIcon />
    </div>
  );
}
