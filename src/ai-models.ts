import { load, MobileNet } from "./models/mobilenet/lib";
import {
  load as cocoSsdLoad,
  ObjectDetection,
} from "./models/coco-ssd/lib";

let mobileNetModel: MobileNet | null;
let cocoaSDModel: ObjectDetection | null;

const aiModels = {
  async initMobileNet() {
    if (!mobileNetModel) {
      try {
        mobileNetModel = await load({ version: 2, alpha: 1 });
      } catch (e) {
        console.error(e);
      }
    }
    return mobileNetModel;
  },
  async initcocoSSD() {
    if (!cocoaSDModel) {
      try {
        cocoaSDModel = await cocoSsdLoad({ base: "mobilenet_v2" });
      } catch (e) {
        console.error(e);
      }
    }
    return cocoaSDModel;
  },
  clearModels() {
    cocoaSDModel?.dispose();
    cocoaSDModel = null;
    mobileNetModel = null;
  },
};

export { aiModels, mobileNetModel, cocoaSDModel };
