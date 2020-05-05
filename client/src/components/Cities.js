import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import { Navbar, Nav/*, NavDropdown */} from 'react-bootstrap'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import loginImage from '../images/loginIcon.png'

import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { fetchCities } from '../store/actions/cityActions';
import { userLogedin } from '../store/actions/userActions'

class Cities extends Component {
    
constructor(props) {
        super(props);
        this.state = {
            citFilter: "",
            filtCities: [],
            loggedin: false,
            token: ""
        };
    }

    componentDidMount() {
        this.props.fetchCities() 
        this.props.userLogedin() 
     
    }

    handleChange = (e) => {
        this.setState ({
            citFilter: e.target.value}, () => {
                this.filterCities()
            })
    }

    filterCities = () => {
        let filtCities = this.props.cities
        filtCities = filtCities.filter((city) => {
            let cityName = city.name.toLowerCase()
            return cityName.indexOf(
                this.state.citFilter.toLowerCase()) === 0                 
        })
        this.setState({
            filtCities
        })
    }
    
    fullfillCities = () => {
        if (this.state.citFilter !== "") {
            const citiesList = 
            this.state.filtCities.map((city) =>
            <div key={city._id} className="mb-2 mx-2 card bg-dark text-white" style={{maxWidth: "90vh", height: "21vh"}}>
                <img className="card-img" src={city.image} alt={city.name} style={{width: "100%", height: "100%", objectFit: "cover"}}></img>
                <div className="card-img-overlay d-flex justify-content-center align-items-center">
                <Link to ={{
                        pathname: '/itineraries',
                        state: {
                            city: city}
                    }} className="bg-success text-white py-1" style={{textAlign: "center", width: "80%"}}>{city.name}</Link>
                </div>
            </div>
        );
        return citiesList
            
        } else {
            const citiesList = 
            this.props.cities.map((city) =>
            <div key={city._id} className="mb-2 mx-2 card bg-dark text-white" style={{maxWidth: "90vh", height: "21vh"}}>
                <img className="card-img" src={city.image} alt={city.name} style={{width: "100%", height: "100%", objectFit: "cover"}}></img>
                <div className="card-img-overlay d-flex justify-content-center align-items-center">
                    <Link to ={{
                        pathname: '/itineraries',
                        state: {
                            city: city}
                    }} className="bg-success text-white py-1" style={{textAlign: "center", width: "80%"}}>{city.name}</Link>
                </div>
            </div>
        );
        return citiesList
        }   
    }

    fillPopOver = () => {
        if (this.props.user.length === 0) {
             const popoverContent = 
            <div>
            <a href="/signin">Create Account</a>
            <br></br>
            <a href="/login">Login</a>
            </div>
            return popoverContent

        }else {
            const popoverContent = 
            <div>
            <a href="/signin">Logout</a>
            </div>
            return popoverContent
        }
        }
    fillLogedDet = () => {
        if (this.props.user.length === 0) {
            const logedDetails = 
                <div>
                <img src={loginImage} alt="Login"></img>
                </div>
            return logedDetails
        } else {
            const logedDetails = 
                <div className="d-flex align-items-center">
                <img style={{width: "26px", borderRadius: "50%"}} src={this.props.user.image} alt="Logout"></img>
                </div>
            return logedDetails
        }
    }

    fillEmalDetail = () => {
        if (this.props.user.length === 0) {
            return
        } else {
            const email = 
            <p className="mb-0 ml-2" style={{fontSize: "15px"}}>{this.props.user.username}</p>
            return email
        }
    }


    render () {

        console.log(this.props.location.search.slice(this.props.location.search.indexOf("=")+1))

        const popover = (
            <Popover id="popover-basic">
              
              <Popover.Content>
                {this.fillPopOver()}
              </Popover.Content>
            </Popover>
          );
    return (
        <div>
            <Navbar bg="secondary" expand="lg">
            <Navbar.Brand className="d-flex">
                <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                    {this.fillLogedDet()}
                </OverlayTrigger>
                 {this.fillEmalDetail()}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/" className="ml-auto font-weight-bold text-white">Home</Nav.Link>
                        <Nav.Link href="/cities" className="ml-auto font-weight-bold text-white">Cities</Nav.Link>
                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="my-3 mx-2 d-flex flex-column align-items-center">
                <div style={{width: "100%", maxWidth: "590px"}}>
                    <p className="font-weight-bold mb-1">Filter our current cities</p>
                </div>
                <input style={{maxWidth: "590px"}} type="text" 
                className="form-control" placeholder="Search" 
                value={this.state.citFilter}
                onChange={this.handleChange}></input>
            </div>
            <div className="d-flex flex-column align-items-center">
            {this.fullfillCities()}
            </div>
        </div>
    )}
}

Cities.propTypes = {
    fetchCities: PropTypes.func.isRequired,
    cities: PropTypes.array.isRequired,
    userLogedin: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    cities: state.cities.items,
    user: state.user.items
})

export default connect(mapStateToProps, { fetchCities, userLogedin })(Cities);