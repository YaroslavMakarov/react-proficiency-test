import { combineReducers, createStore, Store } from 'redux';

const allReducers = combineReducers({
});

export type State = {};

const store: Store<State> = createStore(allReducers);

export default store;
