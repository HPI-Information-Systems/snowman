import styles from 'apps/AboutApp/AboutAppStyles.module.css';
import GenericSubApp from 'apps/SnowmanApp/components/GenericSubInstance/GenericSubApp/GenericSubApp';
import React from 'react';
import style from 'theme/style';
import { ViewIDs } from 'types/ViewIDs';
import { dummyStoreFactory } from 'utils/storeFactory';

const AboutApp = (): JSX.Element => (
  <GenericSubApp
    instanceId={ViewIDs.AboutApp}
    appTitle="About Snowman App"
    createSubAppStore={dummyStoreFactory('AboutAppDummy')}
  >
    <div className={style('ion-text-center', styles.introduction)}>
      <img src="./logo192.png" alt="Snowman Logo" />
      <h1>Welcome to Snowman Benchmark!</h1>
      <p>
        Start by selecting a dataset to work with on the left of this page.
        <br />
        You will be guided through the process necessary to create your first
        analysis!
      </p>
      <p>
        This app is open-source and community-driven.
        <br />
        Contributions of all kinds are welcome - feel free to fork us on Github!
        :)
      </p>
    </div>
  </GenericSubApp>
);

export default AboutApp;
