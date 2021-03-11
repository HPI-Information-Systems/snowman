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
import { radioButtonOffOutline, radioButtonOnOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { IonChangeEvent } from 'types/IonChangeEvent';
import { fuzzyStringIncludes } from 'utils/fuzzyStringIncludes';

export const SelectableInput = ({
  currentOption,
  allOptions,
  setOption,
}: SelectableInputProps): JSX.Element => {
  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });
  const [searchText, setSearchText] = useState('');

  return (
    <>
      <IonPopover
        cssClass="selectable-popover"
        event={popoverState.event}
        isOpen={popoverState.showPopover}
        onDidDismiss={() =>
          setShowPopover({ showPopover: false, event: undefined })
        }
      >
        <IonList inset={false} lines="none">
          <IonSearchbar
            value={searchText}
            onIonChange={(e: IonChangeEvent) =>
              setSearchText(e.detail.value ?? '')
            }
          />
          <div className="selectable-popover-list">
            {allOptions.map((anOption: string) =>
              fuzzyStringIncludes(anOption, searchText) ? (
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
        onClick={(e: any) => {
          e.persist();
          setShowPopover({ showPopover: true, event: e });
        }}
      />
    </>
  );
};
