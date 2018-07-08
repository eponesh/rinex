import RinexType from "./typeOfData";

// Заголовок RINEX файла

class DecodedRinexHeader {
  ver: number;
  typeOfData: RinexType;
  observeTypes: string[];
  approxPosition?: {
    X: number;
    Y: number;
    Z: number;
  };
  wavelengthFact?: {
    L1;
    L2;
  };
  interval?: number;
  ionAlpha?: number[];
  ionBeta?: number[];
  leapSeconds?: number;
}

export default DecodedRinexHeader;
