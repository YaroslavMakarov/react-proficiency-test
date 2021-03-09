import { useEffect, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CharactersThunk, loadingPersons } from "../../store/charactersReucer";
import { churactersSelector } from "../../store/rootStore";

const Characters = () => {
    const personThunkDispatch = useDispatch<Dispatch<CharactersThunk>>();

    const characters = useSelector(churactersSelector);

    useEffect(() => {
        personThunkDispatch(loadingPersons());
    }, []);

    console.log(characters);
    

    return (
        <div>
            Characters
        </div>
    );
};

export default Characters;