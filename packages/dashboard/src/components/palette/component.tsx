import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';

import { ItemTypes } from '../dragLayer/itemTypes';
import { ComponentPaletteDraggable } from './types';

import PaletteComponentIcon from './icons';

import './component.css';

type PaletteComponentProps = {
  name: string;
  componentTag: string;
  IconComponent: React.FC;
};

const PaletteComponent: React.FC<PaletteComponentProps> = ({ componentTag, name, IconComponent }) => {
  const node = useRef(null);

  const [collected, dragRef] = useDrag(
    () => ({
      type: ItemTypes.Component,
      item: (): ComponentPaletteDraggable => {
        return {
          componentTag,
          rect: node.current ? (node.current as Element).getBoundingClientRect() : null, // Used to determine the cursor offset from the upper left corner on drop
        };
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        initialSourceClientOffset: monitor.getInitialSourceClientOffset(),
      }),
    }),
    []
  );

  const { isDragging } = collected;

  return (
    <div ref={node} className={`palette-component ${isDragging ? 'palette-component-dragging' : ''}`}>
      <div ref={dragRef} className='palette-component-draggable'>
        <PaletteComponentIcon Icon={IconComponent} />
      </div>
      <h1 className='palette-component-name'>{name}</h1>
    </div>
  );
};

export default PaletteComponent;
