
interface SatelliteInfo {
  satid: number;
  satname: string;
  transactionscount: number;
}

export interface Satellite {
  info: SatelliteInfo;
  tle: string;
}
