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
let obervation = new Rinex(inputFilePath, outputFilePath);

// initialize conver process
observation.start()
    .then(output => {
        // Do something with output
    })catch(err=>{
        throw err;
    });
```
