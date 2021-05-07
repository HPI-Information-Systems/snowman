export function isInEnum<T>(enumToBeChecked: T, value: string): boolean {
  const x = Object.values(enumToBeChecked)
    .map((enumValue) => enumValue.toString())
    .includes(value);
  return x;
}
