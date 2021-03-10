import { Dispatch, useRef, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { urlParam } from '../../helpers/urlUtility';
import { errorLazyEpisodes, errorLoadingEpisodes, loadingEpisodes, startLazyEpisodes, startLoadingEpisodes, successLazyEpisodes, successLoadingEpisode, successLoadingEpisodes } from '../../store/episodesStore';
import { episodesSelector, isLazyLoadingEpisodesSelector, isLoadingEpisodesSelector, nextEpisodesSelector, ThunkType } from '../../store/rootStore';
import ButtonBack from '../button-back/ButtonBack';
import Episode from '../Episode/Episode';


type Params = {
    episodesID: string;
};

const Episodes = () => {
    const episodeThunkDispatch = useDispatch<Dispatch<ThunkType>>();
    const pageEnd = useRef<HTMLDivElement>(null);
    const params: Params = useParams();
    const episodes = useSelector(episodesSelector);
    const isLoading = useSelector(isLoadingEpisodesSelector);
    const isLazyLoading = useSelector(isLazyLoadingEpisodesSelector);
    const next = useSelector(nextEpisodesSelector);
    let [isLazyLoad, setLazyLoad] = useState(false);

    useEffect(() => {
        if (params.episodesID) {
            episodeThunkDispatch(loadingEpisodes(`episode/${params.episodesID}`, [startLoadingEpisodes, successLoadingEpisode, errorLoadingEpisodes]));
        } else {
            episodeThunkDispatch(loadingEpisodes('episode/?page=1', [startLoadingEpisodes, successLoadingEpisodes, errorLoadingEpisodes]));
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
            param && episodeThunkDispatch(loadingEpisodes(param, [startLazyEpisodes, successLazyEpisodes, errorLazyEpisodes]));
        }   
    }, [isLazyLoad]);

    if (isLoading) {
        return (
            <div>
                LOADING...
            </div>
        )
    };
    

    return (
        <>
            <ButtonBack />
            {episodes.map(episode => (
                <Episode
                    key={episode.id}
                    epis={episode}
                />
            ))}
            {isLazyLoading && <div>
                LOADING...
            </div>}
            {!params.episodesID && <div className="characters__lazy-loading" ref={pageEnd}>
                Loading
            </div>}
        </>
    );
};

export default Episodes;