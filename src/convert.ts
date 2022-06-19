import { base64Replacer } from "./trim-base64";
import { decodeImage } from "./decode";

// get an image data @return Uint8Array
export const convert = (base64: string) => {
  if (!base64) {
    return null;
  }
  const bufferObject = Buffer.from(base64Replacer(base64), "base64");
  const arrayBuffer = new ArrayBuffer(bufferObject.length);
  const typedArray = new Uint8Array(arrayBuffer);

  for (var i = 0; i < bufferObject.length; ++i) {
    typedArray[i] = bufferObject[i];
  }

  return decodeImage(typedArray);
};
