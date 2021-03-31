import { DataViewerOwnProps } from 'components/DataViewer/DataViewerProps';
import { createContext } from 'react';

export const DataViewerAppHostContext = createContext<{
  openDataViewerWindow: (props: DataViewerOwnProps) => void;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
}>({ openDataViewerWindow: () => {} });

const dataViewerAppWindowNameBase = 'snowman-benchmark-DataViewerApp';
let nextWindowId = 0;
export const dataViewerAppWindowName = (): string => {
  return `${dataViewerAppWindowNameBase}-${++nextWindowId}-${window.name}`;
};

export const isDataviewerAppWindow = (): boolean => {
  return window.name.startsWith(dataViewerAppWindowNameBase);
};
