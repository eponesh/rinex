import Rinex from "../../rinexParser";
import SatelliteData from "./satelleteData";

const SAT_NAME_LEN = 3;

function getSatellites(
  data: string[],
  currentIndex: number,
  linesForSat: number,
  satPerLine: number
) {
  let satellites: string[] = [];
  
  // Зная, что всего satPerLine спутников на строку
  // Проходим строку, отбирая SAT_NAME_LEN символов под спутник
  for (let j = 0; j < linesForSat; j++)
    for (let k = 0; k < satPerLine; k++)
      satellites.push(
        data[currentIndex + j]
          .substr(32, 50)
          .substr(k * SAT_NAME_LEN, SAT_NAME_LEN)
      );

  // Добавляем спутник в массив спутников
  return Rinex.clearString(satellites);
}

class Epoch {
  // Дата
  date: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    sec: number;
  };

  satellites: string[];
  satellitesCount: number;
  satellitesData: SatelliteData[] = [];

  constructor(
    i: number,
    data: string[],
    observeTypes: string[],
    linesForMesure: number,
    satCount: number,
    linesForSat: number,
    satPerLine: number
  ) {
    let str = data[i];
    let currentIndex = i;
    let time = Rinex.clearString(str.substr(0, 32).split(/\s+/g));

    this.date = {
      year: parseInt(time[0]),
      month: parseInt(time[1]),
      day: parseInt(time[2]),
      hour: parseInt(time[3]),
      minute: parseInt(time[4]),
      sec: parseFloat(time[5])
    };

    this.satellites = getSatellites(
      data,
      currentIndex,
      linesForSat,
      satPerLine
    );

    currentIndex += linesForSat;

    for (let s = 0; s < satCount; s++) {
      this.satellitesData.push(
        new SatelliteData(currentIndex, data, linesForMesure, observeTypes)
      );
      currentIndex += linesForMesure;
    }

    this.satellitesCount = satCount;
  }
}

export default Epoch;
