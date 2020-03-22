import React from 'react';
import '../App.css';
import imageLogo from '../images/MYtineraryLogo.png'
import imageFlight from '../images/world-icon.png'
import imageHome from '../images/homeIcon.png'

function LandingPage() {
  return (
    <div>
      <div className="Header">
        <img src={imageLogo} alt='logoMYtinerary'></img>
      </div>
      <div className="landFullPage">
        <div className="halfPage">
        <div className="landBody">
          <h4>Find your perfect trip, designed by insiders who know and love their cities</h4>
          <h2>Start browsing</h2>
          <img src={imageFlight} alt='plane'></img>
          <p>Want to build your own MYtinerary?</p>
          <div className="landLogin">
            <p>Log in</p>
            <p>New Account</p>
          </div>
        </div>
        </div>
      </div>
        <div className="landFooter">
          <img src={imageHome} alt='home'></img>
        </div>
    </div>
  );
}

export default LandingPage;
