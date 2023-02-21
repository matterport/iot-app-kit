import React from 'react';

import { StatusGrid } from "@iot-app-kit/react-components";

import { DashboardPlugin } from "../api";
import { useDataSource } from "../hooks/useDataSource";
import { useSelector } from 'react-redux';
import { DashboardState } from '~/store/state';
import SingleQueryWidget from './singleQueryWidget';
import { StatusWidget } from './types';

const StatusWidgetComponent: React.FC<StatusWidget> = (widget) => {
  const viewport = useSelector((state: DashboardState) => state.dashboardConfiguration.viewport);
  const { dataSource } = useDataSource();
  const queries = dataSource.query && widget.properties.query.asset ? [dataSource.query?.timeSeriesData({ assets: [widget.properties.query.asset] })] : [];
    // key hack because queries changing does not actually cause the kpi / status component to rerender
    // will not need when we update to the latest version of status
  const key = `${widget.properties.query.asset?.assetId},${widget.properties.query.asset?.properties.map(p => p.propertyId).join(',')}`

  return <StatusGrid key={key} queries={queries} viewport={viewport} />;
};

const StatusIcon: React.FC = () => (
  <svg
    viewBox='0 0 48 48'
    xmlns='http://www.w3.org/2000/svg'
    fill='inherit'
    stroke='inherit'
    className='palette-component-icon'
  >
    <g transform='translate(10 10)' strokeWidth='2' fill='none' fillRule='evenodd'>
      <rect x='1' y='16.66' width='10' height='10.18' rx='1'></rect>
      <rect x='1' y='1' width='10' height='10.18' rx='1'></rect>
      <rect fill='currentcolor' x='17' y='1' width='10' height='10.18' rx='1'></rect>
      <rect x='17' y='16.66' width='10' height='10.18' rx='1'></rect>
    </g>
  </svg>
);

export const statusPlugin: DashboardPlugin = {
  install: ({ registerWidget }) => {
    registerWidget<StatusWidget>('iot-status', {
      render: (widget) => (
        <SingleQueryWidget {...widget}>
          <StatusWidgetComponent {...widget} />
        </SingleQueryWidget>
      ),
      componentLibrary: {
        name: 'Status',
        icon: StatusIcon,
      },
      properties: () => ({
        query: {
          source: 'iot-sitewise',
          asset: undefined,
        },
        primaryFont: {},
        secondaryFont: {},
      }),
      initialSize: {
        height: 180,
        width: 270,
      }
    });
  }
};
