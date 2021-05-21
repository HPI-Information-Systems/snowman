import EntityItem from 'components/simple/EntityItem/EntityItem';
import { EntityItemType } from 'components/simple/EntityItem/EntityItemType';
import styles from 'components/simple/ExperimentConfigItem/ExperimentConfigItem.module.css';
import { ExperimentConfigItemProps } from 'components/simple/ExperimentConfigItem/ExperimentConfigItemProps';
import React from 'react';
import { formatLargeNumber } from 'utils/formatLargeNumber';

const ExperimentConfigItem = ({
  experimentId,
  similarity,
}: ExperimentConfigItemProps): JSX.Element => (
  <>
    <EntityItem itemId={experimentId} itemType={EntityItemType.EXPERIMENT} />
    {similarity ? (
      <>
        <EntityItem
          itemId={similarity.func}
          itemType={EntityItemType.SIM_FUNC}
        />
        <div className={styles.equals}>{` = ${formatLargeNumber(
          similarity.threshold
        )}`}</div>
      </>
    ) : null}
  </>
);

export default ExperimentConfigItem;
