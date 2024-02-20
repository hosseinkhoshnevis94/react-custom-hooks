import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(()=>JSON.parse(localStorage.getItem(key) ?? initialValue));
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  const removeValue = () => {
    localStorage.removeItem(key);
    setValue(initialValue);
  };

  return {value, setValue, removeValue};
};

export default useLocalStorage;
