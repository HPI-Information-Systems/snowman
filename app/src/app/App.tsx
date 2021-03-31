import DataViewerApp from 'app/DataViewer/DataViewerApp';
import DataViewerAppHost from 'app/DataViewer/Host/DataViewerAppHost';
import { isDataviewerAppWindow } from 'app/DataViewer/Host/DataViewerAppHostContext';
import DefaultApp from 'app/Default/DefaultApp';
import React from 'react';

export default function App(): JSX.Element {
  return (
    <DataViewerAppHost>
      {isDataviewerAppWindow() ? <DataViewerApp /> : <DefaultApp />}
    </DataViewerAppHost>
  );
}
