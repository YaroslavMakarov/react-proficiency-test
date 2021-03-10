import { Dispatch } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { errorLoadingEpisodes, loadingEpisodes, startLoadingEpisodes, successLoadingEpisode, successLoadingEpisodes } from '../../store/episodesStore';
import { episodesSelector, ThunkType } from '../../store/rootStore';
import Episode from '../Episode/Episode';

type Params = {
    episodeID: string;
};

const Episodes = () => {
    const episodeThunkDispatch = useDispatch<Dispatch<ThunkType>>();
    const params: Params = useParams();
    const episodes = useSelector(episodesSelector);

    useEffect(() => {
        if (params.episodeID) {
            episodeThunkDispatch(loadingEpisodes(`episode/${params.episodeID}`, [startLoadingEpisodes, successLoadingEpisode, errorLoadingEpisodes]));
        } else {
            episodeThunkDispatch(loadingEpisodes('episode/?page=1', [startLoadingEpisodes, successLoadingEpisodes, errorLoadingEpisodes]));
        }  
    }, []);

    console.log(episodes);
    

    return (
        <div>
            {episodes.map(episode => (
                <Episode
                    key={episode.id}
                    epis={episode}
                />
            ))}
        </div>
    );
};

export default Episodes;