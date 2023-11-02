import React, { useState, useEffect } from 'react';
import Home from "./home.svg";
import shorts from "./shorts.svg";
import axios from "axios";
import './homepage.css';
import nointernet from "./nowifi.png"
import { useParams } from 'react-router-dom';
import { viewscount, calculateTimeDifference } from './usefuncs';
import Spinner from './spinner';
import LandingPage from './landingpage';

// for filtering the homepage content custom filtering chipbuttons
function Chipfilter(props) {
  const { name, onClick } = props;

  const handleChipClick = () => {
    onClick(name);
  };

  return (
    <input
      type="button"
      className="customchipbutton"
      value={name}
      onClick={handleChipClick}
    />
  );
}

// chipfilter data array
const arr = [ "Music", "Bollywod", "ComputerScience", "React", "News", "stockmarket", "civilservices", "forex", "Cryptocurrencies", "Bitcoin", "Tollywood", "PSPK", "MaheshBabu", "TeluguSongs", "KarishmaKapoorSongs"];


// homepage video card container for videos of the homepage
function VideoCard(prop) {

  const id2 = prop.element.id;
  return (
    <div className='videocardyoutubevideo'>
      <a className='linknavigator' href={`/v=/${id2}`}>
        <img className='imagesvideosone' src={prop.element.snippet.thumbnails.high.url} alt="" />
        <div className='videodatastat'><div className="title"><p>{prop.element.snippet.localized.title}</p></div></div>
        <div className="channelname">{prop.element.snippet.channelTitle} ☑</div>
        <div className="viewandtimeofpublish">
          <div className="viewcount"><p>{viewscount(prop.element.statistics.viewCount)}</p> <p>views</p></div><br />
          <div className='publishedtime' > <li>{calculateTimeDifference(prop.element.snippet.publishedAt)}</li> </div>
        </div>
      </a>
    </div>);
}

function VideoCard1(prop) {

    const id2 = prop.element.id.videoId;
    return (
      <div className='videocardyoutubevideo'>
        <a className='linknavigator' href={`/v=/${id2}`}>
          <img className='imagesvideosone' src={prop.element.snippet.thumbnails.high.url} alt="" />
          <div className='videodatastat'><div className="title"><p>{prop.element.snippet.title}</p></div></div>
          <div className="channelname">{prop.element.snippet.channelTitle} ☑</div>
        
        </a>
      </div>);
  }
  

// homepage video content 
function Homepagebody() {

  const [initvideos, setVideos] = useState('All');
    const [trendlist, setTrendList] = useState([]);
   // const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isonline, setbrowsermode] = useState(true);
    
const [err,seterr]=useState("");

    useEffect(() => {
      window.addEventListener("online", () => { setbrowsermode(true); });
      window.addEventListener("offline", () => { setbrowsermode(false); });
    
      return () => {
        window.removeEventListener("offline", () => setbrowsermode(false));
        window.removeEventListener("online", () => setbrowsermode(true));
      };
    }, []);
    
    const loadVideos = async (intv) => {
      try {
        setIsLoading(true);
        const res = await axios.get(`https://shaiksyoutubecloneserver.onrender.com/getinitvideos?q=${intv}`);
        if (res.status === 200) {
          setTrendList(res.data.items);
          setIsLoading(false);
        } else {
          seterr("RATE LIMIT EXCEEDED PLEASE TRY AFTER SOME TIME");
          setIsLoading(false);
        }
      } catch (error) {
        seterr(error);
        setIsLoading(false);
      }
    };
  
    
   /* const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isLoading) {
        setIsLoading(true);
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };
    */
    useEffect(() => {
      loadVideos(initvideos); // Pass the updated value directly to loadVideos
    }, [initvideos]);
    
   /* useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
    */
   
    
    const handlesetclickchipfilter = (element) => {
      setVideos(element);
    };
    
  return (
    <div className='homepagedata'>
      <div className="sidenavigationitems">
        <div className='sidenavitem'>
         <a className="sidenavasa"href="/"><img width="30px" height="30px" src={Home} alt="" /></a> 
          <p>Home</p>
        </div>
        <div className='sidenavitem'>
         <a className='sidenavasa' href="/shorts"><img width="30px" height="30px" src={shorts} alt="" />
          <p>Shorts </p></a> 
        </div>
      </div>

      <div>
        {/* category filter div chipfilter buttons list used chipfilter button data array; that's it */}
        <div className="categoryfilters">
          {arr.map((element, index) => {
            return <Chipfilter key={index} name={element} onClick={handlesetclickchipfilter} />;
          })}
        </div>
        {isonline ? (
  <div>
    {isLoading ? (
      <div className='spinnerhomepage'>
        <Spinner />
      </div>
    ) : (
      <div className="videoslistingrid">
        { err ==="" ? (
          trendlist.map((element, index) => (
            <div key={index}>
              {initvideos === 'All' ? (
                <VideoCard element={element} />
              ) : (
                <VideoCard1 element={element} />
              )}
            </div>
          ))
        ) : (
          <div className='ratelimtwarning' ><h2>RATE LIMIT EXCEEDED PLEASE TRY AFTER SOME TIME</h2></div>
        )}
      </div>
    )}
  </div>
) : (
  <div className='nointernetofflinediv'>
    <div>
      <img src={nointernet} alt="" height="200px" width="300px" />
    </div>
    <p className="offlone">you are Offline</p>
  </div>
)}
      </div>

    </div>
  );
}

export default Homepagebody;
