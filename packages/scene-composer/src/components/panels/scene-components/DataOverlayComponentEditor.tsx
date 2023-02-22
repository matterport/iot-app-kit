import React, { useCallback, useContext } from 'react';
import { FormField, SpaceBetween, Textarea } from '@awsui/components-react';
import { useIntl } from 'react-intl';

import { IComponentEditorProps } from '../ComponentEditor';
import { IDataOverlayComponentInternal, ISceneComponentInternal, useStore } from '../../../store';
import { sceneComposerIdContext } from '../../../common/sceneComposerIdContext';
import { Component } from '../../../models/SceneModels';

import { DataBindingMapEditor } from './data-overlay/DataBindingMapEditor';

export interface IDataOverlayComponentEditorProps extends IComponentEditorProps {}

export const DataOverlayComponentEditor: React.FC<IDataOverlayComponentEditorProps> = ({
  node,
  component,
}: IDataOverlayComponentEditorProps) => {
  const sceneComposerId = useContext(sceneComposerIdContext);
  const updateComponentInternal = useStore(sceneComposerId)((state) => state.updateComponentInternal);
  const valueDataBindingProvider = useStore(sceneComposerId)(
    (state) => state.getEditorConfig().valueDataBindingProvider,
  );
  const dataOverlayComponent = component as IDataOverlayComponentInternal;
  const intl = useIntl();

  const onUpdateCallback = useCallback(
    (componentPartial: Partial<IDataOverlayComponentInternal>, replace?: boolean) => {
      const componentPartialWithRef = { ref: component.ref, ...componentPartial };
      updateComponentInternal(node.ref, componentPartialWithRef as ISceneComponentInternal, replace);
    },
    [node.ref, component.ref],
  );

  return (
    <SpaceBetween size='s'>
      <DataBindingMapEditor
        valueDataBindingProvider={valueDataBindingProvider}
        component={dataOverlayComponent}
        onUpdateCallback={onUpdateCallback}
      />

      {dataOverlayComponent.dataRows.length > 0 &&
        dataOverlayComponent.dataRows.map(
          (row, index) =>
            row.rowType === Component.DataOverlayRowType.Markdown && (
              <FormField
                key={index}
                label={intl.formatMessage({ defaultMessage: 'Markdown content', description: 'FormField label' })}
              >
                <Textarea
                  value={row.content}
                  onChange={(e) => {
                    const newRows = [...dataOverlayComponent.dataRows];
                    newRows[index] = { ...newRows[index], content: e.detail.value };
                    onUpdateCallback({ dataRows: newRows });
                  }}
                />
              </FormField>
            ),
        )}
    </SpaceBetween>
  );
};
