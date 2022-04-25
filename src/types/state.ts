export type Loadable<T> = {
  isLoading: boolean;
  error: Error | null;
  data: T;
  isDirty: boolean;
};
