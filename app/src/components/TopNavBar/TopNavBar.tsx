import 'components/TopNavBar/TopNavBarStyles.css';

import { IonToolbar } from '@ionic/react';
import React from 'react';

const TopNavBar = (): JSX.Element => (
  <IonToolbar color="primary">
    <div className="top-navbar-container">
      <span className="top-navbar-element active">BENCHMARK</span>
      <span className="top-navbar-element">DATASETS</span>
      <span className="top-navbar-element">EXPERIMENTS</span>
      <span className="top-navbar-element">MATCHING SOLUTIONS</span>
    </div>
  </IonToolbar>
);

export default TopNavBar;
