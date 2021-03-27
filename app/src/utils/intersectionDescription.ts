export function intersectionDescription({
  excluded = [],
  included = [],
  pairCount,
}: {
  pairCount?: number;
  included?: string[];
  excluded?: string[];
}): string {
  let description = '';
  if (included.length > 0) {
    description += included.join(' ∩ ');
  } else {
    description += 'Ω';
  }
  description += ['', ...excluded].join(' \\ ');
  description += pairCount === undefined ? '' : ` (${pairCount} pairs)`;
  return description;
}
