/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * @description Function to find the index of an element in an array
 * @param {Array} array - The array to search
 * @param {Function} predicate - The predicate function to use to find the index
 * @param {Number} defaultValue - The default value to return if the index is not found
 * @returns {Number} The index of the element in the array or the default value
 */
export const findIndexWithDefault = (
  array: Array<any>,
  predicate: (value: any, index?: number, obj?: Array<any>) => boolean,
  defaultValue: number,
): number => {
  const index = array.findIndex(predicate)
  return index === -1 ? defaultValue : index
}

/**
 * @description Function to find the element in an array that comes immediately after a specified target element.
 * @param {Array} array - The array to search.
 * @param {string} target - The target element to search for in the array.
 * @returns {string} The element that comes after the target element or empty if not found or the target is the last element.
 */
export const findElementAfter = (array: Array<string>, target: string) => {
  const index = array.indexOf(target)

  if (index !== -1 && index < array.length - 1) {
    return array[index + 1]
  }

  return ''
}
