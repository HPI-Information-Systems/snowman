import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonRange,
  IonTextarea,
} from '@ionic/react';
import styles from 'apps/AlgorithmDialog/AlgorithmDialog.module.css';
import { AlgorithmDialogProps } from 'apps/AlgorithmDialog/AlgorithmDialogProps';
import { AlgorithmSegmentTypeEnum } from 'apps/AlgorithmDialog/types/AlgorithmSegmentTypeEnum';
import TextMultiSelect from 'components/simple/TextMultiSelect/TextMultiSelect';
import {
  addCircleOutline,
  checkmarkCircleOutline,
  chevronDown,
  chevronUp,
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
  integrationDeploymentType,
  integrationSolutionType,
  integrationUseCase,
  integrationGeneralCosts,
  configurationInterfaces,
  configurationSupportedOSs,
  changeIntegrationDeploymentType,
  changeIntegrationSolutionType,
  changeIntegrationUseCase,
  changeIntegrationGeneralCosts,
  changeConfigurationInterfaces,
  changeConfigurationSupportedOSs,
  availableConfigurationInterfaces,
  availableIntegrationUseCases,
  availableConfigurationSupportedOSs,
  availableIntegrationDeploymentTypes,
  availableIntegrationSolutionTypes,
  changeConfigurationDomainEffortExpertise,
  changeConfigurationDomainEffortHRAmount,
  changeConfigurationMatchingSolutionEffortExpertise,
  changeConfigurationMatchingSolutionEffortHRAmount,
  changeIntegrationInstallationEffortExpertise,
  changeIntegrationInstallationEffortHRAmount,
  configurationDomainEffortExpertise,
  configurationDomainEffortHRAmount,
  configurationMatchingSolutionEffortExpertise,
  configurationMatchingSolutionEffortHRAmount,
  integrationInstallationEffortExpertise,
  integrationInstallationEffortHRAmount,
  expandedSegments,
  toggleSegmentExpansion,
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

      <IonItemDivider
        onClick={() =>
          toggleSegmentExpansion(AlgorithmSegmentTypeEnum.INTEGRATION_EFFORT)
        }
      >
        <IonIcon
          icon={
            expandedSegments.includes(
              AlgorithmSegmentTypeEnum.INTEGRATION_EFFORT
            )
              ? chevronUp
              : chevronDown
          }
          slot="end"
        />
        <IonLabel>INTEGRATION EFFORT</IonLabel>
      </IonItemDivider>
      {expandedSegments.includes(
        AlgorithmSegmentTypeEnum.INTEGRATION_EFFORT
      ) ? (
        <>
          <IonItem>
            <IonLabel position="fixed">
              Installation <br /> Knowledge
              <br /> Level %:
            </IonLabel>
            <IonRange
              min={0}
              max={100}
              value={integrationInstallationEffortExpertise}
              color="primary"
              onIonChange={changeIntegrationInstallationEffortExpertise}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="fixed">
              Installation
              <br /> HR Amount:
            </IonLabel>
            <IonInput
              type="number"
              min="0"
              placeholder="0"
              value={integrationInstallationEffortHRAmount}
              onIonChange={changeIntegrationInstallationEffortHRAmount}
            />
            <span className={styles.inputUnit}>man-hr</span>
          </IonItem>
        </>
      ) : null}

      <IonItemDivider
        onClick={() =>
          toggleSegmentExpansion(AlgorithmSegmentTypeEnum.CONFIGURATION_EFFORT)
        }
      >
        <IonIcon
          icon={
            expandedSegments.includes(
              AlgorithmSegmentTypeEnum.CONFIGURATION_EFFORT
            )
              ? chevronUp
              : chevronDown
          }
          slot="end"
        />
        <IonLabel>CONFIGURATION EFFORT</IonLabel>
      </IonItemDivider>
      {expandedSegments.includes(
        AlgorithmSegmentTypeEnum.CONFIGURATION_EFFORT
      ) ? (
        <>
          <IonItem>
            <IonLabel position="fixed">
              Matching
              <br /> Solution
              <br /> Knowledge
              <br /> Level %:
            </IonLabel>
            <IonRange
              min={0}
              max={100}
              value={configurationMatchingSolutionEffortExpertise}
              color="primary"
              onIonChange={changeConfigurationMatchingSolutionEffortExpertise}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="fixed">
              Matching
              <br /> Solution <br />
              HR Amount:
            </IonLabel>
            <IonInput
              type="number"
              placeholder="0"
              value={configurationMatchingSolutionEffortHRAmount}
              onIonChange={changeConfigurationMatchingSolutionEffortHRAmount}
            />
            <span className={styles.inputUnit}>man-hr</span>
          </IonItem>

          <IonItem>
            <IonLabel position="fixed">
              Domain
              <br /> Knowledge
              <br /> Level %:
            </IonLabel>
            <IonRange
              min={0}
              max={100}
              value={configurationDomainEffortExpertise}
              color="primary"
              onIonChange={changeConfigurationDomainEffortExpertise}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="fixed">
              Domain <br />
              HR Amount:
            </IonLabel>
            <IonInput
              type="number"
              min="0"
              placeholder="0"
              value={configurationDomainEffortHRAmount}
              onIonChange={changeConfigurationDomainEffortHRAmount}
            />
            <span className={styles.inputUnit}>man-hr</span>
          </IonItem>
        </>
      ) : null}

      <IonItemDivider
        onClick={() =>
          toggleSegmentExpansion(AlgorithmSegmentTypeEnum.ENVIRONMENT_KPIS)
        }
      >
        <IonIcon
          icon={
            expandedSegments.includes(AlgorithmSegmentTypeEnum.ENVIRONMENT_KPIS)
              ? chevronUp
              : chevronDown
          }
          slot="end"
        />
        <IonLabel>ENVIRONMENT KPIs</IonLabel>
      </IonItemDivider>
      {expandedSegments.includes(AlgorithmSegmentTypeEnum.ENVIRONMENT_KPIS) ? (
        <>
          <IonItem>
            <IonLabel position="fixed">
              Provided <br />
              Interfaces:
            </IonLabel>
            <TextMultiSelect
              content={configurationInterfaces}
              onChange={changeConfigurationInterfaces}
              suggestions={availableConfigurationInterfaces}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="fixed">
              Supported
              <br /> OSs:
            </IonLabel>
            <TextMultiSelect
              content={configurationSupportedOSs}
              onChange={changeConfigurationSupportedOSs}
              suggestions={availableConfigurationSupportedOSs}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="fixed">
              Deployment <br />
              Type:
            </IonLabel>
            <TextMultiSelect
              content={integrationDeploymentType}
              onChange={changeIntegrationDeploymentType}
              suggestions={availableIntegrationDeploymentTypes}
            />
          </IonItem>
        </>
      ) : null}

      <IonItemDivider
        onClick={() =>
          toggleSegmentExpansion(AlgorithmSegmentTypeEnum.OTHER_KPIS)
        }
      >
        <IonIcon
          icon={
            expandedSegments.includes(AlgorithmSegmentTypeEnum.OTHER_KPIS)
              ? chevronUp
              : chevronDown
          }
          slot="end"
        />
        <IonLabel>OTHER KPIs</IonLabel>
      </IonItemDivider>
      {expandedSegments.includes(AlgorithmSegmentTypeEnum.OTHER_KPIS) ? (
        <>
          <IonItem>
            <IonLabel position="fixed">
              Matching
              <br /> Solution
              <br /> Type:
            </IonLabel>
            <TextMultiSelect
              content={integrationSolutionType}
              onChange={changeIntegrationSolutionType}
              suggestions={availableIntegrationSolutionTypes}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="fixed">Use Cases:</IonLabel>
            <TextMultiSelect
              content={integrationUseCase}
              onChange={changeIntegrationUseCase}
              suggestions={availableIntegrationUseCases}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="fixed">
              General <br />
              Costs:
            </IonLabel>
            <IonInput
              value={integrationGeneralCosts}
              onIonChange={changeIntegrationGeneralCosts}
              placeholder="0"
              type="number"
              step="1"
            />
            <span className={styles.inputUnit}>€</span>
          </IonItem>
        </>
      ) : null}
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
