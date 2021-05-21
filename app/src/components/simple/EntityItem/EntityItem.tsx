/* eslint-disable no-useless-concat */
import { SnowmanAppMagistrate } from 'apps/SnowmanApp/store/SnowmanAppStore';
import { SnowmanAppModel } from 'apps/SnowmanApp/types/SnowmanAppModel';
import EntityItemView from 'components/simple/EntityItem/EntityItem.View';
import { EntityItemOwnProps } from 'components/simple/EntityItem/EntityItemProps';
import { EntityItemType } from 'components/simple/EntityItem/EntityItemType';
import { AlgorithmEntityItem } from 'components/simple/EntityItem/strategies/AlgorithmEntityItem';
import { DatasetEntityItem } from 'components/simple/EntityItem/strategies/DatasetEntityItem';
import { ExperimentEntityItem } from 'components/simple/EntityItem/strategies/ExperimentEntityItem';
import { GenericEntityItem } from 'components/simple/EntityItem/strategies/GenericEntityItem';
import { SimilarityFunctionEntityItem } from 'components/simple/EntityItem/strategies/SimilarityFunctionEntityItem';
import { connect } from 'react-redux';
import { assertType } from 'snowman-library';
import GenericStoreComponentFactory from 'utils/GenericStoreComponentFactory';

//! ATTENTION: Sanitize tooltip content to prevent code injection!!!
const entityItems = assertType<Record<EntityItemType, GenericEntityItem>>()({
  [EntityItemType.EXPERIMENT]: ExperimentEntityItem,
  [EntityItemType.DATASET]: DatasetEntityItem,
  [EntityItemType.ALGORITHM]: AlgorithmEntityItem,
  [EntityItemType.SIM_FUNC]: SimilarityFunctionEntityItem,
});

const mapStateToProps: GenericEntityItem = (state, ownProps) =>
  entityItems[ownProps.itemType](state, ownProps);

const EntityItem = GenericStoreComponentFactory<
  SnowmanAppModel,
  EntityItemOwnProps
>(SnowmanAppMagistrate, connect(mapStateToProps)(EntityItemView));

export default EntityItem;
