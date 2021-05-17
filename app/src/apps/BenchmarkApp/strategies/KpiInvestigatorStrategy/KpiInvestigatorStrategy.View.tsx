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
import { DiagramCoordinates } from 'apps/BenchmarkApp/types/DiagramCoordinates';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import PageStruct from 'apps/SnowmanApp/components/GenericSubInstance/GenericSubApp/PageStruct/PageStruct';
import {
  ScatterChart,
  ScatterTooltipItem,
} from 'components/simple/ChartComponent/ScatterChart';
import ErroneousBackdrop from 'components/simple/ErroneousBackdrop/ErroneousBackdrop';
import SelectableInput from 'components/stateful/SelectableInput/SelectableInput';
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
    <PageStruct
      pageTitle={StrategyIDs.KpiInvestigator}
      enableScroll={isValidConfig}
    >
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
                currentOption={xAxis}
                setOption={changeXAxis}
                instanceDescriptor="KpiInvestigatorXAxis"
              />
            </IonItem>
          </IonCol>
          <IonCol size="4">
            <IonItem>
              <IonLabel>Y Axis Metric:</IonLabel>
              <SelectableInput
                allOptions={metrics}
                currentOption={yAxis}
                setOption={changeYAxis}
                instanceDescriptor="KpiInvestigatorYAxis"
              />
            </IonItem>
          </IonCol>
          <IonCol size="4">
            <IonItem>
              <IonLabel>Color By:</IonLabel>
              <SelectableInput
                allOptions={Object.values(KpiInvestigatorColorMode)}
                currentOption={colorMode}
                setOption={changeColorMode}
                instanceDescriptor="KpiInvestigatorColorMode"
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
                    plugins: {
                      tooltip: {
                        callbacks: {
                          beforeLabel: (anItem: ScatterTooltipItem): string =>
                            (anItem.raw as DiagramCoordinates).tooltip ??
                            anItem.formattedValue,
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

export default KpiInvestigatorStrategyView;
