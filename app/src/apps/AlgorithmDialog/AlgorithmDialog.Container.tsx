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
  changeConfigurationDomainEffortExpertise,
  changeConfigurationDomainEffortHRAmount,
  changeConfigurationInterfaces,
  changeConfigurationMatchingSolutionEffortExpertise,
  changeConfigurationMatchingSolutionEffortHRAmount,
  changeConfigurationSupportedOSs,
  changeIntegrationDeploymentType,
  changeIntegrationGeneralCosts,
  changeIntegrationInstallationEffortExpertise,
  changeIntegrationInstallationEffortHRAmount,
  changeIntegrationSolutionType,
  changeIntegrationUseCase,
  toggleSegmentExpansion,
} from 'apps/AlgorithmDialog/store/AlgorithmDialogActions';
import { AlgorithmDialogModel } from 'apps/AlgorithmDialog/types/AlgorithmDialogModel';
import { AlgorithmSegmentTypeEnum } from 'apps/AlgorithmDialog/types/AlgorithmSegmentTypeEnum';
import { doCloseDialog } from 'apps/SnowmanApp/store/RenderLogicDoActions';
import { connect } from 'react-redux';
import { IonChangeEvent, IonRangeChangeEvent } from 'types/IonChangeEvent';
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
  changeIntegrationInstallationEffortExpertise(
    event: IonRangeChangeEvent
  ): void {
    dispatch(
      changeIntegrationInstallationEffortExpertise(event.detail.value as number)
    );
  },
  changeIntegrationInstallationEffortHRAmount(event: IonChangeEvent): void {
    dispatch(
      changeIntegrationInstallationEffortHRAmount(
        parseFloat(event.detail.value as string)
      )
    );
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
  changeConfigurationMatchingSolutionEffortExpertise(
    event: IonRangeChangeEvent
  ): void {
    dispatch(
      changeConfigurationMatchingSolutionEffortExpertise(
        event.detail.value as number
      )
    );
  },
  changeConfigurationMatchingSolutionEffortHRAmount(
    event: IonChangeEvent
  ): void {
    dispatch(
      changeConfigurationMatchingSolutionEffortHRAmount(
        parseFloat(event.detail.value as string)
      )
    );
  },
  changeConfigurationDomainEffortExpertise(event: IonRangeChangeEvent): void {
    dispatch(
      changeConfigurationDomainEffortExpertise(event.detail.value as number)
    );
  },
  changeConfigurationDomainEffortHRAmount(event: IonChangeEvent): void {
    dispatch(
      changeConfigurationDomainEffortHRAmount(
        parseFloat(event.detail.value as string)
      )
    );
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
  toggleSegmentExpansion(aSegment: AlgorithmSegmentTypeEnum) {
    dispatch(toggleSegmentExpansion(aSegment));
  },
});

const AlgorithmDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AlgorithmDialogView);

export default AlgorithmDialogContainer;
