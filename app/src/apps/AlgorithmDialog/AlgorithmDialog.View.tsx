import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonTextarea,
} from '@ionic/react';
import styles from 'apps/AlgorithmDialog/AlgorithmDialog.module.css';
import { AlgorithmDialogProps } from 'apps/AlgorithmDialog/AlgorithmDialogProps';
import EffortInput from 'components/simple/EffortInput/EffortInput';
import TextMultiSelect from 'components/simple/TextMultiSelect/TextMultiSelect';
import {
  addCircleOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
} from 'ionicons/icons';
import React from 'react';
import style from 'theme/style';

const AlgorithmDialogView = ({
  algorithmDescription,
  algorithmName,
  isAddDialog,
  clickOnCancel,
  clickOnSubmit,
  changeAlgorithmDescription,
  changeAlgorithmName,
  integrationInstallationEffort,
  integrationDeploymentType,
  integrationSolutionType,
  integrationUseCase,
  integrationGeneralCosts,
  configurationMatchingSolutionEffort,
  configurationDomainEffort,
  configurationInterfaces,
  configurationSupportedOSs,
  changeIntegrationInstallationEffort,
  changeIntegrationDeploymentType,
  changeIntegrationSolutionType,
  changeIntegrationUseCase,
  changeIntegrationGeneralCosts,
  changeConfigurationMatchingSolutionEffort,
  changeConfigurationDomainEffort,
  changeConfigurationInterfaces,
  changeConfigurationSupportedOSs,
  availableConfigurationInterfaces,
  availableIntegrationUseCases,
  availableConfigurationSupportedOSs,
  availableIntegrationDeploymentTypes,
  availableIntegrationSolutionTypes,
}: AlgorithmDialogProps): JSX.Element => (
  <>
    <IonList>
      <IonItem>
        <IonLabel position="fixed">Name/ID:</IonLabel>
        <IonInput
          clearInput
          value={algorithmName}
          onIonChange={changeAlgorithmName}
          placeholder="e.g. Internal Solution"
          minlength={1}
        />
      </IonItem>
      <IonItem>
        <IonLabel position="fixed">Description:</IonLabel>
        <IonTextarea
          value={algorithmDescription}
          onIonChange={changeAlgorithmDescription}
          placeholder="e.g. Matching solution developed by a team at our company."
        />
      </IonItem>
      <IonItemDivider>
        <IonLabel>INTEGRATION EFFORT</IonLabel>
      </IonItemDivider>
      <IonItem>
        <IonLabel position="fixed">Installation Effort:</IonLabel>
        <EffortInput
          effortParts={integrationInstallationEffort}
          onChange={changeIntegrationInstallationEffort}
        />
      </IonItem>
      <IonItem>
        <IonLabel position="fixed">Deployment Type:</IonLabel>
        <TextMultiSelect
          content={integrationDeploymentType}
          onChange={changeIntegrationDeploymentType}
          suggestions={availableIntegrationDeploymentTypes}
        />
      </IonItem>
      <IonItem>
        <IonLabel position="fixed">Matching Solution Type:</IonLabel>
        <TextMultiSelect
          content={integrationSolutionType}
          onChange={changeIntegrationSolutionType}
          suggestions={availableIntegrationSolutionTypes}
        />
      </IonItem>
      <IonItem>
        <IonLabel position="fixed">Use Case:</IonLabel>
        <TextMultiSelect
          content={integrationUseCase}
          onChange={changeIntegrationUseCase}
          suggestions={availableIntegrationUseCases}
        />
      </IonItem>
      <IonItem>
        <IonLabel position="fixed">General Costs:</IonLabel>
        <IonInput
          value={integrationGeneralCosts}
          onIonChange={changeIntegrationGeneralCosts}
          placeholder="0"
          type="number"
          step="1"
        />
      </IonItem>
      <IonItemDivider>
        <IonLabel>CONFIGURATION EFFORT</IonLabel>
      </IonItemDivider>
      <IonItem>
        <IonLabel position="fixed">Matching Solution Effort:</IonLabel>
        <EffortInput
          effortParts={configurationMatchingSolutionEffort}
          onChange={changeConfigurationMatchingSolutionEffort}
        />
      </IonItem>
      <IonItem>
        <IonLabel position="fixed">Domain Effort:</IonLabel>
        <EffortInput
          effortParts={configurationDomainEffort}
          onChange={changeConfigurationDomainEffort}
        />
      </IonItem>
      <IonItem>
        <IonLabel position="fixed">Interfaces:</IonLabel>
        <TextMultiSelect
          content={configurationInterfaces}
          onChange={changeConfigurationInterfaces}
          suggestions={availableConfigurationInterfaces}
        />
      </IonItem>
      <IonItem>
        <IonLabel position="fixed">Supported OSs:</IonLabel>
        <TextMultiSelect
          content={configurationSupportedOSs}
          onChange={changeConfigurationSupportedOSs}
          suggestions={availableConfigurationSupportedOSs}
        />
      </IonItem>
    </IonList>
    <div className={style(styles.center, styles.buttonRow)}>
      <IonButton
        className={style(styles.buttonHugh, styles.buttonPadding)}
        onClick={clickOnSubmit}
      >
        <IonIcon
          slot="start"
          icon={isAddDialog ? addCircleOutline : checkmarkCircleOutline}
        />
        {isAddDialog ? 'Add' : 'Update'}
      </IonButton>
      <IonButton
        className={style(styles.buttonHugh, styles.buttonPadding)}
        onClick={clickOnCancel}
        color="light"
      >
        <IonIcon slot="start" icon={closeCircleOutline} />
        Cancel
      </IonButton>
    </div>
  </>
);

export default AlgorithmDialogView;
