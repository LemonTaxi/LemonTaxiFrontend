import { useRouter } from 'next/router';
import styled from '@emotion/styled';

export default function Naviview() {
  const router = useRouter();

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <img src="./images/naviview.png" alt="navi" width="100%" />
      <ToastImage src="./images/drive-safe.png" alt="navi" />
      <div
        onClick={() => router.push('/')}
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '150px',
          height: '150px',
          cursor: 'pointer',
        }}
      />
    </div>
  );
}

const ToastImage = styled.img`
  position: absolute;
  bottom: 525px;
  left: 50%;
  transform: translateX(-50%);
  width: 340px;
  height: 110px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  opacity: 1;
  animation: fadeIn 1.5s ease-in-out;

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateX(-50%) translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
`;
