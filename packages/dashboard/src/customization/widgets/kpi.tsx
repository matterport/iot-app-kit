import React from 'react';

import { Kpi } from "@iot-app-kit/react-components";

import { DashboardPlugin } from "../api";
import { useDataSource } from "../hooks/useDataSource";
import { useSelector } from 'react-redux';
import { DashboardState } from '~/store/state';
import SingleQueryWidget from './singleQueryWidget';
import { KPIWidget } from './types';

const KPIWidgetComponent: React.FC<KPIWidget> = (widget) => {
  const viewport = useSelector((state: DashboardState) => state.dashboardConfiguration.viewport);
  const { dataSource } = useDataSource();
  const queries = dataSource.query && widget.properties.query.asset ? [dataSource.query?.timeSeriesData({ assets: [widget.properties.query.asset] })] : [];
    // key hack because queries changing does not actually cause the kpi / status component to rerender
    // will not need when we update to the latest version of kpi
  const key = `${widget.properties.query.asset?.assetId},${widget.properties.query.asset?.properties.map(p => p.propertyId).join(',')}`

  return <Kpi key={key} queries={queries} viewport={viewport} />;
};

const KPIIcon: React.FC = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 33 14'
    fill='inherit'
    stroke='none'
    className='palette-component-icon'
  >
    <path d='M3.7 6.6h.4c.6 0 1.2.1 1.7.4.5.3.9.6 1.2 1.1.3.5.5 1 .5 1.6 0 .7-.2 1.3-.5 1.8s-.8.9-1.5 1.2c-.6.3-1.4.4-2.2.4-1 0-2-.2-3-.6V11c1.2.4 2.1.6 2.9.6.8 0 1.3-.2 1.7-.5s.6-.8.6-1.4C5.5 8.6 4.8 8 3.3 8c-.5 0-1 0-1.5.1V6.9L5 3.5H.4V1.9H7v1.5L3.7 6.6zm9.2 6.6c-1.3 0-2.3-.5-3-1.5-.7-1-1.1-2.4-1.1-4.3s.4-3.3 1.1-4.3c.7-1 1.7-1.5 3-1.5s2.3.5 3 1.5c.7 1 1.1 2.4 1.1 4.3s-.4 3.3-1.1 4.3-1.7 1.5-3 1.5zm0-1.5c.8 0 1.3-.3 1.7-1 .3-.7.4-1.8.4-3.3 0-1.5-.2-2.5-.5-3.2-.3-.7-.9-1-1.7-1s-1.3.3-1.7 1c-.3.7-.5 1.7-.5 3.2 0 1.5.2 2.5.5 3.2.5.7 1 1.1 1.8 1.1zm7.9-3.4c-.9 0-1.5-.3-2-.9-.5-.6-.7-1.4-.7-2.4s.2-1.8.7-2.4c.5-.6 1.1-.9 2-.9s1.5.3 2 .9c.5.6.7 1.4.7 2.4s-.2 1.8-.7 2.4c-.5.7-1.2.9-2 .9zm0-1.1c.4 0 .7-.2.9-.5.2-.4.3-.9.3-1.6 0-.7-.1-1.3-.3-1.6-.2-.3-.5-.5-.9-.5s-.8.1-1 .4-.3.9-.3 1.6c0 .7.1 1.3.3 1.6s.5.6 1 .6zm.8 5.8l5.3-11.1h1.5L23.1 13h-1.5zm7.6.1c-.9 0-1.5-.3-2-.9-.5-.6-.7-1.4-.7-2.4s.2-1.8.7-2.4c.5-.6 1.1-.9 2-.9.9 0 1.5.3 2 .9.5.6.7 1.4.7 2.4s-.2 1.8-.7 2.4c-.5.6-1.1.9-2 .9zm0-1.1c.4 0 .7-.2.9-.5.2-.3.3-.9.3-1.6 0-.7-.1-1.3-.3-1.6-.2-.3-.5-.5-.9-.5s-.7.2-.9.5c-.2.3-.3.8-.3 1.5s.1 1.3.3 1.6c.2.4.5.6.9.6z'></path>
  </svg>
);

export const kpiPlugin: DashboardPlugin = {
  install: ({ registerWidget }) => {
    registerWidget<KPIWidget>('iot-kpi', {
      render: (widget) => (
        <SingleQueryWidget {...widget}>
          <KPIWidgetComponent {...widget} />
        </SingleQueryWidget>
      ),
      componentLibrary: {
        name: 'KPI',
        icon: KPIIcon,
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
        height: 120,
        width: 270,
      }
    });
  }
};
