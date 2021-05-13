import { EffortParts } from 'api';

export interface EffortInputOwnProps {
  effortParts: EffortParts;
  onChange(newEffortParts: EffortParts): void;
}

export type EffortInputProps = EffortInputOwnProps;
