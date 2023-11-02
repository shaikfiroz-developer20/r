import React from 'react';
import logo from "./logo.svg";

const style = {
  width: '97vw',
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  gap: '40vw',
  marginLeft: '45px',
  position: 'sticky',
  bottom: '0',
  backgroundColor: 'black',
  height: 'fit-content',
  marginBottom: '0',
  borderTop: '1px solid rgb(28, 28, 28)',
  marginTop: '10px',
  color: 'white',
};

const mobileStyle = {
  // Adjust styles for mobile devices
  position: 'relative', // Remove sticky position on mobile
};

function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div>
      <div style={{ ...style, ...(window.innerWidth <= 768 ? mobileStyle : {}) }} className="footerdiv">
        <img src={logo} width="90px" height="80px" alt="" />
        <p>@Copyright {year}</p>
      </div>
    </div>
  );
}

export default Footer;
