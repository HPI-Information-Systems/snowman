import { InputChangeEventDetail, RangeChangeEventDetail } from '@ionic/core';

export type IonChangeEvent = CustomEvent<InputChangeEventDetail>;
export type IonRangeChangeEvent = CustomEvent<RangeChangeEventDetail>;
