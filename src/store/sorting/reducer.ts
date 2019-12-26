import { Reducer } from 'redux'
import { SortingActionTypes, SortingState } from './types'

export const initialState: SortingState = {
    sorting: "POPULARITY_ASC"
}

export const sortingReducer: Reducer<SortingState> = (state = initialState, action) => {
    switch (action.type) {
        case SortingActionTypes.SORT:
            return {
                ...state,
                ...action.payload
            }
        default: {
            return state
        }
    }
}
