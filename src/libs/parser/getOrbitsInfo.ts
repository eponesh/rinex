import Rinex from "../../rinexParser";

// Количество параметров орбиты, умещающихся в строке
const PARAMS_PER_LINE = 4;
const LEN_OF_PARAM = 19;

export default function(
  i: number,
  sattelite: object,
  data: string[],
  orbitsInfo: string[][]
) {
  // для каждой орбиты
  for (let j = 0; j < orbitsInfo.length; j++) {
    // Получаем параметры в виде массива
    let orbit = data[i + j].substr(3, 80);

    for (let k = 0; k < PARAMS_PER_LINE; k++)
      if (orbitsInfo[j][k])
        sattelite[orbitsInfo[j][k]] = Rinex.parsePow(
          orbit.substr(k * LEN_OF_PARAM, LEN_OF_PARAM)
        );
  }
}
