export const setItemAsync = async (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getItemAsync = async (key: string) => {
  return localStorage.getItem(key);
};

export const deleteItemAsync = async (key: string) => {
  localStorage.removeItem(key);
};
