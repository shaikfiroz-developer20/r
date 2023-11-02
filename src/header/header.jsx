import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import search from './search.svg';
import voice from './voice.svg';
import recordvideo from './recordvideo.svg';
import './header.css';
//import Dictaphone from '../usefuncs';

function Header() {
  const navigate = useNavigate();

  // State for controlling the Dictaphone and search input
  //const [showDictaphone, setShowDictaphone] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  // Function to handle the search form submission
  const handleSearch = (input) => {
    if (input) {
      navigate(`/search=/${input}/searchresult ↓`);
    }
  };

  /* Function to toggle Dictaphone visibility
  const handleVoiceSearch = () => {
    setShowDictaphone(!showDictaphone);
  };

  // Function to handle transcript change
  const handleTranscriptChange = (transcript) => {
    setSearchInput(transcript);
    handleSearch(transcript); // Automatically trigger the search
  };*/

  return (
    <div className='header'>
      <div className="header1">
        <div className="logo"><img width="80px" height="50px" src={logo} alt="" /></div>
        <div className="searchbar">
          <div className="searchinput">
            <form className='searchform' onSubmit={(e) => e.preventDefault()}>
              
              <input
                type='text'
                placeholder='Search..'
                autoComplete="off"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button className='searchbutton' type='button' onClick={() => handleSearch(searchInput)}>
                <img width="25px" src={search} alt="" />
              </button>
            </form>
          </div>
          <button className='searchvoice' >
            <img width="20px" src={voice} alt="" />
          </button>
          {/*showDictaphone && <Dictaphone onTranscriptChange={handleTranscriptChange} />*/}
        </div>
        <div className="profile">
          <div><img width="10px" src={recordvideo} alt="" /></div>
        </div>
      </div>
    </div>
  );
}

export default Header;
