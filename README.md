# React SVG Library

This repo takes a folder of svgs and generates a library of react components from them.

To install, clone this library and run `npm install` in your terminal, and run `npm run build` to compile.


The script uses the file's name to create a PascalCase named export. Using it in another application, you'll need to

```
import React from 'react';
import {Close} from './Icons';

<Close /> --> returns the svg wrapped in a React <Fragment>
```