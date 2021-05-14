import { IonChip, IonIcon, IonInput, IonLabel } from '@ionic/react';
import { InputChipProps } from 'components/stateful/InputChip/InputChipProps';
import {
  addCircleOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
} from 'ionicons/icons';
import React, { Fragment, useEffect, useRef } from 'react';
import { couldSubmitValue } from 'utils/inputChipHelpers';

const InputChipView = ({
  placeholder = 'New item',
  value,
  label = 'Add',
  onChangeValue,
  shouldShowInput,
  showInput,
  hideInput,
  submitInput,
  handleKeyboardInteraction,
}: InputChipProps): JSX.Element => {
  const inputRef = useRef<HTMLIonInputElement>(null);
  useEffect(() => {
    if (shouldShowInput) {
      setTimeout(() => inputRef.current?.setFocus(), 100);
    }
  }, [inputRef, shouldShowInput]);
  return (
    <Fragment>
      {!shouldShowInput ? (
        <IonChip
          key="inputchip-inactive"
          color="dark"
          className="ion-text-center"
          onClick={showInput}
          tabIndex={0}
          onKeyPress={(e) => (e.key === 'Enter' ? showInput() : null)}
        >
          <IonLabel>{label}</IonLabel>
          <IonIcon icon={addCircleOutline} />
        </IonChip>
      ) : (
        <IonChip key="inputchip-active" color="dark">
          <IonLabel>
            <IonInput
              ref={inputRef}
              value={value}
              onIonChange={onChangeValue}
              placeholder={placeholder}
              onKeyUp={handleKeyboardInteraction}
            />
          </IonLabel>
          {couldSubmitValue(value) ? (
            <IonIcon
              key="inputchip-submit"
              color="success"
              icon={checkmarkCircleOutline}
              onClick={submitInput}
              tabIndex={0}
              onKeyPress={(e) => (e.key === 'Enter' ? submitInput() : null)}
            />
          ) : (
            <IonIcon
              key="inputchip-cancel"
              color="danger"
              icon={closeCircleOutline}
              onClick={hideInput}
              tabIndex={0}
              onKeyPress={(e) => (e.key === 'Enter' ? hideInput() : null)}
            />
          )}
        </IonChip>
      )}
    </Fragment>
  );
};

export default InputChipView;
