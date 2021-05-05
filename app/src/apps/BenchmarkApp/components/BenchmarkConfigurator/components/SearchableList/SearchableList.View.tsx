import {
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonSearchbar,
} from '@ionic/react';
import { SearchableListProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SearchableList/SearchableListProps';
import styles from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SearchableList/SearchableListStyles.module.css';
import { SearchableEntity } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SearchableList/types/SearchableEntity';
import {
  checkmarkCircle,
  radioButtonOffOutline,
  radioButtonOnOutline,
} from 'ionicons/icons';
import React from 'react';
import { fuzzyStringIncludes } from 'utils/fuzzyStringIncludes';
import {
  toggleSelectionArrayMultipleSelect,
  toggleSelectionArraySingleSelect,
} from 'utils/toggleSelectionArray';

const SearchableListView = ({
  entities,
  icon,
  updateSelection,
  selectedEntities,
  allowMultiple = false,
  searchString,
  changeSearchString,
  children,
}: SearchableListProps): JSX.Element => {
  const toggleEntity = (id: number) => {
    if (!allowMultiple) {
      updateSelection(
        toggleSelectionArraySingleSelect<number>(selectedEntities, id)
      );
    } else {
      updateSelection(
        toggleSelectionArrayMultipleSelect<number>(selectedEntities, id)
      );
    }
  };
  return (
    <IonList inset={false} lines="none">
      <IonSearchbar value={searchString} onIonChange={changeSearchString} />
      {children}
      <div className={styles.selectablePopoverList}>
        {entities.map((anEntity: SearchableEntity) =>
          fuzzyStringIncludes(anEntity.name, searchString) ? (
            <IonItem
              button
              key={`selectable-option-${anEntity.id}`}
              onClick={(): void => toggleEntity(anEntity.id)}
            >
              <IonIcon
                className={styles.selectionIcon}
                icon={
                  selectedEntities.includes(anEntity.id)
                    ? allowMultiple
                      ? checkmarkCircle
                      : radioButtonOnOutline
                    : radioButtonOffOutline
                }
                color={
                  selectedEntities.includes(anEntity.id) ? 'primary' : 'medium'
                }
                slot="start"
              />
              <IonLabel>
                <IonIcon
                  icon={icon}
                  color={'primarydark'}
                  slot="start"
                  className={styles.itemIcon}
                />
                {anEntity.name}
              </IonLabel>
            </IonItem>
          ) : null
        )}
      </div>
    </IonList>
  );
};

export default SearchableListView;
