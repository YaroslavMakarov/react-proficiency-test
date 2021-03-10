import { combineReducers, createStore, Store, applyMiddleware } from 'redux';
import thunk from "redux-thunk";

import charactersReducer, { InitialCharactersState } from './charactersStore';
import episodesReducer, { InitialEpisodesState } from './episodesStore';

const allReducers = combineReducers({
    charactersInfo: charactersReducer,
    episodesInfo: episodesReducer,
});

export type State = {
    charactersInfo: InitialCharactersState,
    episodesInfo: InitialEpisodesState,
};

const store: Store<State> = createStore(allReducers, applyMiddleware(thunk));

//characters selector
export const churactersSelector = (state: State) => state.charactersInfo.characters;
export const nextSelector = (state: State) => state.charactersInfo.next;
export const isLoadingSelector = (state: State) => state.charactersInfo.isLoading;
export const isLazyLoadingSelector = (state: State) => state.charactersInfo.isLazyLoading;

export default store;
