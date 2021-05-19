import { GenericStoreComponentProps } from 'utils/GenericStoreComponentFactory';

export interface TextMultiSelectOwnProps extends GenericStoreComponentProps {
  content: string[];
  suggestions: string[];
  onChange(newContent: string[]): void;
  addText?: string;
}

export type TextMultiSelectProps = TextMultiSelectOwnProps;
