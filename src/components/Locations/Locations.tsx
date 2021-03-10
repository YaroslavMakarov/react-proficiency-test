import { Dispatch, useRef, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { urlParam } from '../../helpers/urlUtility';
import { errorLazyLocations, errorLoadingLocations, loadingLocations, startLazyLocations, startLoadingLocations, successLazyLocations, successLoadingLocation, successLoadingLocations } from '../../store/locationsStore';
import { isLazyLoadingLocationSelector, isLoadingLocationsSelector, locationsSelector, nextLocationsSelector, ThunkType } from '../../store/rootStore';
import ButtonBack from '../button-back/ButtonBack';

type Params = {
    locationID: string;
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
        if (params.locationID) {
            locationThunkDispatch(loadingLocations(`location/${params.locationID}`, [startLoadingLocations, successLoadingLocation, errorLoadingLocations]));
        } else {
            locationThunkDispatch(loadingLocations('episode/?page=1', [startLoadingLocations, successLoadingLocations, errorLoadingLocations]));
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
            <ButtonBack />
            {locations.map(location => (
                <Location
                    key={location.id}
                    loc={location}
                />
            ))}
            {isLazyLoading && <div>
                LOADING...
            </div>}
            {!params.locationID && <div className="characters__lazy-loading" ref={pageEnd}>
                Loading
            </div>}
        </>
    );
};

export default Locations;