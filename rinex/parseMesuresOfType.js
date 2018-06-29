const parseObservationData = require("./parser/observationData.js");
const parseNavigationDataOfGPS = require("./parser/navigationDataOfGPS.js");
const parseNavigationDataOfGLONASS = require("./parser/navigationDataOfGLONASS.js");

module.exports = function(header, startIndex, data) {
  switch (header.typeOfData) {
    case "obs":
      return parseObservationData(header, startIndex, data);
    case "gps":
      return parseNavigationDataOfGPS(header, startIndex, data);
    case "gln":
      return parseNavigationDataOfGLONASS(header, startIndex, data);
  }
};
