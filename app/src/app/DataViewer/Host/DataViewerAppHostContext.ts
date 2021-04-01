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

const DataViewerAppQueryParam = 'opendataviewerapp';

export const dataViewerAppHref = `${window.origin}?${DataViewerAppQueryParam}=1`;

export const isDataviewerAppWindow = (): boolean => {
  const params = new URLSearchParams(window.location.search);
  return params.get(DataViewerAppQueryParam) === '1';
};
