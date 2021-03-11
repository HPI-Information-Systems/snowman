import './SelectableInput.Styles.css';

import {
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
  IonSearchbar,
} from '@ionic/react';
import { SelectableInputProps } from 'components/SelectableInput/SelectableInputProps';
import {
  appsOutline,
  radioButtonOffOutline,
  radioButtonOnOutline,
} from 'ionicons/icons';
import React, { useEffect } from 'react';
import { IonInputMouseEvent } from 'types/IonChangeEvent';
import { fuzzyStringIncludes } from 'utils/fuzzyStringIncludes';

export const SelectableInputView = ({
  currentOption,
  allOptions,
  setOption,
  searchString,
  setSearchString,
  shouldShowPopover,
  eventPopover,
  showPopover,
  closePopover,
  resetElement,
}: SelectableInputProps): JSX.Element => {
  useEffect(() => {
    // Reset the element on mount
    resetElement();
  }, [resetElement]);

  return (
    <>
      <IonPopover
        cssClass="selectable-popover"
        event={eventPopover}
        isOpen={shouldShowPopover}
        onDidDismiss={() => closePopover()}
      >
        <IonList inset={false} lines="none">
          <IonSearchbar value={searchString} onIonChange={setSearchString} />
          <div className="selectable-popover-list">
            {allOptions.map((anOption: string) =>
              fuzzyStringIncludes(anOption, searchString) ? (
                <IonItem
                  button
                  key={'selectable-option-' + anOption}
                  onClick={() => setOption(anOption)}
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
        onClick={(e: IonInputMouseEvent) => {
          // This required to solve type inconsistency
          showPopover((e as unknown) as Event);
        }}
      />
      <IonIcon icon={appsOutline} slot="end" />
    </>
  );
};
