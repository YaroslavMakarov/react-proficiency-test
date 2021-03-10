import { combineReducers, createStore, Store, applyMiddleware } from 'redux';
import thunk from "redux-thunk";

import charactersReducer, { InitialCharactersState } from './charactersReucer';

const allReducers = combineReducers({
    charactersInfo: charactersReducer,
});

export type State = {
    charactersInfo: InitialCharactersState,
};

const store: Store<State> = createStore(allReducers, applyMiddleware(thunk));

//characters selector
export const churactersSelector = (state: State) => state.charactersInfo.characters;
export const nextSelector = (state: State) => state.charactersInfo.next;
export const isLoadingSelector = (state: State) => state.charactersInfo.isLoading;
export const isLazyLoadingSelector = (state: State) => state.charactersInfo.isLazyLoading;

export default store;
