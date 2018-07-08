import DecodedRinexHeader from "./decodedRinexHeader";

class DecodedRinex {
  header = new DecodedRinexHeader();
  epoches?: object[];
  epochesLength?: number;
  satellites?: object[];
  satellitesLength?: number;
  data?: object[];
  dataLength?: number;
}

export default DecodedRinex;
