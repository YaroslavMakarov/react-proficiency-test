import { combineReducers, createStore, Store, applyMiddleware, Action } from 'redux';
import thunk, { ThunkAction } from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

import charactersReducer, { InitialCharactersState } from './charactersStore';
import episodesReducer, { InitialEpisodesState } from './episodesStore';

const allReducers = combineReducers({
    charactersInfo: charactersReducer,
    episodesInfo: episodesReducer,
});

export type ThunkType = ThunkAction<void, State, unknown, Action<string>>;

export type State = {
    charactersInfo: InitialCharactersState,
    episodesInfo: InitialEpisodesState,
};

const store: Store<State> = createStore(allReducers, composeWithDevTools(applyMiddleware(thunk)));

//characters selector
export const churactersSelector = (state: State) => state.charactersInfo.characters;
export const nextSelector = (state: State) => state.charactersInfo.next;
export const isLoadingSelector = (state: State) => state.charactersInfo.isLoading;
export const isLazyLoadingSelector = (state: State) => state.charactersInfo.isLazyLoading;

//episodes selector
export const episodesSelector = (state: State) => state.episodesInfo.episodes;
export const isLoadingEpisodesSelector = (state: State) => state.episodesInfo.isLoading;
export const isLazyLoadingEpisodesSelector = (state: State) => state.episodesInfo.isLazyLoading;
export const nextEpisodesSelector = (state: State) => state.episodesInfo.next;

export default store;
