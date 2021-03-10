import React from 'react';
import { Link } from 'react-router-dom';
import { urlNumber } from '../../helpers/urlUtility';

import './Location.scss';

type Props = {
    loca: Location;
};

const Location: React.FC<Props> = ({ loca }) => {
    const { dimencion, name, residents, type } = loca;
    const residentsNumbers: Array<string> = [];

    for (let i = 0; i < residents.length; i++) {
        residentsNumbers.push(urlNumber(residents[i]))
    };

    return (
        <>
            <div className="location__container">
                <div className="location__info">
                    <div className="location__data location__name">
                        Name: {name}
                    </div>
                    <div className="location__data location__demantion">
                        Dimencion: {dimencion}
                    </div>
                    <div className="location__data location__type">
                        Type: {type}
                    </div>
                </div>
                <div className="location__links">
                    Characters:
                    {residentsNumbers.map(number => (
                        <Link
                            key={number}
                            className="location__link"
                            to={`/characters/${number}`}
                        >
                            Character: {number}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
};

export default Location;
