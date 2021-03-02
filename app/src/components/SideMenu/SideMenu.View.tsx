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

const SideMenuView = ({ categoryStructure }: SideMenuProps): JSX.Element => (
  <IonMenu contentId="main">
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
                    onClick={aCategoryItem.enterItem}
                  >
                    <IonIcon slot="start" icon={aCategoryItem.menuIcon} />
                    <IonLabel>
                      <h2>{aCategoryItem.key}</h2>
                      {aCategoryItem.selectedOptions.map(
                        (anOption: string): JSX.Element => (
                          <p key={anOption}>{anOption}</p>
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
