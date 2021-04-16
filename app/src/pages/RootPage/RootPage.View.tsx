import 'pages/RootPage/RootPageStyles.css';

import PageStruct from 'components/PageStruct/PageStruct';
import React from 'react';

const RootPageView = (): JSX.Element => (
  <PageStruct title="Home Page">
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
  </PageStruct>
);

export default RootPageView;
