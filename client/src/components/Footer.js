import React from 'react';
import '../styles/Footer.scss';

const Footer = (props) => {

  return (
    <div className='footer'>
      <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Doro. All Rights Reserved.</p>
      </div> 
    </div>
  )
}

export default Footer;
