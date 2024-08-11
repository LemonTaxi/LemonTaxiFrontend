import drive from '@/public/drive.json';
import Lottie from 'lottie-react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Naviload() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push('/naviview');
    }, 1700);
  }, []);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#363d45',
      }}
    >
      <div style={{ width: '180px' }}>
        <Lottie animationData={drive} />
      </div>
    </div>
  );
}
