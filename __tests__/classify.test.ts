import "@tensorflow/tfjs-backend-wasm";
import "isomorphic-unfetch";

import { classify } from "../src/classify";
import { classifyAsync } from "../src/classify-async";
import { SAMPLE } from "../__mocks__/sample";
import { ready, setBackend } from "@tensorflow/tfjs-core";


describe("classify base64 image using tensorflow Models", () => {
  beforeAll(async () => {
    await setBackend("wasm"); // set tensorflow wasm backend
    await ready();
  })
  test("use pure js", async () => {
    const classification = await classify(SAMPLE);

    expect(classification && classification[0].className).toEqual("Siamese cat, Siamese");
  });

  test.skip("use sharp", async () => {
    const classification = await classifyAsync(SAMPLE);

    // the async tensor returning incorrect results
    expect(classification && classification[0].className).toEqual("Siamese cat, Siamese");
  });
});
