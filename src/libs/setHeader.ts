import Rinex from "../rinexParser";

export default function(lineOfData: string, header): boolean {
  let name = lineOfData.substr(60, 20).split(/\s{2,}/g)[0];
  let def = Rinex.clearString(lineOfData.substr(0, 60).split(/\s{2,}/g));
  switch (name) {
    // Версия Rinex файла
    case "RINEX VERSION / TYPE":
      header.ver = parseFloat(def[0]);
      if (def[1] === "OBSERVATION DATA") header.typeOfData = "obs";
      else if (def[1] === "NAVIGATION DATA") header.typeOfData = "gps";
      else if (def[1] === "GLONASS NAVIGATION DATA") header.typeOfData = "gln";
      else header.typeOfData = "oth";
      break;

    // Примерные координаты маркера
    case "APPROX POSITION XYZ ":
      header.approxPosition = {
        X: parseFloat(def[0]),
        Y: parseFloat(def[1]),
        Z: parseFloat(def[2])
      };
      break;

    // Волновые множители
    case "WAVELENGTH FACT L1/2":
      header.wavelengthFact = {
        L1: parseFloat(def[0]),
        L2: parseFloat(def[1]) || 0
      };
      break;

    // Типы наблюдений
    case "# / TYPES OF OBSERV ":
      let i = 0;
      if (!isNaN(def[0])) {
        header.observeTypes = [];
        i++;
      }
      for (i; i < def.length; i++) header.observeTypes.push(def[i]);
      break;

    // Интервал измерений
    case "INTERVAL":
      header.interval = parseFloat(def[0]);
      break;

    // Параметры A0-A3 ионосферной модели
    case "ION ALPHA":
      header.ionAlpha = [];
      def = Rinex.clearString(lineOfData.substr(0, 60).split(/\s+/g));
      for (let i = 0; i < def.length; i++)
        header.ionAlpha.push(Rinex.parsePow(def[i]));
      break;

    // Параметры B0-B3 ионосферной модели
    case "ION BETA":
      header.ionBeta = [];
      def = Rinex.clearString(lineOfData.substr(0, 60).split(/\s+/g));
      for (let i = 0; i < def.length; i++)
        header.ionBeta.push(Rinex.parsePow(def[i]));
      break;

    // Сдвиг шкалы времени UTC
    case "LEAP SECONDS":
      header.leapSeconds = parseFloat(def[0]);
      break;

    // Конец заголовка
    case "END OF HEADER":
      return true;
  }
  return false;
}
