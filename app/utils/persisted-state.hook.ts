import { useState } from "react";

type ValuePersistor<T> = (value: T) => void;

export const usePersistedState = <T>(
  key: string,
  defaultValue?: T
): [T, ValuePersistor<T>] => {
  const storedValue = localStorage.getItem(key);
  const [value, setValue] = useState<T>(
    !!storedValue ? JSON.parse(storedValue) : defaultValue
  );

  const persistValue: ValuePersistor<T> = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    setValue(value);
  };

  if (!storedValue && !!defaultValue) {
    persistValue(defaultValue);
  }

  return [value, persistValue];
};
