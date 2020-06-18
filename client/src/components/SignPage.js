import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Navbar, Nav/*, NavDropdown */} from 'react-bootstrap'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import loginImage from '../images/loginIcon.png'
import { createUser } from '../store/actions/userActions';

class SignPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            image: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    componentDidUpdate() {
        this.checkUser()
     }

    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        })
    }

    onChangeImage = event => {
        this.setState({
            image: event.target.files[0],
            loaded: 0,
        })
    }

    handleSubmit(event) {

        event.preventDefault();
        
        const formData = new FormData() 
        formData.append('username', this.state.username)
        formData.append('email', this.state.email)
        formData.append('password', this.state.password)
        formData.append('image', this.state.image)
        this.props.createUser(formData);

        this.props.history.push("/")
    }

    checkUser = async() => {
        const userStatus = await this.props.user.logedin
        console.log(userStatus)
        if (userStatus === true) {
            this.props.history.push("/")
        }
    }

    render() {
        console.log(this.state.email)
        console.log(this.state.password)
        console.log(this.state.image)
        console.log(this.state.username)

          const popover = (
            <Popover id="popover-basic"> 
              <Popover.Content>
                <a href="/signin">Create Account</a>
                <br></br>
                <a href="/login">Login</a>
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
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="mt-3 mx-auto px-2" style={{maxWidth: "590px"}}>
                <h6 className="mb-3 font-weight-bold">Register on MYtinerary</h6>
                <form className="d-flex flex-column mx-auto" onSubmit={this.handleSubmit}
                encType='multipart/form-data' style={{width: "65%"}}>
                    <label className="my-2">
                        <p className="my-1">username:</p>
                        <input name="username" type="username" style={{width: "100%"}}
                        className="form-control border border-dark"
                        value={this.state.username} onChange={this.handleChange}/>
                    </label>
                    <label className="my-2">
                        <p className="my-1">e-mail:</p>
                        <input name="email" type="email" style={{width: "100%"}}
                        className="form-control border border-dark"
                        value={this.state.email} onChange={this.handleChange}/>
                    </label>
                    <label className="my-2">
                        <p className="my-1">Password:</p>
                        <input name="password" type="text" style={{width: "100%"}}
                        className="form-control border border-dark"
                        value={this.state.password} onChange={this.handleChange}/>
                    </label>
                    <label className="my-2">
                        <p className="my-1">Picture:</p>
                        <input name="image" type="file" style={{width: "100%"}}
                        onChange={this.onChangeImage}/>
                    </label>
                    <input className="mt-4 btn btn-success" type="submit" value="Submit" />
                </form>
            </div>
            </div>
        )
    }
}

SignPage.propTypes = {
    createUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.user.items
})

export default connect(mapStateToProps, { createUser})(SignPage)