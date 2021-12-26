let STORAGE_KEY = "DUMMY_CONFIG";
export const create = (basicInfo: any) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(basicInfo));
};

export const patch = (fields: any) => {
  const patched = { ...getData(), ...fields };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(patched));
};

export const getData = (): any => {
  const retrievedObject: any = localStorage.getItem(STORAGE_KEY);
  return JSON.parse(retrievedObject);
};
