import React from 'react';

import { BarChart } from "@iot-app-kit/react-components";

import { DashboardPlugin } from "../api";
import { useDataSource } from "../hooks/useDataSource";
import { useSelector } from 'react-redux';
import { DashboardState } from '~/store/state';
import MultiQueryWidget from './multiQueryWidget';
import { BarChartWidget } from './types';

const BarChartWidgetComponent: React.FC<BarChartWidget> = (widget) => {
  const viewport = useSelector((state: DashboardState) => state.dashboardConfiguration.viewport);
  const readOnly = useSelector((state: DashboardState) => state.readOnly);

  const { dataSource } = useDataSource();
  const queries = dataSource.query ? [dataSource.query?.timeSeriesData({ assets: widget.properties.queries.assets })] : [];

  return <BarChart queries={queries} viewport={viewport} gestures={readOnly} />;
};

const BarIcon: React.FC = () => (
  <svg
    viewBox='0 0 30 25'
    fill='inherit'
    strokeWidth='0'
    className='palette-component-icon'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M0 23.75h5v-15H0zm6.25 0h5V0h-5zm6.25 0h5V1.25h-5zm6.25 0h5V6.25h-5zm6.25 0h5V12.5h-5z'></path>
  </svg>
);

export const barChartPlugin: DashboardPlugin = {
  install: ({ registerWidget }) => {
    registerWidget<BarChartWidget>('iot-bar', {
      render: (widget) => (
        <MultiQueryWidget {...widget}>
          <BarChartWidgetComponent {...widget} />
        </MultiQueryWidget>
      ),
      componentLibrary: {
        name: 'Bar',
        icon: BarIcon,
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
