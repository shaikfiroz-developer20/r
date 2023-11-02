import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Home from "./home.svg";
import shorts from "./shorts.svg";
import "./searchresults.css";
import { calculateTimeDifference } from './usefuncs';
import Spinner from './spinner';
import nointernet from "./nowifi.png"
import share from "./share.svg"



//search results showing page with the navigation to the vidoeplayer page 




//searchpagevideocard function which makes a card of the video details
function Searchvideocardresultpage(prop) {

  const id2 = prop.element.id.videoId;  //video id to access the video

  return (
    <div className='searchresultvideopage'>
      <a className='linknavigatorsearch' href={`/v=/${id2}`}>
        <div className="imgandcontentboxsearchresultspage">
          <div className="imagesvideosonesearchpage">
            <img className='imagesvideosonesearchpagein' src={prop.element.snippet.thumbnails.high.url} alt="" />
          </div>
          <div className='datasearchpageouterdispalygrid'>
          <div className="datasearchresultpage">
            <div className='videodatastatsearchpage'><p>{prop.element.snippet.title}</p></div>
            <div className="channelnamesearchpage"><p>{prop.element.snippet.channelTitle} ☑ </p>   
           <p>{calculateTimeDifference(prop.element.snippet.publishTime)}</p>
            </div>
            </div>

          </div>
        </div>
      </a>
    </div>
  );
}


//main search result function to show and manage the video cards display process 

function Searchresultpage() {
  const { data } = useParams();
  const [searcheddata, setsearcheddata] = useState([]);
  const [dataloaded, setdataload] = useState(null);
  const [online, setmode] = useState(navigator.onLine);


  //checks wether user is online or offline
  useEffect(() => {
    window.addEventListener("offline", () => setmode(false));
    window.addEventListener("online", () => setmode(true));

    return () => {
      window.removeEventListener("offline", () => setmode(false));
      window.removeEventListener("online", () => setmode(true));
    };
  }, []);


// here we used useeffect to accurate search when ever the data changes quickly this useffect is very helpful here to make the browser request according to change in data param
  useEffect(() => {
    const handlesearch = async () => {
      try {
        const response = await axios.get(`https://shaiksyoutubecloneserver.onrender.com/hello?searchid=${data}`);
        setsearcheddata(response.data.items);
        setdataload(true);
      } catch (error) {
        console.error(error);
      }
    };
  handlesearch();
  }, [data]);

  return (
    <div className='outercontainer'>
      <div className="sidenavigationitems">
        <div className='sidenavitem'>
         <a href="/"><img width="30px" height="30px" src={Home} alt="" /></a> 
          <p>Home</p>
        </div>
        <div className='sidenavitem'>
          <img width="30px" height="30px" src={shorts} alt="" />
          <p>Shorts </p>
        </div>
      </div>
      <div className='searchresultbody'>
        {dataloaded ? (
          <div className='displaysearchedvideoouterdiv'>
            {searcheddata.map((element, index) => {
              return <Searchvideocardresultpage key={index} element={element} />;
            })}
          </div>
        ) : (
          <div className='onlinespinnerandnetworkisuue'>{online ? (<Spinner />) :
           (<div className='networkandtext'><img height="250px" width="250px" src={nointernet} alt="networkissue" /> 
           <p>Network Issue</p></div>)}</div>
        )}
      </div>
    </div>
  );
}

export default Searchresultpage;
