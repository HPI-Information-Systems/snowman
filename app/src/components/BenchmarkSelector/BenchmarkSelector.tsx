import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonMenu,
  IonSearchbar,
  IonToolbar,
} from '@ionic/react';
import styles from 'components/BenchmarkSelector/BenchmarkSelectorStyles.module.css';
import {
  checkmarkCircleOutline,
  chevronDownCircle,
  radioButtonOffOutline,
} from 'ionicons/icons';
import React from 'react';

const BenchmarkSelector = ({
  contentId,
}: {
  contentId: string;
}): JSX.Element => {
  return (
    <IonMenu contentId={contentId}>
      <IonHeader>
        <IonToolbar color="primary">
          <IonSearchbar placeholder="Search experiments" />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonIcon
              icon={chevronDownCircle}
              color="primary"
              slot="start"
              class={styles.chevron}
            />
            MatchingSolution 1
            <IonIcon icon={radioButtonOffOutline} color={'medium'} slot="end" />
          </IonItem>
          <IonList class={styles.listInset}>
            <IonItem>
              <IonIcon
                icon={chevronDownCircle}
                color="primary"
                slot="start"
                class={styles.chevron}
              />
              Dataset 1
              <IonIcon
                icon={radioButtonOffOutline}
                color={'medium'}
                slot="end"
              />
            </IonItem>
            <IonList class={styles.listInsetMax}>
              <IonItem>
                Experiment_28457185
                <IonIcon
                  icon={checkmarkCircleOutline}
                  color={'primary'}
                  slot="end"
                />
              </IonItem>
              <IonItem>
                Experiment_28457185
                <IonIcon
                  icon={radioButtonOffOutline}
                  color={'medium'}
                  slot="end"
                />
              </IonItem>
              <IonItem>
                Experiment_28457185
                <IonIcon
                  icon={checkmarkCircleOutline}
                  color={'primary'}
                  slot="end"
                />
              </IonItem>
              <IonItem>
                Experiment_28457185
                <IonIcon
                  icon={radioButtonOffOutline}
                  color={'medium'}
                  slot="end"
                />
              </IonItem>
            </IonList>
            <IonItem>
              <IonIcon
                icon={chevronDownCircle}
                color="primary"
                slot="start"
                class={styles.chevron}
              />
              Dataset 2
              <IonIcon
                icon={checkmarkCircleOutline}
                color={'primary'}
                slot="end"
              />
            </IonItem>
            <IonList class={styles.listInsetMax}>
              <IonItem>
                Experiment_28457185
                <IonIcon
                  icon={checkmarkCircleOutline}
                  color={'primary'}
                  slot="end"
                />
              </IonItem>
              <IonItem>
                Experiment_28457185
                <IonIcon
                  icon={checkmarkCircleOutline}
                  color={'primary'}
                  slot="end"
                />
              </IonItem>
              <IonItem>
                Experiment_28457185
                <IonIcon
                  icon={checkmarkCircleOutline}
                  color={'primary'}
                  slot="end"
                />
              </IonItem>
            </IonList>
            <IonItem>
              <IonIcon
                icon={chevronDownCircle}
                color="primary"
                slot="start"
                class={styles.chevron}
              />
              Dataset 3
              <IonIcon
                icon={radioButtonOffOutline}
                color={'medium'}
                slot="end"
              />
            </IonItem>
            <IonList class={styles.listInsetMax}>
              <IonItem>
                Experiment_28457185
                <IonIcon
                  icon={radioButtonOffOutline}
                  color={'medium'}
                  slot="end"
                />
              </IonItem>
              <IonItem>
                Experiment_28457185
                <IonIcon
                  icon={radioButtonOffOutline}
                  color={'medium'}
                  slot="end"
                />
              </IonItem>
              <IonItem>
                Experiment_28457185
                <IonIcon
                  icon={radioButtonOffOutline}
                  color={'medium'}
                  slot="end"
                />
              </IonItem>
              <IonItem>
                Experiment_28457185
                <IonIcon
                  icon={radioButtonOffOutline}
                  color={'medium'}
                  slot="end"
                />
              </IonItem>
            </IonList>
            <IonItem>
              <IonIcon
                icon={chevronDownCircle}
                color="primary"
                slot="start"
                class={styles.chevron}
              />
              MatchingSolution 2
              <IonIcon
                icon={radioButtonOffOutline}
                color={'medium'}
                slot="end"
              />
            </IonItem>
            <IonList class={styles.listInset}>
              <IonItem>
                <IonIcon
                  icon={chevronDownCircle}
                  color="primary"
                  slot="start"
                  class={styles.chevron}
                />
                Dataset 1
                <IonIcon
                  icon={radioButtonOffOutline}
                  color={'medium'}
                  slot="end"
                />
              </IonItem>
              <IonList class={styles.listInsetMax}>
                <IonItem>
                  Experiment_28457185
                  <IonIcon
                    icon={radioButtonOffOutline}
                    color={'medium'}
                    slot="end"
                  />
                </IonItem>
                <IonItem>
                  Experiment_28457185
                  <IonIcon
                    icon={radioButtonOffOutline}
                    color={'medium'}
                    slot="end"
                  />
                </IonItem>
                <IonItem>
                  Experiment_28457185
                  <IonIcon
                    icon={radioButtonOffOutline}
                    color={'medium'}
                    slot="end"
                  />
                </IonItem>
                <IonItem>
                  Experiment_28457185
                  <IonIcon
                    icon={radioButtonOffOutline}
                    color={'medium'}
                    slot="end"
                  />
                </IonItem>
              </IonList>
              <IonItem>
                <IonIcon
                  icon={chevronDownCircle}
                  color="primary"
                  slot="start"
                  class={styles.chevron}
                />
                Dataset 2
                <IonIcon
                  icon={radioButtonOffOutline}
                  color={'medium'}
                  slot="end"
                />
              </IonItem>
              <IonList class={styles.listInsetMax}>
                <IonItem>
                  Experiment_28457185
                  <IonIcon
                    icon={radioButtonOffOutline}
                    color={'medium'}
                    slot="end"
                  />
                </IonItem>
                <IonItem>
                  Experiment_28457185
                  <IonIcon
                    icon={radioButtonOffOutline}
                    color={'medium'}
                    slot="end"
                  />
                </IonItem>
                <IonItem>
                  Experiment_28457185
                  <IonIcon
                    icon={radioButtonOffOutline}
                    color={'medium'}
                    slot="end"
                  />
                </IonItem>
                <IonItem>
                  Experiment_28457185
                  <IonIcon
                    icon={radioButtonOffOutline}
                    color={'medium'}
                    slot="end"
                  />
                </IonItem>
              </IonList>
              <IonItem>
                <IonIcon
                  icon={chevronDownCircle}
                  color="primary"
                  slot="start"
                  class={styles.chevron}
                />
                Dataset 3
                <IonIcon
                  icon={radioButtonOffOutline}
                  color={'medium'}
                  slot="end"
                />
              </IonItem>
              <IonList class={styles.listInsetMax}>
                <IonItem>
                  Experiment_28457185
                  <IonIcon
                    icon={radioButtonOffOutline}
                    color={'medium'}
                    slot="end"
                  />
                </IonItem>
                <IonItem>
                  Experiment_28457185
                  <IonIcon
                    icon={radioButtonOffOutline}
                    color={'medium'}
                    slot="end"
                  />
                </IonItem>
                <IonItem>
                  Experiment_28457185
                  <IonIcon
                    icon={radioButtonOffOutline}
                    color={'medium'}
                    slot="end"
                  />
                </IonItem>
                <IonItem>
                  Experiment_28457185
                  <IonIcon
                    icon={radioButtonOffOutline}
                    color={'medium'}
                    slot="end"
                  />
                </IonItem>
              </IonList>
            </IonList>
          </IonList>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default BenchmarkSelector;
