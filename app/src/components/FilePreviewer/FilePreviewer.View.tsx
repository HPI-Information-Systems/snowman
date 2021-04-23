import DataViewer from 'components/DataViewer/DataViewer';
import { FilePreviewerProps } from 'components/FilePreviewer/FilePreviewerProps';
import ModalDialog from 'components/simple/ModalDialog/ModalDialog';
import React from 'react';

const FilePreviewerView = ({
  fileName,
  isOpen,
  closeDialog,
  rowCount,
  loadTuples,
}: FilePreviewerProps): JSX.Element => (
  <ModalDialog
    heading={`Preview: ${fileName}`}
    isOpen={isOpen}
    closeDialog={closeDialog}
    provideScrollingMechanism={false}
  >
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
  </ModalDialog>
);

export default FilePreviewerView;
