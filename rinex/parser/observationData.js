module.exports = function(header, i, data) {
  // Массив типов измерений
  const observeTypes = header.observeTypes;

  // Количество строк на одно измерение
  const strCountForOneMesure = Math.ceil(observeTypes.length / 5);

  // Массив эпох
  let epoches = [];

  // Пока не кончатся эпохи
  while (i < data.length - 1) {
    // Строка данных
    let str = data[i];

    // Текущиц индекс строки
    let currentIndex = i;

    // Строка времени измерений
    let time = RinexClearString(str.substr(0, 32).split(/\s+/g));

    // Массив спутников, участвующих в измерениях
    let satellites = [];

    // Данные измерений от спутников
    let satellitesData = [];

    // Количество спутников, участвующих в измерениях
    const sCount = str.substr(30, 2);

    // Количество строк под спутники
    const strCountForSatellites = Math.ceil(sCount / 12);

    // Для каждой строки под спутник
    for (let j = 0; j < strCountForSatellites; j++)
      // Зная, что всего 12 спутников на строку
      for (let k = 0; k < 12; k++)
        // Проходим строку, отбирая 3 символа под спутник
        satellites.push(data[currentIndex + j].substr(32, 50).substr(k * 3, 3));

    // Добавляем спутник в массив спутников
    satellites = RinexClearString(satellites);

    // Инкрементируем текущий индекс строки на
    // количество строк под спутник
    currentIndex += strCountForSatellites;

    // Для каждого спутника
    for (let s = 0; s < sCount; s++) {
      // Данные измерений
      let satData = {};

      // Счетчик измерений
      let obsPass = 0;

      // Для каждой строки измерений
      for (let j = 0; j < strCountForOneMesure; j++) {
        // Запоминаем строку измерений
        let strData = data[currentIndex + j];

        // Зная, что всего 5 измерений на строку
        // 5 раз проходим по строке
        for (let k = 0; k < 5; k++) {
          // Если текущее измерение меньше количества измерений
          if (obsPass < observeTypes.length) {
            // Получаем тип измерения (L,C,P,D,S)
            let typeOfObserve = observeTypes[obsPass];

            // Запоминаем результат измерения
            let value = strData.substr(k * 16, 16);

            // Если тип измерения - L, то к нему прилагается
            // мощность сигнала, от 1 до 9 которую нужно обработать
            if (typeOfObserve.substr(0, 1) === "L") {
              // Разбираем измерение L
              value = RinexClearString(value.split(/\s+/g));

              // Запоминаем значение измерения Фазы несущей частоты
              satData[typeOfObserve] = parseFloat(value[0]);

              // Запоминаем мощность сигнала
              satData[typeOfObserve + "_power"] = parseInt(value[1]) || 0;
            }

            // Для остальных типов измерений запоминаем их значение
            // или при отсутствии обращаем значение в нуль
            else satData[typeOfObserve] = parseFloat(value) || 0;

            // Переходим к следующему измерению
            obsPass++;
          }

          // Прерываем цикл после получения всех данных измерений
          else break;
        }
      }

      // Добавляем данные измерений спутника в массив
      satellitesData.push(satData);
    }

    // устанавливаем текущий индекс
    currentIndex += sCount * strCountForOneMesure;

    // Формируем данные об эпохе
    let epoch = {
      date: {
        year: parseInt(time[0]),
        month: parseInt(time[1]),
        day: parseInt(time[2]),
        hour: parseInt(time[3]),
        minute: parseInt(time[4]),
        sec: parseFloat(time[5])
      },
      satellites: satellites,
      satellitesCount: sCount,
      satellitesData: satellitesData
    };

    // Добавляем эпоху в массив эпох
    epoches.push(epoch);

    // Устанавливаем следующий индекс
    i = currentIndex;
  }

  // Возвращаем обработанные эпохи
  return epoches;
};
