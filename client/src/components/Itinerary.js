import React, {Component} from 'react'
import { Navbar, Nav/*, NavDropdown */} from 'react-bootstrap'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import loginImage from '../images/loginIcon.png'
import rightArrow from '../images/right-arrow.png'

import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { fetchItineraries } from '../store/actions/itineraryActions';
import { userLogedin } from '../store/actions/userActions'

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'; //https://www.npmjs.com/package/pure-react-carousel
import 'pure-react-carousel/dist/react-carousel.es.css';

class Itineraries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: [],
            user: "",
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
        this.props.userLogedin()
        }

    fillItineraries = () => {
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
                <div id={"more" + itinerary._id} style={{display: "none", width: "100%"}}>
                    <h6 className="ml-2 my-1">Activities</h6>
                    <div className="d-flex justify-content-center">

                    <CarouselProvider
                        className="mx-2"
                        naturalSlideWidth={100}
                        naturalSlideHeight={20}
                        totalSlides={itinerary.activities.length / 3}
                        step={1}
                        
                    >
                        
                        <Slider>
                        {itinerary.activities.map((activity, index)=> {
                        const activities =
                        
                        <Slide index={index} key={index} className="card mr-1" style={{width: "16vh", height: "16vh"}}>
                            <img className="card-img" src={activity.image} alt={activity.title} style={{width: "100%", height: "100%", objectFit: "cover"}}></img>
                            <div className="card-img-overlay d-flex justify-content-center align-items-center">
                                <p className="text-white mb-0" style={{fontSize: "14px", textAlign: "center", width: "100%"}}>{activity.title}</p>
                            </div>
                        </Slide>
                        
                        return activities 
                        })}
                        </Slider>
                        <div className="d-flex justify-content-around mt-1">
                        <ButtonBack><img src={rightArrow} alt="left_arrow" style={{width: "25px", transform: "rotate(180deg)"}}></img></ButtonBack>
                        <ButtonNext><img src={rightArrow} alt="righ_arrow" style={{width: "25px"}}></img></ButtonNext>
                        </div>


                    </CarouselProvider>

                    </div>
                    <h6 className="ml-2 mt-4 mb-1">Comments</h6>
                    <input style={{width: "85%", display: "inline-block"}} type="text" 
                    className="form-control ml-2 mb-3" placeholder="Write comment" 
                    ></input>
                    <img src={rightArrow} alt="rightArrow" style={{width: "8%"}}></img>
                </div>
                <div className="bg-warning text-center" onClick={() => this.myFunction(itinerary)} style={{fontSize: "13px"}}>
                    <p className="my-1" id={"viewMore" + itinerary._id} style={{display: "inline-block"}}>View More</p>
                    <p className="my-1" id={"close" + itinerary._id} style={{display: "none"}}>Close</p>
                </div>
            </div>

        </div>
        )
        return itinerariesList
        }
    myFunction = (itinerary) => {
        
        var viewMore = document.getElementById("viewMore" + itinerary._id);
        var close = document.getElementById("close" + itinerary._id)
        var moreText = document.getElementById("more" + itinerary._id);
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
        console.log(this.props.itineraries.length)
      
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
    userLogedin: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    itineraries: state.itineraries.items,
    user: state.user.items
})

export default connect(mapStateToProps, { fetchItineraries, userLogedin })(Itineraries);