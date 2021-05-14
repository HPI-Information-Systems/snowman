import {
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
  IonSearchbar,
} from '@ionic/react';
import { SelectableInputProps } from 'components/stateful/SelectableInput/SelectableInputProps';
import styles from 'components/stateful/SelectableInput/SelectableInputStyles.module.css';
import {
  ellipsisVerticalCircle,
  radioButtonOffOutline,
  radioButtonOnOutline,
} from 'ionicons/icons';
import React, { useEffect } from 'react';
import { IonInputMouseEvent } from 'types/IonInputMouseEvent';
import { fuzzyStringIncludes } from 'utils/fuzzyStringIncludes';

export const SelectableInputView = ({
  currentOption,
  allOptions,
  setOption,
  searchString,
  changeSearchString,
  shouldShowPopover,
  eventPopover,
  showPopover,
  closePopover,
  resetElement,
}: SelectableInputProps): JSX.Element => {
  useEffect(resetElement, [resetElement]);

  return (
    <>
      <IonPopover
        cssClass={styles.selectablePopover}
        event={eventPopover}
        isOpen={shouldShowPopover}
        onDidDismiss={closePopover}
      >
        <IonList inset={false} lines="none">
          <IonSearchbar value={searchString} onIonChange={changeSearchString} />
          <div className={styles.selectablePopoverList}>
            {allOptions.map((anOption: string) =>
              fuzzyStringIncludes(anOption, searchString) ? (
                <IonItem
                  button
                  key={'selectable-option-' + anOption}
                  onClick={(): void => setOption(anOption)}
                >
                  <IonIcon
                    icon={
                      anOption === currentOption
                        ? radioButtonOnOutline
                        : radioButtonOffOutline
                    }
                    color={anOption === currentOption ? 'primary' : 'medium'}
                    slot="start"
                  />
                  <IonLabel>{anOption}</IonLabel>
                </IonItem>
              ) : null
            )}
          </div>
        </IonList>
      </IonPopover>
      <IonInput
        clearInput
        value={currentOption}
        readonly
        placeholder="nothing selected"
        onClick={(e: IonInputMouseEvent): void => {
          // This required to solve type inconsistency
          showPopover((e as unknown) as Event);
        }}
      />
      <IonIcon
        icon={ellipsisVerticalCircle}
        slot="end"
        color="medium"
        onClick={(e: unknown): void => {
          // This required to solve type inconsistency
          showPopover((e as unknown) as Event);
        }}
      />
    </>
  );
};
