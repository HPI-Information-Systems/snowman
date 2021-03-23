import 'pages/NMetricsPage/NMetricsPageStyles.css';

import { IonCard, IonIcon, IonText } from '@ionic/react';
import PageStruct from 'components/PageStruct/PageStruct';
import { chevronForwardOutline } from 'ionicons/icons';
import React, { useEffect } from 'react';
import ReactTooltip from 'react-tooltip';

export const NMetricsPage = (): JSX.Element => {
  useEffect(() => {
    // Triggered on every component update!
    ReactTooltip.rebuild();
  });

  return (
    <PageStruct title={'N Metrics Viewer'}>
      <IonCard>
        <table className="material-table">
          <thead>
            <tr>
              <th>Metric Name</th>
              <th>
                <IonText
                  color="primary"
                  className="clickable-content"
                  onClick={() => alert('Not implemented yet')}
                  data-tip="Open BinaryMetrics Viewer for experiment."
                >
                  Experiment 1
                  <IonIcon
                    icon={chevronForwardOutline}
                    className="icon-middle-padded"
                  />
                </IonText>
              </th>
              <th>
                <IonText
                  color="primary"
                  className="clickable-content"
                  onClick={() => alert('Not implemented yet')}
                  data-tip="Open BinaryMetrics Viewer for experiment."
                >
                  Experiment 2
                  <IonIcon
                    icon={chevronForwardOutline}
                    className="icon-middle-padded"
                  />
                </IonText>
              </th>
              <th>
                <IonText
                  color="primary"
                  className="clickable-content"
                  onClick={() => alert('Not implemented yet')}
                  data-tip="Open BinaryMetrics Viewer for experiment."
                >
                  Experiment 3
                  <IonIcon
                    icon={chevronForwardOutline}
                    className="icon-middle-padded"
                  />
                </IonText>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Precision</td>
              <td>0.89</td>
              <td>0.85</td>
              <td>0.73</td>
            </tr>
            <tr>
              <td>Recall</td>
              <td>0.89</td>
              <td>0.85</td>
              <td>0.73</td>
            </tr>
            <tr>
              <td>Accuracy</td>
              <td>0.89</td>
              <td>0.85</td>
              <td>0.73</td>
            </tr>
            <tr>
              <td>Really complicated score</td>
              <td>0.89</td>
              <td>0.85</td>
              <td>0.73</td>
            </tr>
            <tr>
              <td>Lorem ipsum</td>
              <td>0.89</td>
              <td>0.85</td>
              <td>0.73</td>
            </tr>
            <tr>
              <td>Dolor sit amet</td>
              <td>0.89</td>
              <td>0.85</td>
              <td>0.73</td>
            </tr>
            <tr>
              <td>Lorem ipsum</td>
              <td>0.89</td>
              <td>0.85</td>
              <td>0.73</td>
            </tr>
            <tr>
              <td>Dolor sit amet</td>
              <td>0.89</td>
              <td>0.85</td>
              <td>0.73</td>
            </tr>
            <tr>
              <td>Lorem ipsum</td>
              <td>0.89</td>
              <td>0.85</td>
              <td>0.73</td>
            </tr>
            <tr>
              <td>Dolor sit amet</td>
              <td>0.89</td>
              <td>0.85</td>
              <td>0.73</td>
            </tr>

            <tr>
              <td>Lorem ipsum</td>
              <td>0.89</td>
              <td>0.85</td>
              <td>0.73</td>
            </tr>
            <tr>
              <td>Dolor sit amet</td>
              <td>0.89</td>
              <td>0.85</td>
              <td>0.73</td>
            </tr>
            <tr>
              <td>Lorem ipsum</td>
              <td>0.89</td>
              <td>0.85</td>
              <td>0.73</td>
            </tr>
            <tr>
              <td>Dolor sit amet</td>
              <td>0.89</td>
              <td>0.85</td>
              <td>0.73</td>
            </tr>
            <tr>
              <td>Lorem ipsum</td>
              <td>0.89</td>
              <td>0.85</td>
              <td>0.73</td>
            </tr>
            <tr>
              <td>Dolor sit amet</td>
              <td>0.89</td>
              <td>0.85</td>
              <td>0.73</td>
            </tr>
            <tr>
              <td>Lorem ipsum</td>
              <td>0.89</td>
              <td>0.85</td>
              <td>0.73</td>
            </tr>
            <tr>
              <td>Dolor sit amet</td>
              <td>0.89</td>
              <td>0.85</td>
              <td>0.73</td>
            </tr>
          </tbody>
        </table>
      </IonCard>
    </PageStruct>
  );
};
