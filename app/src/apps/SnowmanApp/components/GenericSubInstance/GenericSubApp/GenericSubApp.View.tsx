import { IonPage, IonSplitPane } from '@ionic/react';
import { GenericSubAppProps } from 'apps/SnowmanApp/components/GenericSubInstance/GenericSubApp/GenericSubAppProps';
import PageStruct from 'apps/SnowmanApp/components/GenericSubInstance/GenericSubApp/PageStruct/PageStruct';
import { centralResourcesRefreshed } from 'apps/SnowmanApp/store/CentralResourcesGenericActions';
import { isEqual } from 'lodash';
import React, { Component, createElement } from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { SnowmanAction } from 'store/messages';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

class GenericSubAppView extends Component<GenericSubAppProps> {
  static defaultProps = { usePageStruct: true };
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

  renderPage(): JSX.Element {
    return (
      <IonPage id="mainViewContentId">
        {!this.props.usePageStruct ? (
          this.props.children
        ) : (
          <PageStruct pageTitle={this.props.appTitle}>
            {this.props.children}
          </PageStruct>
        )}
      </IonPage>
    );
  }

  render(): JSX.Element {
    return (
      <Provider store={this.store}>
        {this.props.activeApp === this.props.instanceId ? (
          <div style={{ position: 'relative', flexGrow: 1 }}>
            {this.props.sideMenu !== undefined ? (
              <IonSplitPane
                when="lg"
                contentId="mainViewContentId"
                class="split-pane-fixed"
              >
                {createElement(this.props.sideMenu, {
                  contentId: 'mainViewContentId',
                })}

                {/* Page Content */}
                {this.renderPage()}
              </IonSplitPane>
            ) : (
              this.renderPage()
            )}
          </div>
        ) : null}
      </Provider>
    );
  }
}

export default GenericSubAppView;
