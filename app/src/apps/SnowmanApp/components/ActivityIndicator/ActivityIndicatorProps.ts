export interface ActivityIndicatorStateProps {
  existsActiveRequest: boolean;
}

export interface ActivityIndicatorDispatchProps {
  triggerRefresh: () => void;
}

export type ActivityIndicatorProps = ActivityIndicatorStateProps &
  ActivityIndicatorDispatchProps;
