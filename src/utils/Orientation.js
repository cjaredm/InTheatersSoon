// @flow
import NativeOrientation from 'react-native-orientation';

export type OrientationValue = 'PORTRAIT' | 'LANDSCAPE';

const ORIENTATION_PORTRAIT: OrientationValue = 'PORTRAIT';
const ORIENTATION_LANDSCAPE: OrientationValue = 'LANDSCAPE';

export class Orientation {
  static get PORTRAIT(): OrientationValue {
    return ORIENTATION_PORTRAIT;
  }

  static get LANDSCAPE(): OrientationValue {
    return ORIENTATION_LANDSCAPE;
  }

  /**
   * Lock the screen to a specific orientation.
   */
  static lock(orientation: OrientationValue) {
    switch (orientation) {
      case this.LANDSCAPE:
        return NativeOrientation.lockToLandscape();
      case this.PORTRAIT:
        return NativeOrientation.lockToPortrait();
    }
  }
}
