import LocationIcon from '@/public/icons/icon-location.svg';
import UpRightArrowIcon from '@/public/icons/icon-up-right-arrow.svg';
import styled from '@emotion/styled';

interface Props {
  name: string;
  fullAddress: string;
  onClick: () => void;
}

export default function SuggestionItem({ name, fullAddress, onClick }: Props) {
  return (
    <Container
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        width: '100%',
        padding: '10px 20px',
        boxSizing: 'border-box',
        cursor: 'pointer',
        marginBottom: '4px',
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
    </Container>
  );
}

const Container = styled.div`
  :hover {
    background-color: #f5f5f5;
  }
`;
