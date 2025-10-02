import { NavLink } from 'react-router-dom';

const AsideComponent = () => {
    return (
        <nav className='navigation text-center py-4'>
            <NavLink to="/" className={({ isActive }) => (isActive ? "nav-active" : "")}>
                <i className="fa-solid fa-briefcase"></i>
                <span className='navigation-text block'>Candidates</span>
            </NavLink>
            <NavLink to="/candidates-manager" className={({ isActive }) => (isActive ? "nav-active" : "")}>
                <i className="fa-solid fa-people-roof"></i>
                <span className='navigation-text block'>Manager Candidates</span>
            </NavLink>
            <NavLink to="/graphs" className={({ isActive }) => (isActive ? "nav-active" : "")}>
                <i className="fa-solid fa-chart-simple"></i>
                <span className='navigation-text block'>Graphs</span>
            </NavLink>
        </nav>
    );
};

export default AsideComponent;