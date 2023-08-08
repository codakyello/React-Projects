import { useEffect, useState } from "react";

export function useLocalStorage(initialState, key) {
  const [storageData, updateStorageData] = useState(() => {
    const watchData = localStorage.getItem(key);
    return JSON.parse(watchData) || initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storageData));
  }, [key, storageData]);

  return { storageData, updateStorageData };
}
