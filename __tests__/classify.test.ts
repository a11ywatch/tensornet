import "@tensorflow/tfjs-backend-wasm";
import "isomorphic-unfetch";

import { classify } from "../src/classify";
import { classifyAsync } from "../src/classify-async";
import { SAMPLE } from "../__mocks__/sample";
import { ready, setBackend } from "@tensorflow/tfjs-core";

describe("classify base64 image using tensorflow Models", () => {
  test("use pure js", async () => {
    await setBackend("wasm"); // set tensorflow wasm backend
    await ready();

    const classification = await classify(SAMPLE);

    expect(classification && classification[0].className).toEqual("Siamese cat, Siamese");
  });

  test.skip("use sharp", async () => {
    await setBackend("wasm"); // set tensorflow wasm backend
    await ready();

    const classification = await classifyAsync(SAMPLE);

    expect(classification && classification[0].className).toEqual("Siamese cat, Siamese");
  });
});
