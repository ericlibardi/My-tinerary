import React, {Component} from 'react'
import { render } from 'react-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import loginImage from '../images/loginIcon.png'

export default class Cities extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            cities: [1],
            citFilter: "",
            filtCities: [1]
        };
    }

componentDidMount() {
   this.setState({...this.state, isFetching: true})
    fetch('http://localhost:5000/cities/all', {
        method: "GET",
        mode: 'cors',
        cache: 'default'
    })
    .then(response => response.json())
    .then(result => {this.setState({cities: result,
    isFetching: false})
        this.setState({cities: result.sort((a,b) => a.name.localeCompare(b.name)  )
        })
        this.setState({filtCities: this.state.cities})
    })
    .catch(e => console.log(e))
}
    handleChange = (e) => {
        this.setState ({
            citFilter: e.target.value}, () => {
                this.filterCities()
            })
    }

    filterCities = () => {

        let filtCities = this.state.cities
        filtCities = filtCities.filter((city) => {
            let cityName = city.name.toLowerCase()
            return cityName.indexOf(
                this.state.citFilter.toLowerCase()) === 0                 
        })
        this.setState({
            filtCities
        })
    }


    render () {
        console.log(this.state.filtCities)

        const citiesList = this.state.filtCities.map((city, index) => 
            <div key={city._id} className="mb-2 mx-2 card bg-dark text-white" style={{maxWidth: "90vh", height: "21vh"}}>
                <img className="card-img" src={city.image} alt={city.name} style={{width: "100%", height: "100%", objectFit: "cover"}}></img>
                <div className="card-img-overlay d-flex justify-content-center align-items-center">
                    <p className="card-title bg-success py-1" style={{textAlign: "center", width: "80%"}}>{city.name}</p>
                </div>
            </div>
        );

        const popover = (
            <Popover id="popover-basic">
              <Popover.Content>
                <a href="url">Create Account</a>
                <br></br>
                <a href="url">Login</a>
              </Popover.Content>
            </Popover>
          );
    return (
        <div>
            <Navbar bg="secondary" expand="lg">
                <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                    <img src={loginImage} alt="Login"></img> 
                </OverlayTrigger>
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
                    <p style={{marginBottom: "1px"}} className="font-weight-bold">Filter our current cities</p>
                </div>
                <input style={{maxWidth: "590px"}} type="text" 
                className="form-control" placeholder="Search" 
                value={this.state.citFilter}
                onChange={this.handleChange}></input>
            </div>
            <div className="d-flex flex-column align-items-center">
            {citiesList}
            </div>
        </div>
    )}
}
