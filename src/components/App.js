import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Modal from './Modal';
import { useState, useEffect } from 'react';
import { url, getFormatedReverseGeo, getOneCall } from '../services/weatherService';


function App() {

  const [modal, setModal] = useState(false);
  const [weather, setWeather] = useState();
  const [reverseGeo, setReverseGeo] = useState();

  const fetchWeather = async (url1, url2) => {
    const data = await getOneCall(url1, url2);
    console.log(data);
    setWeather(data);
  };

  const fetchReverseGeo = async (url) => {
    const data = await getFormatedReverseGeo(url);
    console.log(data);
    setReverseGeo(data);
  };

  useEffect(() => {
    fetchWeather(url.currentWeather('lat=46.9758615', 'lon=31.9939666'), url.forecast('lat=46.9758615', 'lon=31.9939666'));
    fetchReverseGeo(url.reverseGeo('lat=46.9758615', 'lon=31.9939666'));
  }, []);


  return (
    <div className="App">
      <div className="content">
        <Header setModal={setModal} weather={weather} setWeather={setWeather} setReverseGeo={setReverseGeo}/>
        <div className="main-wrapper">
          {weather ? <Main weather={weather} reverseGeo={reverseGeo}/> : <div className="loading"></div>}
        </div>
        <Modal modal={modal} setModal={setModal} weather={weather} setWeather={setWeather} setReverseGeo={setReverseGeo}/>
        <Footer/>
      </div>
    </div>
  );

};

export default App;
