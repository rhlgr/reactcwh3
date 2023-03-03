import React, { useState } from 'react'
import Nav from "./components/Nav"
import News   from "./components/News"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'




const App = ()=> {
const [progress, setProgress] = useState()

 const apiKey = process.env.REACT_APP_NEWS_API

    return (
      <>
      <div>
          <Router>
      <Nav/>
      <LoadingBar
        color='#f11946'
        progress={progress}
    
      />

      <Routes>
          <Route exact path="/" element={< News setProgress=  {setProgress} apiKey={apiKey}  key="general" country="in" category="general"/> } /> 
          <Route exact path="/business"element={<News setProgress=  {setProgress} apiKey={apiKey}    key="business" country="in" category="business"/>} />
          <Route exact path="/entertainment" element={<News setProgress=  {setProgress} apiKey={apiKey}    key="entertainment" country="in" category="entertainment"/>}/>
          <Route exact path="/general" element={<News setProgress=  {setProgress}  apiKey={apiKey}   key="general" country="in" category="general"/>}/>
          <Route exact path="/health"element={<News setProgress=  {setProgress}  apiKey={apiKey}   key="health" country="in" category="health"/>} />
          <Route exact path="/science"element={<News setProgress=  {setProgress} apiKey={apiKey}    key="science" country="in" category="science"/>} />
          <Route exact path="/sports"element={<News setProgress=  {setProgress}  apiKey={apiKey}   key="sports" country="in" category="sports"/> } />
          <Route exact path="/technology"element={<News setProgress=  {setProgress} apiKey={apiKey}    key="technology" country="in" category="technology"/>} />
      </Routes>
      </Router>
      </div>
      </>
    )
}

export default App;