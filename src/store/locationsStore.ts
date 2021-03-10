import { Action, Dispatch } from 'redux';
import { getData } from '../helpers/api';
import { ThunkType } from './rootStore';

const START_LOADING_LOCATIONS = 'START_LOADING_LOCATIONS';
const SUCCESS_LOADING_LOCATIONS = 'SUCCESS_LOADING_LOCATIONS';
const ERROR_LOADING_LOCATIONS = 'ERROR_LOADING_LOCATIONS';
const START_LAZY_LOCATIONS = 'START_LAZY_LOCATIONS';
const SUCCESS_LAZY_LOCATIONS = 'SUCCESS_LEZY_LOCATIONS';
const ERROR_LAZY_LOCATIONS = 'ERROR_LAZY_LOCATIONS';
const SUCCESS_LOADING_LOCATION = 'SUCCESS_LOADING_LOCATION';

//ActionTypes and action cretors
export type StartLoadingLocations = Action<typeof START_LOADING_LOCATIONS> & {
    isLoading: boolean;
};
export type SuccessLoadingLocations = Action<typeof SUCCESS_LOADING_LOCATIONS> & {
    locations: Array<Location>;
    next: string | null;
};
export type ErrorLoadingLocations = Action<typeof ERROR_LOADING_LOCATIONS> & {
    isError: boolean;
};
export type StartLazyLocations= Action<typeof START_LAZY_LOCATIONS> & {
    isLazyLoading: boolean;
};
export type SuccessLazyLocations = Action<typeof SUCCESS_LAZY_LOCATIONS> & {
    locations: Array<Location>;
    next: string | null;
};
export type ErrorLazyLocations = Action<typeof ERROR_LAZY_LOCATIONS> & {
    isLazyError: boolean;
}
export type SuccessLoadingLocation = Action<typeof SUCCESS_LOADING_LOCATION> & {
    location: Location[];
};

export const startLoadingLocations = (isLoading: boolean): StartLoadingLocations => ({
    type: START_LOADING_LOCATIONS,
    isLoading,
});
export const successLoadingLocations = (locations: Array<Location>, next: string | null): SuccessLoadingLocations => ({
    type: SUCCESS_LOADING_LOCATIONS,
    locations,
    next
});
export const errorLoadingLocations = (isError: boolean): ErrorLoadingLocations => ({
    type: ERROR_LOADING_LOCATIONS,
    isError,
});
export const startLazyLocations = (isLazyLoading: boolean): StartLazyLocations => ({
    type: START_LAZY_LOCATIONS,
    isLazyLoading,
});
export const successLazyLocations = (locations: Array<Location>, next: string | null): SuccessLazyLocations => ({
    type: SUCCESS_LAZY_LOCATIONS,
    locations,
    next
});
export const errorLazyLocations = (isLazyError: boolean): ErrorLazyLocations => ({
    type: ERROR_LAZY_LOCATIONS,
    isLazyError,
});
export const successLoadingLocation = (location: Location[]): SuccessLoadingLocation => ({
    type: SUCCESS_LOADING_LOCATION,
    location
});

//thunks
type StartLoadingLocationsAC = (isLoading: boolean) => StartLoadingLocations;
type StartLazyLocationsAC = (isLazyLoading: boolean) => StartLazyLocations;
type SuccessLoadingLocationsAC = (episodes: Location[], next: string | null) => SuccessLoadingLocations;
type SuccessLazyLocationsAC = (episodes: Location[], next: string | null) => SuccessLazyLocations;
type SuccessLoadingLocationAC = (episode: Location[]) => SuccessLoadingLocation;
type ErrorLoadingLocationsAC = (isError: boolean) => ErrorLoadingLocations;
type ErrorLazyLocationsAC = (isLazyError: boolean) => ErrorLazyLocations;

type ThunkActions = [
    (StartLoadingLocationsAC | StartLazyLocationsAC),
    (SuccessLoadingLocationsAC | SuccessLazyLocationsAC | SuccessLoadingLocationAC),
    (ErrorLoadingLocationsAC | ErrorLazyLocationsAC),
];

export const loadingLocations = (url: string, [startLoading, successLoading, errLoading]: ThunkActions): ThunkType => {
    return (dispatch: Dispatch<AllLocationsActions>) => {
        dispatch(startLoading(true));
        if (successLoading === successLoadingLocation) {
            return getData(url)
            .then(data => dispatch(successLoading([data])))
            .catch(() => dispatch(errLoading(true)));
        } else {
            return getData(url)
            .then(data => dispatch(successLoading(data.results, data.info.next)))
            .catch(() => dispatch(errLoading(true)));
        }
    };
};

export type InitialLocationState = {
    isLoading: boolean;
    isError: boolean;
    isLazyLoading: boolean;
    isLazyError: boolean;
    locations: Array<Episode>;
    next: string | null;
};

const initialLocationsState: InitialLocationState = {
    isLoading: false,
    isError: false,
    isLazyLoading: false,
    isLazyError: false,
    locations: [],
    next: null,
};

export type AllLocationsActions = StartLoadingLocations | SuccessLoadingLocations | ErrorLoadingLocations
                                   | StartLazyLocations | SuccessLazyLocations | ErrorLazyLocations | SuccessLoadingLocation;

const episodesReducer = (state = initialLocationsState, action: AllLocationsActions) => {
    switch(action.type) {
        case START_LOADING_LOCATIONS: return {
            ...state,
            isLoading: action.isLoading
        };
        case SUCCESS_LOADING_LOCATIONS: return {
            ...state,
            locations: [...action.locations],
            isLoading: false,
            next: action.next
        };
        case ERROR_LOADING_LOCATIONS: return {
            ...state,
            isLoading: false,
            isError: action.isError,
        };
        case START_LAZY_LOCATIONS: return {
            ...state,
            isLazyLoading: action.isLazyLoading
        };
        case SUCCESS_LAZY_LOCATIONS: return {
            ...state,
            locations: [...state.locations, ...action.locations],
            isLazyLoading: false,
             next: action.next,
        };
        case ERROR_LAZY_LOCATIONS: return {
            ...state,
            isLazyError: action.isLazyError,
        };
        case SUCCESS_LOADING_LOCATION: return {
            ...state,
            locations: [...action.location],
            isLoading: false,
        };
                                                                
        default: return state;
    };
};
                                                                
export default episodesReducer;