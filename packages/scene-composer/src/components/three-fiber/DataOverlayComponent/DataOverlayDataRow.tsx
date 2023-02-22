import React, { ReactElement } from 'react';
import ReactMarkdown from 'react-markdown';

import { Component } from '../../../models/SceneModels';
import './styles.scss';

export interface DataOverlayDataRowProps {
  rowData: Component.DataOverlayRow;
  overlayType: Component.DataOverlaySubType;
}

export const DataOverlayDataRow = ({ rowData, overlayType }: DataOverlayDataRowProps): ReactElement => {
  switch (rowData.rowType) {
    case Component.DataOverlayRowType.Markdown: {
      const row = rowData as Component.DataOverlayMarkdownRow;
      return (
        <ReactMarkdown
          skipHtml
          className={`markdown-row ${
            overlayType === Component.DataOverlaySubType.TextAnnotation ? 'annotation-row' : 'panel-row'
          }`}
          linkTarget='_blank'
        >
          {row.content}
        </ReactMarkdown>
      );
    }
    default:
      return <></>;
  }
};
