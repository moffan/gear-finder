import { useState } from "react";

const useLocaleStorage = (key: string, defaultValue: any = {}) => {
  const storedValue = localStorage.getItem(key);

  const [value, setValue] = useState(
    !!storedValue ? JSON.parse(storedValue) : defaultValue
  );

  return [
    value,
    (value: any) => {
      localStorage.setItem(key, JSON.stringify(value));
      setValue(value);
    }
  ];
};

export default useLocaleStorage;
