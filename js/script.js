// Get запрос к API
const requestURL = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=34e7072b9b76b7c9cab63b43364fb10d'

// единицы измерения

const tempUnit = ' °'
const pressureUnit = ' мм рт ст'
const humidityUnit = ' %'
const windUnit = ' м/с'

// получение данных с сервера
async function sendRequest () {
    try {
        let response = await fetch(requestURL)
        let result = await response.json()
        console.log(result)
        console.log(result.list [0].weather[0].description)
    }
    catch (e) {
        console.error(e)
    }
}

sendRequest()


// получаем элементы DOM

//город
let city = document.querySelector('.current_city')
//result.city.name)

// температура сейчас
let currentTemp = document.querySelector('.current_temperature')
//result.list [0].main.temp (температура в кельвинах) отнять 273.15

// описание погоды
let currentDescription = document.querySelector('.current_description')
//result.list [0].weather[0].description

let tempFelt = document.querySelector('.felt')
//result.list [0].main.feels_like

let humidity = document.querySelector('.humidity')
// result.list [0].main.humidity

let wind = document.querySelector('.wind')
// result.list [0].wind.speed



//функции помощники

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







