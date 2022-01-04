export interface GetAllPaggingReqDTO {
    sort: string;
    sortDirection: number;
    filterItems: [
      {
        propertyName: string;
        value: {};
        comparison: number;
      }
    ];
    searchText: string;
    skipCount: number;
    maxResultCount: number;
  }
  