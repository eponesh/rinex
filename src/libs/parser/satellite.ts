import RinexType from "../typeOfData";
import getOrbitsInfo from "./getOrbitsInfo";
import Rinex from "../../rinexParser";

// Параметры, собираемые с орбит спутника GPS
const orbitsInfoGPS: string[][] = [
  ["IODE", "Crs", "DeltaN", "M0"],
  ["Cuc", "Eccentricity", "Cus", "sqrtA"],
  ["Toe", "Cic", "OMEGA", "CIS"],
  ["i0", "Crc", "omega", "OMEGA_DOT"],
  ["IDOT", "L2", "gpsWeek", "L2flag"],
  ["SVaccuracy", "SVhealth", "TGD", "IODC"],
  ["transmissionTime", "fitInterval"]
];

// Параметры, собираемые с орбит спутника GLONASS
const orbitsInfoGLONASS: string[][] = [
  ["X", "velocityX", "accelerationX", "health"],
  ["Y", "velocityY", "accelerationY", "frequencyNumber"],
  ["Z", "velocityZ", "accelerationZ", "ageOfInformation"]
];

class Satellite {
  // Номер спутника
  satellite: number;

  // Дата
  year: number;
  month: number;
  day: number;
  hour: number;
  min: number;
  sec: number;

  // Сдвиг часов спутника
  clockBias: number;

  // Скорость ухода часов спутника
  clockDrift?: number;

  // СкоУскорениерость ухода часов спутника
  clockDriftRate?: number;

  // Относительный сдвиг частоты
  frequencyBias?: number;

  // Время сообщения
  messageTime?: number;

  // Параметры, измеряемые спутником GPS
  IODE?: number;
  Crs?: number;
  DeltaN?: number;
  M0?: number;
  Cuc?: number;
  Eccentricity?: number;
  Cus?: number;
  sqrtA?: number;
  Toe?: number;
  Cic?: number;
  OMEGA?: number;
  CIS?: number;
  i0?: number;
  Crc?: number;
  omega?: number;
  OMEGA_DOT?: number;
  IDOT?: number;
  L2?: number;
  gpsWeek?: number;
  L2flag?: number;
  SVaccuracy?: number;
  SVhealth?: number;
  TGD?: number;
  IODC?: number;
  transmissionTime?: number;
  fitInterval?: number;

  // Параметры, измеряемые спутником GLONASS
  X?: number;
  velocityX?: number;
  accelerationX?: number;
  health?: number;
  Y?: number;
  velocityY?: number;
  accelerationY?: number;
  frequencyNumber?: number;
  Z?: number;
  velocityZ?: number;
  accelerationZ?: number;
  ageOfInformation?: number;

  constructor(i: number, data: string[], type: RinexType) {
    // Строка данных информации об эпохе
    let stringOfInfo = data[i];
    // Номер спутника и время измерения
    let strInfoLeft = Rinex.clearString(
      stringOfInfo.substr(0, 22).split(/\s+/g)
    );

    // Уход часов, свдиг частоты, время сообщения
    let strInfoRight = stringOfInfo.substr(22, 60);

    this.satellite = parseInt(strInfoLeft[0]);
    this.year = parseInt(strInfoLeft[1]);
    this.month = parseInt(strInfoLeft[2]);
    this.day = parseInt(strInfoLeft[3]);
    this.hour = parseInt(strInfoLeft[4]);
    this.min = parseInt(strInfoLeft[5]);
    this.sec = parseFloat(strInfoLeft[6]);

    this.clockBias = Rinex.parsePow(strInfoRight.substr(0, 19));

    i++;

    if (type === "gps") {
      this.clockDrift = Rinex.parsePow(strInfoRight.substr(19, 19));
      this.clockDriftRate = Rinex.parsePow(strInfoRight.substr(38, 19));
      getOrbitsInfo(i, this, data, orbitsInfoGPS);
    } else {
      this.frequencyBias = Rinex.parsePow(strInfoRight.substr(19, 19));
      this.messageTime = Rinex.parsePow(strInfoRight.substr(38, 19));
      getOrbitsInfo(i, this, data, orbitsInfoGLONASS);
    }
  }
}
export default Satellite;
