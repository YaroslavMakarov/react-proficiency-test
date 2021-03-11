import { combineReducers, createStore, Store, applyMiddleware, Action } from 'redux';
import thunk, { ThunkAction } from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

import charactersReducer, { InitialCharactersState } from './charactersStore';
import episodesReducer, { InitialEpisodesState } from './episodesStore';
import locationsReducer, { InitialLocationState } from './locationsStore';
import searchValueReducer, { InitialSearchValueState } from './searchFieldStore';

const allReducers = combineReducers({
    charactersInfo: charactersReducer,
    episodesInfo: episodesReducer,
    locationInfo: locationsReducer,
    searchValue: searchValueReducer,
});

export type ThunkType = ThunkAction<void, State, unknown, Action<string>>;

export type State = {
    charactersInfo: InitialCharactersState,
    episodesInfo: InitialEpisodesState,
    locationInfo: InitialLocationState,
    searchValue: InitialSearchValueState
};

const store: Store<State> = createStore(allReducers, composeWithDevTools(applyMiddleware(thunk)));

//characters selector
export const churactersSelector = (state: State) => {
    const characters = state.charactersInfo.characters;
    const searchVlue = state.searchValue.value.toLocaleLowerCase().trim();

    return characters.filter(character => {
        const filteringCharacterParams = character.gender + character.name + character.species + character.status;

        return filteringCharacterParams.toLocaleLowerCase().includes(searchVlue);
    })
};
export const nextSelector = (state: State) => state.charactersInfo.next;
export const isLoadingSelector = (state: State) => state.charactersInfo.isLoading;
export const isLazyLoadingSelector = (state: State) => state.charactersInfo.isLazyLoading;

//episodes selector
export const episodesSelector = (state: State) => {
    const episodes = state.episodesInfo.episodes;
    const searchValue = state.searchValue.value.toLocaleLowerCase().trim();

    return episodes.filter(episode => {
        const filteringEpisodeParams = episode.air_date + episode.name + episode.episode;

        return filteringEpisodeParams.toLocaleLowerCase().includes(searchValue);
    });
};
export const isLoadingEpisodesSelector = (state: State) => state.episodesInfo.isLoading;
export const isLazyLoadingEpisodesSelector = (state: State) => state.episodesInfo.isLazyLoading;
export const nextEpisodesSelector = (state: State) => state.episodesInfo.next;

//locations selector
export const isLoadingLocationsSelector = (state: State) => state.locationInfo.isLoading;
export const isLazyLoadingLocationSelector = (state: State) => state.locationInfo.isLazyLoading;
export const nextLocationsSelector = (state: State) => state.locationInfo.next;
export const locationsSelector = (state: State) => {
    const locations = state.locationInfo.locations;
    const searchValue = state.searchValue.value.toLocaleLowerCase().trim();

    return locations.filter(location => {
        const filteringLocationParams = location.dimencion + location.name + location.type;

        return filteringLocationParams.toLocaleLowerCase().includes(searchValue);
    })
};

//search value selector
export const searchValueSelector = (state: State) => state.searchValue.value;

export default store;
