import { createContext } from "react";

type DataSources = {
  source: any;
  query: any; // SiteWiseQuery
};

const DataSourcesContext = createContext<DataSources>({
  source: undefined,
  query: undefined,
});


// TODO JB