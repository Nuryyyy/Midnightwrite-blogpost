import { NavLink } from 'react-router-dom'
import './Topbar.css';
import logo from '../images/logo_white.png'
// import { useContext } from "react"
// import { AuthContext } from "../../context/AuthProvider"
// import  useAuth  from "../../hooks/useAuth"

function TopBar() {

  // const { currentUser } = useContext(AuthContext)
  // const { currentUser } = useAuth()

  // const { auth } = useContext(AuthContext);

    return (
        <nav id="navbar" className="navbar navbar-expand-lg sticky-top" > 
         <div className="container">
          <a id="logobar" className="navbar-brand" href="/">
         <img src={logo} alt="Logo" width="40" height="40" class="d-inline-block align-text-top" />
              {/* <NavLink className="navbar-brand nav-tabs" to="/" end>MidnightWrite</NavLink> */}
          Midnightwrite
          </a>
              <button id="btn" className="navbar-toggler ms-lg-2" data-bs-toggle="collapse"
            data-bs-target="#nav" aria-controls="nav" aria-label="Expand Navigation">
            <div class="navbar-toggler-icon"></div>
        </button>
            <div className="collapse navbar-collapse" id="nav">
                <ul className="navbar-nav ms-auto">
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/landingpage">LandingPage</NavLink>
            </li> */}
            <li className="nav-item ">
              <NavLink className="nav-link" to="/home">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/posts/create">Create</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile">Profile</NavLink> 
              {/* {currentUser?.username} */}
            </li>

            {/* newly added logout route */}
            
            {/* <li className="nav-item"> */}
              {/* <span className="nav-link" onClick={logout}>Logout</span> :  */}
              {/* <NavLink className="nav-link" onClick={logout}>Logout</NavLink> 
             
            </li> */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/users">Users</NavLink> 
              {/* {currentUser?.username} */}
            </li>
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/posts/new">NewPost</NavLink> 
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
    )
}


export default TopBar