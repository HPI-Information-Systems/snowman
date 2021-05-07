import { IonCol, IonGrid, IonItem, IonLabel, IonRow } from '@ionic/react';
import { MetricsEnum } from 'api';
import { KpiInvestigatorStrategyProps } from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/KpiInvestigatorStrategyProps';
import { ScatterChart } from 'components/simple/ChartComponent/ScatterChart';
import ErroneousBackdrop from 'components/simple/ErroneousBackdrop/ErroneousBackdrop';
import SelectableInput from 'components/stateful/SelectableInput/SelectableInput';
import React from 'react';
import { $enum } from 'ts-enum-util';

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
              allOptions={$enum(MetricsEnum).map((metric) => metric as string)}
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
              allOptions={$enum(MetricsEnum).map((metric) => metric as string)}
              currentOption={yAxis}
              setOption={changeYAxis}
              instanceDescriptor="KpiInvestigatorYAxis"
            />
          </IonItem>
        </IonCol>
      </IonRow>
    </IonGrid>
    <ScatterChart
      data={{
        datasets: datasets,
      }}
    />
  </>
);

export default KpiInvestigatorStrategyView;
