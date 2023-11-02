import React from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useEffect } from 'react';

const viewscount=(views)=>{
  const in1000s=Math.floor(views/1000);
  const inmill=parseFloat(views/1000000).toFixed(1);

  if(views<1000){
      return views;
  }
  else if(in1000s>1 && in1000s<1000){
      return `${in1000s}K`
  }
  else if(inmill>=1){
      return `${inmill}M`
  }
 
}




const calculateTimeDifference = (publishedAt) => {
  const publishedTime = new Date(publishedAt);
  const time=Math.floor(publishedTime.getTime()/1000);
  const currentTime = new Date();
  const ct=Math.floor(currentTime.getTime()/1000)
  const timeDifference = ct - time;
  const minutes = Math.floor(timeDifference / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months=Math.floor(days/30);
  const year=Math.floor(days/365);
  if(year>=1){
      return `${year} year ago`
  }
  else if(months>=1){
    return `${months} month ago`;

  }
 else if (days > 0) {
      return `${days} days ago`;
  } else if (hours > 0) {
      return `${hours} hours ago`;
  } else if (minutes > 0) {
      return `${minutes} minutes ago`;
  } else {
      return `${timeDifference} seconds ago`;
  }
};

const Dictaphone = () => {
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const startListening = () => {
    if (browserSupportsSpeechRecognition) {
      resetTranscript();
      SpeechRecognition.startListening();
    }
  };

  const stopListening = () => {
    if (browserSupportsSpeechRecognition) {
      SpeechRecognition.stopListening();
    }
  };

  useEffect(() => {
    startListening(); // Automatically start listening when the component mounts

    return () => {
      stopListening(); // Automatically stop listening when the component unmounts
    }
  }, [browserSupportsSpeechRecognition]);

  

    return  (
     <p id='ppp2'>{transcript}</p>)
  
  



};







export  {viewscount,calculateTimeDifference,Dictaphone};
