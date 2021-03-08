import { combineReducers, createStore, Store } from 'redux';

const allReducers = combineReducers({
});

type RootState = {};

const store: Store<RootState> = createStore(allReducers);

export default store;
