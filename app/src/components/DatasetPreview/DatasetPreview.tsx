import { DatasetsApi } from 'api';
import { DatasetPreviewProps } from 'components/DatasetPreview/DatasetPreviewProps';
import DataViewer from 'components/DataViewer/DataViewer';
import { TuplesLoader } from 'components/DataViewer/TuplesLoader';
import ModalDialog from 'components/ModalDialog/ModalDialog';
import React, { useEffect, useState } from 'react';

const DatasetPreview = ({
  closeDialog,
  datasetId,
  datasetName,
  isOpen,
  rowCount,
}: DatasetPreviewProps): JSX.Element => {
  function loadTuplesLogic(start: number, stop: number) {
    return new DatasetsApi().getDatasetFile({
      datasetId,
      startAt: start,
      limit: stop - start,
    });
  }

  const [loadTuples, setLoadTuples] = useState<TuplesLoader>(
    () => loadTuplesLogic
  );

  useEffect(() => {
    setLoadTuples(() => loadTuplesLogic);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
