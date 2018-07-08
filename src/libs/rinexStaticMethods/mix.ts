import Rinex from "../../rinexParser";
const fs = require("fs");

export default function(data, outputFilePath) {
  return new Promise((resolve, reject) => {
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
            observations: [epoch],
            nav: []
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

    for (let file in data) Object.assign(header, data[file].header);

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
            resolve(out);
          }
        );
      }
    } else {
      resolve(out);
    }
  });
}
