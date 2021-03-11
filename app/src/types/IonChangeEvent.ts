import React from 'react';

interface ChangeEvent {
  value: string | undefined | null;
}

export type IonChangeEvent = CustomEvent<ChangeEvent>;

export type IonInputMouseEvent = React.MouseEvent<HTMLIonInputElement>;
