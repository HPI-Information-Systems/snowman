export function isInEnum<T>(enumToBeChecked: T, value: string): boolean {
  return Object.values(enumToBeChecked)
    .map((enumValue) => enumValue.toString())
    .includes(value);
}
