import { createContext } from 'react';

export const ScrollSyncContext = createContext<{
  scrollWidth: number;
  scrollLeft: number;
}>({
  scrollWidth: 0,
  scrollLeft: 0,
});
