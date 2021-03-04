import { IonChip, IonIcon, IonInput, IonLabel } from '@ionic/react';
import { InputChipProps } from 'components/InputChip/InputChipProps';
import {
  addCircleOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
} from 'ionicons/icons';
import React from 'react';

const InputChipView = ({
  placeholder = 'New item',
  value,
  label = 'Add',
  onChangeValue,
  showInput,
  shouldShowInput,
  hideInput,
  onSubmit,
}: InputChipProps): JSX.Element => (
  <React.Fragment>
    {!shouldShowInput ? (
      <IonChip
        key="inputchip-inactive"
        color="dark"
        class="ion-text-center"
        onClick={showInput}
      >
        <IonLabel>{label}</IonLabel>
        <IonIcon icon={addCircleOutline} />
      </IonChip>
    ) : (
      <IonChip key="inputchip-active" color="dark">
        <IonLabel>
          <IonInput
            value={value}
            onIonChange={onChangeValue}
            placeholder={placeholder}
          />
        </IonLabel>
        {value !== '' ? (
          <IonIcon
            key="inputchip-submit"
            color="success"
            icon={checkmarkCircleOutline}
            onClick={onSubmit}
          />
        ) : (
          <IonIcon
            key="inputchip-cancel"
            color="danger"
            icon={closeCircleOutline}
            onClick={hideInput}
          />
        )}
      </IonChip>
    )}
  </React.Fragment>
);

export default InputChipView;
