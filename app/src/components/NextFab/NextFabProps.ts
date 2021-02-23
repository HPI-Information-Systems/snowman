export interface NextFabDispatchProps {
  clickOnFab(): void;
}

export interface NextFabStateProps {
  couldGoNext: boolean;
}

export type NextFabProps = NextFabDispatchProps & NextFabStateProps;
