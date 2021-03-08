import './HomePage.scss';

import { NavLink } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="homepage__container">
            <NavLink
              to="/characters"
              exact
              className="homepage__link"
            >
                Characters
            </NavLink>
            <NavLink
              to="/episodes"
              exact
              className="homepage__link"
            >
                Episodes
            </NavLink>
            <NavLink
              to="/locations"
              exact
              className="homepage__link"
            >
                Locations
            </NavLink>
        </div> 
    );
};

export default HomePage;