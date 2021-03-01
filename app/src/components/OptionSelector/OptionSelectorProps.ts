import { Option } from 'types/Option';

export interface OptionSelectorProps {
  title: string;
  optionsList: Option[];
  clickOnCard(id: number): void;
  deleteCardHandler(id: number): void;
  editCardHandler(id: number): void;
  selected: number[];
  multiple?: boolean;
}
