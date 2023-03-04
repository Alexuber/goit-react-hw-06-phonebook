const getDataFromLocalStorage = (key, initialValue) => {
  return JSON.parse(localStorage.getItem(key)) || initialValue;
};

export default getDataFromLocalStorage;
