export interface SmartSplitPaneProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  disabledSelector: (state: any) => boolean;
  children?: JSX.Element | JSX.Element[] | undefined;
}
