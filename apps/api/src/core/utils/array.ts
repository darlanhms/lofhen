export const isFilled = (arr: Array<unknown> | null | undefined): boolean => {
  return Boolean(arr && Array.isArray(arr) && arr.length > 0);
};
