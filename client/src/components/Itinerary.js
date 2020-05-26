import React, {Component} from 'react'
import { Navbar, Nav/*, NavDropdown */} from 'react-bootstrap'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import loginImage from '../images/loginIcon.png'
import rightArrow from '../images/right-arrow.png'
import emptyStar from '../images/emptyStar.jpg'
import fullStar from '../images/fullStar.jpg'
import trash from '../images/trash.png'
import pencil from '../images/pencil.png'
import reply from '../images/reply.png'

import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { fetchItineraries } from '../store/actions/itineraryActions';
import { userLogedin, logoutUser, favItineraries } from '../store/actions/userActions'
import { modifyComment, fetchComments, modifyReply } from '../store/actions/commentActions'

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'; //https://www.npmjs.com/package/pure-react-carousel
import 'pure-react-carousel/dist/react-carousel.es.css';

class Itineraries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: [],
            comment: "",
            editComment: "",
            reply: ""
        }
    }

    componentDidMount() {
        const city = this.props.location.state.city
        const cityId = city._id
        this.props.fetchItineraries(cityId)
        this.setState ({
            city: this.props.location.state.city
        })
        this.props.fetchComments()
        this.handleComment = this.handleComment.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDeleteComment = this.handleDeleteComment.bind(this) 
        }
    
    componentDidCatch() {
        this.props.userLogedin()
    }

    handleComment(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: value})
    }

    handleSubmit(itinerary) {
        const comment = this.state.comment;
        const action = "create"
        if(this.props.user.length < 1) {
            alert("Please, login first for commenting")
        } else {
            this.props.modifyComment(
                comment, itinerary, action
            )
            this.setState({comment: ""})
        }        
    }

    handleModifyComment(comment) {
        const action = "edit"
        const itinerary = this.state.editComment
        this.props.modifyComment(
            comment, itinerary, action
        )
        this.setState({editComment: ""})
        this.openEditButton(comment._id)
    }

    handleDeleteComment(comment, itinerary) {
        const action = "delete"
        this.props.modifyComment(
            comment, itinerary, action
        )
    }

    handleCreateReply(comment) {
        const reply = this.state.reply
        const action = "add"
        if(this.props.user.length < 1) {
            alert("Please, login first for commenting")
        } else {
        this.props.modifyReply(reply, comment, action)
        }
        this.setState({reply: ""})
        this.openReply(comment)
    }

    fillItineraries = () => {
        const itinerariesList =
        this.props.itineraries.map((itinerary) =>
        <div key={itinerary._id} className="my-1 mx-2" style={{border: "solid 1px rgb(34, 34, 34)", 
        borderRadius: "5px", maxWidth: "90vh"}}>
            <div className="d-flex">
                <div className="d-flex flex-column justify-content-center align-items-center"
                style={{width: "28%"}} >
                    <img src={loginImage} alt="Login"></img>
                    <p className="mt-1 mb-0" style={{fontSize: "13px"}}>{itinerary.profileName}</p>
                 </div>
                <div className="d-flex flex-column justify-content-center py-1" style={{width: "72%"}}>
                    <div >
                        {this.fillFavItinerary(itinerary)}
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
                   
                        <input name="comment" style={{width: "85%", display: "inline-block"}} type="text" 
                        className="form-control ml-2 mb-2" placeholder="Write comment" 
                        value={this.state.comment} onChange={this.handleComment}/>
                        <img src={rightArrow} alt="rightArrow" style={{width: "8%"}}
                        onClick={()=> this.handleSubmit(itinerary._id)}
                        ></img>
                        {this.props.comments.map(comments=>{
                            if (comments.itineraryId === itinerary._id) {
                                if (this.props.user._id === comments.userId) {
                            const test =
                                <div  key={comments._id} className=" my-2">
                                    <div className="mx-4 border rounded border-secondary">
                                        <div className="d-flex align-items-center border-bottom">
                                            <img style={{width: "18px", borderRadius: "50%"}} className="mx-1 my-1"src={comments.userImage === "" ? loginImage : comments.userImage } alt=""></img>
                                            <p className="my-0" style={{fontSize: "12px"}}>{comments.username}</p>
                                        </div>
                                        <p className="my-1 px-2">{comments.comment}</p>
                                        <div id={"editCommentOpen" + comments._id} className="align-items-center" style={{display: "none"}}>
                                            <input name="editComment" style={{width: "85%"}} type="text" 
                                                className="form-control ml-2 mb-2" placeholder="Edit comment" 
                                                value={this.state.editComment} onChange={this.handleComment}/>
                                            <img src={rightArrow} alt="rightArrow" style={{width: "8%"}}
                                                onClick={()=> this.handleModifyComment(comments)}></img>
                                        </div>
                                    </div>
                                    <div className="mx-4 d-flex align-items-center justify-content-around">
                                        <img src={reply} className="mt-1" alt="reply" onClick={()=>this.openReply(comments._id)}></img>
                                        <img src={pencil} className="mt-1" alt="pen" onClick={()=>this.openEditButton(comments._id)}></img>
                                        <img src={trash} className="mt-1" alt="trash" onClick={()=>this.handleDeleteComment(comments, itinerary._id)}></img>
                                    </div>
                                    <div id={"openReply" + comments._id} className="align-items-center ml-4 mr-3" style={{display: "none"}}>
                                            <input name="reply" style={{width: "92%"}} type="text" 
                                                className="form-control ml-2 my-1" placeholder="Write reply" 
                                                value={this.state.reply} onChange={this.handleComment}/>
                                            <img src={rightArrow} alt="rightArrow" style={{width: "8%"}}/>
                                    </div>
                                </div>
                            return test} else {
                                const test =
                                <div  key={comments._id} className=" my-2">
                                    <div className="mx-4 border rounded border-secondary">
                                        <div className="d-flex align-items-center border-bottom">
                                            <img style={{width: "18px", borderRadius: "50%"}} className="mx-1 my-1"src={comments.userImage === "" ? loginImage : comments.userImage} alt=""></img>
                                            <p className="my-0" style={{fontSize: "12px"}}>{comments.username}</p>
                                        </div>
                                        <p className="my-1 px-2">{comments.comment}</p>
                                    </div>
                                    <div className="mx-4 d-flex align-items-center justify-content-center" style={{width: "32%"}}>
                                        <img src={reply} className="mt-1" alt="reply" onClick={()=>this.openReply(comments._id)}></img>
                                    </div>
                                    <div id={"openReply" + comments._id} className="align-items-center ml-4 mr-3" style={{display: "none"}}>
                                            <input name="reply" style={{width: "92%"}} type="text" 
                                                className="form-control ml-2 my-1" placeholder="Write reply" 
                                                value={this.state.reply} onChange={this.handleComment}/>
                                            <img src={rightArrow} alt="rightArrow" style={{width: "8%"}} onClick={()=>this.handleCreateReply(comments._id)}/>
                                    </div>
                                </div>
                                return test
                            }
                        }
                            else { return null }
                        })}
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

openEditButton = (comment) => {
    var editComment = document.getElementById("editCommentOpen" + comment)
    var change = editComment.style.display === "none" ? editComment.style.display = "flex" : editComment.style.display = "none"
    return change
}

openReply = (comment) => {
    var replyComment = document.getElementById("openReply" + comment)
    var change = replyComment.style.display ==="none" ? replyComment.style.display = "flex" : replyComment.style.display = "none"
    return change
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
        <p className="mb-0 text-primary" onClick={()=> this.logoutAction()}>Logout</p>
        </div>
        return popoverContent
    }
    }

logoutAction = () => {
    this.props.logoutUser(this.props.user.email)
}

fillFavItinerary = (itinerary) => {
    if(this.props.user.length < 1) {
        const favIcon =
        <h5 className="my-1 ml-2">{itinerary.title}</h5>
        return favIcon
    } else if (this.props.user.itineraries !== undefined) {
    
        if(this.props.user.itineraries.indexOf(itinerary._id) >= 0) {
            const favIcon = 
            <div className="d-flex justify-content-between">
            <h5 className="my-1 ml-2">{itinerary.title}</h5>
            <img className="mr-1" onClick={()=>this.updateFavorites(itinerary._id)} src={fullStar} alt="star" style={{width: "16px", height: "16px"}}></img>
            </div>
            return favIcon
    
            } else {
            const favIcon = 
            <div className="d-flex justify-content-between">
            <h5 className="my-1 ml-2">{itinerary.title}</h5>
            <img className="mr-1" onClick={()=>this.updateFavorites(itinerary._id)} src={emptyStar} alt="star" style={{width: "16px", height: "16px"}}></img>
            </div>
            return favIcon
        }
    }       
}

updateFavorites = (itinerary) => {
    this.props.favItineraries(
        itinerary
    )
}

    render() {
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
                    <div className="d-flex align-items-center">
                        <img style={{width: "26px", borderRadius: "50%"}} src={this.props.user.length === 0 || this.props.user.image === "" ? loginImage : this.props.user.image} alt=""></img>
                    </div>
                </OverlayTrigger>
                    <p className="mb-0 ml-2" style={{fontSize: "15px"}}>{this.props.user.length === 0 ? "" : this.props.user.username}</p>
                </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="/" className="ml-auto font-weight-bold text-white">Home</Nav.Link>
                            <Nav.Link href="/cities" className="ml-auto font-weight-bold text-white">Cities</Nav.Link>
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
    userLogedin: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    favItineraries: PropTypes.func.isRequired,
    fetchComments: PropTypes.func.isRequired,
    modifyComment: PropTypes.func.isRequired,
    modifyReply: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    itineraries: state.itineraries.items,
    user: state.user.items,
    comments: state.comments.items
})

export default connect(mapStateToProps, { fetchItineraries, userLogedin, 
    logoutUser, favItineraries, fetchComments, modifyComment, modifyReply })(Itineraries);