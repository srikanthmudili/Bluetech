import React from 'react';
import './App.css';
import Navbar from './Utils/Navbar';
import bottom from './assets/bottom.png'
import Auth from './Utils/Auth/Auth';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Auth/>
      <div>
      <img className="bottom-image" src={bottom} alt="bottom"></img>
      </div>
    </div>
  );
}

export default App;
