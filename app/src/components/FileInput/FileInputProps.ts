import { ChangeEvent } from 'react';

export type FileInputProps = {
  onChange(event: ChangeEvent<HTMLInputElement>): void;
  selectedFiles: File[];
  allowMultiple?: boolean;
};
