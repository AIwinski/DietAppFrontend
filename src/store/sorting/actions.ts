import { action } from "typesafe-actions";
import { SortingActionTypes, SortingState } from "./types";

export const sort = (data: SortingState) => action(SortingActionTypes.SORT, data);
