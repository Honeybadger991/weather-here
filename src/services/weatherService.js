export const getData = (url) => {
    return fetch(`${url}&appid=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.json())
            .then(data => data)
};

export const url = {
    currentWeather(lat, lon){
        return `https://api.openweathermap.org/data/2.5/weather?${lat}&${lon}&units=metric`
    },
    forecast (lat, lon){
        return `https://api.openweathermap.org/data/2.5/forecast?${lat}&${lon}&units=metric`
    },
    reverseGeo(lat, lon){
        return `https://api.openweathermap.org/geo/1.0/reverse?${lat}&${lon}&limit=5`
    },
    geo(query){
        return `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5`
    }
};


const formatCurrentWeather = (data) => {
    const {
        coord: {lon, lat},
        weather,
        main: {temp, feels_like, pressure, humidity} ,
        wind: {speed},
        visibility,
        clouds: {all},
        dt,
        sys: {sunrise, sunset},
        timezone
    } = data;

    const {description, icon} = weather[0];
    const cloudiness = all;

    return {
        lon, 
        lat,
        description,
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
        timezone
    };
};

const formatForecast = (data) => {
    const {list} = data;
    const hourly = list;

    return {hourly};
}

const formatReverseGeo = (data) => {
    const {name, country} = data[0];

    return {name, country};
}

const formatGeo = (data) => {
    console.log(data);
    const places = data[0].name;

    return places;
}


export const getFormatedCurrentWeather = async (url) => {
    const formatedCurrentWeather = await getData(url).then(formatCurrentWeather);
    return formatedCurrentWeather;
};

export const getFormatedForecast = async (url) => {
    const formatedForecast = await getData(url).then(formatForecast);
    return formatedForecast;
};

export const getOneCall = async (url1, url2) => {
    const formatedCurrentWeather = await getData(url1).then(formatCurrentWeather);
    const formatedForecast = await getData(url2).then(formatForecast);
    return {...formatedCurrentWeather, ...formatedForecast};
};

export const getFormatedReverseGeo = async (url) => {
    const formatedReverseGeo = await getData(url).then(formatReverseGeo);
    return formatedReverseGeo;
};

export const getFormatedGeo = async (url) => {
    const formatedGeo = await getData(url).then(formatGeo);
    return formatedGeo;
};
