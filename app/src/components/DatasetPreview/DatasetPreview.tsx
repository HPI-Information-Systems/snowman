import ModalDialog from 'components/ModalDialog/ModalDialog';
import React, { useEffect, useState } from 'react';

import { datasetTuplesLoader } from '../../store/actions/DatasetsPageActions';
import DataViewer from '../DataViewer/DataViewer';
import { TuplesLoader } from '../DataViewer/TuplesLoader';
import { DatasetPreviewProps } from './DatasetPreviewProps';

const DatasetPreview = ({
  closeDialog,
  datasetId,
  datasetName,
  isOpen,
  rowCount,
}: DatasetPreviewProps): JSX.Element => {
  const [loadTuples, setLoadTuples] = useState<TuplesLoader>(
    datasetTuplesLoader(datasetId)
  );

  useEffect(() => {
    setLoadTuples(datasetTuplesLoader(datasetId));
  }, [datasetId]);

  return (
    <ModalDialog
      heading={`Preview: ${datasetName}`}
      isOpen={isOpen}
      closeDialog={closeDialog}
      provideScrollingMechanism={false}
    >
      <div
        style={{
          height: '100%',
        }}
      >
        <DataViewer loadTuples={loadTuples} tuplesCount={rowCount}></DataViewer>
      </div>
    </ModalDialog>
  );
};

export default DatasetPreview;
