export type GenericFormData<T> = FormData & {
  get<K extends keyof T>(name: K): T[K];
  set<K extends keyof T>(name: K, value: T[K]): void;
};
