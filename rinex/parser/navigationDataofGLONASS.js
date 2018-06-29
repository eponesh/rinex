// Параметры, собираемые с орбит спутника
const orbitsInfo = [
  ["X", "velocityX", "accelerationX", "health"],
  ["Y", "velocityY", "accelerationY", "frequencyNumber"],
  ["Z", "velocityZ", "accelerationZ", "ageOfInformation"]
];

function getOrbitsInfo(i, epoch, data) {
  // для каждой орбиты
  for (let j = 0; j < 3; j++) {
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
  // Массив эпох
  let epoches = [];

  // Пока не кончатся эпохи
  while (i < data.length - 1) {
    let epoch = {};

    // Строка данных
    let str = data[i];
    i++;

    // Строка данных об эпохе
    let strInfo = RinexClearString(str.substr(0, 22).split(/\s+/g));

    // Строка данных о часах спутника
    let strClock = str.substr(22, 60);

    // Номер спутника
    epoch.satellite = strInfo[0];

    // Дата
    epoch.year = parseInt(strInfo[1]);
    epoch.month = parseInt(strInfo[2]);
    epoch.day = parseInt(strInfo[3]);
    epoch.hour = parseInt(strInfo[4]);
    epoch.min = parseInt(strInfo[5]);
    epoch.sec = parseFloat(strInfo[6]);

    // Сдвиг часов спутника
    epoch.clockBias = RinexParsePow(strClock.substr(0, 19));

    // Относительный сдвиг частоты
    epoch.frequencyBias = RinexParsePow(strClock.substr(19, 19));

    // Время сообщения
    epoch.messageTime = RinexParsePow(strClock.substr(38, 19));

    // Получение данных всех орбит
    getOrbitsInfo(i, epoch, data);
    i += 3;

    // Добавляем эпоху в массив эпох
    epoches.push(epoch);
  }

  // Возвращаем обработанные эпохи
  return epoches;
};
