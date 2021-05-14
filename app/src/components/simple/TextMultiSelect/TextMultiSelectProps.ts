export interface TextMultiSelectOwnProps {
  content: string[];
  suggestions: string[];
  onChange(newContent: string[]): void;
  addText?: string;
}

export type TextMultiSelectProps = TextMultiSelectOwnProps;
