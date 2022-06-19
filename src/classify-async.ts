import { convertAsync } from "base64-to-tensor";
import { predictImage } from "./network-predict";

/**
 * This operation converts a base64 into a Classification.
 * Uses full async sharp to convert data.
 *
 * @param base64 a valid base64 encoded string.
 * @returns Promise<Classification>
 */
export const classifyAsync = async (base64: string) => {
  if (!base64) {
    return null;
  }
  const tensor = await convertAsync(base64);

  if (tensor) {
    try {
      return await predictImage(tensor);
    } finally {
      tensor.dispose();
    }
  }
};
