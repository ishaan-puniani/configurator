export const RACE_STORAGE_KEY = "RACE_STORAGE_KEY";
export const SLOT_STORAGE_KEY = "SLOT_STORAGE_KEY";
export const create = (key: string, basicInfo: any) => {
  localStorage.setItem(key, JSON.stringify(basicInfo));
};

export const patch = (key: string, fields: any) => {
  const patched = { ...getData(key), ...fields };
  localStorage.setItem(key, JSON.stringify(patched));
};

export const getData = (key: string): any => {
  const retrievedObject: any = localStorage.getItem(key);
  return JSON.parse(retrievedObject);
};
