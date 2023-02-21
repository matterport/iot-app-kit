import React from 'react';

import { ScatterChart } from "@iot-app-kit/react-components";

import { DashboardPlugin } from "../api";
import { useDataSource } from "../hooks/useDataSource";
import { useSelector } from 'react-redux';
import { DashboardState } from '~/store/state';
import MultiQueryWidget from './multiQueryWidget';
import { ScatterChartWidget } from './types';

const ScatterChartWidgetComponent: React.FC<ScatterChartWidget> = (widget) => {
  const viewport = useSelector((state: DashboardState) => state.dashboardConfiguration.viewport);
  const readOnly = useSelector((state: DashboardState) => state.readOnly);

  const { dataSource } = useDataSource();
  const queries = dataSource.query ? [dataSource.query?.timeSeriesData({ assets: widget.properties.queries.assets })] : [];

  return <ScatterChart queries={queries} viewport={viewport} gestures={readOnly} />;
};

const ScatterIcon: React.FC = () => (
  <svg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg' className='palette-component-icon'>
    <g stroke='inherit' fill='none'>
      <path d='M1 1v26.25h28.75' strokeWidth='1.75'></path>
      <circle fill='currentColor' cx='6' cy='22' r='2' stroke='none'></circle>
      <circle fill='currentColor' cx='11' cy='15' r='2' stroke='none'></circle>
      <circle fill='currentColor' cx='17' cy='19' r='2' stroke='none'></circle>
      <circle fill='currentColor' cx='22' cy='12' r='2' stroke='none'></circle>
      <circle fill='currentColor' cx='27' cy='6' r='2' stroke='none'></circle>
    </g>
  </svg>
);

export const scatterChartPlugin: DashboardPlugin = {
  install: ({ registerWidget }) => {
    registerWidget<ScatterChartWidget>('iot-scatter', {
      render: (widget) => (
        <MultiQueryWidget {...widget}>
          <ScatterChartWidgetComponent {...widget} />
        </MultiQueryWidget>
      ),
      componentLibrary: {
        name: 'Scatter',
        icon: ScatterIcon,
      },
      properties: () => ({
        queries: {
          source: 'iot-sitewise',
          assets: [],
        },
        describedAssets: {},
      }),
      initialSize: {
        height: 150,
        width: 270,
      }
    });
  }
};
