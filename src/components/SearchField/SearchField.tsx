import { useDispatch, useSelector } from 'react-redux';
import { searchValueSelector } from '../../store/rootStore';
import { Dispatch } from 'react';

import './SearchField.scss';
import { AllSearchValueActions, setSearchValue } from '../../store/searchFieldStore';

const SearchField = () => {
    const value = useSelector(searchValueSelector);
    const searchValueDispatch = useDispatch<Dispatch<AllSearchValueActions>>();

    return (
        <div>
            <input
                type="text"
                value={value}
                onChange={({ target }) => {
                    searchValueDispatch(setSearchValue(target.value))
                }}
            />
        </div>
    );
};

export default SearchField;