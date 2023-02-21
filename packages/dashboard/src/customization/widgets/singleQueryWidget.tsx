import React from 'react';
import { useDrop } from 'react-dnd';

import { AssetQuery } from '@iot-app-kit/core';

import { useWidgetActions } from '../hooks/useWidgetActions';
import { ItemTypes } from '~/components/dragLayer/itemTypes';
import { SingleQueryWidget } from './types';

import './queryWidget.css';

const SingleQueryWidgetComponent: React.FC<SingleQueryWidget> = ({ children, ...widget }) => {
  const { update } = useWidgetActions<SingleQueryWidget>();

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.ResourceExplorerAssetProperty,
      drop: ({ queryAssetsParam }: { queryAssetsParam: AssetQuery[] }) => {
        const asset = queryAssetsParam[0];
        update({
          ...widget,
          properties: {
            ...widget.properties,
            query: { source: 'iot-sitewise', asset, }
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

export default SingleQueryWidgetComponent;
