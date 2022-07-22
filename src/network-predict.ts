import { aiModels } from "./ai-models";
import { chainNextClassifier } from "./chain-next";

export interface CNetClassification {
  score?: number;
  class?: string;
}

export interface MNetClassification {
  probability?: number;
  className?: string;
}

export type ModelClassifications = CNetClassification | MNetClassification;

// predict the image based off a Uint8Array. @returns {className: string, probablity: number }[]
export const predictImage = async (tensor): Promise<MNetClassification[]> => {
  let predictions: ModelClassifications[] = [];

  try {
    const mobileNetModel = await aiModels?.initMobileNet();
    const mobileClass = await mobileNetModel?.classify(tensor, 1);

    if (mobileClass) {
      predictions = mobileClass;
    }
    if (chainNextClassifier(predictions)) {
      const cocoaSDModel = await aiModels?.initcocoSSD();
      const cocoaClass = await cocoaSDModel?.detect(tensor); // Retry with cocoa network.

      if (cocoaClass?.length) {
        predictions = cocoaClass;
      }
    }
  } catch (e) {
    console.error(e);
  }

  return predictions && predictions.length
    ? predictions.map((o: ModelClassifications) => {
        if ("probability" in o && "className" in o) {
          return {
            probability: o.probability,
            className: o.className,
          };
        }
        if ("score" in o && "class" in o) {
          return {
            probability: o.score,
            className: o.class,
          };
        }
        return {
          probability: 0,
          className: "",
        };
      })
    : [];
};
