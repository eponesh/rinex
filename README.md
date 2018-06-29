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

**outputFilePath** - full path with file name. Example: **"./processing/output/novt1780.18O"**. **Important!** File format will be in JSON: **"novt1780.18O.json"**.

## Supported File Formats

#### Observation file - `.YYO`
#### GPS navigation file - `.YYN`
#### GLONASS navigation file - `.YYG`

## Output file/object information

Output file is JSON decoded string of output object.

Output object has a structure: 

```js
{
    // Header of file
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
    }
}
```
