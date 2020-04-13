import React, {Component} from 'react'
import { Navbar, Nav/*, NavDropdown */} from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
//import Row from 'react-bootstrap/Row'
//import Col from 'react-bootstrap/Col'
import Carousel from 'react-bootstrap/Carousel'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import logoImage from '../images/MYtineraryLogo.png'
import loginImage from '../images/loginIcon.png'
import directImage from '../images/world-icon.png'
import squareImage from '../images/unnamed.png'
import { fetchCities } from '../store/actions/cityActions';
import PropTypes from 'prop-types'
import { connect } from "react-redux";

class Landing2 extends Component {
        
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            cities: [1],
        };
    }

    componentDidMount() {
        this.props.fetchCities()
     }

    render() {
        const imageStyle ={
            width: "140px",
            height: "95px",
            padding: "1px 0.5px"
        }

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
            <Container className="d-flex flex-column ">
                <img src={logoImage} alt="MYtinerary Logo" className="my-3 img-fluid align-self-center "></img>
                <div style={{maxWidth: "300px"}} className="align-self-center">
                    <p className="mb-1 mt-2 font-italic text-center" style={{fontSize: "15px"}}>
                    Find your perfect trip, designed by insiders who know and love their cities.
                    </p>
                </div>
                <a href="/cities" className="align-self-center">
                    <img src={directImage} alt="Arrow" ></img>
                </a>
            </Container>
            <Container style={{width: "310px"}}>
                <h6 className="mt-4">Popular MYtineraries</h6>
                <Carousel >
                    <Carousel.Item>
                        {
                            this.props.cities.map((city, index) => {
                                if (index <= 3) {
                                const fourCities =
                                <img
                                src={city.image}
                                alt={city.name}
                                style={imageStyle}
                                ></img>
                                return fourCities
                                }
                            })
                        }
                    </Carousel.Item>
                    <Carousel.Item>
                    {
                            this.props.cities.map((city, index) => {
                                if (index >= 4 && index <= 7) {
                                const fourCities =
                                <img
                                src={city.image}
                                alt={city.name}
                                style={imageStyle}
                                ></img>
                                return fourCities
                                }
                            })
                        }
                    </Carousel.Item>
                    <Carousel.Item>
                    {
                            this.props.cities.map((city, index) => {
                                if (index >= 8 && index <= 11) {
                                const fourCities =
                                <img
                                src={city.image}
                                alt={city.name}
                                style={imageStyle}
                                ></img>
                                return fourCities
                                }
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
}

const mapStateToProps = state => ({
    cities: state.cities.items
})

export default connect(mapStateToProps, { fetchCities })(Landing2);