export function isInEnum<T>(enumToBeChecked: T, value: string): boolean {
  console.log(value);
  console.log(Object.values(enumToBeChecked));
  return Object.values(enumToBeChecked)
    .map((enumValue) => enumValue.toString())
    .includes(value);
}
