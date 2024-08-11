import { data } from '@/components/DashboardTable/data';
import { Record, RiskLevel } from '@/components/DashboardTable/types';
import { A, F, pipe } from '@mobily/ts-belt';
import { Tag } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';

export default function DashboardTable() {
  const columns: ColumnsType<Record> = [
    {
      title: 'Region',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Nighttime accidents (number)',
      dataIndex: 'nightAccidentCount',
      key: 'nightAccidentCount',
      sorter: (a, b) => a.nightAccidentCount - b.nightAccidentCount,
    },
    {
      title: 'Traffic (vehicles/day)',
      dataIndex: 'trafficCount',
      key: 'trafficCount',
      sorter: (a, b) => a.trafficCount - b.trafficCount,
    },
    {
      title: 'Bad lanes (km)',
      dataIndex: 'badLane',
      key: 'badLane',
      sorter: (a, b) => a.badLane - b.badLane,
    },
    {
      title: 'Risk Level',
      dataIndex: 'riskLevel',
      key: 'riskLevel',
      sorter: (a, b) => a.riskLevel - b.riskLevel,
      render: riskLevel => {
        if (riskLevel === RiskLevel['Critical stage']) {
          return <Tag color="error">{RiskLevel[riskLevel]}</Tag>;
        }
        if (riskLevel === RiskLevel['Dangerous stage']) {
          return <Tag color="red">{RiskLevel[riskLevel]}</Tag>;
        }
        if (riskLevel === RiskLevel['Need to be vigilant']) {
          return <Tag color="orange">{RiskLevel[riskLevel]}</Tag>;
        }
        if (riskLevel === RiskLevel['Needs attention']) {
          return <Tag color="yellow">{RiskLevel[riskLevel]}</Tag>;
        }
        if (riskLevel === RiskLevel['Requires observation']) {
          return <Tag color="success">{RiskLevel[riskLevel]}</Tag>;
        }
      },
    },
  ];

  const dataSource: Record[] = pipe(
    data,
    A.map(record => {
      const riskLevel = (() => {
        if (record.riskLevel > 80) {
          return RiskLevel['Critical stage'];
        } else if (record.nightAccidentCount > 60) {
          return RiskLevel['Dangerous stage'];
        } else if (record.nightAccidentCount > 40) {
          return RiskLevel['Need to be vigilant'];
        } else if (record.nightAccidentCount > 20) {
          return RiskLevel['Needs attention'];
        } else {
          return RiskLevel['Requires observation'];
        }
      })();
      return {
        ...record,
        riskLevel,
      };
    }),
    F.toMutable,
  );

  return (
    <Table
      style={{ width: '1300px', marginTop: '28px' }}
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      scroll={{ y: 400 }}
    />
  );
}
