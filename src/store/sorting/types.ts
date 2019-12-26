export enum SortingActionTypes {
    SORT = "@@sorting/sort"
}

export interface SortingState {
    readonly sorting: string;
}