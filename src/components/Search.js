import search from '../assets/search.svg';
import location from '../assets/location.svg';
import { useState, useCallback } from 'react';
import { url, getData, getOneCall, getFormatedReverseGeo } from '../services/weatherService';
import useDebounce from '../hooks/useDebounce';

const Search = ({modal, setModal, setWeather, setReverseGeo}) => {

    const [searchValue, setSearchValue] = useState('');
    const [geoResult, setGeoResult] = useState();
    const [searchLoading, setSearchLoading] = useState(false);

    const fetchWeather = async (url1, url2) => {
        const data = await getOneCall(url1, url2);
        setWeather(data);
    };

    const fetchReverseGeo = async (url) => {
        const data = await getFormatedReverseGeo(url);
        setReverseGeo(data);
    };

    const fetchGeo = async (value) => {
        if (value) {
        const data = await getData(url.geo(value));
        setGeoResult(data);
        setSearchLoading(false);
        } else {
            setSearchLoading(false);
        }
    };

    // eslint-disable-next-line
    const handleInputChange = useCallback (
        useDebounce ((value) => {
            if(searchValue){
                setSearchLoading(true);
                fetchGeo(value);
            }
        }, 500),
        [searchValue]);
    
    const handleChange = (value) => {
        setSearchValue(value);
        handleInputChange(value);
    };

    const handleCityPickByClick = (lat, lon) => {
        fetchWeather(url.currentWeather(`lat=${lat}`, `lon=${lon}`), url.forecast(`lat=${lat}`, `lon=${lon}`));
        fetchReverseGeo(url.reverseGeo(`lat=${lat}`, `lon=${lon}`));
        setSearchValue('');
        if(modal){
            setModal(false);
        }
    };

    const handleCityPickByKeyDown = (e, lat, lon) => {
        if (e.key === 'Enter') {
            fetchWeather(url.currentWeather(`lat=${lat}`, `lon=${lon}`), url.forecast(`lat=${lat}`, `lon=${lon}`));
            fetchReverseGeo(url.reverseGeo(`lat=${lat}`, `lon=${lon}`));
            setSearchValue('');
            if(modal){
                setModal(false);
            }
        }
    };


    const searchItems = !geoResult ? null : geoResult.map(item => {
        return (
            <li 
            className="header-search-item"
            key={`${item.lat}${item.lon}`}  
            tabIndex={0} 
            onClick={() => handleCityPickByClick(item.lat, item.lon)}
            onKeyDown={(e) => handleCityPickByKeyDown(e, item.lat, item.lon)}
            >
                <img className="header-search-item-img" src={location} alt="location_icon" />
                <div className="header-search-item-location">
                    <div className="header-search-item-name">{item.name}</div>
                    <div className="header-search-item-clarification">{item.state ? `${item.state}, ` : ''} {item.country}</div>
                </div>
            </li>
        )
    });

    return (
        <div className={searchLoading ? "header-search searching" : "header-search"} style={modal ? {display: 'flex', width: '260px'} : {}}>
            <img className="header-search-icon" src={search} alt="search-icon" />
            <input 
            type="text"
            className="header-input" 
            placeholder='Search for place' 
            autoComplete='off' 
            value={searchValue}
            onChange={e => handleChange(e.target.value)}
            />
            <div className="header-search-view" style={searchValue ? {display: 'block'} : {display: 'none'}}>
                <ul className="header-search-list">
                    {searchItems}
                </ul>
            </div>
        </div>
    );

};

export default Search;