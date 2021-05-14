import {
  InputChangeEventDetail,
  RangeChangeEventDetail,
  SelectChangeEventDetail,
} from '@ionic/core';

export type IonChangeEvent = CustomEvent<InputChangeEventDetail>;
export type IonSelectChangeEvent = CustomEvent<SelectChangeEventDetail>;
export type IonRangeChangeEvent = CustomEvent<RangeChangeEventDetail>;
