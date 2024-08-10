import { Button } from 'antd';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Button>
        <Link href="/map">지도</Link>
      </Button>
    </div>
  );
}
