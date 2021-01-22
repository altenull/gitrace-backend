/**
 * Using for..in is fastest way to test an empty object
 * https://stackoverflow.com/a/59787784
 */
//
export const isEmptyObject = (object: object): boolean => {
  for (let key in object) {
    return false;
  }
  return true;
};
