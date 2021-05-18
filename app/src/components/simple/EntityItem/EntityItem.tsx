import AlgorithmStrategy from 'components/simple/EntityItem/AlgorithmStrategy/AlgorithmStrategy';
import DatasetStrategy from 'components/simple/EntityItem/DatasetStrategy/DatasetStrategy';
import { EntityItemProps } from 'components/simple/EntityItem/EntityItemProps';
import { EntityItemType } from 'components/simple/EntityItem/EntityItemType';
import ExperimentStrategy from 'components/simple/EntityItem/ExperimentStrategy/ExperimentStrategy';
import React, { createElement, FC } from 'react';

const EntityItemMap = new Map<EntityItemType, FC<EntityItemProps>>([
  [EntityItemType.EXPERIMENT, ExperimentStrategy],
  [EntityItemType.DATASET, DatasetStrategy],
  [EntityItemType.MATCHING_SOLUTION, AlgorithmStrategy],
]);

const EntityItem = ({ item, itemType }: EntityItemProps): JSX.Element => (
  <>
    {createElement(EntityItemMap.get(itemType) ?? ((): JSX.Element => <></>), {
      item,
      itemType,
    })}
  </>
);

export default EntityItem;
