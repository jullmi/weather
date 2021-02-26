// Get запрос к API
const requestURL = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&lang=ru&appid=34e7072b9b76b7c9cab63b43364fb10d'

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
// function convertTime (valueTime) {
//     let date = new Date(valueTime * 1000)
//
// }
//
// convertTime(1614362400)

// склеивает единицы измерения и полученные данные
function getValueWithUnit(value,unit) {
    return `${value} ${unit}`
}

// отрисовка прогноза
// function  render (result) {
//     renderCurrentDate(result)
//     renderDescription(result)
//     renderForecast(result)
// }

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
    let windData = result.list [0].wind.speed
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
        let hours = (i == 0 ? 'Сейчас' : item.dt)
        let template = `<div class="forecast_item">
                    <div class="forecast_time">${hours}</div>
                    <div class="forecast_icon icon_${icon}"></div>
                    <div class="forecast_temperature">${temp}º</div>
                </div>`;
        forecast +=template
    }
    forecastContainer.innerHTML = forecast
}





sendRequest().then (data => {
    console.log(data)
    result = data
    renderDescription(result)
    renderCurrentDate(result)
    renderForecast(result)
})