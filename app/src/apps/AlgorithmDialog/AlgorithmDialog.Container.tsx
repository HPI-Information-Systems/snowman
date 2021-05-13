import { EffortParts } from 'api';
import AlgorithmDialogView from 'apps/AlgorithmDialog/AlgorithmDialog.View';
import {
  AlgorithmDialogDispatchProps,
  AlgorithmDialogOwnProps,
  AlgorithmDialogStateProps,
} from 'apps/AlgorithmDialog/AlgorithmDialogProps';
import {
  addOrUpdateAlgorithm,
  changeAlgorithmDescription,
  changeAlgorithmName,
  changeConfigurationDomainEffort,
  changeConfigurationInterfaces,
  changeConfigurationMatchingSolutionEffort,
  changeConfigurationSupportedOSs,
  changeIntegrationDeploymentType,
  changeIntegrationGeneralCosts,
  changeIntegrationInstallationEffort,
  changeIntegrationSolutionType,
  changeIntegrationUseCase,
} from 'apps/AlgorithmDialog/store/AlgorithmDialogActions';
import { AlgorithmDialogModel } from 'apps/AlgorithmDialog/types/AlgorithmDialogModel';
import { doCloseDialog } from 'apps/SnowmanApp/store/RenderLogicDoActions';
import { connect } from 'react-redux';
import { IonChangeEvent } from 'types/IonChangeEvent';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = (
  state: AlgorithmDialogModel
): AlgorithmDialogStateProps => ({
  ...state,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<AlgorithmDialogModel>,
  ownProps: AlgorithmDialogOwnProps
): AlgorithmDialogDispatchProps => ({
  clickOnCancel(): void {
    doCloseDialog();
  },
  changeAlgorithmName(event: IonChangeEvent): void {
    dispatch(changeAlgorithmName(event.detail.value as string));
  },
  changeAlgorithmDescription(event: IonChangeEvent): void {
    dispatch(changeAlgorithmDescription(event.detail.value as string));
  },
  changeIntegrationInstallationEffort(event: EffortParts): void {
    dispatch(changeIntegrationInstallationEffort(event));
  },
  changeIntegrationDeploymentType(event: string[]): void {
    dispatch(changeIntegrationDeploymentType(event));
  },
  changeIntegrationSolutionType(event: string[]): void {
    dispatch(changeIntegrationSolutionType(event));
  },
  changeIntegrationUseCase(event: string[]): void {
    dispatch(changeIntegrationUseCase(event));
  },
  changeIntegrationGeneralCosts(event: IonChangeEvent): void {
    dispatch(
      changeIntegrationGeneralCosts(parseFloat(event.detail.value as string))
    );
  },
  changeConfigurationMatchingSolutionEffort(event: EffortParts): void {
    dispatch(changeConfigurationMatchingSolutionEffort(event));
  },
  changeConfigurationDomainEffort(event: EffortParts): void {
    dispatch(changeConfigurationDomainEffort(event));
  },
  changeConfigurationInterfaces(event: string[]): void {
    dispatch(changeConfigurationInterfaces(event));
  },
  changeConfigurationSupportedOSs(event: string[]): void {
    dispatch(changeConfigurationSupportedOSs(event));
  },
  clickOnSubmit(): void {
    dispatch(addOrUpdateAlgorithm(ownProps.entityId)).then();
  },
});

const AlgorithmDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AlgorithmDialogView);

export default AlgorithmDialogContainer;
