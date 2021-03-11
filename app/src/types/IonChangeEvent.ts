interface ChangeEvent {
  value: string | undefined | null;
}

export type IonChangeEvent = CustomEvent<ChangeEvent>;
