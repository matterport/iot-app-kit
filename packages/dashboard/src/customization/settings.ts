type SimpleFontSettings = {
  fontSize?: number;
  fontColor?: string;
};

type ComplexFontSettings = {
  fontSize?: number;
  fontColor?: string;
  fontFamily?: string;
  isBold?: boolean;
  isItalic?: boolean;
  isUnderlined?: boolean;
};

type ThresholdSettings = {
  comparisonOperator: string;
  comparisonValue: string | boolean | number;
  label?: string;
  color?: string;
};

type AxisSettings = {
  showX?: boolean;
  showY?: boolean;
  yAxisLabel?: string;
};

type LegendSettings = {
  show?: boolean;
  position?: string;
};
