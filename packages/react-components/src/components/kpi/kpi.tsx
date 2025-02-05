import React from 'react';
import { KpiBase } from './kpiBase';
import { TimeQuery, TimeSeriesData, TimeSeriesDataRequest, StyleSettingsMap, Viewport } from '@iot-app-kit/core';
import { useTimeSeriesData } from '../../hooks/useTimeSeriesData';
import { useViewport } from '../../hooks/useViewport';
import { widgetPropertiesFromInputs } from '../../common/widgetPropertiesFromInputs';
import { Annotations } from '../../common/thresholdTypes';
import { KPISettings } from './types';

export const Kpi = ({
  query,
  viewport: passedInViewport,
  annotations,
  styles,
  settings,
}: {
  query: TimeQuery<TimeSeriesData[], TimeSeriesDataRequest>;
  viewport?: Viewport;
  annotations?: Annotations;
  styles?: StyleSettingsMap;
  settings?: KPISettings;
}) => {
  const { dataStreams } = useTimeSeriesData({
    viewport: passedInViewport,
    query,
    settings: { fetchMostRecentBeforeEnd: true },
    styles,
  });
  const { viewport } = useViewport();

  const utilizedViewport = passedInViewport || viewport; // explicitly passed in viewport overrides viewport group

  const { propertyPoint, alarmPoint, alarmThreshold, propertyThreshold, alarmStream, propertyStream } =
    widgetPropertiesFromInputs({ dataStreams, annotations, viewport: utilizedViewport });

  const name = propertyStream?.name || alarmStream?.name;
  const unit = propertyStream?.unit || alarmStream?.unit;
  const color = alarmThreshold?.color || propertyThreshold?.color || settings?.color;

  return (
    <KpiBase
      propertyPoint={propertyPoint}
      alarmPoint={alarmPoint}
      settings={settings}
      name={name}
      unit={unit}
      color={color}
    />
  );
};
