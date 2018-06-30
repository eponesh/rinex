// Параметры, собираемые с орбит спутника
const orbitsInfo = [
  ["IODE", "Crs", "DeltaN", "M0"],
  ["Cuc", "Eccentricity", "Cus", "sqrtA"],
  ["Toe", "Cic", "OMEGA", "CIS"],
  ["i0", "Crc", "omega", "OMEGA_DOT"],
  ["IDOT", "L2", "gpsWeek", "L2flag"],
  ["SVaccuracy", "SVhealth", "TGD", "IODC"],
  ["transmissionTime", "fitInterval"]
];

function getOrbitsInfo(i, epoch, data) {
  // для каждой орбиты
  for (let j = 0; j < 7; j++) {
    // Получаем параметры в виде массива
    let orbit = data[i + j].substr(3, 80);

    // Для каждого параметра
    for (let k = 0; k < orbitsInfo[j].length; k++)
      // Отделяем значение от степени
      // Добавляем параметр к эпохе
      epoch[orbitsInfo[j][k]] = RinexParsePow(orbit.substr(k * 19, 19));
  }
}

module.exports = function(header, i, data) {
  // Массив спутников
  let satellites = [];

  // Пока не кончатся спутники
  while (i < data.length - 1) {
    let satellite = {};

    // Строка данных
    let str = data[i];
    i++;

    // Строка данных о спутнике
    let strInfo = RinexClearString(str.substr(0, 22).split(/\s+/g));

    // Строка данных о часах спутника
    let strClock = str.substr(22, 60);

    // Номер спутника
    satellite.satellite = parseInt(strInfo[0]);

    // Дата
    satellite.year = parseInt(strInfo[1]);
    satellite.month = parseInt(strInfo[2]);
    satellite.day = parseInt(strInfo[3]);
    satellite.hour = parseInt(strInfo[4]);
    satellite.min = parseInt(strInfo[5]);
    satellite.sec = parseFloat(strInfo[6]);

    // Сдвиг часов спутника
    satellite.clockBias = RinexParsePow(strClock.substr(0, 19));

    // Скорость ухода часов спутника
    satellite.clockDrift = RinexParsePow(strClock.substr(19, 19));

    // Ускорение ухода часов спутника
    satellite.clockDriftRate = RinexParsePow(strClock.substr(38, 19));

    // Получение данных всех орбит
    getOrbitsInfo(i, satellite, data);
    i += 7;

    // Добавляем эпоху в массив эпох
    satellites.push(satellite);
  }

  // Возвращаем обработанные эпохи
  return satellites;
};
