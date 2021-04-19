import 'pages/RootPage/RootPageStyles.css';

import GenericSubApp from 'components/GenericSubApp/GenericSubApp';
import React from 'react';
import { provideSnowmanStore } from 'store/globalStoreInteractor';
import { ViewIDs } from 'types/ViewIDs';

const RootPage = (): JSX.Element => (
  <GenericSubApp
    appId={ViewIDs.HOME}
    appTitle="Home Page"
    createSubAppStore={provideSnowmanStore}
  >
    <div className="ion-text-center introduction">
      <img src="./logo192.png" alt="logo" />
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

export default RootPage;
