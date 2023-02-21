import { DescribeAssetResponse } from "@aws-sdk/client-iotsitewise";
import { AssetQuery, StyleSettingsMap } from "@iot-app-kit/core";

import { Widget } from "~/types";

export type DataSource = 'iot-sitewise';

export type SingleQueryConfig = {
  source: DataSource;
  asset: AssetQuery | undefined;
};

export type MultiQueryConfig = {
  source: DataSource;
  assets: AssetQuery[];
};

export type WriteProperties = {
  source: DataSource;
  resource: { assetId: string; resourceId: string; propertyAlias?: string; };
};


export type SingleQueryProperties = {
  styleSettings?: StyleSettingsMap;
  query: SingleQueryConfig;
  describedAsset?: DescribeAssetResponse;
};

export type MultiQueryProperties = {
  styleSettings?: StyleSettingsMap;
  queries: MultiQueryConfig;
  describedAssets: {
    [assetId: string]: DescribeAssetResponse;
  };
};

export type KPIProperties = SingleQueryProperties & {
  primaryFont: SimpleFontSettings;
  secondaryFont: SimpleFontSettings;
  showValue?: boolean;
  showUnit?: boolean;
  showIcon?: boolean;
  showName?: boolean;
  showTimestamp?: boolean;
  thresholds?: ThresholdSettings;
};

export type StatusProperties = SingleQueryProperties & {
  primaryFont: SimpleFontSettings;
  secondaryFont: SimpleFontSettings;
  showValue?: boolean;
  showUnit?: boolean;
  showIcon?: boolean;
  showName?: boolean;
  thresholds?: ThresholdSettings;
  backgroundColor?: string;
};

export type LineChartProperties = MultiQueryProperties & {
  thresholds?: ThresholdSettings;
  axis?: AxisSettings;
  legend?: LegendSettings;
};

export type ScatterChartProperties = MultiQueryProperties & {
  thresholds?: ThresholdSettings;
  axis?: AxisSettings;
  legend?: LegendSettings;
};

export type BarChartProperties = MultiQueryProperties & {
  thresholds?: ThresholdSettings;
  axis?: AxisSettings;
  legend?: LegendSettings;
};

export type TableProperties = MultiQueryProperties & {
  thresholds?: ThresholdSettings;
  fontSettings?: ComplexFontSettings;
};

export type TextProperties = {
  fontSettings?: ComplexFontSettings;
  value: string;
  isUrl?: boolean;
  href?: string;
};

export type InputProperties = WriteProperties & {
  options: { label: string; id: string }[];
};

export type SingleQueryWidget = Widget<SingleQueryProperties>;
export type MultiQueryWidget = Widget<MultiQueryProperties>;

export type KPIWidget = Widget<KPIProperties>;
export type StatusWidget = Widget<StatusProperties>;
export type LineChartWidget = Widget<LineChartProperties>;
export type ScatterChartWidget = Widget<ScatterChartProperties>;
export type BarChartWidget = Widget<BarChartProperties>;
export type TableWidget = Widget<TableProperties>;
export type TextWidget = Widget<TextProperties>;
export type InputWidget = Widget<InputProperties>;
