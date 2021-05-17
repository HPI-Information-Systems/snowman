import {
  IonCard,
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonRow,
} from '@ionic/react';
import { DiagramCoordinates, MetricsEnum } from 'api';
import styles from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/KpiInvestigatorStrategyStyles.module.css';
import { SimilarityDiagramStrategyProps } from 'apps/BenchmarkApp/strategies/SimilarityDiagramStrategy/SimilarityDiagramStrategyProps';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import PageStruct from 'apps/SnowmanApp/components/GenericSubInstance/GenericSubApp/PageStruct/PageStruct';
import {
  ScatterChart,
  ScatterTooltipItem,
} from 'components/simple/ChartComponent/ScatterChart';
import ErroneousBackdrop from 'components/simple/ErroneousBackdrop/ErroneousBackdrop';
import SelectableInput from 'components/stateful/SelectableInput/SelectableInput';
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
    <PageStruct
      pageTitle={StrategyIDs.SimilarityDiagram}
      enableScroll={isValidConfig}
    >
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
                currentOption={yAxis}
                setOption={changeYAxis}
                instanceDescriptor="SimilarityDiagramYAxis"
              />
            </IonItem>
          </IonCol>
          <IonCol size="6">
            <IonItem>
              <IonLabel>X Axis Metric:</IonLabel>
              <SelectableInput
                allOptions={Object.values(MetricsEnum)}
                currentOption={xAxis}
                setOption={changeXAxis}
                instanceDescriptor="SimilarityDiagramXAxis"
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
                    plugins: {
                      tooltip: {
                        callbacks: {
                          beforeLabel: (anItem: ScatterTooltipItem): string => {
                            const threshold = (anItem.raw as DiagramCoordinates)
                              .threshold;
                            if (typeof threshold === 'number') {
                              return `Threshold: ${threshold.toPrecision(3)}`;
                            } else {
                              return anItem.formattedValue;
                            }
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </PageStruct>
  );
};

export default SimilarityDiagramStrategyView;
