import { PreviewDialogProps } from 'apps/PreviewDialog/PreviewDialogProps';
import DataViewer from 'components/DataViewer/DataViewer';
import React from 'react';

const PreviewDialogView = ({
  fileName,
  rowCount,
  loadTuples,
}: PreviewDialogProps): JSX.Element => (
  <div
    style={{
      height: '100%',
    }}
  >
    <DataViewer
      loadTuples={loadTuples}
      tuplesCount={rowCount}
      title={fileName}
    />
  </div>
);

export default PreviewDialogView;
