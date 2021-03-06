// Get запрос к API
const requestURL = 'https://api.openweathermap.org/data/2.5/forecast?id=524901&lang=ru&appid=34e7072b9b76b7c9cab63b43364fb10d'

// единицы измерения
const tempUnit = ' °'
const pressureUnit = ' мм рт ст'
const humidityUnit = ' %'
const windUnit = ' м/с'

let result

// получение данных с сервера
async function sendRequest () {
    try {
        let response = await fetch(requestURL)
        return await response.json()
    }
    catch (e) {
        alert('Error ' + e.status)
    }
}

// перевести температуру из кельвина в градусы
function convertTemp (valueTemp) {
    return Math.round(valueTemp - 273.15)
}

//перевести давление из гектопаскалей в мм рт ст
function convertPressure(valuePressure) {
    return (valuePressure * 0.75).toFixed(0)
}

// скорость ветра
function convertWind (valueWind) {
    return valueWind.toFixed(0)
}

//получаем время в часах
function convertTime (valueTime) {
    return new Date(valueTime * 1000).toLocaleTimeString([],{hour: '2-digit', minute: '2-digit'})
}

// склеивает единицы измерения и полученные данные
function getValueWithUnit(value,unit) {
    return `${value} ${unit}`
}

//город, описание, температура
function renderCurrentDate (result) {
    let city = document.querySelector('.current_city')
    city.textContent = result.city.name

    let currentDescription = document.querySelector('.current_description')
    currentDescription.textContent = result.list [0].weather[0].description

    let currentTemp = document.querySelector('.current_temperature')
    let data = convertTemp(result.list [0].main.temp)
    currentTemp.textContent = getValueWithUnit(data,tempUnit)

}

// детали
function renderDescription (result) {
    let tempFelt = document.querySelector('.felt')
    let tempData = convertTemp(result.list [0].main.feels_like)
    tempFelt.textContent = getValueWithUnit(tempData, tempUnit)

    let humidity = document.querySelector('.humidity')
    let humidityData = result.list [0].main.humidity
    humidity.textContent = getValueWithUnit(humidityData, humidityUnit)

    let pressure  = document.querySelector('.pressure')
    let pressureData = convertPressure(result.list [0].main.pressure)
    pressure.textContent = getValueWithUnit(pressureData, pressureUnit)

    let wind = document.querySelector('.wind')
    let windData = convertWind(result.list [0].wind.speed)
    wind.textContent = getValueWithUnit(windData,windUnit)

}

//прогноз
function renderForecast (result) {
    let forecastContainer = document.querySelector('.forecast')
    let forecast = ''

    for (let i = 0; i < 6; i++) {
        let item = result.list[i]

        let icon =item.weather[0].icon
        let temp = convertTemp(item.main.temp)
        let hours = (i == 0 ? 'Сейчас' : convertTime(item.dt))
        let template = `<div class="forecast_item">
                    <div class="forecast_time">${hours}</div>
                    <div class="forecast_icon icon_${icon}"></div>
                    <div class="forecast_temperature">${temp}º</div>
                </div>`;
        forecast +=template
    }
    forecastContainer.innerHTML = forecast
}


//устанавливаю фон
function isDay (result) {
    let backgroundColor = document.querySelector('.weather')
    let sunset = result.city.sunset
    let time = result.list[0].dt

    if (time > sunset) {
        backgroundColor.style.background = 'linear-gradient(360deg, #55707E 0%, rgba(255, 255, 255, 0) 100%), #042232'
    } else {
        backgroundColor.style.background = 'linear-gradient(360deg, #3594BF 0%, rgba(255, 255, 255, 0) 100%), #53A6CB'
    }
}

sendRequest().then (data => {
    result = data
    renderDescription(result)
    renderCurrentDate(result)
    renderForecast(result)
    isDay(result)
})
