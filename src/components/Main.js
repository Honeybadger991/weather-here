import locationpic from '../assets/location.svg';
import maxpic from '../assets/arrow-upward.svg';
import minpic from '../assets/arrow-downward.svg';
import sunrisepic from '../assets/sun.svg';
import sunsetpic from '../assets/sunset.svg';
import windpic from '../assets/wind.svg';
import humiditypic from '../assets/humidity.svg';
import pressurepic from '../assets/pressure.svg';
import visibilitypic from '../assets/visibility.svg';
import cloudinesspic from '../assets/clouds.svg';
import thermopic from '../assets/thermometer.svg';
import { getForecastHours, getTxtDate, getTime, monthsNames, windSpeedInKph } from '../modules/modules';


const Main = (
    {weather:
    {description, 
    icon, 
    temp, 
    feels_like,
    pressure,
    humidity, 
    speed,
    visibility,
    cloudiness, 
    dt,
    sunrise,
    sunset, 
    timezone, 
    hourly},
    reverseGeo:
    {name,
    country
    }}) => {
    
    const todaysTemps = hourly.filter(item => {
        const now = new Date().getDate();
        const day = new Date(item.dt_txt).getDate();
        return now === day;
    })
    .map(item => item.main.temp)
    .concat(temp);

    const todaysMaxTemp = Math.round(todaysTemps.reduce((max, current) => {return current > max ? current : max}));
    const todaysMinTemp = Math.round(todaysTemps.reduce((min, current) => {return current < min ? current : min}));

    const hourlyForecastItems = hourly.slice(0, 8).map(item => {
        return (
            <div key={item.dt} className="hourly-forecast-item">
                <div className="hourly-forecast-time">{getForecastHours(item.dt, timezone)}</div>
                <img className="hourly-forecast-img" src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="weather-icon"/>
                <div className="hourly-forecast-temp">{Math.round(item.main.temp)}°</div>
            </div>
        );
    });

    const dailyForecastItems = hourly.filter(item => {
        const now = new Date().getDate();
        const day = new Date(item.dt_txt).getDate();
        const nowMonth = new Date().getMonth();
        const forecastMonth = new Date(item.dt_txt).getMonth();
        return (now < day || nowMonth < forecastMonth || (nowMonth === 12 && forecastMonth === 1)) && item.dt_txt.includes('15:00:00')
        }).slice(0, 4).map(item =>{
            return (
            <div key={item.dt} className="daily-forecast-item">
                <div className="daily-forecast-date">{new Date(item.dt_txt).getDate()}  {monthsNames[new Date(item.dt_txt).getMonth()]}</div>
                <img className="daily-forecast-img" src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="icon"/>
                <div className="daily-forecast-temp">{Math.round(item.main.temp)}°C</div>
            </div>
            );
        }
    );

    return (
        <div className="main-main">
            <div className="block hourly-forecast">
                <h2 className='hourly-forecast-title'>Hourly forecast</h2>
                <div className="hourly-forecast-items">
                    {hourlyForecastItems}
                </div>
            </div>
            <div className="block main-info">
                <div className="current-location">
                    <img className="current-location-icon" src={locationpic} alt="location-icon"/>
                    <h1 className="current-location-name">{`${name}, ${country}`}</h1>
                </div>
                <div className="current-date-time">{getTxtDate(dt, timezone)} | Local time: {getTime(dt, timezone)}</div>
                <div className="current-weather">
                    <div className="current-weather-max">
                        <img src={maxpic} alt="icon"/>
                        <span>{todaysMaxTemp}°C</span>
                    </div>
                    <div className="current-weather-main">
                        <img className="current-weather-icon" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather-icon"/>
                        <div className="current-weather-temperature"> {Math.round(temp)}°C</div>
                    </div>
                    <div className="current-weather-min">
                        <img src={minpic} alt="icon"/> 
                        <span>{todaysMinTemp}°C</span>
                    </div>
                </div>
                <div className="current-details">
                    <div className="current-details-description"> {description}</div>
                </div>
                <div className="current-sun">
                    <div className="current-sun-rise">
                        <img src={sunrisepic} alt="sunrise-logo"/>
                        <span>Sunrise: {getTime(sunrise, timezone)}</span>
                    </div>
                    <div className="current-sun-set">
                        <img src={sunsetpic} alt="sunset-logo"/>
                        <span>Sunset: {getTime(sunset, timezone)}</span>
                    </div>
                </div>
            </div>
            <div className="block daily-forecast" style={{backgroundColor: 'transparent', padding: '0'}}>
                <h2 className='daily-forecast-title'>Daily forecast</h2>
                <div className="daily-forecast-items">
                    {dailyForecastItems}
                </div>
            </div>
            <div className="block highlights">
                <h2 className="highlights-title">Highlights</h2>
                <div className="highlights-items">
                    <div className="highlights-item">
                        <div className="highlights-item-name">Feels like</div>
                        <img className="highlights-item-img" src={thermopic} alt="icon"/>
                        <div className="highlights-item-value">{Math.round(feels_like)}°C</div>
                    </div>
                    <div className="highlights-item">
                        <div className="highlights-item-name">Wind</div>
                        <img className="highlights-item-img" src={windpic} alt="icon"/>
                        <div className="highlights-item-value">{windSpeedInKph(speed).toFixed(1)} km/h</div>
                    </div>
                    <div className="highlights-item">
                        <div className="highlights-item-name">Pressure</div>
                        <img className="highlights-item-img" src={pressurepic} alt="icon"/>
                        <div className="highlights-item-value">{pressure} hPa</div>
                    </div>
                    <div className="highlights-item">
                        <div className="highlights-item-name">Humidity</div>
                        <img className="highlights-item-img" src={humiditypic} alt="icon"/>
                        <div className="highlights-item-value">{humidity}%</div>
                    </div>
                    <div className="highlights-item">
                        <div className="highlights-item-name">Visibility</div>
                        <img className="highlights-item-img" src={visibilitypic} alt="icon"/>
                        <div className="highlights-item-value">{(visibility/1000).toFixed(1)} km</div>
                    </div>
                    <div className="highlights-item">
                        <div className="highlights-item-name">Clouds</div>
                        <img className="highlights-item-img" src={cloudinesspic} alt="icon"/>
                        <div className="highlights-item-value">{cloudiness}%</div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Main;