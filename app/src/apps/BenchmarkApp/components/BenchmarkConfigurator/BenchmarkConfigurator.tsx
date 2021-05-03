import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { BenchmarkConfiguratorProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/BenchmarkConfiguratorProps';
import styles from 'apps/BenchmarkApp/components/BenchmarkConfigurator/BenchmarkConfiguratorStyles.module.css';
import {
  analytics,
  ellipsisVerticalCircle,
  flask,
  gitCommit,
} from 'ionicons/icons';
import React from 'react';
import style from 'theme/style';

const BenchmarkConfigurator = ({
  contentId,
}: BenchmarkConfiguratorProps): JSX.Element => (
  <IonMenu contentId={contentId}>
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>Sidebar</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonList>
        <IonItem className={styles.itemNoBorder}>
          <IonLabel>
            <h3>1. Select Ground Truth</h3>
            <IonList className={styles.listNoPadding}>
              <IonItem
                button
                onClick={() => {
                  console.log('click');
                }}
              >
                <IonList
                  className={style(styles.listNoPadding, styles.noBackground)}
                >
                  <IonItem
                    className={style(styles.smallItem, styles.itemNoBorder)}
                  >
                    <IonIcon
                      icon={flask}
                      color="primarydark"
                      className={styles.smallItemIcon}
                      slot="start"
                    />
                    goldstandard
                  </IonItem>
                  <IonItem
                    className={style(
                      styles.smallItem,
                      styles.itemNoBorder,
                      styles.insetOnce
                    )}
                  >
                    <IonIcon
                      icon={analytics}
                      color="primarydark"
                      className={styles.smallItemIcon}
                      slot="start"
                    />
                    squaredist2
                  </IonItem>
                  <IonItem
                    className={style(
                      styles.smallItem,
                      styles.itemNoBorder,
                      styles.insetTwice
                    )}
                  >
                    <IonIcon
                      icon={gitCommit}
                      color="primarydark"
                      className={styles.smallItemIcon}
                      slot="start"
                    />
                    54.435
                  </IonItem>
                </IonList>
                <IonIcon
                  icon={ellipsisVerticalCircle}
                  color="medium"
                  slot="end"
                />
              </IonItem>
            </IonList>
          </IonLabel>
        </IonItem>
        <IonItem className={styles.itemNoBorder}>
          <IonLabel>
            <h3>2. Select Experiment</h3>
            <IonList className={styles.listNoPadding}>
              <IonItem
                button
                onClick={() => {
                  console.log('click');
                }}
              >
                <IonList
                  className={style(styles.listNoPadding, styles.noBackground)}
                >
                  <IonItem
                    className={style(styles.smallItem, styles.itemNoBorder)}
                  >
                    <IonIcon
                      icon={flask}
                      color="primarydark"
                      className={styles.smallItemIcon}
                      slot="start"
                    />
                    goldstandard
                  </IonItem>
                  <IonItem
                    className={style(
                      styles.smallItem,
                      styles.itemNoBorder,
                      styles.insetOnce
                    )}
                  >
                    <IonIcon
                      icon={analytics}
                      color="primarydark"
                      className={styles.smallItemIcon}
                      slot="start"
                    />
                    squaredist2
                  </IonItem>
                  <IonItem
                    className={style(
                      styles.smallItem,
                      styles.itemNoBorder,
                      styles.insetTwice
                    )}
                  >
                    <IonIcon
                      icon={gitCommit}
                      color="primarydark"
                      className={styles.smallItemIcon}
                      slot="start"
                    />
                    54.435
                  </IonItem>
                </IonList>
                <IonIcon
                  icon={ellipsisVerticalCircle}
                  color="medium"
                  slot="end"
                />
              </IonItem>
              <IonItem
                button
                onClick={() => {
                  console.log('click');
                }}
              >
                <IonList
                  className={style(styles.listNoPadding, styles.noBackground)}
                >
                  <IonItem
                    className={style(styles.smallItem, styles.itemNoBorder)}
                  >
                    <IonIcon
                      icon={flask}
                      color="primarydark"
                      className={styles.smallItemIcon}
                      slot="start"
                    />
                    goldstandard
                  </IonItem>
                  <IonItem
                    className={style(
                      styles.smallItem,
                      styles.itemNoBorder,
                      styles.insetOnce
                    )}
                  >
                    <IonIcon
                      icon={analytics}
                      color="primarydark"
                      className={styles.smallItemIcon}
                      slot="start"
                    />
                    squaredist2
                  </IonItem>
                  <IonItem
                    className={style(
                      styles.smallItem,
                      styles.itemNoBorder,
                      styles.insetTwice
                    )}
                  >
                    <IonIcon
                      icon={gitCommit}
                      color="primarydark"
                      className={styles.smallItemIcon}
                      slot="start"
                    />
                    54.435
                  </IonItem>
                </IonList>
                <IonIcon
                  icon={ellipsisVerticalCircle}
                  color="medium"
                  slot="end"
                />
              </IonItem>
            </IonList>
          </IonLabel>
        </IonItem>
        <IonItem className={styles.itemNoBorder}>
          <IonLabel>
            <h3>2. Select Experiment</h3>
            <IonList className={styles.listNoPadding}>
              <IonItem
                button
                onClick={() => {
                  console.log('click');
                }}
              >
                <IonList
                  className={style(styles.listNoPadding, styles.noBackground)}
                >
                  <IonItem
                    className={style(styles.smallItem, styles.itemNoBorder)}
                  >
                    <IonIcon
                      icon={flask}
                      color="primarydark"
                      className={styles.smallItemIcon}
                      slot="start"
                    />
                    goldstandard
                  </IonItem>
                  <IonItem
                    className={style(
                      styles.smallItem,
                      styles.itemNoBorder,
                      styles.insetOnce
                    )}
                  >
                    <IonIcon
                      icon={analytics}
                      color="primarydark"
                      className={styles.smallItemIcon}
                      slot="start"
                    />
                    squaredist2
                  </IonItem>
                  <IonItem
                    className={style(
                      styles.smallItem,
                      styles.itemNoBorder,
                      styles.insetTwice
                    )}
                  >
                    <IonIcon
                      icon={gitCommit}
                      color="primarydark"
                      className={styles.smallItemIcon}
                      slot="start"
                    />
                    54.435
                  </IonItem>
                </IonList>
                <IonIcon
                  icon={ellipsisVerticalCircle}
                  color="medium"
                  slot="end"
                />
              </IonItem>
              <IonItem
                button
                onClick={() => {
                  console.log('click');
                }}
              >
                <IonList
                  className={style(styles.listNoPadding, styles.noBackground)}
                >
                  <IonItem
                    className={style(styles.smallItem, styles.itemNoBorder)}
                  >
                    <IonIcon
                      icon={flask}
                      color="primarydark"
                      className={styles.smallItemIcon}
                      slot="start"
                    />
                    goldstandard
                  </IonItem>
                  <IonItem
                    className={style(
                      styles.smallItem,
                      styles.itemNoBorder,
                      styles.insetOnce
                    )}
                  >
                    <IonIcon
                      icon={analytics}
                      color="primarydark"
                      className={styles.smallItemIcon}
                      slot="start"
                    />
                    squaredist2
                  </IonItem>
                  <IonItem
                    className={style(
                      styles.smallItem,
                      styles.itemNoBorder,
                      styles.insetTwice
                    )}
                  >
                    <IonIcon
                      icon={gitCommit}
                      color="primarydark"
                      className={styles.smallItemIcon}
                      slot="start"
                    />
                    54.435
                  </IonItem>
                </IonList>
                <IonIcon
                  icon={ellipsisVerticalCircle}
                  color="medium"
                  slot="end"
                />
              </IonItem>
            </IonList>
          </IonLabel>
        </IonItem>
      </IonList>
    </IonContent>
  </IonMenu>
);

export default BenchmarkConfigurator;
