import { Action } from 'redux';

const SEARCH_VALUE = 'SEARCH_VALUE';

type SetSearchValue = Action<typeof SEARCH_VALUE> & {
    value: string;
}

export const setSearchValue = (value: string): SetSearchValue => ({
    type: SEARCH_VALUE,
    value
});

export type InitialSearchValueState = {
    value: string;
};

const initialSearchValueState: InitialSearchValueState = {
    value: '',
};

export type AllSearchValueActions = SetSearchValue;

const searchValueReducer = (state = initialSearchValueState, action: AllSearchValueActions) => {
    switch(action.type) {
        case SEARCH_VALUE: return {
            ...state,
            value: action.value,
        };

        default: return { ...state };
    }
};

export default searchValueReducer;
