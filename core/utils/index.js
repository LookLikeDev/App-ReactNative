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

export function declOfNum(number, titles) {
  const cases = [2, 0, 1, 1, 1, 2];

  return titles[(number % 100 > 4 && number % 100 < 20)
    ? 2
    : cases[(number % 10 < 5)
      ? number % 10
      : 5]
  ];
}

export function getCalculatedAge(dateStartFirestore, dateEndFirestore) {
  if (dateStartFirestore && dateEndFirestore) {
    const ageDifMs = dateEndFirestore.toDate().getTime() - dateStartFirestore.toDate().getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    const resultAge = Math.abs(ageDate.getUTCFullYear() - 1970);

    if (resultAge > 0) {
      return `${resultAge} ${declOfNum(resultAge, ['год', 'года', 'лет'])}`;
    }
  }

  return null;
}
