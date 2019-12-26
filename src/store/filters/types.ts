export enum FiltersActionTypes {
    FILTER = "@@filters/filter"
}

export interface FiltersState {
    readonly city: string,
    readonly services: string[],
    readonly priceRange: {
        readonly min: number,
        readonly max: number
    }
}
