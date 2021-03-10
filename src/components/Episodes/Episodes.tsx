import { Dispatch } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { errorLoadingEpisodes, loadingEpisodes, startLoadingEpisodes, successLoadingEpisode, successLoadingEpisodes } from '../../store/episodesStore';
import { episodesSelector, ThunkType } from '../../store/rootStore';

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
        }
        episodeThunkDispatch(loadingEpisodes('episode/?page=1', [startLoadingEpisodes, successLoadingEpisodes, errorLoadingEpisodes]));
    }, []);

    console.log(episodes);
    

    return (
        <div>
            Episodes
        </div>
    );
};

export default Episodes;