import { Reducer } from 'redux'
import { FiltersState, FiltersActionTypes } from './types'

export const initialState: FiltersState = {
    city: "All",
    services: [],
    priceRange: {
        min: 0,
        max: 200
    }
}

export const filtersReducer: Reducer<FiltersState> = (state = initialState, action) => {
    switch (action.type) {
        case FiltersActionTypes.FILTER:
            console.log(action.payload)
            return {
                ...state,
                ...action.payload
            }
        default: {
            return state
        }
    }
}
