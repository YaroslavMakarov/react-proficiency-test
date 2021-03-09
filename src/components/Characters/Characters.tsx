import { useEffect, Dispatch, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import './Characters.scss';
import { CharactersThunk, loadingPersons } from "../../store/charactersReucer";
import { churactersSelector } from "../../store/rootStore";
import Character from "../Character/Character";

const Characters = () => {
    const personThunkDispatch = useDispatch<Dispatch<CharactersThunk>>();

    const pageEnd = useRef<HTMLDivElement>(null);

    const characters = useSelector(churactersSelector);

    useEffect(() => {
        personThunkDispatch(loadingPersons());
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            console.log(entries[0].isIntersecting);
            
        },
        { rootMargin: '200px' })
        if (pageEnd.current !== null) {
            observer.observe(pageEnd.current)
        }
    }, [])

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
            <div className="characters__lazy-loading"ref={pageEnd}>
                Loading
            </div>
        </>
    );
};

export default Characters;