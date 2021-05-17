import {
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
  IonSearchbar,
} from '@ionic/react';
import { SelectableInputProps } from 'components/stateful/SelectableInputFactory/SelectableInputFactoryProps';
import styles from 'components/stateful/SelectableInputFactory/SelectableInputFactoryStyles.module.css';
import {
  checkmarkCircle,
  ellipsisVerticalCircle,
  radioButtonOffOutline,
  radioButtonOnOutline,
} from 'ionicons/icons';
import React, { useCallback, useEffect } from 'react';
import { fuzzyStringIncludes } from 'utils/fuzzyStringIncludes';

export const SelectableInputView = function <Content>({
  selection,
  allOptions,
  onChange,
  searchString,
  changeSearchString,
  shouldShowPopover,
  eventPopover,
  showPopover,
  closePopover,
  resetElement,
  allowMultiselect,
  getID = (content) => (content as unknown) as string,
  renderChild = (content) => <IonLabel>{getID(content)}</IonLabel>,
  matches = (content, search) => fuzzyStringIncludes(getID(content), search),
}: SelectableInputProps<Content>): JSX.Element {
  useEffect(resetElement, [resetElement]);
  const toggleOption = useCallback(
    (option: string) => {
      if (selection.includes(option)) {
        onChange(selection.filter((other) => other !== option));
      } else if (allowMultiselect) {
        onChange([...selection, option]);
      } else {
        onChange([option]);
      }
    },
    [allowMultiselect, selection, onChange]
  );
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
            {allOptions.map((anOption: Content) =>
              matches(anOption, searchString) ? (
                <IonItem
                  button
                  key={'selectable-option-' + getID(anOption)}
                  onClick={(): void => toggleOption(getID(anOption))}
                >
                  <IonIcon
                    icon={
                      selection.includes(getID(anOption))
                        ? allowMultiselect
                          ? checkmarkCircle
                          : radioButtonOnOutline
                        : radioButtonOffOutline
                    }
                    color={
                      selection.includes(getID(anOption)) ? 'primary' : 'medium'
                    }
                    className={styles.selectItemIcon}
                    slot="start"
                  />
                  {renderChild(anOption)}
                </IonItem>
              ) : null
            )}
          </div>
        </IonList>
      </IonPopover>
      <IonItem onClick={(e) => showPopover((e as unknown) as Event)}>
        <IonLabel>
          {selection.length > 0 ? (
            selection
              .map((id) => allOptions.find((option) => getID(option) === id))
              .filter(
                (content: Content | undefined): content is Content =>
                  content !== undefined
              )
              .map((content) => (
                <IonItem key={getID(content)}>{renderChild(content)}</IonItem>
              ))
          ) : (
            <i>nothing selected</i>
          )}
        </IonLabel>
        <IonIcon
          icon={ellipsisVerticalCircle}
          slot="end"
          color="medium"
          onClick={(e) => showPopover((e as unknown) as Event)}
        />
      </IonItem>
    </>
  );
};
