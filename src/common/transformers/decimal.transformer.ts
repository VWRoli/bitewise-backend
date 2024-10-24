export const decimalTransformer = {
  to: (value: number): string => (value ? value.toString() : '0'),
  from: (value: string): number => (value ? parseFloat(value) : 0),
};
