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
import { KpiInvestigatorColorMode } from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/types/KpiInvestigatorStrategyModel';
import { ScatterChart } from 'components/simple/ChartComponent/ScatterChart';
import ErroneousBackdrop from 'components/simple/ErroneousBackdrop/ErroneousBackdrop';
import SelectableInput from 'components/stateful/SelectableInputFactory/flavors/SelectableInput';
import React from 'react';
import {
  AllMetricsObject,
  OmitMetricsOnSoftKPIPage,
} from 'types/AllMetricsEnum';

const KpiInvestigatorStrategyView = ({
  isValidConfig,
  datasets,
  xAxis,
  changeXAxis,
  yAxis,
  changeYAxis,
  changeColorMode,
  colorMode,
  definitionRange,
  valueRange,
}: KpiInvestigatorStrategyProps): JSX.Element => {
  const metrics = Object.values(AllMetricsObject)
    .filter((metric) => !OmitMetricsOnSoftKPIPage.has(metric))
    .map((metric) => metric as string);
  return (
    <>
      <ErroneousBackdrop
        shouldShow={!isValidConfig}
        message={
          'Please select at least a one diagram track containing a dataset, gold standard and one or more experiments!'
        }
      />
      <IonGrid>
        <IonRow>
          <IonCol size="4">
            <IonItem>
              <IonLabel>X Axis Metric:</IonLabel>
              <SelectableInput
                allOptions={metrics}
                selection={[xAxis]}
                onChange={(selection) => changeXAxis(selection[0])}
                instanceDescriptor="KpiInvestigatorXAxis"
                allowMultiselect={false}
              />
            </IonItem>
          </IonCol>
          <IonCol size="4">
            <IonItem>
              <IonLabel>Y Axis Metric:</IonLabel>
              <SelectableInput
                allOptions={metrics}
                selection={[yAxis]}
                onChange={(selection) => changeYAxis(selection[0])}
                instanceDescriptor="KpiInvestigatorYAxis"
                allowMultiselect={false}
              />
            </IonItem>
          </IonCol>
          <IonCol size="4">
            <IonItem>
              <IonLabel>Color By:</IonLabel>
              <SelectableInput
                allOptions={Object.values(KpiInvestigatorColorMode)}
                selection={[colorMode]}
                onChange={(selection) => changeColorMode(selection[0])}
                instanceDescriptor="KpiInvestigatorColorMode"
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
                    scales: {
                      x: definitionRange
                        ? { min: definitionRange[0], max: definitionRange[1] }
                        : undefined,
                      y: valueRange
                        ? { min: valueRange[0], max: valueRange[1] }
                        : undefined,
                    },
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

export default KpiInvestigatorStrategyView;
