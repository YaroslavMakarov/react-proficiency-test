import { Action, Dispatch } from 'redux';
import { ThunkAction } from "redux-thunk";
import { getData } from '../helpers/api';
import { State } from "./rootStore";

const START_LOADING_CHARACTERS = 'START_LOADING_CHARACTERS';
const SUCCESS_LOADING_CHARACTERS = 'SUCCESS_LOADING_CHARACTERS';
const ERROR_LOADING_CHARACTERS = 'ERROR_LOADING_CHARACTERS';

//ActionTypes and action cretors
type StartLoadingCharacters = Action<typeof START_LOADING_CHARACTERS> & {
    isLoading: boolean;
};
type SuccessLoadingCharacters = Action<typeof SUCCESS_LOADING_CHARACTERS> & {
    characters: Array<Characters>;
    next: string | null;
};
type ErrorLoadingCharacters = Action<typeof ERROR_LOADING_CHARACTERS> & {
    isError: boolean;
};
export const startLoadingCharacters = (isLoading: boolean): StartLoadingCharacters => ({
    type: START_LOADING_CHARACTERS,
    isLoading,
});
export const successLoadingCharacters = (characters: Array<Characters>, next: string | null): SuccessLoadingCharacters => ({
    type: SUCCESS_LOADING_CHARACTERS,
    characters,
    next
});
export const errorLoading = (isError: boolean): ErrorLoadingCharacters => ({
    type: ERROR_LOADING_CHARACTERS,
    isError,
});

//thunks
export type CharactersThunk = ThunkAction<void, State, unknown, Action<string>>;

export const loadingPersons = (): CharactersThunk => {
    return (dispatch: Dispatch<AllCharactersActions>) => {
        dispatch(startLoadingCharacters(true));

        return getData('character/?page=1')
            .then(data => dispatch(successLoadingCharacters(data.results, data.info.next)))
            .catch(() => dispatch(errorLoading(true)));
    };
};

export type InitialCharactersState = {
    isLoading: boolean;
    isError: boolean;
    characters: Array<Characters>;
    next: string | null;
};

const initialCharactersState: InitialCharactersState = {
    isLoading: false,
    isError: true,
    characters: [],
    next: null,
};

export type AllCharactersActions = StartLoadingCharacters | SuccessLoadingCharacters | ErrorLoadingCharacters;

const charactersReducer = (state = initialCharactersState, action: AllCharactersActions) => {
    switch(action.type) {
        case START_LOADING_CHARACTERS: return {
            ...state,
            isLoading: action.isLoading
        };
        case SUCCESS_LOADING_CHARACTERS: return {
            ...state,
            characters: [...state.characters, ...action.characters],
            isLoading: false,
            next: action.next
        };
        case ERROR_LOADING_CHARACTERS: return {
            ...state,
            isLoading: false,
            isError: action.isError,
        };

        default: return state;
    };
};

export default charactersReducer;