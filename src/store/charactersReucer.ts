import { Action, Dispatch } from 'redux';
import { ThunkAction } from "redux-thunk";
import { getData } from '../helpers/api';
import { State } from "./rootStore";

const START_LOADING_CHARACTERS = 'START_LOADING_CHARACTERS';
const SUCCESS_LOADING_CHARACTERS = 'SUCCESS_LOADING_CHARACTERS';
const ERROR_LOADING_CHARACTERS = 'ERROR_LOADING_CHARACTERS';
const START_LAZY_LOADING = 'START_LAZY_LOADING';
const SUCCESS_LAZY_LOADING = 'SUCCESS_LEZY_LOADING';
const ERROR_LAZY_LOADING = 'ERROR_LAZY_LOADING';

//ActionTypes and action cretors
type StartLoadingCharacters = Action<typeof START_LOADING_CHARACTERS> & {
    isLoading: boolean;
};
type SuccessLoadingCharacters = Action<typeof SUCCESS_LOADING_CHARACTERS> & {
    characters: Array<Character>;
    next: string | null;
};
type ErrorLoadingCharacters = Action<typeof ERROR_LOADING_CHARACTERS> & {
    isError: boolean;
};
type StartLazyLoading = Action<typeof START_LAZY_LOADING> & {
    isLazyLoading: boolean;
};
type SuccessLazyLoading = Action<typeof SUCCESS_LAZY_LOADING> & {
    characters: Array<Character>;
    next: string | null;
};
type ErrorLazyLoading = Action<typeof ERROR_LAZY_LOADING> & {
    isLazyError: boolean;
}

export const startLoadingCharacters = (isLoading: boolean): StartLoadingCharacters => ({
    type: START_LOADING_CHARACTERS,
    isLoading,
});
export const successLoadingCharacters = (characters: Array<Character>, next: string | null): SuccessLoadingCharacters => ({
    type: SUCCESS_LOADING_CHARACTERS,
    characters,
    next
});
export const errorLoading = (isError: boolean): ErrorLoadingCharacters => ({
    type: ERROR_LOADING_CHARACTERS,
    isError,
});
export const startLazyLoading = (isLazyLoading: boolean): StartLazyLoading => ({
    type: START_LAZY_LOADING,
    isLazyLoading,
});
export const successLazyLoading = (characters: Array<Character>, next: string): SuccessLazyLoading => ({
    type: SUCCESS_LAZY_LOADING,
    characters,
    next
});
export const errorLazyLoading = (isLazyError: boolean): ErrorLazyLoading => ({
    type: ERROR_LAZY_LOADING,
    isLazyError,
});

//thunks
export type CharactersThunk = ThunkAction<void, State, unknown, Action<string>>;

export const loadingCharacters = (): CharactersThunk => {
    return (dispatch: Dispatch<AllCharactersActions>) => {
        dispatch(startLoadingCharacters(true));

        return getData('character/?page=1')
            .then(data => dispatch(successLoadingCharacters(data.results, data.info.next)))
            .catch(() => dispatch(errorLoading(true)));
    };
};
export const lazyLoading = (url: string): CharactersThunk => {
    return (dispatch: Dispatch<AllCharactersActions>) => {
        dispatch(startLazyLoading(true));

        return getData(url)
            .then(data => dispatch(successLazyLoading(data.results, data.info.next)))
            .catch(() => dispatch(errorLazyLoading(true)));
    };
};

export type InitialCharactersState = {
    isLoading: boolean;
    isError: boolean;
    isLazyLoading: boolean;
    isLazyError: boolean;
    characters: Array<Character>;
    next: string | null;
};

const initialCharactersState: InitialCharactersState = {
    isLoading: false,
    isError: false,
    isLazyLoading: false,
    isLazyError: false,
    characters: [],
    next: null,
};

export type AllCharactersActions = StartLoadingCharacters | SuccessLoadingCharacters | ErrorLoadingCharacters
                                   | StartLazyLoading | SuccessLazyLoading | ErrorLazyLoading;

const charactersReducer = (state = initialCharactersState, action: AllCharactersActions) => {
    switch(action.type) {
        case START_LOADING_CHARACTERS: return {
            ...state,
            isLoading: action.isLoading
        };
        case SUCCESS_LOADING_CHARACTERS: return {
            ...state,
            characters: [...action.characters],
            isLoading: false,
            next: action.next
        };
        case ERROR_LOADING_CHARACTERS: return {
            ...state,
            isLoading: false,
            isError: action.isError,
        };
        case START_LAZY_LOADING: return {
            ...state,
            isLazyLoading: action.isLazyLoading
        };
        case SUCCESS_LAZY_LOADING: return {
            ...state,
            characters: [...state.characters, ...action.characters],
            isLazyLoading: false,
            next: action.next,
        };
        case ERROR_LAZY_LOADING: return {
            ...state,
            isLazyError: action.isLazyError,
        };

        default: return state;
    };
};

export default charactersReducer;