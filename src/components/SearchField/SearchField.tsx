import { useDispatch, useSelector } from 'react-redux';
import { searchValueSelector } from '../../store/rootStore';
import { Dispatch } from 'react';

import './SearchField.scss';
import { AllSearchValueActions, setSearchValue } from '../../store/searchFieldStore';
import { useLocation } from 'react-router-dom';

const SearchField = () => {
    const value = useSelector(searchValueSelector);
    const searchValueDispatch = useDispatch<Dispatch<AllSearchValueActions>>();
    const location = useLocation();
    const availableURLs = '/characters/locations/episodes';

    const passURL = availableURLs.includes(location.pathname);
    

    return (
        <div>
            {passURL && <input
                type="text"
                value={value}
                onChange={({ target }) => {
                    searchValueDispatch(setSearchValue(target.value))
                }}
                placeholder="search..."
            />}
        </div>
    );
};

export default SearchField;