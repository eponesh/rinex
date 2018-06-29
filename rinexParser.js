// Парсер для RINEX файлов
const setHeader = require("./rinex/setHeader");
const parseMesuresOf = require("./rinex/parseMesuresOfType");
global.RinexClearString = require("./rinex/clearString");
global.RinexParsePow = require("./rinex/parsePow");

const fs = require("fs");

function convertRinex(data) {
  data = data.split("\n");
  Bench.point("Файл разделен построчно");
  let header = {};
  let mesures = [];
  let hEnd = false;
  for (let i = 0; i < data.length; i++) {
    if (!hEnd) hEnd = setHeader(data[i], header);
    else {
      epoches = parseMesuresOf(header, i, data);
      break;
    }
  }
  return {
    header: header,
    epoches: epoches,
    epochesLength: epoches.length
  };
}

const Rinex = function(fileName) {
  this.epoches;
  this.header;
  this.fileName = fileName;
};

Rinex.prototype = {
  getHeader() {
    return this.rinexData.header;
  },
  getData() {
    return this.rinexData.data;
  },
  start() {
    return new Promise((resolve, reject) => {
      Bench.point("Начало получения файла");
      fs.readFile(this.fileName, "utf8", (err, data) => {
        if (err) throw err;
        Bench.point("Файл получен");
        let rinexData = convertRinex(data);
        this.header = rinexData.header;
        this.epoches = rinexData.epoches;
        Bench.point("Файл разбит по данным");
        fs.writeFile(
          this.fileName + ".json",
          JSON.stringify(rinexData),
          "utf8",
          err => {
            if (err) reject();
            Bench.point("Файл записан");
            resolve();
          }
        );
      });
    });
  }
};

Rinex.findBySettelite = function(pref, satellite, epoches) {
  for (let i = 0; i < epoches.length; i++) {
    if (pref + epoches[i].satellite === satellite) {
      let epoch = epoches[i];
      delete epoch.satellite;
      return epoch;
    }
  }
  return {};
};

Rinex.mix = function(data, outputFilePath) {
  Bench.point("Смешиваем файлы");
  let header = {};
  let satellites = {};
  for (let i = 0; i < data.obs.epoches.length; i++) {
    let epoch = data.obs.epoches[i];
    for (let j = 0; j < epoch.satellites.length; j++) {
      let type = epoch.satellites[j].substr(0, 1);
      let set = satellites[epoch.satellites[j]];
      if (set) set.observations.push(epoch);
      else {
        let satelliteInfo = {
          observations: [epoch]
        };
        if (type === "G" && data.gps)
          satelliteInfo.nav = Rinex.findBySettelite(
            type,
            epoch.satellites[j],
            data.gps.epoches
          );
        else if (type === "R" && data.glonass)
          satelliteInfo.nav = Rinex.findBySettelite(
            type,
            epoch.satellites[j],
            data.glonass.epoches
          );
        satellites[epoch.satellites[j]] = satelliteInfo;
      }
    }
  }

  for (file in data) Object.assign(header, data[file].header);

  let out = {
    header: header,
    satellites: satellites
  };

  if (outputFilePath) {
    for (let i in satellites) {
      fs.writeFile(
        `${outputFilePath + i}.json`,
        JSON.stringify({ header: header, data: satellites[i] }),
        "utf8",
        err => {
          if (err) throw err;
          Bench.point("Файл записан");
        }
      );
    }
  } else {
    Bench.point("Готово");
    return out;
  }
};

setTimeout(() => Bench.total(), 3000);

global.Rinex = Rinex;
