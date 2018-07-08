import DecodedRinexHeader from "./decodedRinexHeader";

import parseObservationData from "./parser/observationData";
import parseNavigationData from "./parser/navigationData";

export default function(
  header: DecodedRinexHeader,
  startIndex: number,
  data: string[]
) {
  switch (header.typeOfData) {
    case "obs":
      return parseObservationData(header, startIndex, data);
    case "gps":
    case "gln":
      return parseNavigationData(header, startIndex, data);
  }
}
