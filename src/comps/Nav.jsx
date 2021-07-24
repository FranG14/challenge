import { NavLink } from 'react-router-dom';

const Nav = ({
    setSubmitting, setEntering, setFetchedVisible
}) => {

    const cleanInputsFx = (e) => {
        e.preventDefault();
        setFetchedVisible(false);
        setEntering({
            food: '',
            town: ''
        });
        setSubmitting({
            food: '',
            town: ''
        });
    };

    return (
        <div className="Nav">
            {/* <p>this is FxComp `Nav.jsx`</p> */}
            <ul>
                <li onClick={cleanInputsFx}><NavLink to="/">homepage</NavLink></li>
            </ul>
        </div>
    )
};

export default Nav;