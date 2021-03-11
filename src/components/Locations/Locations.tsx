import { Dispatch, useRef, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { urlParam } from '../../helpers/urlUtility';
import { errorLazyLocations, errorLoadingLocations, loadingLocations, startLazyLocations, startLoadingLocations, successLazyLocations, successLoadingLocation, successLoadingLocations } from '../../store/locationsStore';
import { isLazyLoadingLocationSelector, isLoadingLocationsSelector, locationsSelector, nextLocationsSelector, ThunkType } from '../../store/rootStore';
import ButtonBack from '../button-back/ButtonBack';
import Location from '../Location/Location';
import SearchField from '../SearchField/SearchField';
import './Locations.scss';

type Params = {
    locationsID: string;
};

const Locations = () => {
    const locationThunkDispatch = useDispatch<Dispatch<ThunkType>>();
    const pageEnd = useRef<HTMLDivElement>(null);
    const params: Params = useParams();
    const isLoading = useSelector(isLoadingLocationsSelector);
    const isLazyLoading = useSelector(isLazyLoadingLocationSelector);
    const next = useSelector(nextLocationsSelector);
    const locations = useSelector(locationsSelector);
    let [isLazyLoad, setLazyLoad] = useState(false);

    useEffect(() => {
        if (params.locationsID) {
            locationThunkDispatch(loadingLocations(`location/${params.locationsID}`, [startLoadingLocations, successLoadingLocation, errorLoadingLocations]));
        } else {
            locationThunkDispatch(loadingLocations('location/?page=1', [startLoadingLocations, successLoadingLocations, errorLoadingLocations]));
        }  
    }, []);

    useEffect(() => {
        if (!isLoading) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setLazyLoad(true);
                }; 
            },
            { rootMargin: '700px' })
            if (pageEnd.current !== null) {
                observer.observe(pageEnd.current)
            }
        }
    }, [isLoading]);

    useEffect(() => {
        if(isLazyLoad) {
            setLazyLoad(false);
            const param = next && urlParam(next);
            param && locationThunkDispatch(loadingLocations(param, [startLazyLocations, successLazyLocations, errorLazyLocations]));
        }   
    }, [isLazyLoad]);

    return (
        <>
            <SearchField />
            <ButtonBack />
            <div className="locations__wrapper">
                {locations.map(location => (
                    <Location
                        key={location.id}
                        loca={location}
                    />
                ))}
            </div>
            {isLazyLoading && <div>
                LOADING...
            </div>}
            {!params.locationsID && <div className="characters__lazy-loading" ref={pageEnd}>
                Loading
            </div>}
        </>
    );
};

export default Locations;