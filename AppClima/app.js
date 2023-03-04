const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  const crd = pos.coords;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);


window.addEventListener('load', () => {
  function success(pos) {
    const crd = pos.coords;
  
    console.log('Your current position is:');
    console.log('Latitude : ${crd.latitude}');
    console.log('Longitude: ${crd.longitude}');
    console.log('More or less ${crd.accuracy} meters.');
  }
  
  let lon 
  let lat 

  let temperatureValue = document.getElementById('temperatureValue')

  let weatherDescription = document.getElementById('weatherDescription')

  let ubication = document.getElementById('ubication')
  let iconoClima = document.getElementById('iconoClima')

  let windSpeed = document.getElementById('windSpeed')


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition ( posicion => {
      lon = posicion.coords.longitude
      lat = posicion.coords.latitude


     //const url = 'https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=$0af02d7e20cbc1e43e9241c408c57133'
     //const url = 'https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=0e340aedfe7963a9f9caf932983a3389'
     const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0e340aedfe7963a9f9caf932983a3389`
    //const url = 'http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&appid=0e340aedfe7963a9f9caf932983a3389'
     console.log(url)
      fetch (url)
        .then(response => {
          return response.json()
        })
        .then(data => {
          console.log(data.main.temp)
          let temp = Math.round(data.main.temp)
          temperatureValue.textContent =  `${temp - 273} ° C`

          let desc = data.weather[0].description
          weatherDescription.textContent = desc.toUpperCase()

          ubication.textContent = data.name
          console.log(data.name)

          windSpeed.textContent = data.wind.speed

          console.log(data.weather[0].main)
          switch (data.weather[0].main) {
            case 'Clear':
              iconoClima.src = 'animated/day.svg'
              console.log('Despejado')
              break;
            case 'Clouds':
              iconoClima.src = 'animated/cloudy.svg'
              console.log('Nubes')
              break;
            case 'Drizzle':
              iconoClima.src = 'animated/rainy-2.svg'
              console.log('Llovizna')
              break;
            case 'Rain':
              iconoClima.src = 'animated/rainy-7.svg'
              console.log('LLuvia')
              break;
            case 'Snow':
              iconoClima.src = 'animated/snowy-6'
              console.log('Nieve')
          }

        })

        .catch(error => {
          console.log(error)
        })

    })
  }
})