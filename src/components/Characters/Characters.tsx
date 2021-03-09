import { useEffect, Dispatch, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import './Characters.scss';
import { CharactersThunk, lazyLoading, loadingCharacters } from "../../store/charactersReucer";
import { churactersSelector, nextSelector } from "../../store/rootStore";
import Character from "../Character/Character";
import { urlParam } from "../../helpers/urlUtility";

const Characters = () => {
    const personThunkDispatch = useDispatch<Dispatch<CharactersThunk>>();
    const pageEnd = useRef<HTMLDivElement>(null);
    const characters = useSelector(churactersSelector);
    const next = useSelector(nextSelector);
    let [isLazyLoad, setLazyLoad] = useState(false);

    useEffect(() => {
        personThunkDispatch(loadingCharacters());

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && next !== null) {
                setLazyLoad(true);
            }; 
        },
        { rootMargin: '700px' })
        if (pageEnd.current !== null) {
            observer.observe(pageEnd.current)
        }
    }, []);

    useEffect(() => {
        if(isLazyLoad) {
            setLazyLoad(false);
            const param = next && urlParam(next);
            param && personThunkDispatch(lazyLoading(param));
        }   
    }, [isLazyLoad]);

    return (
        <>
            <div className="characters__wrapper">
                {characters.map(character => (
                    <Character
                        key={character.id}
                        character={character}
                    />
                ))}
            </div>
            <div className="characters__lazy-loading" ref={pageEnd}>
                Loading
            </div>
        </>
    );
};

export default Characters;