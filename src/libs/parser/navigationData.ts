import Satellite from "./satellite";

const ORBITS_GPS = 7;
const ORBITS_GLONASS = 7;

export default function(header, i, data) {
  // Массив спутников
  let satellites: Satellite[] = [];
  let totalOrbits = header.typeOfData === "gps" ? ORBITS_GPS : ORBITS_GLONASS;

  // Пока не кончатся спутники
  while (i < data.length - 1) {
    satellites.push(new Satellite(i, data, header.typeOfData));
    i += totalOrbits + 1;
  }

  return satellites;
}
