export interface Record {
  address: string;
  nightAccidentCount: number;
  trafficCount: number;
  badLane: number;
  riskLevel: RiskLevel;
}

export enum RiskLevel {
  'Requires observation',
  'Needs attention',
  'Need to be vigilant',
  'Dangerous stage',
  'Critical stage',
}
