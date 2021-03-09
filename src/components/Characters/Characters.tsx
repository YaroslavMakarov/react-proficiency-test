import { useEffect, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";

import './Characters.scss';
import { CharactersThunk, loadingPersons } from "../../store/charactersReucer";
import { churactersSelector } from "../../store/rootStore";
import Character from "../Character/Character";

const Characters = () => {
    const personThunkDispatch = useDispatch<Dispatch<CharactersThunk>>();

    const characters = useSelector(churactersSelector);

    useEffect(() => {
        personThunkDispatch(loadingPersons());
    }, []);

    return (
        <div className="characters__wrapper">
            {characters.map(character => (
                <Character
                    key={character.id}
                    character={character}
                />
            ))}
        </div>
    );
};

export default Characters;