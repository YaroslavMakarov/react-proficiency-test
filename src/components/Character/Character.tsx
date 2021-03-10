import React from 'react';
import { Link } from 'react-router-dom';
import { urlNumber } from '../../helpers/urlUtility';

import './Character.scss';

type Props = {
    character: Character; 
};

const Character: React.FC<Props> = ({ character }) => {
    const { 
        image, name, location, origin, episode,
        species, status, gender
    } = character;
    const locationNumber = urlNumber(location.url);
    const originNumber = urlNumber(origin.url);
    const episodesNumbers: Array<string> = [];

    for (let i = 0; i < episode.length; i++) {
        episodesNumbers.push(urlNumber(episode[i]))
    };


    return (
    <div className="character__wrapper">
        <div className="character__bio">
            <img
                className="character__photo"
                src={image}
                alt="photo"
            />
            <div className="character__info-wrapper">
                <div className="character__info">
                    Name: {name}
                </div>
                <div className="character__info">
                    Gender: {gender}
                </div>
                <div className="character__info">
                    Species: {species}
                </div>
                <div className="character__info">
                    Status: {status}
                </div>
            </div>
        </div>
        <Link
            className="character__link character__location"
            to={`/locations/${locationNumber}`}
        >
            Location: {location.name}
        </Link>
        <Link
            className="character__link character__location"
            to={`/locations/${originNumber}`}
        >
            Origin: {origin.name}
        </Link>
        <div className="characters__episodes">
            Episodes:
            {episodesNumbers.map(number => (
                <Link
                    key={number}
                    className="character__link"
                    to={`/episodes/${number}`}
                >
                    Episode: {number}
                </Link>
            ))}
        </div>
    </div>
    )
};

export default Character;