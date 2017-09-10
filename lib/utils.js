export const isStr = (target, defaultVal) => typeof target === 'string' ? target : defaultVal

export const isBool = (target, defaultVal) => typeof target === 'boolean' ? target : defaultVal

export const isIncludes = (range, target, defaultVal) => range.includes(target) ? target : defaultVal

export const cbFns = (target, defaultFn) => () => {
  defaultFn()
  typeof target === 'function' && target()
}
