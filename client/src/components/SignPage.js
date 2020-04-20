import React, { Component } from 'react'
import { Navbar, Nav/*, NavDropdown */} from 'react-bootstrap'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import loginImage from '../images/loginIcon.png'

class SignPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            urlPicture: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        alert('Thank you for registering');
        event.preventDefault();
    }

    render() {
        console.log(this.state.email)
        console.log(this.state.password)
        console.log(this.state.urlPicture)
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
            <div className="mt-3 mx-auto px-2" style={{maxWidth: "590px"}}>
                <h6 className="mb-3 font-weight-bold">Register on MYtinerary</h6>
                <form className="d-flex flex-column mx-auto " onSubmit={this.handleSubmit}
                style={{width: "65%"}}>
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
                        <input name="urlPicture" type="url" style={{width: "100%"}}
                        className="form-control border border-dark"
                        value={this.state.urlPicture} onChange={this.handleChange}/>
                    </label>
                    <input className="mt-4 btn btn-success" type="submit" value="Submit" />
                </form>
            </div>
            </div>
        )
    }
}

export default SignPage