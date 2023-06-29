import logo from '../assets/logo-no-background.svg';
import search from '../assets/search.svg';
import target from '../assets/target.svg';
import Search from './Search';
import { url, getOneCall, getFormatedReverseGeo } from '../services/weatherService';


const Header = ({setModal, weather, setWeather, setReverseGeo}) => {

    const fetchWeather = async (url1, url2) => {
        const data = await getOneCall(url1, url2);
        setWeather(data);
    };

    const fetchReverseGeo = async (url) => {
        const data = await getFormatedReverseGeo(url);
        setReverseGeo(data);
    };

    const handleCurrentLocationClick = () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                if (weather.lat.toFixed(4) !== lat.toFixed(4) && weather.lon.toFixed(4) !== lon.toFixed(4)) {
                    fetchWeather(url.currentWeather(`lat=${lat}`, `lon=${lon}`), url.forecast(`lat=${lat}`, `lon=${lon}`));
                    fetchReverseGeo(url.reverseGeo(`lat=${lat}`, `lon=${lon}`));
                }
            });
        }
    };

    return (
        <div className="header-wrapper">
            <div className="header-main">
                <div className="header-logo">
                    <img src={logo} alt="" />
                </div>
                <Search weather={weather} setWeather={setWeather} setReverseGeo={setReverseGeo} setModal={setModal}/>
                <button className="header-search-button" onClick={() => setModal(true)}><img className="header-search-icon" src={search} alt="search-icon" /></button>
                <button className="header-location" onClick={handleCurrentLocationClick}>
                    <img src={target} alt="target-icon" />
                    <span className="header-location-text">Current location</span>
                </button>
            </div>
        </div>
    );

};

export default Header;