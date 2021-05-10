import {
  IonCard,
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonRow,
} from '@ionic/react';
import { KpiInvestigatorStrategyProps } from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/KpiInvestigatorStrategyProps';
import styles from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/KpiInvestigatorStrategyStyles.module.css';
import { ScatterChart } from 'components/simple/ChartComponent/ScatterChart';
import ErroneousBackdrop from 'components/simple/ErroneousBackdrop/ErroneousBackdrop';
import SelectableInput from 'components/stateful/SelectableInput/SelectableInput';
import React from 'react';
import { AllMetricsObject } from 'types/AllMetricsEnum';

const KpiInvestigatorStrategyView = ({
  isValidConfig,
  datasets,
  xAxis,
  changeXAxis,
  yAxis,
  changeYAxis,
}: KpiInvestigatorStrategyProps): JSX.Element => (
  <>
    <ErroneousBackdrop
      shouldShow={!isValidConfig}
      message={'Please select at least a one diagram track!'}
    />
    <IonGrid>
      <IonRow>
        <IonCol size="6">
          <IonItem>
            <IonLabel>X Axis Metric:</IonLabel>
            <SelectableInput
              allOptions={Object.values(AllMetricsObject).map(
                (metric) => metric as string
              )}
              currentOption={xAxis}
              setOption={changeXAxis}
              instanceDescriptor="KpiInvestigatorXAxis"
            />
          </IonItem>
        </IonCol>
        <IonCol size="6">
          <IonItem>
            <IonLabel>Y Axis Metric:</IonLabel>
            <SelectableInput
              allOptions={Object.values(AllMetricsObject).map(
                (metric) => metric as string
              )}
              currentOption={yAxis}
              setOption={changeYAxis}
              instanceDescriptor="KpiInvestigatorYAxis"
            />
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="12">
          <IonCard>
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

export default KpiInvestigatorStrategyView;
