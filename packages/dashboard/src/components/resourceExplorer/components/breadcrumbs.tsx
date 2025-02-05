import React, { Dispatch, SetStateAction } from 'react';
import { AssetSummary } from '@aws-sdk/client-iotsitewise';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import { EitherAssetSummary } from '../nextResourceExplorer';

export const HIERARCHY_ROOT_ID = 'HIERARCHY_ROOT_ID';

export interface BreadcrumbEvent {
  preventDefault: () => void;
  detail: {
    item: AssetSummary;
  };
}

export interface BreadcrumbItem extends AssetSummary {
  text: string;
  href: string;
}

const rootCrumb = { name: 'Dashboard', id: HIERARCHY_ROOT_ID } as AssetSummary;

export interface ResourceExplorerBreadcrumbsProps {
  handleCrumbClick: (item: AssetSummary) => void;
  crumbs: EitherAssetSummary[];
  setCrumbs: Dispatch<SetStateAction<EitherAssetSummary[]>>;
}

export const ResourceExplorerBreadcrumbs: React.FC<ResourceExplorerBreadcrumbsProps> = ({
  handleCrumbClick,
  crumbs,
  setCrumbs,
}) => {
  const handleCrumbClickInner = (event: BreadcrumbEvent) => {
    event.preventDefault();
    const {
      detail: { item },
    } = event;
    const { id } = item as AssetSummary;
    const crumbIndex = crumbs.findIndex((crumb) => crumb.id === id);
    handleCrumbClick(item);
    if (crumbIndex === 0) {
      const nextCrumbs = [item];
      setCrumbs(nextCrumbs);
      return;
    } else {
      const nextCrumbs = crumbs.slice(0, crumbIndex + 1);
      setCrumbs(nextCrumbs);
    }
  };

  const shownCrumbs = [rootCrumb, ...crumbs].map((crumb) => {
    const item = structuredClone(crumb) as BreadcrumbItem;
    item.text = item.name || '';
    item.href = '';
    return item;
  });

  return <BreadcrumbGroup items={shownCrumbs} ariaLabel='Breadcrumbs' onFollow={handleCrumbClickInner} />;
};
