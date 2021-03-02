import { IonButton, IonIcon, IonText } from '@ionic/react';
import { FileInputProps } from 'components/FileInput/FileInputProps';
import { cloudUploadOutline } from 'ionicons/icons';
import React, { useRef } from 'react';

// This component requires state management from its parent:
// Please update selectedFiles for every onChange event!
const FileInput = ({
  onChange,
  selectedFiles,
  allowMultiple = false,
}: FileInputProps): JSX.Element => {
  /* This is a bit hacky, but seems to work as expected. */
  const fileInput = useRef<HTMLInputElement>(null);
  const openFileInput = (): void => {
    const currentFileInput = fileInput.current;
    if (currentFileInput !== null && currentFileInput !== undefined) {
      currentFileInput.click();
    }
  };
  return (
    <>
      <IonText
        color={selectedFiles.length > 0 ? 'primary' : 'medium'}
        style={{ marginLeft: '8px' }}
      >
        {selectedFiles.length > 0
          ? selectedFiles.map((f: File): string => f.name).join(', ')
          : '(none selected)'}
      </IonText>
      <IonButton fill="outline" slot="end" onClick={openFileInput}>
        <IonIcon icon={cloudUploadOutline} slot="start" />
        Select file
      </IonButton>
      <input
        hidden
        id="fileInput"
        type="file"
        onChange={onChange}
        multiple={allowMultiple}
        ref={fileInput}
      />
    </>
  );
};

export default FileInput;
