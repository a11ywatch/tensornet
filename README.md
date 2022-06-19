# base64-to-tensor

convert a base64 image to a tensor object

## Installation

```
npm i base64-to-tensor --save
```

## Getting Started

You need to have `@tensorflow/tfjs-core` installed in order to use the package.

```ts
import { convert } from "base64-to-tensor";

const tensor = convert(mybase64);
```
