import React from 'react';
import { render } from '@testing-library/react';
import { cloneDeep } from 'lodash';

import { mockProvider } from '../../../../../tests/components/panels/scene-components/MockComponents';
import { IDataOverlayComponentInternal } from '../../../../store';

import { DataBindingMapEditor } from './DataBindingMapEditor';

describe('DataBindingMapEditor', () => {
  const component = {
    valueDataBindings: [
      {
        bindingName: 'binding-1',
        valueDataBinding: {
          dataBindingContext: 'random-1',
        },
      },
      {
        bindingName: 'binding-2',
        valueDataBinding: {
          dataBindingContext: 'random-2',
        },
      },
    ],
  } as unknown as IDataOverlayComponentInternal;
  const onUpdateCallbackMock = jest.fn();

  it('should render existing maps with bindings', async () => {
    const { container } = render(
      <DataBindingMapEditor
        valueDataBindingProvider={mockProvider}
        component={component}
        onUpdateCallback={onUpdateCallbackMock}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render with no bindings', async () => {
    const { container } = render(
      <DataBindingMapEditor
        valueDataBindingProvider={mockProvider}
        component={{} as IDataOverlayComponentInternal}
        onUpdateCallback={onUpdateCallbackMock}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render with invalid binding name error', async () => {
    const comp = cloneDeep(component);
    comp.valueDataBindings[0].bindingName = '';
    const { container } = render(
      <DataBindingMapEditor
        valueDataBindingProvider={mockProvider}
        component={comp}
        onUpdateCallback={onUpdateCallbackMock}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render with duplicate binding name error', async () => {
    const comp = cloneDeep(component);
    comp.valueDataBindings[0].bindingName = comp.valueDataBindings[1].bindingName;
    const { container } = render(
      <DataBindingMapEditor
        valueDataBindingProvider={mockProvider}
        component={comp}
        onUpdateCallback={onUpdateCallbackMock}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
