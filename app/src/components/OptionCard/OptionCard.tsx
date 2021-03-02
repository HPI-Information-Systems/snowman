import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonCol,
  IonGrid,
  IonIcon,
  IonLabel,
  IonRow,
} from '@ionic/react';
import { OptionCardProps } from 'components/OptionCard/OptionCardProps';
import {
  checkboxOutline,
  create,
  radioButtonOffOutline,
  radioButtonOnOutline,
  squareOutline,
  trash,
} from 'ionicons/icons';
import React from 'react';

const OptionCard = ({
  title,
  subtitle,
  description,
  children,
  tags,
  clickCard,
  isSelected,
  deleteCard,
  editCard,
  multiple = true,
}: OptionCardProps): JSX.Element => {
  return (
    <IonCard button={false}>
      <IonCardHeader>
        {subtitle !== null ? (
          <IonCardSubtitle>{subtitle}</IonCardSubtitle>
        ) : null}
        <IonCardTitle>
          {title}
          <span onClick={clickCard} style={{ cursor: 'pointer' }}>
            {isSelected ? (
              <IonIcon
                className="ion-float-right"
                icon={multiple ? checkboxOutline : radioButtonOnOutline}
                size="large"
                color="primary"
              />
            ) : (
              <IonIcon
                className="ion-float-right"
                icon={multiple ? squareOutline : radioButtonOffOutline}
                size="large"
                color="medium"
              />
            )}
          </span>
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        {description !== null ? <p>{description}</p> : null}
        {children ?? null}
      </IonCardContent>
      <IonGrid>
        {tags && tags?.length > 0 ? (
          <IonRow>
            <IonCol>
              {tags?.map(
                (value: string): JSX.Element => (
                  <IonChip
                    color="dark"
                    outline={false}
                    key={'option-tags-' + value}
                  >
                    <IonLabel>{value}</IonLabel>
                  </IonChip>
                )
              )}
            </IonCol>
          </IonRow>
        ) : null}
        <IonRow>
          <IonCol size="6">
            {editCard !== undefined ? (
              <IonButton
                size="small"
                fill="clear"
                color="primary"
                onClick={editCard}
                className="ion-float-left"
              >
                <IonIcon slot="start" icon={create} />
                Edit
              </IonButton>
            ) : null}
          </IonCol>
          <IonCol size="6">
            {deleteCard !== undefined ? (
              <IonButton
                size="small"
                fill="clear"
                color="danger"
                onClick={deleteCard}
                className="ion-float-right"
              >
                <IonIcon slot="start" icon={trash} />
                Delete
              </IonButton>
            ) : null}
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCard>
  );
};

export default OptionCard;
