import React from 'react';
import { Link } from 'react-router-dom';
import { urlNumber } from '../../helpers/urlUtility';

import './Episode.scss';

type Props = {
    epis: Episode;
};

const Episode: React.FC<Props> = ({ epis }) => {
    const { air_date, name, episode, characters } = epis;
    const characterNumbers: Array<string> = [];

    for (let i = 0; i < episode.length; i++) {
        characterNumbers.push(urlNumber(characters[i]))
    };

    return (
        <>
            <div className="episode__container">
                <div className="episode__info">
                    <div className="episode__data episode__name">
                        Name: {name}
                    </div>
                    <div className="episode__data episode__air-date">
                        AIR date: {air_date}
                    </div>
                    <div className="episode__data episode__episode">
                        Episode: {episode}
                    </div>
                </div>
                <div className="episode__links">
                    Episodes:
                    {characterNumbers.map(number => (
                        <Link
                            key={number}
                            className="episode__link"
                            to={`/characters/${number}`}
                        >
                            Episode: {number}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
};

export default Episode;
