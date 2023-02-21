import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onChangeDashboardGridEnabledAction } from '~/store/actions';

import StyledText from './styledText';
import EditableStyledText from './styledText/editableText';
import StyledTextArea from './styledText/textArea';

import TextLink from './link';
import EditableTextLink from './link/editableLink';

import './index.css';
import { DashboardPlugin } from '~/customization/api';
import { TextWidget } from '../types';
import { DashboardState } from '~/store/state';
import { useIsSelected } from '~/customization/hooks/useIsSelected';

const TextWidgetComponent: React.FC<TextWidget> = (widget) => {
  const readOnly = useSelector((state: DashboardState) => state.readOnly);
  const isSelected = useIsSelected(widget);
  const { isUrl } = widget.properties;

  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleSetEdit = (editing: boolean) => {
    dispatch(onChangeDashboardGridEnabledAction({ enabled: !editing }));
    setIsEditing(editing);
  };

  const props = { readOnly, isSelected, handleSetEdit, ...widget };

  if (readOnly) {
    if (isUrl) {
      return <TextLink {...widget} />;
    } else {
      return <StyledText {...widget} />;
    }
  } else {
    if (isUrl) {
      return <EditableTextLink {...props} />;
    } else if (isEditing) {
      return <StyledTextArea {...props} />;
    } else {
      return <EditableStyledText {...props} />;
    }
  }
};

const TextIcon: React.FC = () => {
  return (
    <svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' className='palette-component-icon'>
      <text x='5' y='15'>
        T
      </text>
      <line x1='2.5' y1='20' x2='17.5' y2='20' stroke='inherit' strokeWidth='2'></line>
    </svg>
  );
};

export const textPlugin: DashboardPlugin = {
  install: ({ registerWidget }) => {
    registerWidget<TextWidget>('text', {
      render: (widget) => (
        <TextWidgetComponent {...widget} />
      ),
      componentLibrary: {
        name: 'Text',
        icon: TextIcon,
      },
      properties: () => ({
        value: '',
      }),
      initialSize: {
        height: 50,
        width: 150,
      }
    });
  }
};
