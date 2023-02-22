import React, { useCallback } from 'react';
import { Box, Button, ExpandableSection, FormField, Input, SpaceBetween } from '@awsui/components-react';
import { useIntl } from 'react-intl';
import { isEmpty } from 'lodash';

import { IValueDataBinding, IValueDataBindingProvider } from '../../../../interfaces';
import { IDataOverlayComponentInternal } from '../../../../store';
import { ValueDataBindingBuilder } from '../ValueDataBindingBuilder';
import { generateUUID } from '../../../../utils/mathUtils';

interface IDataBindingMapEditorProps {
  valueDataBindingProvider: IValueDataBindingProvider | undefined;
  component: IDataOverlayComponentInternal;
  onUpdateCallback: (componentPartial: Partial<IDataOverlayComponentInternal>, replace?: boolean | undefined) => void;
}

export const DataBindingMapEditor: React.FC<IDataBindingMapEditorProps> = ({
  valueDataBindingProvider,
  component,
  onUpdateCallback,
}) => {
  const intl = useIntl();

  const bindingNameError = useCallback(
    (bindingName) => {
      if (isEmpty(bindingName)) {
        return intl.formatMessage({ defaultMessage: 'Invalid name', description: 'Input error message' });
      }
      if (component.valueDataBindings.filter((v) => v.bindingName === bindingName).length > 1) {
        return intl.formatMessage({ defaultMessage: 'Duplicate name', description: 'Input error message' });
      }
      return null;
    },
    [component.valueDataBindings, intl],
  );

  const onBindingNameChange = useCallback(
    (e, index) => {
      const newBindings = [...component.valueDataBindings];
      newBindings[index] = { ...newBindings[index], bindingName: e.detail.value };
      onUpdateCallback({ valueDataBindings: newBindings });
    },
    [component.valueDataBindings, onUpdateCallback],
  );

  const onBindingChange = useCallback(
    (valueDataBinding: IValueDataBinding, index) => {
      // we don't want to merge the dataBindingContext, so we'll need to manually replace it
      const updatedComponent = {
        ...component,
        valueDataBindings: [...component.valueDataBindings],
      };
      updatedComponent.valueDataBindings[index] = {
        ...updatedComponent.valueDataBindings[index],
        valueDataBinding,
      };
      onUpdateCallback(updatedComponent, true);
    },
    [component.valueDataBindings, onUpdateCallback],
  );

  const onRemoveBinding = useCallback(
    (index) => {
      const newBindings = component.valueDataBindings.filter((_, i) => i !== index);
      onUpdateCallback({ ...component, valueDataBindings: newBindings }, true);
    },
    [component.valueDataBindings, onUpdateCallback],
  );

  const onAddBinding = useCallback(() => {
    const newBindings = [...component.valueDataBindings];
    newBindings.push({ bindingName: generateUUID() });
    onUpdateCallback({ valueDataBindings: newBindings });
  }, [component.valueDataBindings, onUpdateCallback]);

  return (
    <SpaceBetween size='s'>
      {valueDataBindingProvider && (
        <>
          {!isEmpty(component.valueDataBindings) &&
            component.valueDataBindings.map(({ bindingName, valueDataBinding }, index) => (
              <ExpandableSection header={bindingName} key={index}>
                <FormField
                  errorText={bindingNameError(bindingName)}
                  label={intl.formatMessage({ defaultMessage: 'Binding Name', description: 'FormField label' })}
                >
                  <Input
                    data-test-id='binding-name-input'
                    value={bindingName}
                    onChange={(e) => onBindingNameChange(e, index)}
                  />
                </FormField>

                <Box margin={{ vertical: 's' }}>
                  <ValueDataBindingBuilder
                    componentRef={component.ref}
                    binding={valueDataBinding}
                    valueDataBindingProvider={valueDataBindingProvider}
                    onChange={(v) => onBindingChange(v, index)}
                  />
                </Box>
                <Button data-test-id='remove-binding-button' onClick={() => onRemoveBinding(index)}>
                  {intl.formatMessage({ defaultMessage: 'Remove data binding', description: 'Button text' })}
                </Button>
              </ExpandableSection>
            ))}
          <Button data-test-id='add-binding-button' onClick={onAddBinding}>
            {intl.formatMessage({ defaultMessage: 'Add data binding', description: 'Button text' })}
          </Button>
        </>
      )}
    </SpaceBetween>
  );
};
