import {
  IonCard,
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonRow,
} from '@ionic/react';
import styles from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/KpiInvestigatorStrategyStyles.module.css';
import { SimilarityDiagramStrategyProps } from 'apps/BenchmarkApp/strategies/SimilarityDiagramStrategy/SimilarityDiagramStrategyProps';
import { ScatterChart } from 'components/simple/ChartComponent/ScatterChart';
import ErroneousBackdrop from 'components/simple/ErroneousBackdrop/ErroneousBackdrop';
import SelectableInput from 'components/stateful/SelectableInput/SelectableInput';
import React from 'react';
import {
  AllMetricsObject,
  OmitMetricsOnSoftKPIPage,
} from 'types/AllMetricsEnum';

const SimilarityDiagramStrategyView = ({
  isValidConfig,
  yAxis,
  datasets,
  changeYAxis,
}: SimilarityDiagramStrategyProps): JSX.Element => {
  const metrics = Object.values(AllMetricsObject)
    .filter((metric) => !OmitMetricsOnSoftKPIPage.has(metric))
    .map((metric) => metric as string);
  return (
    <>
      <ErroneousBackdrop
        shouldShow={!isValidConfig}
        message={
          'Please select at least a one experiment with similarity values (or a function)!'
        }
      />
      <IonGrid>
        <IonRow>
          <IonCol size="12">
            <IonItem>
              <IonLabel>Y Axis Metric:</IonLabel>
              <SelectableInput
                allOptions={metrics}
                currentOption={yAxis}
                setOption={changeYAxis}
                instanceDescriptor="SimilarityDiagramYAxis"
              />
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="12">
            <IonCard className={styles.noMargin}>
              <div className={styles.chartContainer}>
                <ScatterChart
                  data={{
                    datasets: datasets,
                  }}
                  options={{
                    scales: { x: { min: 0, max: 1 }, y: { min: 0, max: 1 } },
                    animation: { duration: 0 },
                  }}
                />
              </div>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};

export default SimilarityDiagramStrategyView;
