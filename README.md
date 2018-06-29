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

### Obervation file - .YYO
### GPS navigation file - .YYN
### GLONASS navigation file - .YYG
