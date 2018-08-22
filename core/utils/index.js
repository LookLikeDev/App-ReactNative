import { Dimensions, Platform, StatusBar } from 'react-native';
import { OrderedMap, Map } from 'immutable';

/**
 * @param {string} fileNameWithExtension
 * @returns {string | undefined}
 */
export function getFileExtensionByString(fileNameWithExtension) {
  return fileNameWithExtension.split('.').pop();
}

export function isIphoneX() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios'
    && !Platform.isPad
    && !Platform.isTVOS
    && (dimen.height === 812 || dimen.width === 812)
  );
}

export function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
}

export function getStatusBarHeight(safe) {
  return Platform.select({
    ios: ifIphoneX(safe ? 44 : 30, 20),
    android: StatusBar.currentHeight,
  });
}

export function arrToMap(arr, DataRecord = Map) {
  return arr.reduce((acc, item) => acc.set(item.id, new DataRecord(item)), new OrderedMap({}));
}

export function mapToArr(obj) {
  return obj.valueSeq().toArray();
  // return Object.keys(obj).map(id => obj[id]);
}

/**
 * Создает промокод указанной длины
 * @param {number} length
 * @returns {string}
 */
export function generatePromoCode(length = 6) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}
