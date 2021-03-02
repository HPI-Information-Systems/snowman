import { IonCol, IonGrid, IonRow, IonText } from '@ionic/react';
import OptionCard from 'components/OptionCard/OptionCard';
import { OptionSelectorProps } from 'components/OptionSelector/OptionSelectorProps';
import React from 'react';
import { Option } from 'types/Option';

const OptionSelector = ({
  optionsList,
  clickOnCard,
  deleteCardHandler,
  editCardHandler,
  selected,
  title,
  multiple = true,
}: OptionSelectorProps): JSX.Element => {
  return (
    <div>
      <IonText color="primary">
        <h3>{title}</h3>
      </IonText>
      <IonGrid>
        <IonRow>
          {optionsList.map((anOption: Option) => (
            <IonCol key={'col' + anOption.id} size="4" sizeXl="3">
              <OptionCard
                key={'card' + anOption.id}
                title={anOption.title}
                subtitle={anOption.subtitle}
                description={anOption.description}
                tags={anOption.tags}
                clickCard={(): void => clickOnCard(anOption.id)}
                isSelected={selected.includes(anOption.id)}
                deleteCard={
                  deleteCardHandler !== undefined
                    ? (): void => deleteCardHandler(anOption.id)
                    : undefined
                }
                editCard={
                  editCardHandler !== undefined
                    ? (): void => editCardHandler(anOption.id)
                    : undefined
                }
                multiple={multiple}
              />
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
      {optionsList.length === 0 ? (
        <IonText color="medium">No matching elements found!</IonText>
      ) : undefined}
    </div>
  );
};

export default OptionSelector;
