import { useRouter } from 'next/router';

export default function Naviview() {
  const router = useRouter();

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <img src="./images/naviview.png" alt="navi" width="100%" />
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
