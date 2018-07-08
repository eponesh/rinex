// Парсер для RINEX файлов
import RinexClearString from "./libs/rinexStaticMethods/clearString";
import RinexStart from "./libs/rinexMethods/start";
import findBySettelite from "./libs/rinexStaticMethods/findBySettelite";
import mix from "./libs/rinexStaticMethods/mix";
import RinexParsePow from "./libs/rinexStaticMethods/parsePow";

class Rinex {
  static clearString = RinexClearString;
  static parsePow = RinexParsePow;
  static findBySettelite = findBySettelite;
  static mix = mix;
  public epoches: object[];
  public satellites: object[];
  public header;
  public start = RinexStart;
  constructor(public inputFileName: string, public outputFileName: string) {}
}

export default Rinex;
