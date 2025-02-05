import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { onSelectWidgetsAction } from '~/store/actions';
import { DashboardState } from '~/store/state';
import { Position, Widget, Selection } from '~/types';
import { getSelectedWidgets, pointSelect, selectedRect } from '~/util/select';
import { DragEvent } from '../../grid';
import { Gesture } from './types';

type SelectionHooksProps = {
  setActiveGesture: React.Dispatch<React.SetStateAction<Gesture>>;
  dashboardConfiguration: DashboardState['dashboardConfiguration'];
  cellSize: DashboardState['grid']['cellSize'];
};

export const useSelectionGestures = ({ setActiveGesture, dashboardConfiguration, cellSize }: SelectionHooksProps) => {
  const dispatch = useDispatch();
  const selectWidgets = (widgets: Widget[], union: boolean) => {
    dispatch(
      onSelectWidgetsAction({
        widgets,
        union,
      })
    );
  };

  const [userSelection, setUserSelection] = useState<Selection | undefined>(undefined);

  const onPointSelect = useCallback(
    ({ position, union }: { position: Position; union: boolean }) => {
      const intersectedWidget = pointSelect({
        dashboardConfiguration,
        cellSize,
        position,
      });

      selectWidgets(intersectedWidget ? [intersectedWidget] : [], union);
    },
    [dashboardConfiguration, cellSize]
  );

  const onSelectionStart = (dragEvent: DragEvent) => {
    setActiveGesture('select');
    setUserSelection({
      start: dragEvent.start,
      end: dragEvent.end,
    });
  };

  const onSelectionUpdate = useCallback(
    (dragEvent: DragEvent) => {
      const updatedSelection = {
        start: dragEvent.start,
        end: dragEvent.end,
      };
      setUserSelection(updatedSelection);

      const union = dragEvent.union;

      const intersectedWidgets = getSelectedWidgets({
        selectedRect: selectedRect(updatedSelection),
        dashboardConfiguration,
        cellSize,
      });

      selectWidgets(intersectedWidgets, union);
    },
    [dashboardConfiguration, cellSize]
  );

  const onSelectionEnd = () => {
    setUserSelection(undefined);
  };

  return {
    userSelection,
    onPointSelect,
    onSelectionStart,
    onSelectionUpdate,
    onSelectionEnd,
  };
};
