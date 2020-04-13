import React, {Component} from 'react'
import { Navbar, Nav/*, NavDropdown */} from 'react-bootstrap'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Popover from 'react-bootstrap/Popover'
import loginImage from '../images/loginIcon.png'
import rightArrow from '../images/right-arrow.png'

import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { fetchItineraries } from '../store/actions/itineraryActions';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


class Itineraries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: []
        }
    }
    componentDidMount() {
        //const itineraries = this.props.match.params
        const city = this.props.location.state.city
        const cityId = city._id
        this.props.fetchItineraries(cityId)
        this.setState ({
            city: this.props.location.state.city
        })
        }

    fillItineraries = () => {
        const responsive = {
            superLargeDesktop: {
              // the naming can be any, depends on you.
              breakpoint: { max: 4000, min: 3000 },
              items: 3
            },
            desktop: {
              breakpoint: { max: 3000, min: 1024 },
              items: 3
            },
            tablet: {
              breakpoint: { max: 1024, min: 464 },
              items: 4
            },
            mobile: {
              breakpoint: { max: 464, min: 0 },
              items: 3
            }
          };


        const itinerariesList =
        this.props.itineraries.map((itinerary) =>
        <div key={itinerary._id} className="my-1 mx-2" style={{border: "solid 1px rgb(34, 34, 34)", 
        borderRadius: "5px", maxWidth: "90vh"}}>
            <div className="d-flex">
                <div className="d-flex flex-column justify-content-center align-items-center"
                style={{width: "28%"}}
                >
                    <img src={loginImage} alt="Login"></img>
                    <p className="mt-1 mb-0" style={{fontSize: "13px"}}>{itinerary.profileName}</p>
                 </div>
                <div className="d-flex flex-column justify-content-center py-1" style={{width: "72%"}}>
                    <div >
                        <h5 className="my-1 ml-2">{itinerary.title}</h5>
                        <div className="d-flex">
                            <p className="ml-2 mb-0">Likes: {itinerary.ratings}</p>
                            <p className="ml-3 mb-0">{itinerary.duration}</p>
                            <p className="ml-3 mb-0">{itinerary.price}</p>
                        </div>
                    </div>
                    <div className="d-flex flex-nowrap" style={{fontSize: "15px", overflowX: "hidden"}}>
                        {itinerary.hashtags.map((hashtag, index)=>
                        <p key={index} className="ml-2 mb-0">{hashtag}</p>)}
                    </div>
                </div>
            </div>
            <div>
                <div id={"more" + itinerary._id} style={{display: "none"}}>
                    <h6 className="ml-2 my-1">Activities</h6>
                    
                    <Carousel  
                    responsive = {responsive}
                    centerMode={true}
                    containerClass="carousel-container"
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                    >
                    {itinerary.activities.map((activity, index)=>
                        
                        <div key={index} className="mb-2 mx-2 card bg-dark text-white" style={{width: "15vh", height: "15vh"}}>
                            <img className="card-img" src={activity.image} alt={activity.title} style={{width: "100%", height: "100%", objectFit: "cover"}}></img>
                            <div className="card-img-overlay d-flex justify-content-center align-items-center">
                                <p className="text-white py-1 mb-0" style={{textAlign: "center", width: "100%"}}>{activity.title}</p>
                            </div>
                        </div>
                         )}
          </Carousel>
                        
                    
                    <h6 className="ml-2 mt-4 mb-1">Comments</h6>
                    <input style={{width: "85%", display: "inline-block"}} type="text" 
                    className="form-control ml-2 mb-3" placeholder="Write comment" 
                    ></input>
                    <img src={rightArrow} alt="rightArrow" style={{width: "8%"}}></img>
                </div>
                <div className="bg-warning text-center" onClick={() => this.myFunction(itinerary._id)} style={{fontSize: "13px"}}>
                    <p className="my-1" id={"viewMore" + itinerary._id} style={{display: "inline-block"}}>View More</p>
                    <p className="my-1" id={"close" + itinerary._id} style={{display: "none"}}>Close</p>
                </div>
            </div>

        </div>
        )
        return itinerariesList
        }
    myFunction = (id) => {
        this.setState({

        })
        var viewMore = document.getElementById("viewMore" + id);
        var close = document.getElementById("close" + id)
        var moreText = document.getElementById("more" + id);
        if (viewMore.style.display === "none") {
            close.style.display = "none";
            viewMore.style.display = "inline-block"
            moreText.style.display = "none";
          } else {
            close.style.display = "inline-block";
            viewMore.style.display = "none"
            moreText.style.display = "inline-block";
          }

    }
    loadCarousel = () => {
        
          
    }

    render() {
        console.log(this.props.itineraries)
      
        const popover = (
            <Popover id="popover-basic">
              <Popover.Content>
                <a href="url">Create Account</a>
                <br></br>
                <a href="url">Login</a>
              </Popover.Content>
            </Popover>)


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
                <div className="d-flex flex-column align-items-center">
                    <div className="my-2 mx-2 card bg-dark text-white" style={{maxWidth: "90vh", height: "21vh"}}>
                        <img className="card-img" src={this.state.city.image} alt={this.state.city.name} style={{width: "100%", height: "100%", objectFit: "cover"}}></img>
                        <div className="card-img-overlay d-flex justify-content-center align-items-center">
                            <p className="bg-success text-white py-1 mb-0" style={{textAlign: "center", width: "80%"}}>{this.state.city.name}</p>
                        </div>
                    </div>
                </div>
                <div className="my-2 mx-2 d-flex flex-column align-items-center">
                    <div style={{width: "100%", maxWidth: "560px"}}>
                        <p style={{marginBottom: "1px"}} className="font-weight-bold">Available MYtinerary</p>
                    </div>
                </div>
                <div className="d-flex flex-column mx-auto" style={{maxWidth: "90vh"}}>
                    {this.fillItineraries()}
                    
                </div>
                <div className="mt-2 mx-auto" style={{maxWidth: "90vh"}}>
                    <a href="/cities" className="ml-2">Choose another city.</a>
                </div>
            </div>
        )
    }
}


Itineraries.propTypes = {
    fetchItineraries: PropTypes.func.isRequired,
    itineraries: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    itineraries: state.itineraries.items
})

export default connect(mapStateToProps, { fetchItineraries })(Itineraries);