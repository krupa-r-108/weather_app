const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "dc98541f7f6009e0dd8d01203fcea56a";

weatherForm.addEventListener("submit",async (e)=>{

    e.preventDefault();

    const city = cityInput.value;

    if(city){
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);

        } catch (error) {
            displayError(error);
        }
        
    }
    else{
        displayError("Please Enter a City Name");
    }
})

async function getWeatherData(city) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiURL);

    // console.log(response);
    if(!response.ok){
        throw new Error("Could not fetch");
    }
    return await response.json();
}
  

function displayWeatherInfo(data){
    // console.log(data)
    const {name:city , main: {temp, humidity}, weather:[{description, id}]}=data;
    
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    card.appendChild(cityDisplay);

    tempDisplay.textContent = `${(temp - 273.15).toFixed(2)}°C`;
    tempDisplay.classList.add("tempDisplay");
    card.appendChild(tempDisplay);

    humidityDisplay.textContent = `Humidity ${humidity}%`;
    humidityDisplay.classList.add("humidityDisplay");
    card.appendChild(humidityDisplay);

    descDisplay.textContent = description;
    descDisplay.classList.add("descDisplay");
    card.appendChild(descDisplay);

    weatherEmoji.textContent = getWeatherEmoji(id);
    weatherEmoji.classList.add("weatherEmoji");
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300): return "⛈";
        case (weatherId >= 300 && weatherId < 400): return "🌧";
        case (weatherId >= 500 && weatherId < 600): return "☔";
        case (weatherId >= 600 && weatherId < 700): return "🌨";
        case (weatherId >= 700 && weatherId < 800): return "🌫";
        case (weatherId === 800): return "🌞";
        case (weatherId >= 801 ): return "☁";
        default: return "❓";

    }
}

function displayError(msg){
    const errorDisplay = document.createElement('p');
    errorDisplay.textContent = msg;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = ""; //delete any existing content plus remove duplicates
    card.style.display = "flex";
    card.appendChild(errorDisplay); 
}