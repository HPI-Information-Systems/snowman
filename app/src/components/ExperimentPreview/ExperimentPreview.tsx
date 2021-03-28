import { ExperimentsApi } from 'api';
import DataViewer from 'components/DataViewer/DataViewer';
import { TuplesLoader } from 'components/DataViewer/TuplesLoader';
import { ExperimentPreviewProps } from 'components/ExperimentPreview/ExperimentPreviewProps';
import ModalDialog from 'components/ModalDialog/ModalDialog';
import React, { useEffect, useState } from 'react';

const ExperimentPreview = ({
  closeDialog,
  experimentId,
  experimentName,
  isOpen,
  rowCount,
}: ExperimentPreviewProps): JSX.Element => {
  function loadTuplesLogic(start: number, stop: number) {
    return new ExperimentsApi().getExperimentFile({
      experimentId,
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
  }, [experimentId]);

  return (
    <ModalDialog
      heading={`Preview: ${experimentName}`}
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

export default ExperimentPreview;
