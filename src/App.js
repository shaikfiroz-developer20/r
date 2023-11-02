import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css"
import Header from './header/header';
import Homepagebody from './homepagebody';
import Videoplayer from './videoplayer';
import Searchresultpage from './searchresultpage';
import Footer from './header/footer';
import Shorts from './shorts';
//in this app.js we serve the paged the application required as pre the requests occur. Browserouter declared at the top of anything Rouets is for 
//keeping track of all routes and assigning the routes accordingly like a switch and the route it has 2 args 1 path 2 element path is the requested path and element is the page to be served
function App() {
  return (
    <div>
      <Router>

      <Header />
      <Routes>
        <Route path='/' element={<Homepagebody />} />
        <Route path='/v=/:id' element={<Videoplayer />} />
        <Route path='/search=/:data/searchresult ↓' element={<Searchresultpage/>}/>
        <Route path='/shorts' element={<Shorts/>}/>

      </Routes>
      <Footer/>
     </Router>

    </div>
  )
}

export default App;
