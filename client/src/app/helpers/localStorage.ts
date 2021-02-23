export const storageHas = (key: string): boolean => {
  const item = localStorage.getItem(key);
  return item !== null;
};

export const storageGet = (key: string): any => {
  const item = localStorage.getItem(key);
  if (!item) return null;
  if (typeof item === "string") return item;
  return JSON.parse(item);
};

export const storageSave = (key: string, value: any): void =>
  localStorage.setItem(key, JSON.stringify(value));

export const storageClear = (key: string): void => {
  localStorage.removeItem(key);
};
