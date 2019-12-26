import { action } from "typesafe-actions";
import { FiltersActionTypes, FiltersState } from "./types";

export const filter = (data: FiltersState) => action(FiltersActionTypes.FILTER, data);
