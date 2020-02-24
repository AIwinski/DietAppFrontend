import { Reducer } from 'redux'
import { SortingActionTypes, SortingState } from './types'

export const initialState: SortingState = {
    sorting: "POPULARITY_ASC"
}

export const sortingReducer: Reducer<SortingState> = (state = initialState, action) => {
    switch (action.type) {
        case SortingActionTypes.SORT:
            console.log(action.payload)
            return {
                ...state,
                sorting: action.payload
            }
        default: {
            return state
        }
    }
}
