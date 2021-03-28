import 'components/SideMenu/SideMenuStyles.css';

import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonMenu,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import {
  CategoryItem,
  SideMenuCategory,
  SideMenuProps,
} from 'components/SideMenu/SideMenuProps';
import React from 'react';
import { SelectedOptionItem } from 'types/SelectedOptionItem';

const SideMenuView = ({
  categoryStructure,
  enterView,
  contentId,
}: SideMenuProps): JSX.Element => (
  <IonMenu contentId={contentId}>
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>Snowman - Benchmark</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonList>
        {categoryStructure.map(
          (aCategory: SideMenuCategory): JSX.Element => (
            <IonItemGroup key={aCategory.name}>
              <IonItemDivider>
                <IonLabel>{aCategory.name.toLocaleUpperCase()}</IonLabel>
              </IonItemDivider>
              {aCategory.categoryItems.map(
                (aCategoryItem: CategoryItem): JSX.Element => (
                  <IonItem
                    key={aCategoryItem.key}
                    button
                    disabled={!aCategoryItem.couldEnter}
                    onClick={(): void => enterView(aCategoryItem.key)}
                  >
                    <IonIcon
                      color={aCategoryItem.isActive ? 'primary' : 'dark'}
                      slot="start"
                      icon={aCategoryItem.menuIcon}
                    />
                    <IonLabel>
                      <h2>{aCategoryItem.name}</h2>
                      {aCategoryItem.selectedOptions.map(
                        (anOption: SelectedOptionItem): JSX.Element => (
                          <p key={anOption.displayName}>
                            {anOption.iconStart !== undefined ? (
                              <IonIcon
                                className="sm-option-middle"
                                icon={anOption.iconStart}
                              />
                            ) : null}
                            <span className="sm-option-middle">
                              {anOption.displayName}
                            </span>
                            {anOption.iconEnd !== undefined ? (
                              <IonIcon
                                className="sm-option-middle"
                                icon={anOption.iconEnd}
                              />
                            ) : null}
                          </p>
                        )
                      )}
                    </IonLabel>
                  </IonItem>
                )
              )}
            </IonItemGroup>
          )
        )}
      </IonList>
    </IonContent>
  </IonMenu>
);

export default SideMenuView;
