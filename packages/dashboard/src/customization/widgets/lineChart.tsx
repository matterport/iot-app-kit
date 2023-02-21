import React from 'react';

import { LineChart } from "@iot-app-kit/react-components";

import { DashboardPlugin } from "../api";
import { useDataSource } from "../hooks/useDataSource";
import { useSelector } from 'react-redux';
import { DashboardState } from '~/store/state';
import MultiQueryWidget from './multiQueryWidget';
import { LineChartWidget } from './types';

const LineChartWidgetComponent: React.FC<LineChartWidget> = (widget) => {
  const viewport = useSelector((state: DashboardState) => state.dashboardConfiguration.viewport);
  const readOnly = useSelector((state: DashboardState) => state.readOnly);

  const { dataSource } = useDataSource();
  const queries = dataSource.query ? [dataSource.query?.timeSeriesData({ assets: widget.properties.queries.assets })] : [];

  return <LineChart queries={queries} viewport={viewport} gestures={readOnly} />;
};

const LineIcon: React.FC = () => (
  <svg viewBox='0 0 30 28' xmlns='http://www.w3.org/2000/svg' className='palette-component-icon'>
    <g fill='none' stroke='inherit'>
      <path d='M2.51 25.012l7.672-11.23L20.99 15.78l4.678-6.7 2.835-5.117' strokeWidth='2'></path>
      <path d='M1.25.25v26h29' strokeWidth='1.75'></path>
    </g>
  </svg>
);

export const lineChartPlugin: DashboardPlugin = {
  install: ({ registerWidget }) => {
    registerWidget<LineChartWidget>('iot-line', {
      render: (widget) => (
        <MultiQueryWidget {...widget}>
          <LineChartWidgetComponent {...widget} />
        </MultiQueryWidget>
      ),
      componentLibrary: {
        name: 'Line',
        icon: LineIcon,
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
