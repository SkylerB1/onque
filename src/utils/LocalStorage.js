export const useLocalStorage = (key, type, value = "") => {
  if (typeof window !== "undefined") {
    if (type === "delete") {
      window.localStorage.removeItem(key);
      return true;
    }

    if (type === "add") {
      window.localStorage.setItem(key, value);
      return true;
    }

    if (type === "get") {
      const data = window.localStorage.getItem(key);
      if (data) {
        const parsedData = JSON.parse(data);
        return parsedData;
      }
    }
  }
};
