import { useState } from "react";

const usePersistedState = <T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] => {
  const storedValue = localStorage.getItem(key);

  const [value, setValue] = useState<T>(
    !!storedValue ? JSON.parse(storedValue) : defaultValue
  );

  return [
    value,
    (value: T) => {
      localStorage.setItem(key, JSON.stringify(value));
      setValue(value);
    }
  ];
};

export default usePersistedState;
