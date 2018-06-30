# node-rinex

Rinex converter for node.js

## Instalation

```bash
npm install node-rinex
```

## Using

Rinex converter based on file system.

Object:

```js
new Rinex(inputFilePath, outputFilePath);
```

How to use:

```js
// Create instance
let osbervation = new Rinex(inputFilePath, outputFilePath);

// initialize convert process
observation.start()
    .then(output => {
        // Do something with output
    })
    .catch(err=>{
        throw err;
    });
```

## Rinex(`inputFilePath`, `outputFilePath`)

**inputFilePath** - full path with file name. Example: **"./processing/input/novt1780.18O"**.

**outputFilePath (optional)** - full path with file name. Example: **"./processing/output/novt1780.18O"**. **Important!** File format will be in JSON: **"novt1780.18O.json"**.

## Supported File Formats

#### Observation file - `.YYO`
#### GPS navigation file - `.YYN`
#### GLONASS navigation file - `.YYG`

## Output file/object information

Output file is JSON decoded string of output object.

Parameters of objects equal Rinex names of variablels.

More info at <http://users.ntua.gr/ddeli/satgeodesy/Askiseis/Askisi_3/rinex211.pdf>

Russian version <http://meteolab.ru/doc/rinex211rus.pdf>

Output object's structure: 

```js
{
    // Header of file
    // This example mixed from observation, 
    // gps and glonass navigation data
    header: {
        ver: 2.11,
        typeOfData: "obs" || "gln" || "gps",
        approxPosition: {
            X: 452260.6174,
            Y: 3635872.0696,
            Z: 5203456.6948
         },
         wavelengthFact: {
            "L1": 1,
            "L2": 1
         },
         observeTypes: [
             "L1",
             "L2",
             "L5",
             "C1",
             "C2",
             "P1",
             "P2",
             "C5",
             "D1",
             "D2",
             "D5",
             "S1",
             "S2",
             "S5"
         ],
         ionAlpha: [
            4.6566e-9,
            1.4901e-8,
            -5.9605e-8,
            -1.1921e-7
         ],
         ionBeta: [
            81920,
            98304,
            -65536,
            -524290
         ],
         leapSeconds: 18
    },
    // For observation
    epoches: [
        {
            date: {
              year: 18,
              month: 6,
              day: 27,
              hour: 0,
              minute: 0,
              sec: 0.0000000
            },
            satellites: [
              "R15", 
              "R05", 
              "S32", 
              "R14", 
              "G07"
              //...
            ],
            satellitesCount: 19,
            satellitesData: [
                {
                  L1: 110759464.885,
                  L1_power: 8,
                  L2: 86146256.659,
                  L2_power: 6,
                  L5: 0,
                  L5_power: 0,
                  C1: 20727114.987,
                  C2: 20727122.505,
                  P1: 20727114.81,
                  P2: 20727122.439,
                  C5: 0,
                  D1: 2725.864,
                  D2: 2120.128,
                  D5: 0,
                  S1: 49,
                  S2: 38,
                  S5: 0
                }
                // ...
            ]
        }
    ],
    // For GPS
    satellites: [
        {
            satellite: 4,
            year: 18,
            month: 6,
            day: 27,
            hour: 2,
            min: 0,
            sec: 0,
            clockBias: 0.00007349764928222,
            clockDrift: 3.52429196937e-12,
            clockDriftRate: 0,
            IODE: 84,
            Crs: 98.90625,
            DeltaN: 5.371295164575e-9,
            M0: 2.068322439006,
            Cuc: 0.000005001202225685,
            Eccentricity: 0.009830512339249,
            Cus: 0.000003337860107422,
            sqrtA: 5153.707614899,
            Toe: 266400,
            Cic: -1.136213541031e-7,
            OMEGA: 0.9621537335193,
            CIS: -1.657754182816e-7,
            i0: 0.9787552760573,
            Crc: 323.96875,
            omega: 0.9328639996557,
            OMEGA_DOT: -8.041049227691e-9,
            IDOT: 2.742971398626e-10,
            L2: 1,
            gpsWeek: 2007,
            L2flag: 0,
            SVaccuracy: 4,
            SVhealth: 63,
            TGD: -1.955777406693e-8,
            IODC: 84,
            transmissionTime: 259200,
            fitInterval: 4
        }
        // ...
    ],
    // For GLONASS
    satellites: [
        {
            satellite: 14,
            year: 18,
            month: 6,
            day: 27,
            hour: 0,
            min: 15,
            sec: 0,
            clockBias: 0.00002853199839592,
            frequencyBias: 0,
            messageTime: 0,
            X: 23.6826171875,
            velocityX: -3.052961349487,
            accelerationX: -2.793967723846e-9,
            health: 1,
            Y: 11153.83300781,
            velocityY: -0.7337436676025,
            accelerationY: 0,
            frequencyNumber: -7,
            Z: 22951.43115234,
            velocityZ: 0.3580961227417,
            accelerationZ: -9.313225746155e-10,
            ageOfInformation: 0
        }
        // ...
    ]
}
```
