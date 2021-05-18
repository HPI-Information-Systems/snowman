/* eslint-disable no-useless-concat */
import { doOpenDialog } from 'apps/SnowmanApp/store/RenderLogicDoActions';
import { SnowmanAppMagistrate } from 'apps/SnowmanApp/store/SnowmanAppStore';
import { SnowmanAppModel } from 'apps/SnowmanApp/types/SnowmanAppModel';
import EntityItemView from 'components/simple/EntityItem/EntityItem.View';
import {
  EntityItemOwnProps,
  EntityItemStateProps,
} from 'components/simple/EntityItem/EntityItemProps';
import { EntityItemType } from 'components/simple/EntityItem/EntityItemType';
import { connect } from 'react-redux';
import { assertType } from 'snowman-library';
import { ViewIDs } from 'types/ViewIDs';
import GenericStoreComponentFactory from 'utils/GenericStoreComponentFactory';
import { sanitize } from 'utils/sanitizeHtml';

// ATTENTION: Sanitize tooltip content to prevent code injection!!!

type MapStateToProps = (
  state: SnowmanAppModel,
  ownProps: EntityItemOwnProps
) => EntityItemStateProps;

const mapStateToPropsOfEntityItem = assertType<
  Record<EntityItemType, MapStateToProps>
>()({
  [EntityItemType.EXPERIMENT]: (state, ownProps) => {
    const experiment = state.CentralResourcesStore.experiments.find(
      ({ id }) => id === ownProps.itemId
    );
    const dataset = state.CentralResourcesStore.datasets.find(
      ({ id }) => id === experiment?.datasetId
    );
    const algorithm = state.CentralResourcesStore.algorithms.find(
      ({ id }) => id === experiment?.algorithmId
    );
    return {
      openItem: () => doOpenDialog(ViewIDs.ExperimentDialog, ownProps.itemId),
      name: experiment?.name ?? '',
      tooltip: experiment
        ? `<b><i>${sanitize(experiment.name)}</i></b>` +
          '<p />' +
          sanitize(experiment.description) +
          '<p />' +
          `<b>Dataset:</b> ${sanitize(dataset?.name) ?? '?'}` +
          '<br />' +
          `<b>Algorithm:</b> ${sanitize(algorithm?.name) ?? '?'}`
        : '',
    };
  },

  [EntityItemType.DATASET]: (state, ownProps) => {
    const dataset = state.CentralResourcesStore.datasets.find(
      ({ id }) => id === ownProps.itemId
    );
    return {
      openItem: () => doOpenDialog(ViewIDs.DatasetDialog, ownProps.itemId),
      name: dataset?.name ?? '',
      tooltip: dataset
        ? `<b><i>${sanitize(dataset.name)}</i></b>` +
          '<p />' +
          sanitize(dataset.description)
        : '',
    };
  },

  [EntityItemType.MATCHING_SOLUTION]: (state, ownProps) => {
    const algorithm = state.CentralResourcesStore.algorithms.find(
      ({ id }) => id === ownProps.itemId
    );
    return {
      openItem: () => doOpenDialog(ViewIDs.AlgorithmDialog, ownProps.itemId),
      name: algorithm?.name ?? '',
      tooltip: algorithm
        ? `<b><i>${sanitize(algorithm.name)}</i></b>` +
          '<p />' +
          sanitize(algorithm.description)
        : '',
    };
  },

  [EntityItemType.SIM_FUNC]: (state, ownProps) => {
    const func = state.CentralResourcesStore.simFunctions.find(
      ({ id }) => id === ownProps.itemId
    );
    const experiment = state.CentralResourcesStore.experiments.find(
      ({ id }) => func?.experimentId === id
    );

    return {
      openItem: () =>
        doOpenDialog(ViewIDs.FunctionBuilderDialog, ownProps.itemId),
      name: func?.name ?? '',
      tooltip: func
        ? `<b><i>${sanitize(func.name)}</i></b>` +
          '<p />' +
          `<b>Experiment:</b> ${sanitize(experiment?.name) ?? '?'}`
        : '',
    };
  },
});

const mapStateToProps: MapStateToProps = (state, ownProps) =>
  mapStateToPropsOfEntityItem[ownProps.itemType](state, ownProps);

const EntityItem = GenericStoreComponentFactory<
  SnowmanAppModel,
  EntityItemOwnProps
>(SnowmanAppMagistrate, connect(mapStateToProps)(EntityItemView));

export default EntityItem;
