# tensornet

[![Build and lint](https://github.com/A11yWatch/tensornet/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/A11yWatch/tensornet/actions/workflows/tests.yml)

pure js classify base64 between Tensorflow Models

## Installation

```
npm i tensornet --save
```

## Getting Started

Make sure to have `@tensorflow/tfjs-core` installed and a valid tensorflow backend set.
You also need to pick between [sync package jpeg-js](https://github.com/jpeg-js/jpeg-js) or [async package sharp](https://github.com/lovell/sharp).

```sh
# pure js full sync blocking installation
npm i @tensorflow/tfjs-core jpeg-js
# if going to use async non blocking
npm i @tensorflow/tfjs-core sharp
```

View the [classify.test.ts](./__tests__/classify.test.ts) file for an example setup.

```ts
import { classify, classifyAsync } from "tensornet";
import { setBackend } from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-wasm";

await setBackend("wasm");

const classification = await classify(mybase64); //using jpeg-js.
// or use native sharp for increased performance 2x
const classificationA = await classifyAsync(mybase64);
// output example
// [
//   {
//     className: 'Siamese cat, Siamese',
//     probability: 0.9805548787117004
//   }
// ]
```

## Why

The benefits of using pure js to calc the image is in a couple areas:

1. size and portablity required is drastically less since you do not need `cairo` or any of the native img dev converters.
1. speed is also faster since the calcs are done at hand without needing to bridge any calls.
1. can use tensors in worker threads - allows for properly using Tensorflow wasm backends in an API service 🥳.

## Benchmarks

Examples of some test ran on a mac m1(64gb):

| Name | chars | size     | sync  | async |
| ---- | ----- | -------- | ----- | ----- |
| jpeg | 26791 | 26.16 KB | 100ms | 50ms  |
