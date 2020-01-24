import { useState } from "react";

export const usePersistedState = <T>(
  key: string,
  defaultValue?: T
): [T, (value: T) => void] => {
  const storedValue = localStorage.getItem(key);
  const [value, setValue] = useState<T>(
    !!storedValue ? JSON.parse(storedValue) : defaultValue
  );

  return [
    value,
    // tslint:disable-next-line: no-shadowed-variable
    (value: T) => {
      localStorage.setItem(key, JSON.stringify(value));
      setValue(value);
    }
  ];
};
