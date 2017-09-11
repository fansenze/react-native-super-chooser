/*
 * @Author: senze.fan
 * @Date: 2017-09-11 09:26:34
 * @Last Modified by:   senze.fan
 * @Last Modified time: 2017-09-11 09:26:34
 * @Description: utils
 */
export const isStr = (target, defaultVal) => typeof target === 'string' ? target : defaultVal

export const isBool = (target, defaultVal) => typeof target === 'boolean' ? target : defaultVal

export const isIncludes = (range, target, defaultVal) => range.includes(target) ? target : defaultVal

export const cbFns = (target, defaultFn) => () => {
  defaultFn()
  typeof target === 'function' && target()
}
