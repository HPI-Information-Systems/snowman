import { IonPage, IonSplitPane } from '@ionic/react';
import { GenericSubAppProps } from 'apps/SnowmanApp/components/GenericSubInstance/GenericSubApp/GenericSubAppProps';
import PageStruct from 'apps/SnowmanApp/components/GenericSubInstance/GenericSubApp/PageStruct/PageStruct';
import { centralResourcesRefreshed } from 'apps/SnowmanApp/store/CentralResourcesGenericActions';
import { isEqual } from 'lodash';
import React, { Component, createElement } from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { NoTabBarViewIDs } from 'structs/constants';
import { SnowmanAction } from 'types/SnowmanAction';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

class GenericSubAppView extends Component<GenericSubAppProps> {
  static defaultProps = { bringOwnPageStruct: false };
  store: Store<unknown, SnowmanAction>;

  constructor(props: GenericSubAppProps) {
    super(props);
    this.store = props.createSubAppStore();
  }

  componentDidUpdate(prevProps: Readonly<GenericSubAppProps>): void {
    if (!isEqual(prevProps.centralResources, this.props.centralResources)) {
      centralResourcesRefreshed(
        this.store.dispatch as SnowmanDispatch<unknown>,
        this.props.centralResources
      );
    }
  }

  render(): JSX.Element {
    return (
      <Provider store={this.store}>
        {this.props.activeApp === this.props.instanceId ? (
          NoTabBarViewIDs.has(this.props.instanceId) ? (
            this.props.children
          ) : (
            <div style={{ position: 'relative', flexGrow: 1 }}>
              <IonSplitPane
                when="lg"
                contentId="mainViewContentId"
                class="split-pane-fixed"
              >
                {this.props.sideMenu !== undefined
                  ? createElement(this.props.sideMenu, {
                      contentId: 'mainViewContentId',
                    })
                  : null}
                {/* Page Content */}
                <IonPage id="mainViewContentId">
                  {this.props.bringOwnPageStruct ? (
                    this.props.children
                  ) : (
                    <PageStruct pageTitle={this.props.appTitle}>
                      {this.props.children}
                    </PageStruct>
                  )}
                </IonPage>
              </IonSplitPane>
            </div>
          )
        ) : null}
      </Provider>
    );
  }
}

export default GenericSubAppView;
