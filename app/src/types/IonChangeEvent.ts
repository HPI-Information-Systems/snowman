import { InputChangeEventDetail, SelectChangeEventDetail } from '@ionic/core';

export type IonChangeEvent = CustomEvent<InputChangeEventDetail>;
export type IonSelectChangeEvent = CustomEvent<SelectChangeEventDetail>;
