import DecodedRinexHeader from "../decodedRinexHeader";
import Epoch from "./epoch";

const MESURES_PER_LINE = 5;
const SAT_PER_LINE = 12;

export default function(header: DecodedRinexHeader, i: number, data: string[]) {
  const observeTypes = header.observeTypes;

  const linesForMesure = Math.ceil(
    header.observeTypes.length / MESURES_PER_LINE
  );

  let epoches: Epoch[] = [];

  // Пока не кончатся эпохи
  while (i < data.length - 1) {
    const satCount = parseInt(data[i].substr(30, 2));
    const linesForSat = Math.ceil(satCount / SAT_PER_LINE);
    epoches.push(
      new Epoch(
        i,
        data,
        header.observeTypes,
        linesForMesure,
        satCount,
        linesForSat,
        SAT_PER_LINE
      )
    );

    i += linesForSat + satCount * linesForMesure;
  }
  return epoches;
}
