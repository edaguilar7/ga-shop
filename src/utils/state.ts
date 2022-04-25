import { Loadable } from 'types/state';

export const initLoadable = <T>(data: T): Loadable<T> => ({
  data,
  error: null,
  isDirty: false,
  isLoading: false,
});

export const setLoading = <T>(
  node: Loadable<T>,
  isLoading: boolean,
  error: Error | null = null
): Loadable<T> => {
  const nodeClone = { ...node };
  nodeClone.isLoading = isLoading;
  nodeClone.error = error;
  return nodeClone;
};

export const setData = <T>(node: Loadable<T>, data: T): Loadable<T> => {
  const nodeClone = setLoading(node, false);
  nodeClone.data = data;
  return nodeClone;
};
