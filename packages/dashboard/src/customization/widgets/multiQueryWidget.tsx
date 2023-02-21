import React from 'react';
import { useDrop } from 'react-dnd';

import { AssetQuery } from '@iot-app-kit/core';

import { useWidgetActions } from '../hooks/useWidgetActions';
import { ItemTypes } from '~/components/dragLayer/itemTypes';
import { MultiQueryWidget } from './types';

import './queryWidget.css';

const MultiQueryWidgetComponent: React.FC<MultiQueryWidget> = ({ children, ...widget }) => {
  const { update } = useWidgetActions<MultiQueryWidget>();

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.ResourceExplorerAssetProperty,
      drop: ({ queryAssetsParam }: { queryAssetsParam: AssetQuery[] }) => {
        const asset = queryAssetsParam[0];
        update({
          ...widget,
          properties: {
            ...widget.properties,
            queries: {
              source: 'iot-sitewise',
              assets: [
                ...widget.properties.queries.assets,
                asset,
              ],
            }
          }
        });
      },
    }),
    [widget]
  );

  return (
    <div ref={drop} className="query-widget">
      { children }
    </div>
  );
}

export default MultiQueryWidgetComponent;
