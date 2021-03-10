import { useEffect, Dispatch, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router';

import './Characters.scss';
import { 
    errorLazyLoading, errorLoading,
    loadingCharacters, startLazyLoading, startLoadingCharacters,
    successLazyLoading, successLoadingCharacter, successLoadingCharacters 
} from "../../store/charactersStore";
import { churactersSelector, isLoadingSelector, nextSelector, ThunkType } from "../../store/rootStore";
import Character from "../Character/Character";
import { urlParam } from "../../helpers/urlUtility";
import ButtonBack from "../button-back/ButtonBack";

type Params = {
    characterID: string;
};

const Characters = () => {
    const personThunkDispatch = useDispatch<Dispatch<ThunkType>>();
    const pageEnd = useRef<HTMLDivElement>(null);
    const characters = useSelector(churactersSelector);
    const next = useSelector(nextSelector);
    const isLoading = useSelector(isLoadingSelector);
    const isLazyLoading = useSelector(isLoadingSelector);
    let [isLazyLoad, setLazyLoad] = useState(false);
    const params: Params = useParams();

    useEffect(() => {
        if (params.characterID) {  
            personThunkDispatch(loadingCharacters(`character/${params.characterID}`, [startLoadingCharacters, successLoadingCharacter, errorLoading]));
        } else {
            personThunkDispatch(loadingCharacters('character/?page=1', [startLoadingCharacters, successLoadingCharacters, errorLoading]));
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
            param && personThunkDispatch(loadingCharacters(param, [startLazyLoading, successLazyLoading, errorLazyLoading]));
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
            <div className="characters__wrapper">
                {characters.map(character => (
                    <Character
                        key={character.id}
                        character={character}
                    />
                ))}
            </div>
            {isLazyLoading && <div>
                LOADING...
            </div>}
            {!params.characterID && <div className="characters__lazy-loading" ref={pageEnd}>
                Loading
            </div>}
        </>
    );
};

export default Characters;