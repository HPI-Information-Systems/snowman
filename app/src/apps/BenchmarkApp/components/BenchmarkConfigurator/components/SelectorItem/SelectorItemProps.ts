export interface SelectorItemOwnProps {
  onClick: (event: CustomEvent) => void;
  FirstItem: string;
  FirstItemIcon: string;
  SecondItem: string;
  SecondItemIcon: string;
  ThirdItem: string;
  ThirdItemIcon: string;
}

export type SelectorItemProps = SelectorItemOwnProps;
