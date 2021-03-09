import { combineReducers, createStore, Store, applyMiddleware } from 'redux';
import thunk from "redux-thunk";

import charactersReducer, { InitialCharactersState } from './charactersReucer';

const allReducers = combineReducers({
    characters: charactersReducer,
});

export type State = {
    characters: InitialCharactersState,
};

const store: Store<State> = createStore(allReducers, applyMiddleware(thunk));

export default store;
