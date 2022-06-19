import { convert } from "base64-to-tensor";
import { predictImage } from "./network-predict";

/**
 * This operation converts a base64 into a Classification.
 * Uses the blocking jpeg-js to convert data.
 *
 * @param base64 a valid base64 encoded string.
 * @returns Classification
 */
export const classify = async (base64: string) => {
  if (!base64) {
    return null;
  }
  const tensor = convert(base64);

  if (tensor) {
    try {
      return await predictImage(tensor);
    } finally {
      tensor.dispose();
    }
  }
};
