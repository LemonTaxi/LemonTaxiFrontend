import Header from '@/components/Dashboard/header.svg';
import DashboardTable from '@/components/DashboardTable';

export default function Dashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#eeeff5' }}>
      <div style={{ position: 'relative', width: '100%' }}>
        <div
          style={{
            position: 'absolute',
            height: '28.65px',
            backgroundColor: '#01294b',
            top: '0',
            left: '0',
            width: '100%',
          }}
        />
        <img
          src="./images/image-dashboard-gnb.png"
          alt="gnb"
          width="1300px"
          style={{ position: 'absolute', top: '0', left: 'calc((100vw - 1300px) / 2)' }}
        />
      </div>
      <Header style={{ marginTop: '54px' }} />
      <DashboardTable />
      <img
        src="./images/image-dashboard-bottom.png"
        alt="dashboard-bottom"
        width="1400px"
        style={{ marginTop: '52px' }}
      />
      <img
        src="./images/image-pohang-dashboard.png"
        alt="pohang-dashboard"
        width="1300px"
        style={{ marginTop: '52px', marginBottom: '52px' }}
      />
    </div>
  );
}
