module.exports = function(str, header) {
  let name = str.substr(60, 20).split(/\s{2,}/g)[0];
  let def = RinexClearString(str.substr(0, 60).split(/\s{2,}/g));
  switch (name) {
    // Версия Rinex файла
    case "RINEX VERSION / TYPE":
      header.ver = def[0];
      if (def[1] === "OBSERVATION DATA") header.typeOfData = "obs";
      else if (def[1] === "NAVIGATION DATA") header.typeOfData = "gps";
      else if (def[1] === "GLONASS NAVIGATION DATA") header.typeOfData = "gln";
      else header.typeOfData = "oth";
      break;

    // Примерные координаты маркера
    case "APPROX POSITION XYZ ":
      header.approxPosition = {
        X: def[0],
        Y: def[1],
        Z: def[2]
      };
      break;

    // Волновые множители
    case "WAVELENGTH FACT L1/2":
      header.wavelengthFact = {
        L1: def[0],
        L2: def[1] || 0
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

    // Параметры A0-A3 ионосферной модели
    case "ION ALPHA":
      header.ionAlpha = [];
      def = RinexClearString(str.substr(0, 60).split(/\s+/g));
      for (let i = 0; i < def.length; i++) 
        header.ionAlpha.push(RinexParsePow(def[i]));
      break;

    // Параметры B0-B3 ионосферной модели
    case "ION BETA":
      header.ionBeta = [];
      def = RinexClearString(str.substr(0, 60).split(/\s+/g));
      for (let i = 0; i < def.length; i++) 
        header.ionBeta.push(RinexParsePow(def[i]));
      break;

    // Сдвиг шкалы времени UTC
    case "LEAP SECONDS":
      header.leapSeconds = def[0];
      break;

    // Конец заголовка
    case "END OF HEADER":
      return true;
  }
  return false;
};
