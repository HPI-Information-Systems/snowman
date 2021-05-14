import {
  IonCard,
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonRow,
} from '@ionic/react';
import { MetricsEnum } from 'api';
import styles from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/KpiInvestigatorStrategyStyles.module.css';
import { SimilarityDiagramStrategyProps } from 'apps/BenchmarkApp/strategies/SimilarityDiagramStrategy/SimilarityDiagramStrategyProps';
import { ScatterChart } from 'components/simple/ChartComponent/ScatterChart';
import ErroneousBackdrop from 'components/simple/ErroneousBackdrop/ErroneousBackdrop';
import SelectableInput from 'components/stateful/SelectableInputFactory/flavors/SelectableInput';
import React from 'react';

const SimilarityDiagramStrategyView = ({
  isValidConfig,
  yAxis,
  xAxis,
  datasets,
  changeYAxis,
  changeXAxis,
  definitionRange,
  valueRange,
}: SimilarityDiagramStrategyProps): JSX.Element => {
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
          <IonCol size="6">
            <IonItem>
              <IonLabel>Y Axis Metric:</IonLabel>
              <SelectableInput
                allOptions={Object.values(MetricsEnum)}
                selection={[yAxis]}
                onChange={(selection) => changeYAxis(selection[0])}
                instanceDescriptor="SimilarityDiagramYAxis"
                allowMultiselect={false}
              />
            </IonItem>
          </IonCol>
          <IonCol size="6">
            <IonItem>
              <IonLabel>X Axis Metric:</IonLabel>
              <SelectableInput
                allOptions={Object.values(MetricsEnum)}
                selection={[xAxis]}
                onChange={(selection) => changeXAxis(selection[0])}
                instanceDescriptor="SimilarityDiagramXAxis"
                allowMultiselect={false}
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
                    animation: { duration: 0 },
                    scales: {
                      x: definitionRange
                        ? { min: definitionRange[0], max: definitionRange[1] }
                        : undefined,
                      y: valueRange
                        ? { min: valueRange[0], max: valueRange[1] }
                        : undefined,
                    },
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
