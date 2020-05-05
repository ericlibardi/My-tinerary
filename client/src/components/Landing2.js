import React, {Component} from 'react'
import { Navbar, Nav/*, NavDropdown */} from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Carousel from 'react-bootstrap/Carousel'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import logoImage from '../images/MYtineraryLogo.png'
import loginImage from '../images/loginIcon.png'
import directImage from '../images/world-icon.png'
import { fetchCities } from '../store/actions/cityActions';
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { storeUser } from '../store/actions/loginActions'
import { userLogedin } from '../store/actions/userActions'

class Landing2 extends Component {
        
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            cities: [1],
            user: "",
        };
        this.storeToken = this.storeToken.bind(this);
    }

    componentDidMount() {
        this.props.fetchCities()
        this.storeToken()
        this.props.userLogedin()
     }

     storeToken = () => {
        const token = this.props.location.search.slice(this.props.location.search.indexOf("=")+1)
        if(token !== "")
        this.props.storeUser(token)

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

    render() {
        console.log(this.props.user)
        const imageStyle ={
            width: "140px",
            height: "95px",
            padding: "1px 0.5px"
        }

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
            <Container className="d-flex flex-column ">
                <img src={logoImage} alt="MYtinerary Logo" className="my-4 img-fluid align-self-center "></img>
                <div style={{maxWidth: "300px"}} className="align-self-center">
                    <p className="mb-2 mt-3 font-italic text-center" style={{fontSize: "15px"}}>
                    Find your perfect trip, designed by insiders who know and love their cities.
                    </p>
                </div>
                <a href="/cities" className="align-self-center">
                    <img src={directImage} alt="Arrow" ></img>
                </a>
            </Container>
            <Container style={{width: "310px"}}>
                <h6 className="mt-5 mb-2">Popular MYtineraries</h6>
                <Carousel >
                    <Carousel.Item>
                        {
                            this.props.cities.map((city, index) => {
                                if (index <= 3) {
                                const fourCities =
                                <img
                                key={city._id}
                                src={city.image}
                                alt={city.name}
                                style={imageStyle}
                                ></img>
                                return fourCities
                                }
                                return null
                            })
                        }
                    </Carousel.Item>
                    <Carousel.Item>
                    {
                            this.props.cities.map((city, index) => {
                                if (index >= 4 && index <= 7) {
                                const fourCities =
                                <img
                                key={city._id}
                                src={city.image}
                                alt={city.name}
                                style={imageStyle}
                                ></img>
                                return fourCities
                                }
                                return null
                            })
                        }
                    </Carousel.Item>
                    <Carousel.Item>
                    {
                            this.props.cities.map((city, index) => {
                                if (index >= 8 && index <= 11) {
                                const fourCities =
                                <img
                                key={city._id}
                                src={city.image}
                                alt={city.name}
                                style={imageStyle}
                                ></img>
                                return fourCities
                                }
                                return null
                            })
                        }
                    </Carousel.Item>

                </Carousel>
                
            </Container>
        </div>
    )
}}

Landing2.propTypes = {
    fetchCities: PropTypes.func.isRequired,
    cities: PropTypes.array.isRequired,
    storeUser: PropTypes.func.isRequired,
    userLogedin: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    cities: state.cities.items,
    user: state.user.items
})

export default connect(mapStateToProps, { fetchCities, storeUser, userLogedin })(Landing2);