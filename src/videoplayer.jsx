import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./videoplayer.css";
import { viewscount, calculateTimeDifference } from './usefuncs';
import Spinner from './spinner';
import nointernet from "./nowifi.png"



//videocard for the suggestions videos in the videoplayer page where the desired video the user will be able to watch
function VideoCard(prop) {
  const id2 = prop.element.id.videoId;

  return (
    <div className='suggestionvideocard'>
      <a className='linknavigatorvideoplayer' href={`/v=/${id2}`}>
        <div className="imgssuggestedvideosvideoplayer">
          <img className='imagesvideosonesuggestion' src={prop.element.snippet.thumbnails.high.url} alt="" />
        </div>
        <p className="channeltitlevideoplayer">{prop.element.snippet.channelTitle}</p>
        <p className='videodetailssuggestionvideoplayer'>{prop.element.snippet.title}</p>
      </a>
    </div>
  );
}



//main function that videoplayer page  handles

function Videoplayer(prop) {
  const { id } = useParams();
  const category = 22;//dummy category
  const [videodetails, setvideodetails] = useState([]);
  const [dataloaded, setdataload] = useState(null);
  const [suggestdataloaded, setsuggestdataload] = useState(false);
  const [suggestedvideos, setsuggestedvideos] = useState([]);
  const [reqdesc, setreqdesc] = useState(false); //description visibilty initially false if user wants to watch it then the use state will help!
  const [online, setmode] = useState(navigator.onLine); // Initialize with the current online status

 
  // Add event listeners in the useEffect  used for online or offline checking and informing the user
  useEffect(() => {
    window.addEventListener("offline", () => setmode(false));
    window.addEventListener("online", () => setmode(true));

    return () => {
      // Remove the event listeners when the component unmounts
      window.removeEventListener("offline", () => setmode(false));
      window.removeEventListener("online", () => setmode(true));
    };
  }, []);


//two requests simuntanioulsy one is for searched video and the other is for the suggested videos
  const handleeffectfordata = async (ids, category) => {
    try {
      const res = await axios.get(`https://shaiksyoutubecloneserver.onrender.com/serachdetailssong?id=${ids}`);
      setvideodetails(res.data.items);
      setdataload(true);
      const ressuggestedvideos = await axios.get(`https://shaiksyoutubecloneserver.onrender.com/suggestedvideos?id=${category}`);
      setsuggestedvideos(ressuggestedvideos.data.items);
      setsuggestdataload(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleeffectfordata(id, category);
  }, [id]);

  //for handeling the description visibility
  const handlerequestdesc = () => {
    setreqdesc(!reqdesc);
  }

  return (
    <div className="outerofvideoplayer">
      <div className="videooterdiv">
        <div className="video">
          <iframe src={`https://www.youtube.com/embed/${id}?autoplay=1?controls=0`} className='videoplayeriframe' frameBorder="0" allowFullScreen></iframe>
        </div>
        {dataloaded ? (
          <div className="videostat">
            <p className='videotitlevideoplayerpage'>{videodetails[0].snippet.title}</p>
            <div className="channelname">
              <p>{videodetails[0].snippet.channelTitle}</p>
            </div>
            <div className="stat">
              <div className="vies">
                <p>👀 {viewscount(videodetails[0].statistics.viewCount)}</p>
              </div>
              <div className="likes">
                <p>🖤 {videodetails[0].statistics.likeCount}</p>
              </div>
            </div>
            <div className="discriptionbox">
              <p> {viewscount(videodetails[0].statistics.viewCount)} views</p>
              <div className='spanning'>
                <p> {videodetails[0].statistics.likeCount} likes</p>
                <div className='publishedtimevideoplayer'>
                  <li>{calculateTimeDifference(videodetails[0].snippet.publishedAt)}</li>
                </div>
                <button className='moredetailsvisiblebutton' onClick={handlerequestdesc}>
                  {reqdesc ? ("show less details") : ("show more details")}
                </button>
              </div>
              {reqdesc ? (<div className='discriptioninsidedesbox'>{videodetails[0].snippet.description}</div>) : (<div></div>)}{/*we can write this as {reqdesc && (<div>data to show</div>)}*/}
            </div>
          </div>
        ) : (
          <div>{online ? (<Spinner />) : (<div className='nointernetvideoplayerpage'><img src={nointernet} alt="" /><p>Network Issue</p></div>)}
          </div>)}
      </div>
      <div className="suggestedvideos">
        <div className="suggestionheading"><p>Suggested Videos </p>😊</div>
        {suggestdataloaded ? (
          <div className="suggestedvideosgrid">
            {suggestedvideos.map((element, index) => {
              return <VideoCard key={index} element={element} />
            })}
          </div>
        ) : (
          <div>{online ? (<p><Spinner /></p>) : (<div className='nointernetvideoplayerpage'><img src={nointernet} alt="" /><p>Network Issue</p></div>)}
          </div>)}
      </div>
    </div>
  )
}

export default Videoplayer;
