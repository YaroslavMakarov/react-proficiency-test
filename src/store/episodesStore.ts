import { Action, Dispatch } from 'redux';
import { getData } from '../helpers/api';
import { ThunkType } from './rootStore';

const START_LOADING_EPISODES = 'START_LOADING_EPISODES';
const SUCCESS_LOADING_EPISODES = 'SUCCESS_LOADING_EPISODES';
const ERROR_LOADING_EPISODES = 'ERROR_LOADING_EPISODES';
const START_LAZY_EPISODES = 'START_LAZY_EPISODES';
const SUCCESS_LAZY_EPISODES = 'SUCCESS_LEZY_EPISODES';
const ERROR_LAZY_EPISODES = 'ERROR_LAZY_EPISODES';
const SUCCESS_LOADING_EPISODE = 'SUCCESS_LOADING_EPISODE';

//ActionTypes and action cretors
export type StartLoadingEpisodes = Action<typeof START_LOADING_EPISODES> & {
    isLoading: boolean;
};
export type SuccessLoadingEpisodes = Action<typeof SUCCESS_LOADING_EPISODES> & {
    episodes: Array<Episode>;
    next: string | null;
};
export type ErrorLoadingEpisodes = Action<typeof ERROR_LOADING_EPISODES> & {
    isError: boolean;
};
export type StartLazyEpisodes= Action<typeof START_LAZY_EPISODES> & {
    isLazyLoading: boolean;
};
export type SuccessLazyEpisodes = Action<typeof SUCCESS_LAZY_EPISODES> & {
    episodes: Array<Episode>;
    next: string | null;
};
export type ErrorLazyEpisodes = Action<typeof ERROR_LAZY_EPISODES> & {
    isLazyError: boolean;
}
export type SuccessLoadingEpisode = Action<typeof SUCCESS_LOADING_EPISODE> & {
    episode: Episode[];
};

export const startLoadingEpisodes = (isLoading: boolean): StartLoadingEpisodes => ({
    type: START_LOADING_EPISODES,
    isLoading,
});
export const successLoadingEpisodes = (episodes: Array<Episode>, next: string | null): SuccessLoadingEpisodes => ({
    type: SUCCESS_LOADING_EPISODES,
    episodes,
    next
});
export const errorLoadingEpisodes = (isError: boolean): ErrorLoadingEpisodes => ({
    type: ERROR_LOADING_EPISODES,
    isError,
});
export const startLazyEpisodes = (isLazyLoading: boolean): StartLazyEpisodes => ({
    type: START_LAZY_EPISODES,
    isLazyLoading,
});
export const successLazyEpisodes = (episodes: Array<Episode>, next: string | null): SuccessLazyEpisodes => ({
    type: SUCCESS_LAZY_EPISODES,
    episodes,
    next
});
export const errorLazyEpisodes = (isLazyError: boolean): ErrorLazyEpisodes => ({
    type: ERROR_LAZY_EPISODES,
    isLazyError,
});
export const successLoadingEpisode = (episode: Episode[]): SuccessLoadingEpisode => ({
    type: SUCCESS_LOADING_EPISODE,
    episode
}); 

//thunks
type StartLoadingEpisodesAC = (isLoading: boolean) => StartLoadingEpisodes;
type StartLazyEpisodesAC = (isLazyLoading: boolean) => StartLazyEpisodes;
type SuccessLoadingEpisodesAC = (episodes: Episode[], next: string | null) => SuccessLoadingEpisodes;
type SuccessLazyEpisodesAC = (episodes: Episode[], next: string | null) => SuccessLazyEpisodes;
type SuccessLoadingEpisodeAC = (episode: Episode[]) => SuccessLoadingEpisode;
type ErrorLoadingEpisodesAC = (isError: boolean) => ErrorLoadingEpisodes;
type ErrorLazyEpisodesAC = (isLazyError: boolean) => ErrorLazyEpisodes;

type ThunkActions = [
    (StartLoadingEpisodesAC | StartLazyEpisodesAC),
    (SuccessLoadingEpisodesAC | SuccessLazyEpisodesAC | SuccessLoadingEpisodeAC),
    (ErrorLoadingEpisodesAC | ErrorLazyEpisodesAC),
];

export const loadingEpisodes = (url: string, [startLoading, successLoading, errLoading]: ThunkActions): ThunkType => {
    return (dispatch: Dispatch<AllEpisodesActions>) => {
        dispatch(startLoading(true));
        if (successLoading === successLoadingEpisode) {
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

export type InitialEpisodesState = {
    isLoading: boolean;
    isError: boolean;
    isLazyLoading: boolean;
    isLazyError: boolean;
    episodes: Array<Episode>;
    next: string | null;
};

const initialEpisodesState: InitialEpisodesState = {
    isLoading: false,
    isError: false,
    isLazyLoading: false,
    isLazyError: false,
    episodes: [],
    next: null,
};

export type AllEpisodesActions = StartLoadingEpisodes | SuccessLoadingEpisodes | ErrorLoadingEpisodes
                                   | StartLazyEpisodes | SuccessLazyEpisodes | ErrorLazyEpisodes | SuccessLoadingEpisode;

const episodesReducer = (state = initialEpisodesState, action: AllEpisodesActions) => {
    switch(action.type) {
        case START_LOADING_EPISODES: return {
            ...state,
            isLoading: action.isLoading
        };
        case SUCCESS_LOADING_EPISODES: return {
            ...state,
            episodes: [...action.episodes],
            isLoading: false,
            next: action.next
        };
        case ERROR_LOADING_EPISODES: return {
            ...state,
            isLoading: false,
            isError: action.isError,
        };
        case START_LAZY_EPISODES: return {
            ...state,
            isLazyLoading: action.isLazyLoading
        };
        case SUCCESS_LAZY_EPISODES: return {
            ...state,
            episodes: [...state.episodes, ...action.episodes],
            isLazyLoading: false,
            next: action.next,
        };
        case ERROR_LAZY_EPISODES: return {
            ...state,
            isLazyError: action.isLazyError,
        };
        case SUCCESS_LOADING_EPISODE: return {
            ...state,
            episodes: [...action.episode],
            isLoading: false,
        };
                                
        default: return state;
    };
};
                                
export default episodesReducer;